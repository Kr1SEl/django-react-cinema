from django.db import models
from django.core.exceptions import ValidationError
from datetime import timedelta
from django.core.validators import MinValueValidator, MaxValueValidator
from cinema_users.models import UserAccount


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
    description = models.TextField(blank=False, null=False)
    directed_by = models.CharField('Producer', max_length=100)
    production_year = models.IntegerField(blank=False, null=False)
    production_country = models.CharField('Country', max_length=100)
    poster = models.ImageField(upload_to='posters')
    trailer_link = models.CharField(
        'Trailer Link', max_length=255, null=False, blank=False)

    def __str__(self):
        return f'Movie Name: {self.name}'


class Review(models.Model):
    id = models.AutoField(primary_key=True)
    movie_id = models.ForeignKey(Movie, on_delete=models.CASCADE, null=False, blank=False)
    user_id = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING, null=False, blank=False)
    review = models.TextField(blank=True, null=False, max_length=300)
    grade = models.IntegerField(blank=False, null=False,
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )


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
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f'Movie Name: {self.movie_id.name}, Hall ID: {self.hall_id.id}, Starting Time: {self.starting_time}'

    def save(self, *args, **kwargs):
        overlapping_sessions = MovieSession.objects.filter(
            hall_id=self.hall_id,
            starting_time__range=(
                self.starting_time - timedelta(hours=3), self.starting_time + timedelta(hours=3))
        ).exclude(id=self.id)
        if overlapping_sessions.exists():
            raise ValidationError(
                "There is already a session in the same hall within 3 hours.")
        super().save(*args, **kwargs)

    def clean(self):
        overlapping_sessions = MovieSession.objects.filter(
            hall_id=self.hall_id,
            starting_time__range=(
                self.starting_time - timedelta(hours=3), self.starting_time + timedelta(hours=3))
        ).exclude(id=self.id)
        if overlapping_sessions.exists():
            raise ValidationError(
                "There is already a session in the same hall within 3 hours.")
