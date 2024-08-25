from django.db import models
from .duration_type import DurationType


class Subject(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    duration_type = models.ForeignKey(DurationType, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "subject"
