from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from django.utils.http import urlsafe_base64_decode
from ..serializers.user_serializer import RegisterSerializer, LoginSerializer
from ..services import (
    get_user_by_id,
    validate_jwt_token,
    activate_user,
    get_user_by_email,
)
from ..utils import send_confirmation_email, error_response


class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        # send_confirmation_email(user) just for development


class ConfirmEmailView(generics.GenericAPIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        uidb64 = kwargs.get("uidb64")
        token = kwargs.get("token")

        user_id = self.decode_uid(uidb64)
        if not user_id:
            return error_response("Invalid token or user.", status.HTTP_400_BAD_REQUEST)

        user = get_user_by_id(user_id)
        if not user:
            return error_response("User not found.", status=status.HTTP_400_BAD_REQUEST)

        payload = validate_jwt_token(token)
        if payload and payload.get("user_id") == user.id:
            activate_user(user)
            return Response(
                {"detail": "Email confirmed successfully."},
                status=status.HTTP_200_OK,
            )
        else:
            return error_response("Invalid token.", status=status.HTTP_400_BAD_REQUEST)

    def decode_uid(self, uidb64):
        try:
            user_id = urlsafe_base64_decode(uidb64).decode()
            return int(user_id) if user_id.isdigit() else None
        except (TypeError, ValueError):
            return None


class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        user = get_user_by_email(email)

        if user and user.check_password(password) and user.is_active:
            access_token = AccessToken.for_user(user)
            response = Response(
                {
                    "detail": "Login successful",
                    "access": str(access_token),
                }
            )
            return response

        return error_response(
            "Invalid credentials or inactive account",
            status_code=status.HTTP_401_UNAUTHORIZED,
        )


class RefreshTokenView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return Response(
                {"detail": "No access token found"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        try:
            token = auth_header.split(" ")[1]
            access_token = AccessToken(token)
            new_access_token = str(access_token)

            return Response(
                {
                    "access": new_access_token,
                }
            )
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        response = Response({"detail": "Logout successful"})
        return response
