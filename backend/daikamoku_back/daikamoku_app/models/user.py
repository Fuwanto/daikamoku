from django.contrib.auth.models import AbstractUser, Group
from django.db import models


class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(max_length=255, unique=True)

    def save(self, *args, **kwargs):
        if self.pk is None:
            super().save(*args, **kwargs)
            student_group, created = Group.objects.get_or_create(name="student")
            self.groups.add(student_group)
        else:
            super().save(*args, **kwargs)

    def __str__(self):
        return self.username

    class Meta:
        db_table = "user"
