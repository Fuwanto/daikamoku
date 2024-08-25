from django.db import models


class DurationType(models.Model):
    id = models.BigAutoField(primary_key=True)
    description = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.description

    class Meta:
        db_table = "duration_type"
        ordering = ["description"]
        unique_together = ("description",)
