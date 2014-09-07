from rest_framework import serializers

from django.contrib.auth.models import User
from api.models import Capture

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'email', 'groups')

class CaptureSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(source='image', blank=True)
    class Meta:
        model = Capture
        fields = ('image', 'time_taken', 'time_analyzed', 'number_of_cars')
