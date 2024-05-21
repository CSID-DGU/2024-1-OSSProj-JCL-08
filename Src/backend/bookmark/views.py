# bookmark/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from bookmark.models import Bookmark
from bookmark.serializers import BookmarkSerializer

@api_view(['GET'])
def get_bookmarks(request):
    user = request.user  # 현재 사용자 정보

    # 해당 사용자가 북마크한 모든 기사 가져오기
    bookmarks = Bookmark.objects.filter(user=user)
    serializer = BookmarkSerializer(bookmarks, many=True)

    return Response(serializer.data)
