from django.shortcuts import render
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import CustomRegisterSerializer
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