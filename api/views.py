from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status

from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from api.serializers import *


class FortView(viewsets.ModelViewSet):
    queryset = fortunes.objects.all()
    serializer_class = fortSerializer


class MobileUserView(viewsets.ModelViewSet):
    queryset = MobileUser.objects.all()
    serializer_class = MobileUserSerializer


class FortuneCount(viewsets.ViewSet):

    def list(self, request, format=None):
        response_data = {'total': fortunes.objects.count()}
        return Response(response_data)


class FortuneView(viewsets.ViewSet):
    queryset = Fortune.objects.all()
    serializer_class = FortuneSerializer


class GivenFortunesView(viewsets.ModelViewSet):
    queryset = GivenFortune.objects.all()
    serializer_class = GivenFortuneSerializer
    lookup_field = 'unique_qr'

    def list(self, request, format=None):
        queryset = GivenFortune.objects.all()
        serializer = GivenFortuneSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, format=None):
        serializer = GivenFortuneSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
