from django.db import models
import datetime

from detect_and_count_cars_without_frame import analyze_image

class Capture(models.Model):
    image = models.FileField(upload_to="images/", blank=True)
    time_taken = models.DateTimeField()
    time_analyzed = models.DateTimeField(default=datetime.datetime.now)
    number_of_cars = models.PositiveIntegerField()

    def save(self, *args, **kwargs):
        if self.image:
            self.number_of_cars = analyze_image(self.image)
        super(Capture, self).save(*args, **kwargs)
