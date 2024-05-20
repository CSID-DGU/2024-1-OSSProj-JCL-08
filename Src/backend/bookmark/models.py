from django.db import models

# Create your models here.
# bookmark/models.py
from django.db import models
from django.conf import settings

class Bookmark(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # 사용자와의 외래키 관계
    title = models.CharField(max_length=200)
    content = models.TextField()
    news_url = models.URLField()
    img_url = models.URLField()
    bookmarked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-bookmarked_at']
