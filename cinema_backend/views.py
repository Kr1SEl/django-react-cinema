import json
import requests
import base64
from .helper import image_file_to_base64
from .sender import send_email, get_qr_code
from django.http import HttpRequest
from django.utils import timezone
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
from datetime import datetime, timedelta
from .models import Movie, Hall, MovieSession, Genre, Review
from .serializers import MovieSerializer, HallSerializer, MovieSessionSerializer, GenreSerializer, ReviewSerializer


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
            reviews = Review.objects.filter(movie_id = movie)
            total_grade = 0.0
            for review in reviews:
                total_grade += review.grade
            if len(reviews) > 0:
                average_grade = total_grade / len(reviews)
            else:
                average_grade = 'No grade'
            serialized_data = serializer.data
            serialized_data['grade'] = average_grade
            serialized_data['reviews'] = list(reviews.values())
            return Response(serialized_data)
        else:
            if 'genre' in request.data:
                movies = Movie.objects.filter(genres__name=request.data['genre'])
            else:
                movies = Movie.objects.all()
            serializer = MovieSerializer(movies, many=True)
            print(len(movies))
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


class ReviewAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    
    def get(self, request, movie_id):
        reviews = Review.objects.filter(movie_id=movie_id)
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)
        
    def post(self, request, movie_id):
        if request.user.is_authenticated:
            if len(Movie.objects.filter(id=movie_id)) == 0:
                return JsonResponse({'error': 'Movie not found'}, status=404)
            if int(request.data['grade']) < 1 or int(request.data['grade']) > 5:
                return JsonResponse({'error': 'Wrong grade'}, status=404)
            movie = Movie.objects.get(id=movie_id)
            if len(Review.objects.filter(movie_id = movie, user_id=request.user))>0:
                return JsonResponse({'error': 'Comment was already placed for this movie'}, status=403)
            review = Review.objects.create(movie_id=movie, user_id=request.user, review=request.data['review'], grade=int(request.data['grade']))
            serializer = ReviewSerializer(review)
            return Response(serializer.data)
        else:
            return JsonResponse({'error': 'Unauthorized'}, status=401)
    
    def delete(self, request, movie_id):
        if request.user.is_authenticated:
            if len(Movie.objects.filter(id=movie_id)) == 0:
                return JsonResponse({'error': 'Movie not found'}, status=404)
            movie = Movie.objects.get(id=movie_id)
            if len(Review.objects.filter(movie_id = movie, user_id=request.user))>0:
                Review.objects.filter(movie_id = movie, user_id=request.user).delete()
                return JsonResponse({'message': 'Comment deleted succesfully'}, status=200)
            else:
                return JsonResponse({'error': 'No comments found'}, status=404)
        else:
            return JsonResponse({'error': 'Unauthorized'}, status=401)


class MovieSessionAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    # permission_classes = (IsAuthenticated,)

    def get(self, request, pk=None):
        if request.path == f'/api/v1/movie-session/{pk}/':
            session = MovieSession.objects.filter(movie_id=pk).values()
            return Response(session)
        else:
            if pk != None:
                session = MovieSession.objects.filter(id=pk)
                if len(session) == 0:
                    return JsonResponse({'name': None,
                                         'start_time': None,
                                         'sits_layout': 1,
                                         'hall_number': None,
                                         'price': 0,
                                         'occupied': []}, status=200)
                session = session[0]
                current_datetime = timezone.now()
                if session.starting_time < current_datetime:
                    return JsonResponse({'name': None,
                                         'start_time': None,
                                         'sits_layout': 1,
                                         'hall_number': None,
                                         'price': 0,
                                         'occupied': []}, status=200)
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
            try:
                new_session = MovieSession.objects.create(
                    movie_id=movie, hall_id=hall, starting_time=tz_aware_time, ticket_price=request.data['ticket_price'])
                return JsonResponse(MovieSessionSerializer(new_session).data, status=200)
            except:
                return JsonResponse({'bad request': 'There is already a session in the same hall within 3 hours.'}, status=400)
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
        if response.status_code == 201:
            send_email(request.data['email'],
                       request.data['filmName'], request.data['seat'], request.data['dateTime'], response.json()['id'])
        return JsonResponse(response.json(), status=response.status_code)


class TicketsAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        url = f"http://localhost:8080/tickets/tickets/email/{request.user}"
        payload = {}
        headers = {}
        response = requests.request(
            "GET", url, headers=headers, data=payload)
        res = []
        for ticket in response.json():
            datetime_obj = datetime.strptime(
                ticket['dateTime'], '%Y-%m-%dT%H:%M:%S')
            current_datetime = datetime.now()
            future_datetime = current_datetime - timedelta(hours=2)
            if datetime_obj > future_datetime:
                image = Movie.objects.get(name=ticket['filmName']).poster
                res.append({'movie_name': ticket['filmName'],
                            'start_time': ticket['dateTime'],
                            'qr_code': base64.b64encode(get_qr_code(ticket['id'])).decode('utf-8'),
                            'poster': image_file_to_base64(image)})
        return JsonResponse(res, status=response.status_code, safe=False)
