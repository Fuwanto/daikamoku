from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from ..models import User
from rest_framework_simplejwt.tokens import RefreshToken


class UserRegistrationTest(APITestCase):

    def setUp(self):
        User.objects.all().delete()

    def test_user_can_register(self):
        url = reverse("register")
        data = {
            "email": "testuser@example.com",
            "username": "testuser",
            "password": "password123",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        user = User.objects.get(email="testuser@example.com")
        self.assertEqual(user.email, "testuser@example.com")

    def test_user_registration_with_invalid_email(self):
        url = reverse("register")
        data = {
            "email": "invalid-email",
            "username": "testuser",
            "password": "password123",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", response.data)

    def test_user_registration_with_short_password(self):
        url = reverse("register")
        data = {
            "email": "testuser@example.com",
            "username": "testuser",
            "password": "short",
        }
        response = self.client.post(url, data)
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
        }
        response = self.client.post(url, data)
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
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)

    def test_registration_response_structure(self):
        url = reverse("register")
        data = {
            "email": "testuser@example.com",
            "username": "testuser",
            "password": "password123",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data)
        self.assertIn("email", response.data)
        self.assertIn("username", response.data)

    def test_user_registration_with_long_username(self):
        url = reverse("register")
        data = {
            "email": "testuser@example.com",
            "username": "a" * 151,
            "password": "password123",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)


class UserLoginTest(APITestCase):

    def setUp(self):
        User.objects.all().delete()
        self.user = User.objects.create_user(
            email="testuser@example.com", username="testuser", password="password123"
        )

    def test_user_can_login(self):
        url = reverse("login")
        data = {
            "email": "testuser@example.com",
            "password": "password123",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_login_with_invalid_credentials(self):
        url = reverse("login")
        data = {
            "email": "wronguser@example.com",
            "password": "wrongpassword",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("error", response.data)
        self.assertEqual(response.data["error"], "Invalid credentials")


class UserLogoutTest(APITestCase):

    def setUp(self):
        User.objects.all().delete()
        self.user = User.objects.create_user(
            email="testuser@example.com", username="testuser", password="password123"
        )
        self.refresh_token = RefreshToken.for_user(self.user)
        self.access_token = str(self.refresh_token.access_token)

        self.client.credentials(HTTP_AUTHORIZATION="Bearer " + str(self.access_token))

    def test_user_can_logout(self):
        url = reverse("logout")
        data = {
            "refresh": str(self.refresh_token),
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_205_RESET_CONTENT)
        self.assertEqual(response.data["detail"], "Logout successful")

    def test_logout_without_refresh_token(self):
        url = reverse("logout")
        response = self.client.post(url, {})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["detail"], "Refresh token not provided")

    def test_logout_with_invalid_refresh_token(self):
        url = reverse("logout")
        invalid_refresh_token = "invalid_token"
        data = {
            "refresh": invalid_refresh_token,
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("detail", response.data)

    def test_logout_without_authentication(self):
        self.client.credentials()
        url = reverse("logout")
        data = {
            "refresh": str(self.refresh_token),
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
