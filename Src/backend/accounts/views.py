from dj_rest_auth.views import LoginView
from django.shortcuts import render
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import CustomRegisterSerializer, CustomLoginSerializer
from dj_rest_auth.registration.views import RegisterView
from rest_framework import status


# Create your views here.

# POST 로 데이터를 받을 것임을 명시해준다.
# @api_view(['POST',])
# 토큰이 없으면 페이지를 못들어온다. 때문에, 이 페이지에 관해서
# 권한을 다르게 설정해준다.
@permission_classes((permissions.AllowAny,))
class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)

        refresh = RefreshToken.for_user(user)

        token_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        return Response({
            'user': CustomRegisterSerializer(user, context=self.get_serializer_context()).data,
            'token': token_data
        }, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        return serializer.save(self.request)



@permission_classes((permissions.AllowAny,))
class CustomLoginView(LoginView):
    serializer_class = CustomLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data['user']
        refresh = RefreshToken.for_user(user)

        token_data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }

        return Response({
            'user': CustomLoginSerializer(user, context=self.get_serializer_context()).data,
            'token': token_data
        }, status=status.HTTP_200_OK)