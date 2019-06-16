from django.db import models


# Create your models here.

class fortunes(models.Model):
    fortune = models.TextField()
    sad = models.BooleanField()


class Fortune(models.Model):
    the_fortune = models.TextField()
    luck = models.BooleanField()


class MobileUser(models.Model):
    phone_identifier = models.TextField()
    longitude = models.TextField()
    latitude = models.TextField()


class GivenFortune(models.Model):
    fortune_word = models.ForeignKey(Fortune, on_delete=models.CASCADE)
    is_used = models.BooleanField()
    unique_qr = models.TextField()
    has_shaken = models.BooleanField()
    the_user = models.ForeignKey(MobileUser, on_delete=models.CASCADE, null=True)
