from django.contrib import admin
from django.urls import path
from daikamoku_app.views.user_views import (
    RegisterView,
    LoginView,
    LogoutView,
    ConfirmEmailView,
)


urlpatterns = [
    path("admin/", admin.site.urls),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path(
        "confirm-email/<uidb64>/<token>/",
        ConfirmEmailView.as_view(),
        name="confirm-email",
    ),
]
