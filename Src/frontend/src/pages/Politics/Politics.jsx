//Politics.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DefaultImage from './Icon.png'; // 기본 이미지 경로

import {
  Typo,
  CategoryBox,
  CategoryButton,
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
} from "./styled";


export const Politics = () => {
  const navigate = useNavigate();

  //카테고리 선택 버튼
  const [selectedButton, setSelectedButton] = useState("all");

  const handleButtonClick = (category) => {
    setSelectedButton(category);
    console.log("Selected Category:", category);
  };

  const [newsData, setNewsData] = useState([]);
  const [csrfToken, setCsrfToken] = useState('');
  const [bookmarkedContents, setBookmarkedContents] = useState([]);

  useEffect(() => {
    // CSRF 토큰을 가져오는 함수
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
      console.log("CSRF 토큰 쿠키에서 가져옴:", cookieValue); // CSRF 토큰을 가져온 후 콘솔에 나타내기
    };

    fetchCsrfToken();
    fetchNewsData();

    // localStorage에서 북마크 상태 불러오기
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    setBookmarkedContents(savedBookmarks);
  }, []);

  // 카테고리에 따른 뉴스 데이터를 불러오는 함수
  const fetchNewsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/mainpage/politics/`
      );
      setNewsData(response.data.summarized_news);
      setBookmarkedContents(new Array(response.data.summarized_news.length).fill(false));
    } catch (error) {
      console.error('뉴스 데이터 가져오기 실패:', error);
    }
  };

  // 북마크 이미지
  const bookmarkImage = {
    bookmarked: "bookmark_on.svg",
    notBookmarked: "bookmark_off.svg",
  };

  // 북마크 추가 함수
  const addBookmark = async (news) => {
    console.log('addBookmark called with news:', news); // 콘솔 로그 추가
    console.log('CSRF Token:', csrfToken);
    try {
      const response = await axios.post('http://localhost:8000/mainpage/add_bookmark/',
        {
          title: news.title,
          content: news.content,
          news_url: news.news_url,
          img_url: news.img,
          journalist: news.journalist,
          date: news.date,
        },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );
      console.log('북마크 추가 성공:', response.data);
    } catch (error) {
      console.error('북마크 추가 실패:', error);
    }
  };

  // 북마크 토글 함수
  const handleBookmarkClick = (index) => {
    console.log('handleBookmarkClick called with index:', index); // 콘솔 로그 추가
    const newBookmarkedContents = [...bookmarkedContents];
    newBookmarkedContents[index] = !newBookmarkedContents[index];
    setBookmarkedContents(newBookmarkedContents);

    console.log('Bookmark Clicked:', newBookmarkedContents); // 콘솔 로그 추가

    // 북마크 추가 요청 보내기
    if (newBookmarkedContents[index]) {
      addBookmark(newsData[index]);
    }

    // localStorage에 저장
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarkedContents));
  };

/*
  const NewsImage = ({ src }) => {
    const handleImageError = (e) => {
      e.target.src = DefaultImage;
    };
  
    return (
      <img src={src} onError={handleImageError} alt="News" />
    );
  };
*/
  return (
    <Root>

      <TypoContainer>
        <Typo size="48px" color="#1D24CA">
          요약 뉴스
        </Typo>
      </TypoContainer>

      <CategoryBox>
        <CategoryButton onClick={() => navigate("/politics")}>
          <Typo size="22px">정치</Typo>
        </CategoryButton>
        <CategoryButton onClick={() => navigate("/economy")}>
          <Typo size="22px">경제</Typo>
        </CategoryButton>
        <CategoryButton onClick={() => navigate("/society")}>
          <Typo size="22px">사회</Typo>
        </CategoryButton>
        <CategoryButton onClick={() => navigate("/bookmark")}>
          <Typo size="22px">북마크</Typo>
        </CategoryButton>
      </CategoryBox>

      <ContentsBox>
        {newsData &&
          newsData.map((news, index) => (
            <Contents key={index}>
              <ContentsBox2>
                <Layout_R>
                  <ImageFrame>
                    <NewsImage src={news.img} />
                  </ImageFrame>
                  <a href={news.news_url}>원문 보기 </a>
                </Layout_R>
                <Layout_L>
                  <BookmarkButton
                    src={
                      bookmarkedContents[index]
                        ? bookmarkImage.bookmarked
                        : bookmarkImage.notBookmarked
                    }
                    alt={bookmarkedContents[index] ? "북마크 해제" : "북마크"}
                    onClick={() => handleBookmarkClick(index)}
                  />
                  <TitleTypo
                    size="11px"
                    style={{ cursor: "pointer" }} // 클릭 가능한 커서 스타일 추가
                  >
                    {news.title}
                  </TitleTypo>
                  <ContentTypo size="8px">{news.content}</ContentTypo>

                  <TypoWhite size="10px" top="10px">
                  {news.journalist} 
                  </TypoWhite>
                  <TypoWhite size="10px" top="7px">
{news.date}                  </TypoWhite>
                </Layout_L>
              </ContentsBox2>
            </Contents>
          ))}
      </ContentsBox>

    </Root>
  );
};
