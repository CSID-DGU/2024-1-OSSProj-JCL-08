from django.shortcuts import render

# Create your views here.
# views.py
import requests
from bs4 import BeautifulSoup
import bs4.element
import datetime



# BeautifulSoup 객체 생성
def get_soup_obj(url):
    # 유저 정보 기입. www.useragentstring.com/
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'}
    res = requests.get(url, headers=headers)
    soup = BeautifulSoup(res.text, 'lxml')

    return soup


# 뉴스의 기본 정보 가져오기
# 뉴스의 기본 정보 가져오기
def get_top5_news_info(sec, sid):
    # 임시 이미지
    default_img = "https://search.naver.com/search.naver?where=image&sm=tab_jum&query=naver#"

    # 해당 분야 상위 뉴스 목록 주소
    sec_url = "https://news.naver.com/section/" \
              + sid \

    # print("section url : ", sec_url)

    # 해당 분야 상위 뉴스 HTML 가져오기
    soup = get_soup_obj(sec_url)

    # 해당 분야 상위 뉴스 5개 가져오기
    news_list5 = []
    lis5 = soup.find('ul', class_='sa_list').find_all("li",class_="sa_item _SECTION_HEADLINE", limit=5)
    for li in lis5:
        title = li.find("strong", class_="sa_text_strong").text
        title.replace("\\","").replace("\n","")
        # title : 뉴스 제목, news_url : 뉴스 URL, image_url : 이미지 URL
        news_info = {
            "title": title,
            "news_url": li.find("a", class_="sa_text_title")["href"],
        }
        news_list5.append(news_info)

    return news_list5


# 뉴스 본문 가져오기
def get_news_contents(url):
    soup = get_soup_obj(url)
    body = soup.find('article', class_="go_trans _article_content")
    news_contents = ''

    if body:
        for content in body.stripped_strings:
            if len(content.strip()) > 0:
                # content.strip() : whitepace 제거 (참고 : https://www.tutorialspoint.com/python3/string_strip.htm)
                # 뉴스 요약을 위하여 '.' 마침표 뒤에 한칸을 띄워 문장을 구분하도록 함
                news_contents += content.strip() + ' '
        # 줄 바꿈 문자와 역슬래시 제거
        news_contents = news_contents.replace("\n", "")
        news_contents = news_contents.replace("\\", "")

    else:
        return "Failed to retrieve news contents"
    return news_contents


def get_journalist_date(url):
    soup = get_soup_obj(url)
    journalist_tag = soup.find('em', class_="media_end_head_journalist_name")
    date_tag = soup.find('span', class_="media_end_head_info_datestamp_time _ARTICLE_DATE_TIME")

    journalist = journalist_tag.text if journalist_tag else "Journalist not found"
    date = date_tag.text if date_tag else "Date not found"

    return journalist, date



def get_news_img(url):
    soup = get_soup_obj(url)
    img_tag = soup.find('img', id="img1")
    if img_tag:
        img_url = img_tag['data-src']
        return img_url
    else:
        # print("Failed to retrieve image from:", url)
        return "images/default_image.png"

# '정치', '경제', '사회' 분야의 상위 5개 뉴스 크롤링
def get_naver_news_top5():
    # 뉴스 결과를 담아낼 dictionary
    news_dic = dict()

    # sections : '정치', '경제', '사회'
    sections = ["pol", "eco", "soc"]
    # section_ids :  URL에 사용될 뉴스  각 부문 ID
    section_ids = ["100", "101", "102"]

    for sec, sid in zip(sections, section_ids):
        # 뉴스의 기본 정보 가져오기
        news_info = get_top5_news_info(sec, sid)
        # print(news_info)
        for news in news_info:
            # 뉴스 본문 가져오기
            news_url = news['news_url']
            news_contents = get_news_contents(news_url)
            news_imgurl = get_news_img(news_url)
            news_journalist,news_date = get_journalist_date(news_url)

            # 뉴스 정보를 저장하는 dictionary를 구성
            news['news_contents'] = news_contents
            news['img_url'] = news_imgurl
            news['journalist'] = news_journalist
            news['date'] = news_date
        news_dic[sec] = news_info
    return news_dic


# 함수 호출 - '정치', '경제', '사회' 분야의 상위 3개 뉴스 크롤링
news_dic = get_naver_news_top5()

# print(news_dic['eco'])
# print(news_dic['pol'])
# print(news_dic['soc'])