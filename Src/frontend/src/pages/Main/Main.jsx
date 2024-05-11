import React, { useState } from "react";
import { Link } from "react-router-dom";
import { contents } from "../../utils/ProgressDetail";
import { useNavigate } from 'react-router-dom';

import {
  Typo,
  CategoryBox,
  CategoryButton,
  ContentsBox,
  Contents,
  Image,
  Shadow,
  TypoWhite,
  DonateButton,
  FullBar,
  Bar,
  BottomBox,
  TypoContainer,
  TypoOrange,
  Root,
  ImageFrame,
  ContentsBox2,
  Layout_R,
  Layout_L,
  BookmarkButton,
} from "./styled";

export const Main = () => {
  const navigate = useNavigate();

  //카테고리 선택 버튼
  const [selectedButton, setSelectedButton] = useState("all");

  const handleButtonClick = (category) => {
    setSelectedButton(category);
    console.log("Selected Category:", category);
  };

  //북마크
  const bookmarkImage = {
    bookmarked: "bookmark_on.svg",
    notBookmarked: "bookmark_off.svg",
  };

  // 각 content에 대한 북마크 상태를 관리하는 배열
  const [bookmarkedContents, setBookmarkedContents] = useState(
    contents.map(() => false)
  );

  // 북마크 토글 함수
  const handleBookmarkClick = (index) => {
    const newBookmarkedContents = [...bookmarkedContents];
    newBookmarkedContents[index] = !newBookmarkedContents[index];
    setBookmarkedContents(newBookmarkedContents);
  };

  //contents 내용

  return (
    <Root>
      <TypoContainer>
        <Typo size="48px">요약 뉴스</Typo>
        
      </TypoContainer>

      <CategoryBox>
        <CategoryButton
          isActive={selectedButton === "1"}
          onClick={() => handleButtonClick("1")}
        >
          <Typo size="18px">정치</Typo>
        </CategoryButton>
        <CategoryButton
          isActive={selectedButton === "2"}
          onClick={() => handleButtonClick("2")}
        >
          <Typo size="18px">경제</Typo>
        </CategoryButton>
        <CategoryButton
          isActive={selectedButton === "3"}
          onClick={() => handleButtonClick("3")}
        >
          <Typo size="18px">시사</Typo>
        </CategoryButton>
        <CategoryButton
          isActive={selectedButton === "bookmark"}
          onClick={() => handleButtonClick("bookmark")}
        >
          <Typo size="18px">북마크</Typo>
        </CategoryButton>
      </CategoryBox>

      <ContentsBox>
        {contents
          .filter(
            (content) =>
              content.categories.includes(selectedButton) ||
              selectedButton === "all"
          )
          .map((content, index) => (
              <Contents key={index}>
                <ContentsBox2>
                  <Layout_R>
                    <ImageFrame><img src="Icon.png"/></ImageFrame>
                    <TypoWhite size="10px" top="10px">
                      {content.news}
                    </TypoWhite>
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
                     <TypoWhite
                    size="20px"
                    onClick={() => navigate(`/progress/${index}`)}// 타이틀 클릭 시 페이지 이동
                    style={{ cursor: "pointer" }} // 클릭 가능한 커서 스타일 추가
                  >{content.title}</TypoWhite>
                    <TypoWhite size="10px">{content.summary}</TypoWhite>
                    <TypoWhite size="10px" top="10px">
                      {content.reporter} 기자
                    </TypoWhite>
                    <TypoWhite size="10px" top="7px">
                      {content.date}
                    </TypoWhite>
                  </Layout_L>
                </ContentsBox2>
              </Contents>
          ))}
      </ContentsBox>
    </Root>
  );
};
