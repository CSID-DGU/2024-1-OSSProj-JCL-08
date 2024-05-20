# bookmark/serializers.py
from rest_framework import serializers
from .models import Bookmark

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bookmark
        fields = ['user', 'title', 'content', 'news_url', 'img_url', 'bookmarked_at']
