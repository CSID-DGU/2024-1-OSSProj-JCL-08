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
  const [csrfToken, setCsrfToken] = useState('');
  const [bookmarkedNews, setBookmarkedNews] = useState([]);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, 10) === 'csrftoken=') {
            cookieValue = decodeURIComponent(cookie.substring(10));
            break;
          }
        }
      }
      setCsrfToken(cookieValue);
      console.log("CSRF 토큰 쿠키에서 가져옴:", cookieValue);
    };

    fetchCsrfToken();
  }, []);

  useEffect(() => {
    if (csrfToken) {
      const fetchBookmarkedNews = async () => {
        try {
          const response = await axios.get('http://localhost:8000/bookmark/myarticles/', {
            headers: {
              'X-CSRFToken': csrfToken,
            },
            withCredentials: true,
          });
          setBookmarkedNews(response.data);
        } catch (error) {
          console.error('Error fetching bookmarked news:', error);
        }
      };

      fetchBookmarkedNews();
    }
  }, [csrfToken]);
  
  const deleteBookmark = async (bookmark_id) => {
    console.log('CSRF Token:', csrfToken);
    try {
      const response = await axios.post('http://localhost:8000/mainpage/delete_bookmark/', 
        {bookmark_id: bookmark_id},
        {
          headers: {
            'X-CSRFToken': csrfToken,
            //'Content-Type': 'application/json'
          },
          withCredentials: true,
      });
      console.log('북마크 삭제 성공:', response.data);
      setBookmarkedNews((prev) => prev.filter((bookmark) => bookmark.id !== bookmark_id));
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  

  const handleBookmarkClick = (bookmark_id) => {
    console.log('handleBookmarkClick called with bookmarkId:', bookmark_id);
    deleteBookmark(bookmark_id);
  };

  return (
    <Root>
      <TypoContainer>
        <Typo size="48px" color="#1D24CA">
          북마크한 뉴스
        </Typo>
      </TypoContainer>

      <ContentsBox>
        {bookmarkedNews.map((bookmark,bookmark_id) => (
          <Contents key={bookmark_id}>
            <ContentsBox2>
              <Layout_R>
                <ImageFrame>
                  <NewsImage src={bookmark.img_url} />
                </ImageFrame>
                <a href={bookmark.news_url}>원문 보기 </a>
              </Layout_R>
              <Layout_L>
                <BookmarkButton
                  src="bookmark_on.svg"
                  alt="북마크 해제"
                  onClick={() => deleteBookmark(bookmark_id)}
                />
                <TitleTypo size="11px" style={{ cursor: 'pointer' }}>
                  {bookmark.title}
                </TitleTypo>
                <ContentTypo size="8px">{bookmark.content}</ContentTypo>
              </Layout_L>
            </ContentsBox2>
          </Contents>
        ))}
      </ContentsBox>
    </Root>
  );
};