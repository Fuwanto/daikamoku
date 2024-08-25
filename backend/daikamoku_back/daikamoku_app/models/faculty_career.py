from django.db import models
from .career import Career
from .faculty import Faculty


class FacultyCareer(models.Model):
    career = models.ForeignKey(Career, on_delete=models.CASCADE)
    faculty = models.ForeignKey(Faculty, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("career", "faculty")
        db_table = "faculty_career"
