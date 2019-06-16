from django.shortcuts import render, render_to_response
from rest_framework import viewsets
from django.http import response, HttpResponse
import qrcode

# Create your views here.
fortunes = [
    {
        'fortune': 'You will pass the course!',
        'number': '1',
        'unique_code': '0s9dfy9f209lkeq97gc9glqegb9cx642afd404f'
    },
    {
        'fortune': 'You might fail the course!',
        'number': '2',
        'unique_code': '93adf9g7lmcg24m85kg9gcsnrq4rl8m4l1lb9c6cgl'
    }
]


def home(requests):
    return render(requests, 'fortuneteller/home.html')


def image(requests):
    return render(requests, 'fortuneteller/home.html')
