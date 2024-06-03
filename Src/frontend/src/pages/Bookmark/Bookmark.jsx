// BookmarkPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typo,
  ContentsBox,
  Contents,
  TypoWhite,
  TypoContainer,
  Root,
  ImageFrame,
  ContentsBox2,
  Layout_R,
  Layout_L,
  BookmarkButton,
  TitleTypo,
  ContentTypo,
  NewsImage,
} from './styled'; // styled 컴포넌트 경로에 맞게 조정하세요.

export const Bookmark = () => {
  const [bookmarkedNews, setBookmarkedNews] = useState([]);

  // 북마크한 뉴스 데이터를 불러오는 함수
  const fetchBookmarkedNews = async () => {
    try {
      const response = await axios.get('http://localhost:8000/bookmark/myarticles/');
      setBookmarkedNews(response.data.bookmarks);
    } catch (error) {
      console.error('Error fetching bookmarked news:', error);
    }
  };

  useEffect(() => {
    fetchBookmarkedNews();
  }, []);

  // 북마크 삭제 함수
  const deleteBookmark = async (bookmarkId, index) => {
    try {
      await axios.post('http://localhost:8000/mainpage/delete_bookmark/', {
        bookmark_id: bookmarkId,
      });
      // 성공적으로 삭제했다면 클라이언트 상의 목록도 업데이트
      setBookmarkedNews((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  return (
    <Root>
      <TypoContainer>
        <Typo size="48px" color="#1D24CA">
          북마크한 뉴스
        </Typo>
      </TypoContainer>

      <ContentsBox>
        {bookmarkedNews.map((news, index) => (
          <Contents key={index}>
            <ContentsBox2>
              <Layout_R>
                <ImageFrame>
                  <NewsImage src={news.img_url} />
                </ImageFrame>
                <a href={news.news_url}>원문 보기 </a>
              </Layout_R>
              <Layout_L>
                <BookmarkButton
                  src="bookmark_on.svg" // 북마크 해제 이미지로 가정
                  alt="북마크 해제"
                  onClick={() => deleteBookmark(news.bookmark_id, index)}
                />
                <TitleTypo size="11px" style={{ cursor: 'pointer' }}>
                  {news.title}
                </TitleTypo>
                <ContentTypo size="8px">{news.content}</ContentTypo>
              </Layout_L>
            </ContentsBox2>
          </Contents>
        ))}
      </ContentsBox>
    </Root>
  );
};
