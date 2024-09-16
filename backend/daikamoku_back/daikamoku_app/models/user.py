from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    id = models.BigAutoField(primary_key=True)
    email = models.EmailField(
        max_length=255,
        unique=True,
        error_messages={"unique": "Ya existe un usuario con ese correo electrónico."},
    )

    def __str__(self):
        return self.username

    class Meta:
        db_table = "user"
