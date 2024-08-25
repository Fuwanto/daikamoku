from django.db import models
from .career import Career
from .subject import Subject
from .state_subject import StateSubject
from .user import User


class CareerProgress(models.Model):
    career = models.ForeignKey(Career, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    state_subject = models.ForeignKey(StateSubject, on_delete=models.CASCADE)

    class Meta:
        unique_together = ("career", "user", "subject")
        db_table = "career_progress"
