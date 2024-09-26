import jwt
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.exceptions import AuthenticationFailed
from ..models import User


def get_user_by_id(user_id):
    try:
        return User.objects.get(pk=user_id)
    except ObjectDoesNotExist:
        return None


def get_user_by_email(email):
    try:
        return User.objects.get(email=email)
    except ObjectDoesNotExist:
        return None


def get_user_by_token(auth_header):
    if not auth_header:
        raise AuthenticationFailed("No authentication header provided.")

    try:
        token = auth_header.split()[1]
        decoded_token = AccessToken(token)
        user_id = decoded_token["user_id"]
        return get_user_by_id(user_id)

    except (IndexError, KeyError):
        raise AuthenticationFailed("Invalid token format.")
    except Exception as e:
        raise AuthenticationFailed(f"Error decoding token: {str(e)}")


def activate_user(user):
    user.is_active = True
    user.email_confirmed = True
    user.save()
