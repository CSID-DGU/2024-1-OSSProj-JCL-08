from django.contrib import admin
from django.urls import path, include
from accounts.views import CustomRegisterView, CustomLoginView
from rest_framework.authtoken.views import obtain_auth_token # 추가

from bookmark.views import get_bookmarks

urlpatterns = [
    path('/', get_bookmarks, name='bookmark'),

]
