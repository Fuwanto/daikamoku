from django.contrib import admin
from django.urls import path
from daikamoku_app.views.auth_views import (
    RegisterView,
    ConfirmEmailView,
    LoginView,
    LogoutView,
    RefreshTokenView,
)
from daikamoku_app.views.faculty_views import (
    FacultyView,
    FacultyCareerView,
    CareerProgressView,
    SubjectCareerView,
    StateSubjectView,
    UpdateCareerProgressView,
    UpdateStateSubjectView,
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
    path("refresh-token/", RefreshTokenView.as_view(), name="refresh-token"),
    # Facultades y carreras
    path("faculties/", FacultyView.as_view(), name="faculties"),
    path(
        "faculties/<int:faculty_id>/careers/",
        FacultyCareerView.as_view(),
        name="faculty-careers",
    ),
    # Progreso de carrera
    path("career-progress/", CareerProgressView.as_view(), name="career-progress"),
    path(
        "career-progress/update/",
        UpdateCareerProgressView.as_view(),
        name="update-career-progress",
    ),
    # Materias y estados de las materias
    path(
        "careers/<int:career_id>/subjects/",
        SubjectCareerView.as_view(),
        name="career-subjects",
    ),
    path("state-subjects/", StateSubjectView.as_view(), name="state-subjects"),
    path(
        "state-subject/update/",
        UpdateStateSubjectView.as_view(),
        name="update-state-subject",
    ),
]
