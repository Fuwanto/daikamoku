from rest_framework import serializers
from ..models import User
from django.core.exceptions import ValidationError


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ("id", "email", "username", "password")

    def create(self, validated_data):
        password = validated_data.get("password")
        if len(password) < 8:
            raise ValidationError(
                {"password": "Password must be at least 8 characters long."}
            )
        user = User.objects.create_user(
            email=validated_data["email"],
            username=validated_data["username"],
            password=password,
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "email", "username")
