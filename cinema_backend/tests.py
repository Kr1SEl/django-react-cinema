from django.test import TestCase, RequestFactory
from django.contrib.auth.models import User
from .models import Genre, Movie, Hall, MovieSession
from .serializers import GenreSerializer, MovieSerializer, HallSerializer, MovieSessionSerializer
from .views import GenreAPIView, MovieAPIView, HallAPIView, MovieSessionAPIView
from rest_framework.test import APIClient, force_authenticate
from datetime import datetime, timedelta
from django.utils import timezone
from cinema_users.models import UserAccount
from rest_framework.test import APIRequestFactory

class GenreTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = UserAccount.objects.create_user(name='Alexei', email='lesha.savich1@gmail.com', password='pass')
        self.view = GenreAPIView.as_view()
        Genre.objects.create(name='genre1')
        Genre.objects.create(name='genre2')

    def test_get_genres(self):
        request = self.factory.get('/api/v1/genres/')
        force_authenticate(request, user=self.user)
        response = self.view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)


class MovieTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = UserAccount.objects.create_user(name='Alexei', email='lesha.savich1@gmail.com', password='pass')
        self.view = MovieAPIView.as_view()
        genre = Genre.objects.create(name='genre1')
        self.movie = Movie.objects.create(name='movie1', grade=8, description='desc', directed_by='Director', production_year=2021, production_country='US', length_mins=100)
        self.movie.genres.set([genre])

    def test_get_movies(self):
        request = self.factory.get('/api/v1/movies/')
        force_authenticate(request, user=self.user)
        response = self.view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)


class HallTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = UserAccount.objects.create_user(name='Alexei', email='lesha.savich1@gmail.com', password='pass')
        self.view = HallAPIView.as_view()
        Hall.objects.create(hall_number=1, sits_layout=2)

    def test_get_halls(self):
        request = self.factory.get('/api/v1/halls/')
        force_authenticate(request, user=self.user)
        response = self.view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)


class MovieSessionTestCase(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view = MovieAPIView.as_view()
        genre = Genre.objects.create(name='genre1')
        self.movie = Movie.objects.create(name='movie1', grade=8, description='desc', directed_by='Director', production_year=2021, production_country='US', length_mins=100)
        self.movie.genres.set([genre])
        hall = Hall.objects.create(hall_number=1, sits_layout=2)
        self.new_movie_session = MovieSession.objects.create(movie_id=self.movie, hall_id=hall, starting_time=timezone.now(), ticket_price=10.0)

    def test_get_sessions(self):
        request = self.factory.get(f'/api/v1/movie-session/{self.movie.id}/')
        response = self.view(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)