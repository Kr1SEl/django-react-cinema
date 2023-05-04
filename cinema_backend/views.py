import json
from django.http import HttpRequest
from rest_framework import viewsets, authentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import permission_classes
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from datetime import datetime
import requests
from .models import Movie, Hall, MovieSession, Genre
from .serializers import MovieSerializer, HallSerializer, MovieSessionSerializer, GenreSerializer


class GenreAPIView(APIView):
    def get(self, request, pk=None):
        if pk:
            genre = Genre.objects.filter(id=pk).values(
                'movie__name', 'movie__genres')
            return Response(genre)
        else:
            genres = Genre.objects.all()
            serializer = GenreSerializer(genres, many=True)
            return Response(serializer.data)


class MovieAPIView(APIView):
    def get(self, request, pk=None):
        if pk:
            movie = Movie.objects.get(id=pk)
            serializer = MovieSerializer(movie)
            return Response(serializer.data)
        else:
            movies = Movie.objects.all()
            serializer = MovieSerializer(movies, many=True)
            return Response(serializer.data)


class HallAPIView(APIView):
    def get(self, request, pk=None):
        if pk:
            hall = Hall.objects.filter(hall_number=pk).values()
            return Response(hall)
        else:
            halls = Hall.objects.all()
            serializer = HallSerializer(halls, many=True)
            return Response(serializer.data)


class MovieSessionAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    # permission_classes = (IsAuthenticated,)

    def get(self, request, pk=None):
        if request.path == f'/api/v1/movie-session/{pk}/':
            session = MovieSession.objects.filter(movie_id=pk).values()
            return Response(session)
        else:
            if pk != None:
                session = MovieSession.objects.get(id=pk)
                movie = session.movie_id
                hall = session.hall_id
                url = f"http://localhost:8080/tickets/tickets/session/{pk}"
                payload = {}
                headers = {}
                response = requests.request(
                    "GET", url, headers=headers, data=payload)
                res = []
                for occupied in response.json():
                    res.append(int(occupied['seat']))
                return JsonResponse({
                    'name': movie.name,
                    'start_time': session.starting_time,
                    'sits_layout': hall.sits_layout,
                    'hall_number': hall.hall_number,
                    'price': float(session.ticket_price),
                    'occupied': res}, status=200)
            else:
                return JsonResponse({'error': 'Request not found'}, status=404)

    def post(self, request, movie_id=None):
        if movie_id:
            return JsonResponse({'error': 'Post to movie session with ID is not allowed'}, status=400)
        if (request.user.is_superuser):
            movie = Movie.objects.get(id=request.data['movie_id'])
            hall = Hall.objects.get(hall_number=request.data['hall_number'])
            starting_datetime = datetime.strptime(
                f"{request.data['starting_date']} {request.data['starting_time']}", '%Y-%m-%d %H:%M:%S')
            tz_aware_time = timezone.make_aware(
                starting_datetime, timezone.get_current_timezone())
            new_session = MovieSession.objects.create(
                movie_id=movie, hall_id=hall, starting_time=tz_aware_time, ticket_price=request.data['ticket_price'])
            return JsonResponse(MovieSessionSerializer(new_session).data, status=200)
        else:
            return JsonResponse({'error': 'You are not a superuser'}, status=401)


class SeatsAPIView(APIView):
    def get(self, request, pk=None):
        if pk:
            url = f"http://localhost:8080/tickets/tickets/session/{pk}"
            payload = {}
            headers = {}
            response = requests.request(
                "GET", url, headers=headers, data=payload)
            print(response.status_code)
            return JsonResponse(response.json(), status=response.status_code, safe=False)
        else:
            return JsonResponse({'error': 'Request not found'}, status=404)

    def post(self, request, pk=None):
        url = "http://localhost:8080/tickets/tickets"
        payload = json.dumps({
            "hall": request.data['hall'],
            "dateTime": request.data['dateTime'],
            "seat": request.data['seat'],
            "price": request.data['price'],
            "telephoneNumber": request.data['telephoneNumber'],
            "name": request.data['name'],
            "surname": request.data['surname'],
            "email": request.data['email'],
            "filmName": request.data['filmName'],
            "additionalServices": request.data['additionalServices'],
            "sessionId": request.data['sessionId']
        })
        headers = {
            'Content-Type': 'application/json'
        }
        response = requests.request("POST", url, headers=headers, data=payload)
        return JsonResponse(response.json(), status=response.status_code)
