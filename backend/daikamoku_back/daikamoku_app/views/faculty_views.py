from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from ..services.user_services import get_user_by_token
from ..services.faculty_services import (
    get_faculties,
    get_faculty_careers,
    get_career_progress,
    get_subjects_by_career,
    get_state_subjects,
)
from ..serializers.faculty_serializers import (
    FacultySerializer,
    CareerSerializer,
    CareerProgressSerializer,
    StateSubjectSerializer,
    subjectSerializer,
    showCareerProgressSerializer,
)


class FacultyView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FacultySerializer

    def get(self, request, *args, **kwargs):
        faculties = get_faculties()
        serializer = self.get_serializer(faculties, many=True)
        return Response(
            {"faculties": serializer.data},
            status=status.HTTP_200_OK,
        )


class FacultyCareerView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CareerSerializer

    def get(self, request, *args, **kwargs):
        faculty_id = kwargs.get("faculty_id")
        careers = get_faculty_careers(faculty_id)
        serializer = self.get_serializer(careers, many=True)

        return Response(
            {"careers": serializer.data},
            status=status.HTTP_200_OK,
        )


class UpdateCareerProgressView(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CareerProgressSerializer

    def post(self, request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return Response(
                {"success": False, "detail": "Authorization header not found."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        user = get_user_by_token(auth_header)
        subjects_data = request.data.get("subjects", [])

        for subject_data in subjects_data["subjects"]:
            subject_data["user"] = user.id
            serializer = self.get_serializer(data=subject_data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(
                    {"success": False, "detail": serializer.errors},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            {"success": True, "detail": "Career progress updated successfully."},
            status=status.HTTP_200_OK,
        )


class SubjectCareerView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = subjectSerializer

    def get(self, request, *args, **kwargs):
        career_id = kwargs.get("career_id")
        subjects = get_subjects_by_career(career_id)
        serializer = self.get_serializer(subjects, many=True)

        return Response(
            {"subjects": serializer.data},
            status=status.HTTP_200_OK,
        )


class CareerProgressView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = showCareerProgressSerializer

    def get(self, request, *args, **kwargs):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return Response(
                {"detail": "Authorization header not found."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        user = get_user_by_token(auth_header)
        career_progress = get_career_progress(user.id)
        if career_progress:
            serializer = self.get_serializer(career_progress, many=True)
            return Response(
                {"success": True, "career_progress": serializer.data},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"success": False, "detail": "Career progress not found."},
                status=status.HTTP_404_NOT_FOUND,
            )


class StateSubjectView(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = StateSubjectSerializer

    def get(self, request, *args, **kwargs):
        subjects = get_state_subjects()
        serializer = self.get_serializer(subjects, many=True)

        return Response(
            {"state_subjects": serializer.data},
            status=status.HTTP_200_OK,
        )
