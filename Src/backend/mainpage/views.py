# mainpage/views.py
from rest_framework import permissions
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.authentication import SessionAuthentication, BasicAuthentication

from openai_client import summarize_text
from crawling.views import news_dic





@permission_classes((permissions.AllowAny,))
class PoliticsNewsAPIView(APIView):
    def get(self, request):
        # 정치 뉴스 데이터를 가져오기
        politics_news = news_dic.get('pol')

        summarized_politics_news = []
        for news in politics_news:
            try:
                summarized_news = summarize_text(news['news_contents'])
                if not summarized_news:
                    summarized_news = "실패!"#news['news_contents']

            except ValueError:
                summarized_news = news['news_contents']

            # 요약된 뉴스 정보를 딕셔너리로 유지하고, 필요한 정보를 추가
            summarized_news_with_info = {
                "title": news["title"],
                "content": summarized_news,
                "news_url": news["news_url"],
                "img": news["img_url"],
                "journalist": news["journalist"],
                "date": news["date"]

            }
            summarized_politics_news.append(summarized_news_with_info)

        # 요약된 뉴스 리스트를 클라이언트에게 반환
        return Response({"summarized_news": summarized_politics_news})
@permission_classes((permissions.AllowAny,))
class EconomyNewsAPIView(APIView):
    def get(self, request):
        # 경제 뉴스 데이터를 가져오기
        economy_news = news_dic.get('eco')

        summarized_economy_news = []
        for news in economy_news:
            try:
                summarized_news = summarize_text(news['news_contents'])
                if not summarized_news:
                    summarized_news = news['news_contents']
            except ValueError:
                summarized_news = news['news_contents']

            # 요약된 뉴스 정보를 딕셔너리로 유지하고, 필요한 정보를 추가
            summarized_news_with_info = {
                "title": news["title"],
                "content": summarized_news,
                "news_url": news["news_url"],
                "img": news["img_url"],
                "journalist": news["journalist"],
                "date": news["date"]

            }
            summarized_economy_news.append(summarized_news_with_info)

        # 요약된 뉴스 리스트를 클라이언트에게 반환
        return Response({"summarized_news": summarized_economy_news})
@permission_classes((permissions.AllowAny,))
class SocietyNewsAPIView(APIView):

    def get(self, request):
        # 사회 뉴스 데이터를 가져오기
        society_news = news_dic.get('soc')

        summarized_society_news = []
        for news in society_news:
            try:
                summarized_news = summarize_text(news['news_contents'])
                if not summarized_news:
                    summarized_news = news['news_contents']
            except ValueError:
                summarized_news = news['news_contents']

            # 요약된 뉴스 정보를 딕셔너리로 유지하고, 필요한 정보를 추가
            summarized_news_with_info = {
                "title": news["title"],
                "content": summarized_news,
                "news_url": news["news_url"],
                "img":news["img_url"],
                "journalist": news["journalist"],
                "date": news["date"]
            }
            summarized_society_news.append(summarized_news_with_info)

        # 요약된 뉴스 리스트를 클라이언트에게 반환
        return Response({"summarized_news": summarized_society_news})




# mainpage/views.py

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from bookmark.models import Bookmark  # 북마크 모델 import

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_bookmark(request):
    if request.method == 'POST':
        user = request.user  # 현재 사용자 정보
        if not user.is_authenticated:
            return Response({'message': 'User is not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

        # 북마크를 생성하고 데이터베이스에 저장
        bookmark = Bookmark.objects.create(
            user=user,
            title=request.data.get('title'),
            content=request.data.get('content'),
            news_url=request.data.get('news_url'),
            img_url=request.data.get('img_url')
        )
        bookmark_id = bookmark.id

        # 성공적으로 북마크가 추가되었음을 응답
        return Response({'message': 'Bookmark added successfully', 'bookmark_id': bookmark_id}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes((permissions.AllowAny,))
def delete_bookmark(request):
    if request.method == 'POST':
        user = request.user  # 현재 사용자 정보
        bookmark_id = request.data.get('bookmark_id')  # 삭제할 북마크의 ID

        try:
            bookmark = Bookmark.objects.get(id=bookmark_id, user=user)
            bookmark.delete()  # 북마크 삭제
            return Response({'message': 'Bookmark deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Bookmark.DoesNotExist:
            return Response({'message': 'Bookmark not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'message': 'Invalid request'}, status=status.HTTP_400_BAD_REQUEST)

