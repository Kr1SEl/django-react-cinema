from django.db import models


class Genre(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField('Genre Name', max_length=100)

    def __str__(self):
        return f'Genre Name: {self.name}'


class Movie(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField('Movie Name', max_length=100)
    is_active = models.BooleanField(default=True, blank=False, null=False)
    length_mins = models.IntegerField(blank=False, null=False)
    genres = models.ManyToManyField(Genre)
    grade = models.FloatField(blank=False, null=False)
    description = models.TextField(blank=False, null=False)
    directed_by = models.CharField('Producer', max_length=100)
    production_year = models.IntegerField(blank=False, null=False)
    production_country = models.CharField('Country', max_length=100)
    poster = models.ImageField(upload_to='posters')
    trailer_link = models.CharField(
        'Trailer Link', max_length=255, null=False, blank=False)

    def __str__(self):
        return f'Movie Name: {self.name}'


class Hall(models.Model):
    id = models.AutoField(primary_key=True)
    hall_number = models.IntegerField(blank=False, null=False)
    sits_layout = models.IntegerField(blank=False, null=False)

    def __str__(self):
        return f'Hall Num: {self.hall_number}'


class MovieSession(models.Model):
    id = models.AutoField(primary_key=True)
    movie_id = models.ForeignKey(
        Movie, on_delete=models.CASCADE, null=False, blank=False)
    hall_id = models.ForeignKey(
        Hall, on_delete=models.CASCADE, null=False, blank=False)
    starting_time = models.DateTimeField(null=False, blank=False)

    def __str__(self):
        return f'Movie Name: {self.movie_id.name}, Hall ID: {self.hall_id.id}, Starting Time: {self.starting_time}'
