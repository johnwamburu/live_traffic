from django.db import models
import datetime

class Sent(models.Model):
    to = models.CharField(max_length=15)
    msg = models.CharField(max_length=70)
    date = models.DateTimeField(default=datetime.datetime.now)

class Received(models.Model):
    from_who = models.CharField(max_length=15)
    msg = models.CharField(max_length=70)
    date = models.DateTimeField(default=datetime.datetime.now)
