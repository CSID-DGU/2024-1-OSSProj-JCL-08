from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from mainpage.views import PoliticsNewsAPIView, EconomyNewsAPIView, SocietyNewsAPIView, add_bookmark, delete_bookmark

urlpatterns = [
    path('politics/', PoliticsNewsAPIView.as_view(), name='politics_news'),
    path('economy/', EconomyNewsAPIView.as_view(), name='economy_news'),
    path('society/', SocietyNewsAPIView.as_view(), name='society_news'),
    path('add_bookmark/', add_bookmark, name='add_bookmark'),
    path('delete_bookmark/', delete_bookmark, name='delete_bookmark'),

]