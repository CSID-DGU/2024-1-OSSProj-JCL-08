from django.contrib import admin
from django.urls import path, include

from mainpage.views import PoliticsNewsAPIView, EconomyNewsAPIView, SocietyNewsAPIView



urlpatterns = [
    path('category/politics/', PoliticsNewsAPIView.as_view(), name='politics_news'),
    path('category/economy/', EconomyNewsAPIView.as_view(), name='economy_news'),
    path('category/society/', SocietyNewsAPIView.as_view(), name='society_news'),
]