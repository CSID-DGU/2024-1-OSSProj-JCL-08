# mainpage/views.py
from gensim.summarization import summarize
from rest_framework import permissions
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from crawling.views import news_dic

@permission_classes((permissions.AllowAny,))
class PoliticsNewsAPIView(APIView):
    def get(self, request):
        # 정치 뉴스 데이터를 가져오기
        politics_news = news_dic.get('pol')

        summarized_politics_news = []
        for news in politics_news:
            # 개별 뉴스를 요약
            summarized_news = summarize(news['news_contents'], ratio=0.4)
            # 요약된 뉴스 정보를 딕셔너리로 유지하고, 필요한 정보를 추가
            summarized_news_with_info = {
                "title": news["title"],
                "content": summarized_news,
                "news_url": news["news_url"],
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
            # 개별 뉴스를 요약
            summarized_news = summarize(news['news_contents'], ratio=0.4)
            # 요약된 뉴스 정보를 딕셔너리로 유지하고, 필요한 정보를 추가
            summarized_news_with_info = {
                "title": news["title"],
                "content": summarized_news,
                "news_url": news["news_url"],
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
            # 개별 뉴스를 요약
            summarized_news = summarize(news['news_contents'], ratio=0.4)
            # 요약된 뉴스 정보를 딕셔너리로 유지하고, 필요한 정보를 추가
            summarized_news_with_info = {
                "title": news["title"],
                "content": summarized_news,
                "news_url": news["news_url"],
            }
            summarized_society_news.append(summarized_news_with_info)

        # 요약된 뉴스 리스트를 클라이언트에게 반환
        return Response({"summarized_news": summarized_society_news})
