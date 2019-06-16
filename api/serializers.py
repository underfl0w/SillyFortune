from rest_framework import serializers
from api.models import *
from django.contrib.auth.models import User


class fortSerializer(serializers.ModelSerializer):
    class Meta:
        model = fortunes
        fields = ('fortune', 'sad')


class MobileUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MobileUser
        fields = ('longitude', 'latitude', 'phone_identifier')


class GivenFortuneSerializer(serializers.ModelSerializer):
    class Meta:
        model = GivenFortune
        fields = ('fortune_word', 'is_used', 'unique_qr', 'has_shaken', 'the_user')


class FortuneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fortune
        fields = ('the_fortune', 'luck')
