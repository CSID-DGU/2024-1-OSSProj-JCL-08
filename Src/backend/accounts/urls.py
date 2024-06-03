from django.contrib import admin
from django.urls import path, include
from accounts.views import CustomRegisterView, CustomLoginView, get_csrf_token
from rest_framework.authtoken.views import obtain_auth_token # 추가



urlpatterns = [
    path('register/', CustomRegisterView.as_view(), name='register'),
    path('csrf/', get_csrf_token, name='get_csrf_token'),

]
