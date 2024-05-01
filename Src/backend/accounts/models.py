from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token



# Create your models here.

# class User(AbstractUser):
#     username = models.CharField(max_length=15)
#     user_id = models.CharField(max_length=20)

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
# settings.AUTH_USER_MODEL 이 정의한 유저 모델에서
# post_save 무언가 저장이 되고 난 다음이면,
# @receiver  이걸 받아다가 아래의 함수를 실행시켜라.

def create_auth_token(sender, instance=False, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
