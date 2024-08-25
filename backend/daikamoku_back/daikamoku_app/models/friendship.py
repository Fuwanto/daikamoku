from django.db import models
from .user import User


class Friendship(models.Model):
    user1 = models.ForeignKey(
        User, related_name="friendships_as_user1", on_delete=models.CASCADE
    )
    user2 = models.ForeignKey(
        User, related_name="friendships_as_user2", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user1", "user2")
        db_table = "friendship"

    def __str__(self):
        return f"{self.user1.username} - {self.user2.username}"


class FriendshipRequest(models.Model):
    sender = models.ForeignKey(
        User, related_name="sent_requests", on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        User, related_name="received_requests", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    accepted = models.BooleanField(default=False)
    rejected = models.BooleanField(default=False)

    class Meta:
        unique_together = ("sender", "receiver")
        db_table = "friendship_request"

    def __str__(self):
        return f"{self.sender.username} -> {self.receiver.username}"

    def accept(self):
        if not self.accepted and not self.rejected:
            self.accepted = True
            self.save()
            # create friendship
            Friendship.objects.get_or_create(user1=self.sender, user2=self.receiver)
            Friendship.objects.get_or_create(user1=self.receiver, user2=self.sender)

    def reject(self):
        if not self.accepted and not self.rejected:
            self.rejected = True
            self.save()
