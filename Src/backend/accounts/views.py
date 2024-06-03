from dj_rest_auth.views import LoginView
from django.contrib.auth import authenticate, login
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

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


        return Response({
            'user': CustomRegisterSerializer(user, context=self.get_serializer_context()).data,
            'message': "회원가입 성공"
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
        login(request, user)

        return Response({
            'user': CustomLoginSerializer(user, context=self.get_serializer_context()).data,
            'message': '로그인 성공'
        }, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_csrf_token(request):
    token = get_token(request)
    return JsonResponse({'csrftoken': token})