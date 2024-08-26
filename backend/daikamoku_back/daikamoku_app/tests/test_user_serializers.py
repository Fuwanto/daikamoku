from django.test import TestCase
from ..serializers.user_serializer import RegisterSerializer
from ..models import User


class RegisterSerializerTest(TestCase):
    def test_serializer_with_valid_data(self):
        data = {
            "email": "test@example.com",
            "username": "testuser",
            "password": "password123",
            "confirm_password": "password123",
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
