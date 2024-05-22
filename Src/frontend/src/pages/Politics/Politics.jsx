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

  const handleButtonClick = (category) => {
    setSelectedButton(category);
    console.log("Selected Category:", category);
  };

  const [newsData, setNewsData] = useState([]);

  // 카테고리에 따른 뉴스 데이터를 불러오는 함수
  const fetchNewsData = async () => {
    const response = await axios.get(
      `http://localhost:8000/mainpage/politics/`
    );
    setNewsData(response.data.summarized_news);
  };
  useEffect(() => {
    fetchNewsData();

    // localStorage에서 북마크 상태 불러오기
    const savedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    setBookmarkedContents(savedBookmarks);
  }, []);


  
  //북마크
  const bookmarkImage = {
    bookmarked: "bookmark_on.svg",
    notBookmarked: "bookmark_off.svg",
  };

  // 각 content에 대한 북마크 상태를 관리하는 배열
  const [bookmarkedContents, setBookmarkedContents] = useState(
    newsData.map(() => false)
  );
  const handleBookmarkClick = (Index) => {
    const newBookmarkedContents = {...bookmarkedContents};
    newBookmarkedContents[Index] = !newBookmarkedContents[Index];
    setBookmarkedContents(newBookmarkedContents);

    // localStorage에 저장
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarkedContents));
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