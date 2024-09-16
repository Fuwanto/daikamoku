from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from ..utils import generate_confirmation_token
from django.utils.http import urlsafe_base64_encode

User = get_user_model()


class UserRegistrationTest(APITestCase):

    def setUp(self):
        User.objects.all().delete()

    def test_user_can_register(self):
        url = reverse("register")
        data = {
            "email": "test@example.com",
            "username": "testuser",
            "password": "password123",
            "confirm_password": "password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        expected_keys = {"id", "email", "username"}
        self.assertTrue(
            all(key in response.data for key in expected_keys),
            "Response data does not contain expected keys.",
        )

    def test_user_registration_with_invalid_email(self):
        url = reverse("register")
        data = {
            "email": "invalid-email",
            "username": "testuser",
            "password": "password123",
            "confirm_password": "password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_user_registration_with_short_password(self):
        url = reverse("register")
        data = {
            "email": "testuser@example.com",
            "username": "testuser",
            "password": "short",
            "confirm_password": "short",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)

    def test_user_registration_with_duplicate_email(self):
        User.objects.create_user(
            email="testuser@example.com", username="testuser1", password="password123"
        )
        url = reverse("register")
        data = {
            "email": "testuser@example.com",
            "username": "testuser2",
            "password": "password123",
            "confirm_password": "password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_user_registration_with_duplicate_username(self):
        User.objects.create_user(
            email="testuser1@example.com", username="testuser", password="password123"
        )
        url = reverse("register")
        data = {
            "email": "testuser2@example.com",
            "username": "testuser",
            "password": "password123",
            "confirm_password": "password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)

    def test_user_registration_with_long_username(self):
        url = reverse("register")
        data = {
            "email": "testuser@example.com",
            "username": "a" * 151,
            "password": "password123",
            "confirm_password": "password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)


class UserLoginTest(APITestCase):

    def setUp(self):
        User.objects.all().delete()
        self.user = User.objects.create_user(
            email="testuser@example.com", username="testuser", password="password123"
        )
        self.user.is_active = True
        self.user.save()

    def test_user_can_login(self):
        url = reverse("login")
        data = {
            "email": "testuser@example.com",
            "password": "password123",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)

    def test_login_with_invalid_credentials(self):
        url = reverse("login")
        data = {
            "email": "wronguser@example.com",
            "password": "wrongpassword",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(
            response.data["detail"], "Invalid credentials or inactive account"
        )


class UserLogoutTest(APITestCase):

    def setUp(self):
        User.objects.all().delete()
        self.user = User.objects.create_user(
            email="testuser@example.com", username="testuser", password="password123"
        )
        self.user.is_active = True
        self.user.save()
        self.refresh_token = RefreshToken.for_user(self.user)
        self.access_token = str(self.refresh_token.access_token)

        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + str(self.access_token))

    def test_user_can_logout(self):
        url = reverse("logout")
        response = self.client.post(url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["detail"], "Logout successful")

    def test_logout_without_authentication(self):
        self.client.credentials()
        url = reverse("logout")
        response = self.client.post(url, {}, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class EmailConfirmationTest(APITestCase):

    def setUp(self):
        self.email = "testuser@example.com"
        self.password = "testpassword"
        self.username = "testuser"
        self.user = User.objects.create_user(
            email=self.email, password=self.password, username=self.username
        )
        self.user.is_active = False
        self.user.save()

        self.token = generate_confirmation_token(self.user)
        self.uidb64 = urlsafe_base64_encode(str(self.user.pk).encode())

    def test_confirm_email(self):
        url = reverse(
            "confirm-email", kwargs={"uidb64": self.uidb64, "token": self.token}
        )
        response = self.client.get(url)
        self.user.refresh_from_db()
        self.assertTrue(self.user.is_active)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_invalid_confirmation_link(self):
        invalid_uidb64 = urlsafe_base64_encode(b"invalid")
        url = reverse(
            "confirm-email", kwargs={"uidb64": invalid_uidb64, "token": self.token}
        )
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("Invalid token or user", response.content.decode())
