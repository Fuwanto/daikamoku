from rest_framework.response import Response
from django.core.mail import EmailMultiAlternatives
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
import jwt
from django.conf import settings


def generate_confirmation_token(user):
    return jwt.encode({"user_id": user.id}, settings.SECRET_KEY, algorithm="HS256")


def construct_confirmation_link(user):
    token = generate_confirmation_token(user)
    return f"{settings.FRONTEND_URL}/confirm-email/{urlsafe_base64_encode(str(user.pk).encode())}/{token}/"


def send_confirmation_email(user):
    try:
        confirmation_link = construct_confirmation_link(user)
        subject = "Confirm your email address"
        from_email = settings.DEFAULT_FROM_EMAIL
        to_email = [user.email]

        html_content = render_to_string(
            "confirmation_email.html",
            {"user": user, "confirmation_link": confirmation_link},
        )
        text_content = f"Click the link to confirm your email: {confirmation_link}"

        msg = EmailMultiAlternatives(subject, text_content, from_email, to_email)
        msg.attach_alternative(html_content, "text/html")
        msg.send()
    except (jwt.PyJWTError, IOError) as e:
        user.delete()
        raise e


def error_response(message, status_code):
    return Response({"detail": message}, status=status_code)
