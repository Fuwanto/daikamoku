from rest_framework.response import Response
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
import jwt
from django.conf import settings


def generate_confirmation_token(user):
    return jwt.encode({"user_id": user.id}, settings.SECRET_KEY, algorithm="HS256")


def construct_confirmation_link(user):
    token = generate_confirmation_token(user)
    return f"{settings.FRONTEND_URL}/confirm/{urlsafe_base64_encode(str(user.pk).encode())}/{token}/"


def send_confirmation_email(user):
    try:
        confirmation_link = construct_confirmation_link(user)
        send_mail(
            "Confirm your email address",
            f"Click the link to confirm your email: {confirmation_link}",
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )
    except (jwt.PyJWTError, IOError) as e:
        user.delete()
        raise e


def error_response(message, status_code):
    return Response({"detail": message}, status=status_code)
