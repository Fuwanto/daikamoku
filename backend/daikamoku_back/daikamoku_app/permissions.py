from rest_framework.permissions import BasePermission


class IsAdminUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="admin").exists()


class IsStudentUser(BasePermission):
    def has_permission(self, request, view):
        return request.user.groups.filter(name="student").exists()
