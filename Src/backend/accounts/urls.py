from django.contrib import admin
from django.urls import path, include
from accounts.views import registration_view
from rest_framework.authtoken.views import obtain_auth_token # 추가



urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', registration_view, name='register_user'),  # 추가

]
