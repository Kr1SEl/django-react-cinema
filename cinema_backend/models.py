from django.db import models


class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField('Movie Name', max_length=100)
    length_mins = models.IntegerField(blank=False, null=False)


class Hall(models.Model):
    id = models.AutoField(primary_key=True)
    hall_number = models.IntegerField(blank=False, null=False)
    sits_layout = models.IntegerField(blank=False, null=False)


class MovieSession(models.Model):
    id = models.AutoField(primary_key=True)
    movie_id = models.ForeignKey(
        Movie, on_delete=models.CASCADE, null=False, blank=False)
    hall_id = models.ForeignKey(
        Hall, on_delete=models.CASCADE, null=False, blank=False)
    starting_time = models.DateTimeField(null=False, blank=False)
