from django.contrib import admin
from .models import Movie, Hall, MovieSession, Genre, Review

# Register your models here.
admin.site.register(Movie)
admin.site.register(Hall)
admin.site.register(MovieSession)
admin.site.register(Genre)
admin.site.register(Review)