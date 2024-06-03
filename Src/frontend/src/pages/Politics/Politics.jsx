//Politics.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BookmarkProvider } from '../../BookmarkContext';
import { useBookmarks } from '../../BookmarkContext';

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
  const [newsData, setNewsData] = useState([]);
  const [bookmarkedContents, setBookmarkedContents] = useState({});

  const handleButtonClick = (category) => {
    setSelectedButton(category);
    console.log("Selected Category:", category);
  };

  // 카테고리에 따른 뉴스 데이터를 불러오는 함수
  const fetchNewsData = async () => {
    const response = await axios.get(
      `http://localhost:8000/mainpage/politics/`
    );
    setNewsData(response.data.summarized_news);
  };
  useEffect(() => {
    fetchNewsData();
  }, []);
  
  // 북마크 추가 함수
  const addBookmark = async (news) => {
    try {
      const response = await axios.post('http://localhost:8000/mainpage/add_bookmark/', {
        title: news.title,
        content: news.content,
        news_url: news.news_url,
        img_url: news.img
      });
      console.log(response.data.message);
      return response.data.bookmark_id;
    } catch (error) {
      console.error('Error adding bookmark:', error);
    }
  };

  // 북마크 삭제 함수
  const deleteBookmark = async (bookmarkId) => {
    try {
      const response = await axios.post('http://localhost:8000/mainpage/delete_bookmark/', {
        bookmark_id: bookmarkId
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error deleting bookmark:', error);
    }
  };

  // 북마크 버튼 클릭 핸들러
  const handleBookmarkClick = async (index) => {
    const news = newsData[index];
    if (bookmarkedContents[index]) {
      // 북마크 해제
      await deleteBookmark(bookmarkedContents[index]);
      setBookmarkedContents((prev) => {
        const newBookmarkedContents = { ...prev };
        delete newBookmarkedContents[index];
        return newBookmarkedContents;
      });
    } else {
      // 북마크 추가
      const bookmarkId = await addBookmark(news);
      setBookmarkedContents((prev) => ({
        ...prev,
        [index]: bookmarkId
      }));
    }
  };

  //북마크
  const bookmarkImage = {
    bookmarked: "bookmark_on.svg",
    notBookmarked: "bookmark_off.svg",
  };

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
                  <TypoWhite size="10px" top="10px">
                    KBS 뉴스
                  </TypoWhite>
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
                    이규민 기자
                  </TypoWhite>
                  <TypoWhite size="10px" top="7px">
                    2023.01.01
                  </TypoWhite>
                </Layout_L>
              </ContentsBox2>
            </Contents>
          ))}
      </ContentsBox>

    </Root>
  );
};