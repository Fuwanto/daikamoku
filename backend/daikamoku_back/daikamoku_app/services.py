import jwt
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from .models.user import User


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


def validate_jwt_token(token):

    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return payload
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None


def activate_user(user):
    user.is_active = True
    user.email_confirmed = True
    user.save()
