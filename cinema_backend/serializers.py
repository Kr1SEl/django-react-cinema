from rest_framework import serializers
from .models import Movie, Hall, MovieSession, Genre, Review
import base64
from django.core.files.base import ContentFile


class Base64ImageField(serializers.ImageField):
    def to_representation(self, obj):
        if obj:
            with open(obj.path, 'rb') as image_file:
                return base64.b64encode(image_file.read()).decode('utf-8')
        return None

    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            format, imgstr = data.split(';base64,')
            ext = format.split('/')[-1]
            data = ContentFile(base64.b64decode(imgstr), name=f'temp.{ext}')
        return super().to_internal_value(data)


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
        


class MovieSerializer(serializers.ModelSerializer):
    genres = GenreSerializer(many=True, read_only=True)
    poster = Base64ImageField()

    class Meta:
        model = Movie
        fields = '__all__'



class ReviewSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user_id.name') 
    class Meta:
        model = Review
        fields = '__all__'


class HallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hall
        fields = '__all__'


class MovieSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieSession
        fields = '__all__'
