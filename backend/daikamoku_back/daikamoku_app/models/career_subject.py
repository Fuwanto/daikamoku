from django.db import models
from .career import Career
from .subject import Subject


class CareerSubject(models.Model):
    career = models.ForeignKey(Career, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("career", "subject")
        db_table = "career_subject"
