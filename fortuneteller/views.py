from django.shortcuts import render, render_to_response
from rest_framework import viewsets
from django.http import response, HttpResponse
import qrcode

# Create your views here.

def home(requests):
    return render(requests, 'fortuneteller/home.html')


def image(requests):
    return render(requests, 'fortuneteller/home.html')
