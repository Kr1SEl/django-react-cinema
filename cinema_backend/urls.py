from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GenreAPIView, MovieAPIView, HallAPIView, MovieSessionAPIView, SeatsAPIView, TicketsAPIView

# genreRouter = DefaultRouter()
# genreRouter.register(r'genre', GenreViewSet)

urlpatterns = [
    # path('api/v1/', include(genreRouter.urls)),
    path('api/v1/genres/', GenreAPIView.as_view(), name='genre-list'),
    path('api/v1/genres/<int:pk>/', GenreAPIView.as_view(), name='genre-detail'),
    path('api/v1/movies/', MovieAPIView.as_view(), name='movie-list'),
    path('api/v1/movies/<int:pk>/', MovieAPIView.as_view(), name='movie-detail'),
    path('api/v1/halls/', HallAPIView.as_view(), name='hall-list'),
    path('api/v1/halls/<int:pk>/', HallAPIView.as_view(), name='hall-detail'),
    path('api/v1/movie-session/',
         MovieSessionAPIView.as_view(),  name='movie-session-list'),
    path('api/v1/movie-session/<int:pk>/',
         MovieSessionAPIView.as_view(),  name='movie-sessions'),
    path('api/v1/movie-session-details/<int:pk>/',
         MovieSessionAPIView.as_view(),  name='movie-session-detail'),
    path('api/v1/movie-seats/',
         SeatsAPIView.as_view(),  name='movie-seats-list'),
    path('api/v1/movie-seats/<int:pk>/',
         SeatsAPIView.as_view(),  name='movie-seats-detail'),
    path('api/v1/movie-tickets/',
         TicketsAPIView.as_view(),  name='movie-teckets-list'),
]
