from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.exceptions import ObjectDoesNotExist
import jwt
from ..models import User
from ..serializers.user_serializer import RegisterSerializer


def generate_confirmation_token(user):
    return jwt.encode({"user_id": user.pk}, settings.SECRET_KEY, algorithm="HS256")


class RegisterView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()

        try:
            # Genera el token de confirmación
            token = generate_confirmation_token(user)
            confirmation_link = f"{settings.FRONTEND_URL}/confirm/{urlsafe_base64_encode(str(user.pk).encode())}/{token}/"

            # Envía el correo de confirmación
            send_mail(
                "Confirm your email address",
                f"Click the link to confirm your email: {confirmation_link}",
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
        except Exception as e:
            user.delete()
            raise e

        return user


class ConfirmEmailView(generics.GenericAPIView):
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        uidb64 = kwargs.get("uidb64")
        token = kwargs.get("token")

        try:
            user_id = urlsafe_base64_decode(uidb64).decode()
            if not user_id.isdigit():
                return Response(
                    {"detail": "Invalid token or user."},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user = User.objects.get(pk=int(user_id))

            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            if payload.get("user_id") == user.pk:
                user.is_active = True
                user.save()
                return Response(
                    {"detail": "Email confirmed successfully."},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST
                )
        except (ObjectDoesNotExist, jwt.ExpiredSignatureError, jwt.InvalidTokenError):
            return Response(
                {"detail": "Invalid token or user."}, status=status.HTTP_400_BAD_REQUEST
            )


class LoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        user = User.objects.filter(email=email).first()

        if user and user.check_password(password) and user.is_active:
            refresh = RefreshToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            )
        return Response(
            {"error": "Invalid credentials or inactive account"},
            status=status.HTTP_401_UNAUTHORIZED,
        )


class LogoutView(generics.GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data.get("refresh")
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response(
                    {"detail": "Logout successful"},
                    status=status.HTTP_205_RESET_CONTENT,
                )
            else:
                return Response(
                    {"detail": "Refresh token not provided"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
