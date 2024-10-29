from rest_framework import serializers
from django.core.exceptions import ValidationError
from ..models import Faculty, Career, CareerProgress, Subject, StateSubject


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


class showCareerProgressSerializer(serializers.Serializer):
    career = serializers.CharField()
    subjects = serializers.ListField(child=serializers.DictField())
    percentage = serializers.FloatField()

    def validate(self, data):
        if not data.get("career"):
            raise serializers.ValidationError({"career": "Career cannot be empty."})
        if not data.get("subjects"):
            raise serializers.ValidationError({"subjects": "Subjects cannot be empty."})
        if not data.get("percentage"):
            raise serializers.ValidationError(
                {"percentage": "Percentage cannot be empty."}
            )
        return data


class subjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"

    def validate(self, data):
        if data["name"] == "":
            raise ValidationError({"name": "Name cannot be empty."})
        return data

    def create(self, validated_data):
        subject = Subject.objects.create(
            name=validated_data["name"], career=validated_data["career"]
        )
        subject.save()
        return subject


class StateSubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateSubject
        fields = "__all__"

    def validate(self, data):
        if data["name"] == "":
            raise ValidationError({"name": "Name cannot be empty."})
        return data

    def create(self, validated_data):
        state_subject = StateSubject.objects.create(name=validated_data["name"])
        state_subject.save()
        return state_subject


class UpdateStateSubjectSerializer(serializers.Serializer):
    state_subject = serializers.CharField()
    subject_id = serializers.IntegerField()
    career = serializers.CharField()

    def validate(self, data):
        if not data.get("state_subject"):
            raise serializers.ValidationError(
                {"state_subject": "State subject cannot be empty."}
            )
        if not data.get("subject_id"):
            raise serializers.ValidationError(
                {"subject_id": "Subject ID cannot be empty."}
            )
        if not data.get("career"):
            raise serializers.ValidationError({"career": "Career cannot be empty."})
        return data
