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


# def post(self, request):
#     exch = Exchange.objects.get(id=request.data['exchange'])
#     if len(Credentials.objects.filter(user=request.user, exchange=exch)) == 0:
#         return Response(CredentialsSerializer(newCredentials).data)
#     else:
#         return JsonResponse({'error': 'Credentials exist'}, status=400)

# def delete(self, request, pk, format=None):
#     credential = Credentials.objects.filter(
#         user=request.user, exchange_id=pk)
#     if len(credential) > 0:
#         return JsonResponse({'message': 'Success'}, status=200)
#     else:
#         return JsonResponse({'error': 'Wrong credentials ID'}, status=400)


class HallAPIView(APIView):
    def get(self, request, pk=None):
        if pk:
            hall = Hall.objects.filter(hall_number=pk).values()
            return Response(hall)
        else:
            halls = Hall.objects.all()
            serializer = HallSerializer(halls, many=True)
            return Response(serializer.data)

    # def post(self, request):
    #     exch = Exchange.objects.get(id=request.data['exchange'])
    #     if len(Credentials.objects.filter(user=request.user, exchange=exch)) == 0:
    #         return Response(CredentialsSerializer(newCredentials).data)
    #     else:
    #         return JsonResponse({'error': 'Credentials exist'}, status=400)

    # def delete(self, request, pk, format=None):
    #     credential = Credentials.objects.filter(
    #         user=request.user, exchange_id=pk)
    #     if len(credential) > 0:
    #         return JsonResponse({'message': 'Success'}, status=200)
    #     else:
    #         return JsonResponse({'error': 'Wrong credentials ID'}, status=400)


class MovieSessionAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = (IsAuthenticated,)

    def get(self, request, movie_id=None):
        session = MovieSession.objects.filter(movie_id=movie_id).values()
        return Response(session)

    def post(self, request, pk=None):
        if pk:
            return JsonResponse({'error': 'Post to movie session with ID is not allowed'}, status=400)
        if (request.user.is_superuser):
            movie = Movie.objects.get(pk=request.data['movie_id'])
            hall = Hall.objects.get(hall_number=request.data['hall_number'])
            starting_datetime = datetime.strptime(
                f"{request.data['starting_date']} {request.data['starting_time']}", '%Y-%m-%d %H:%M:%S')
            tz_aware_time = timezone.make_aware(
                starting_datetime, timezone.get_current_timezone())
            new_session = MovieSession.objects.create(
                movie_id=movie, hall_id=hall, starting_time=tz_aware_time)
            return JsonResponse(MovieSessionSerializer(new_session).data, status=200)
        else:
            return JsonResponse({'error': 'You are not a superuser'}, status=401)

    # def delete(self, request, pk, format=None):
    #     credential = Credentials.objects.filter(
    #         user=request.user, exchange_id=pk)
    #     if len(credential) > 0:
    #         return JsonResponse({'message': 'Success'}, status=200)
    #     else:
    #         return JsonResponse({'error': 'Wrong credentials ID'}, status=400)
