import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  NewsImage
} from "./styled";

export const Society = () => {
  const navigate = useNavigate();

  //카테고리 선택 버튼
  const [selectedButton, setSelectedButton] = useState("all");

  const handleButtonClick = (category) => {
    setSelectedButton(category);
    console.log("Selected Category:", category);
  };

  const [selectedCategory, setSelectedCategory] = useState(); // 기본값은 '정치'
  const [newsData, setNewsData] = useState([]);
  const [csrfToken, setCsrfToken] = useState('');
  const [bookmarkedContents, setBookmarkedContents] = useState([]); // 추가된 부분

  useEffect(() => {
    // CSRF 토큰을 가져오는 함수
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/csrf/', {
          withCredentials: true,
        });
        setCsrfToken(response.data.csrftoken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
    fetchNewsData(); // 초기 로드 시 뉴스 데이터를 가져옴
  }, []);

  // 카테고리에 따른 뉴스 데이터를 불러오는 함수
  const fetchNewsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/mainpage/society/`,
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        }
      );
      setNewsData(response.data.summarized_news);
      setBookmarkedContents(new Array(response.data.summarized_news.length).fill(false)); // 추가된 부분
    } catch (error) {
      console.error('뉴스 데이터 가져오기 실패:', error);
    }
  };

  // 북마크 추가 함수
  const addBookmark = async (news) => {
    console.log('CSRF Token:', csrfToken);
    console.log('News:', news);
    try {
      const response = await axios.post('http://localhost:8000/mainpage/add_bookmark/',
        {
          title: news.title,
          content: news.content,
          news_url: news.news_url,
          img_url: news.img,
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
    const newBookmarkedContents = [...bookmarkedContents];
    newBookmarkedContents[index] = !newBookmarkedContents[index];
    setBookmarkedContents(newBookmarkedContents);

    console.log('Bookmark Clicked:', newBookmarkedContents); // 콘솔 로그 추가

    // 북마크 추가 요청 보내기
    if (newBookmarkedContents[index]) {
      console.log('Adding bookmark for news:', newsData[index]); // 추가된 부분
      addBookmark(newsData[index]);
    }
  };

    // 북마크 이미지
    const bookmarkImage = {
      bookmarked: "bookmark_on.svg",
      notBookmarked: "bookmark_off.svg",
    };

  return (
    <Root>
      <TypoContainer>
        <Typo size="48px" color="#1D24CA">요약 뉴스</Typo>
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
        <CategoryButton onClick={() =>  navigate("/bookmark")}>
          <Typo size="22px">북마크</Typo>
        </CategoryButton>
      </CategoryBox>

      <ContentsBox>
        {newsData && newsData.map((news, index) => (
          <Contents key={index}>
            <ContentsBox2>
              <Layout_R>
                <ImageFrame>
                  <NewsImage src={news.img} />
                </ImageFrame>
                <TypoWhite size="10px" top="10px">KBS 뉴스</TypoWhite>
                <a href={news.news_url}>원문 보기</a>
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
                <TitleTypo size="11px" style={{ cursor: "pointer" }}>
                  {news.title}
                </TitleTypo>
                <ContentTypo size="8px">{news.content}</ContentTypo>
                <TypoWhite size="10px" top="10px">이규민 기자</TypoWhite>
                <TypoWhite size="10px" top="7px">2023.01.01</TypoWhite>
              </Layout_L>
            </ContentsBox2>
          </Contents>
        ))}
      </ContentsBox>
    </Root>
  );
};
