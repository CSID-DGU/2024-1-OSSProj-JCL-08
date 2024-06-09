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
  ReadMoreLink
} from './styled'; 

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
  const deleteBookmark = async (index, bookmarkId) => {
    console.log('CSRF Token:', csrfToken);
    try {
      const response = await axios.get('http://localhost:8000/bookmark/myarticles/', {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      });
  
      if (response.status === 200 || response.status === 204) {
        // 상태 코드가 200 또는 204인 경우 삭제 성공
        console.log('북마크 삭제 성공, 인덱스:', index);
  
        // 북마크 삭제 후에도 로컬 상태에서도 제거
        const filteredBookmarks = [...bookmarkedNews];
        filteredBookmarks.splice(index, 1);
        setBookmarkedNews(filteredBookmarks);
      } else {
        console.error('북마크 삭제 실패, 응답 상태 코드:', response.status);
      }
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
        {bookmarkedNews.map((bookmark, index) => (
          <Contents key={index}>
            <ContentsBox2>
              <Layout_R>
                <ImageFrame>
                  <NewsImage src={bookmark.img_url} />
                </ImageFrame>
                <ReadMoreLink href={bookmark.news_url} style={{ fontSize: "10px" }}>
                    원문 보기{" "}
                  </ReadMoreLink>              </Layout_R>
              <Layout_L>
                <BookmarkButton
                  src="bookmark_on.svg"
                  alt="북마크 해제"
                  onClick={() => deleteBookmark(index, bookmark.id)} 
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
