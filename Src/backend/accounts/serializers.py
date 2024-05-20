# accounts/serializers.py
from dj_rest_auth.serializers import LoginSerializer
from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth.models import User
from dj_rest_auth.registration.serializers import RegisterSerializer
from allauth.account.utils import setup_user_email
from allauth.account.adapter import get_adapter

from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework_simplejwt.tokens import RefreshToken

from .models import CustomUser


class CustomRegisterSerializer(RegisterSerializer):
    password1 = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    def validate_password2(self, value):
        if self.initial_data['password1'] != value:
            raise serializers.ValidationError("Passwords do not match")
        return value

    def custom_signup(self, request, user):
        user.email = self.validated_data.get('email', '')
        user.save()

    def get_cleaned_data(self):
        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'email': self.validated_data.get('email', ''),
        }

    def save(self, request):
        user = CustomUser.objects.create_user(
            username=self.validated_data['username'],
            email=self.validated_data['email'],
            password=self.validated_data['password1']
        )
        self.custom_signup(request, user)
        setup_user_email(request, user, [])
        return user

class TokenSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    access = serializers.CharField()

class CustomLoginSerializer(LoginSerializer):
    username = serializers.CharField(max_length=150, required=True)
    password = serializers.CharField(style={'input_type': 'password'},required=True, write_only=True)
    def validate(self, attrs):
        data = super().validate(attrs)

        # 사용자 정보를 가져옵니다.
        user = authenticate(username=attrs['username'], password=attrs['password'])

        if user:
            self.user = user
        else:
            raise serializers.ValidationError('Invalid login credentials')
        # JWT 토큰을 생성합니다.
        refresh = RefreshToken.for_user(user)
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        data['user'] = user
        return data