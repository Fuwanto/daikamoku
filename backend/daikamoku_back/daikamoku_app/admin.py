from django.contrib import admin
from .models import (
    Career,
    CareerSubject,
    CorrelativeSubject,
    Faculty,
    FacultyCareer,
    Subject,
    User,
    Friendship,
    FriendshipRequest,
    StateSubject,
    CareerProgress,
    DurationType,
)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("username", "email", "is_staff", "is_superuser")
    search_fields = ("username", "email")


@admin.register(Faculty)
class FacultyAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Career)
class CareerAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(FacultyCareer)
class FacultyCareerAdmin(admin.ModelAdmin):
    list_display = ("career", "faculty")
    search_fields = ("career__name", "faculty__name")
    list_filter = ("faculty",)


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("name", "duration_type")
    search_fields = ("name",)
    list_filter = ("duration_type",)


@admin.register(DurationType)
class DurationTypeAdmin(admin.ModelAdmin):
    list_display = ("description",)
    search_fields = ("description",)


@admin.register(CareerSubject)
class CareerSubjectAdmin(admin.ModelAdmin):
    list_display = ("career", "subject")
    search_fields = ("career__name", "subject__name")
    list_filter = ("career", "subject")


@admin.register(CorrelativeSubject)
class CorrelativeSubjectAdmin(admin.ModelAdmin):
    list_display = ("subject", "correlative")
    search_fields = ("subject__name", "correlative__name")


@admin.register(StateSubject)
class StateSubjectAdmin(admin.ModelAdmin):
    list_display = ("description",)
    search_fields = ("description",)


@admin.register(CareerProgress)
class CareerProgressAdmin(admin.ModelAdmin):
    list_display = ("career", "user", "subject", "state_subject")
    search_fields = ("user__username", "subject__name", "career__name")
    list_filter = ("career", "user", "state_subject")


@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    list_display = ("user1", "user2", "created_at")
    search_fields = ("user1__username", "user2__username")
    list_filter = ("created_at",)


@admin.register(FriendshipRequest)
class FriendshipRequestAdmin(admin.ModelAdmin):
    list_display = ("sender", "receiver", "created_at", "accepted", "rejected")
    search_fields = ("sender__username", "receiver__username")
    list_filter = ("accepted", "rejected", "created_at")
