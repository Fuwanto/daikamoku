from rest_framework import serializers
from django.core.exceptions import ValidationError
from ..models import Faculty, Career, CareerProgress, CareerSubject, Subject


class FacultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Faculty
        fields = "__all__"

    def validate(self, data):
        if data["name"] == "":
            raise ValidationError({"name": "Name cannot be empty."})
        return data

    def create(self, validated_data):
        faculty = Faculty.objects.create(name=validated_data["name"])
        faculty.save()
        return faculty


class CareerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Career
        fields = "__all__"

    def validate(self, data):
        if data["name"] == "":
            raise ValidationError({"name": "Name cannot be empty."})
        return data

    def create(self, validated_data):
        career = Career.objects.create(
            name=validated_data["name"], faculty=validated_data["faculty"]
        )
        career.save()
        return career


class CareerProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerProgress
        fields = "__all__"

    def validate(self, data):
        if data["career"] == "":
            raise ValidationError({"career": "Career cannot be empty."})
        if data["user"] == "":
            raise ValidationError({"user": "User cannot be empty."})
        if data["subject"] == "":
            raise ValidationError({"subject": "Subject cannot be empty."})
        if data["state_subject"] == "":
            raise ValidationError({"state_subject": "State subject cannot be empty."})
        return data

    def create(self, validated_data):
        career_progress = CareerProgress.objects.create(
            career=validated_data["career"],
            user=validated_data["user"],
            subject=validated_data["subject"],
            state_subject=validated_data["state_subject"],
        )
        career_progress.save()
        return career_progress


class CareerSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CareerSubject
        fields = "__all__"

    def validate(self, data):
        if data["career"] == "":
            raise ValidationError({"career": "Career cannot be empty."})
        if data["subject"] == "":
            raise ValidationError({"subject": "Subject cannot be empty."})
        return data

    def create(self, validated_data):
        career_subject = CareerSubject.objects.create(
            career=validated_data["career"],
            subject=validated_data["subject"],
        )
        career_subject.save()
        return career_subject


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"

    def validate(self, data):
        if data["name"] == "":
            raise ValidationError({"name": "Name cannot be empty."})
        return data

    def create(self, validated_data):
        subject = Subject.objects.create(name=validated_data["name"])
        subject.save()
        return subject
