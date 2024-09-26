from django.db import models


class Career(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, unique=True)
    plan = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        db_table = "career"
        ordering = ["name"]
        unique_together = ("name",)
