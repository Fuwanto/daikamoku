from django.db import models
from .subject import Subject


class CorrelativeSubject(models.Model):
    subject = models.ForeignKey(
        Subject, related_name="subject", on_delete=models.CASCADE
    )
    correlative = models.ForeignKey(
        Subject, related_name="correlative", on_delete=models.CASCADE
    )

    class Meta:
        unique_together = ("subject", "correlative")
        db_table = "correlative_subject"
