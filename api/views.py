from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from serializers import UserSerializer, CaptureSerializer

from django.contrib.auth.models import User
from api.models import Capture

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CaptureViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows image captures to be viewed or edited. Will remove "edited" when images start coming from an actual device.
    And I do not like viewsets, so I will create view-based access first thing tomorrow.
    """
    queryset = Capture.objects.all()
    serializer_class = CaptureSerializer

@api_view(['GET', 'POST'])
def capture_list(request):
    """
    List all captures, or create new.
    """
    if request.method == 'GET':
        captures = Capture.objects.all()
        serializer = CaptureSerializer(captures)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = CaptureSerializer(data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def capture_detail(request, pk):
    """
    Get, update or delete particular capture.
    """
    try:
        capture = Capture.objects.get(pk=pk)
    except Capture.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CaptureSerializer(capture)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = CaptureSerializer(capture, data=request.DATA)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        capture.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
