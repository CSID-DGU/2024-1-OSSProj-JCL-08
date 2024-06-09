import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import defaultImage from "./Image.svg"; // 기본 이미지 경로

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
  FixedText,
  LoadingImage,
  LoadingWrapper,
  ReadMoreLink,
  SelectedCategoryButton
} from "./styled";

export const Society = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newsData, setNewsData] = useState([]);
  const [csrfToken, setCsrfToken] = useState("");
  const [bookmarkedContents, setBookmarkedContents] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가


  useEffect(() => {
    // CSRF 토큰을 가져오는 함수
    const fetchCsrfToken = async () => {
      let cookieValue = null;
      if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          if (cookie.substring(0, 10) === "csrftoken=") {
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
      const response = await axios.get(`http://localhost:8000/mainpage/society/`);
      setNewsData(response.data.summarized_news);
      setBookmarkedContents(new Array(response.data.summarized_news.length).fill(false));
    } catch (error) {
      console.error("뉴스 데이터 가져오기 실패:", error);
    } finally {
      setIsLoading(false); // 데이터 로딩 완료 후 로딩 상태 업데이트
    }
  };


  // 북마크 이미지
  const bookmarkImage = {
    bookmarked: "bookmark_on.svg",
    notBookmarked: "bookmark_off.svg",
  };

  // 북마크 추가 함수
  const addBookmark = async (news) => {
    console.log("addBookmark called with news:", news); // 콘솔 로그 추가
    console.log("CSRF Token:", csrfToken);
    try {
      const response = await axios.post(
        "http://localhost:8000/mainpage/add_bookmark/",
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
            "X-CSRFToken": csrfToken,
          },
          withCredentials: true,
        }
      );
      console.log("북마크 추가 성공:", response.data);
    } catch (error) {
      console.error("북마크 추가 실패:", error);
    }
  };

  // 북마크 토글 함수
  const handleBookmarkClick = (index) => {
    console.log("handleBookmarkClick called with index:", index); // 콘솔 로그 추가
    const newBookmarkedContents = [...bookmarkedContents];
    newBookmarkedContents[index] = !newBookmarkedContents[index];
    setBookmarkedContents(newBookmarkedContents);

    console.log("Bookmark Clicked:", newBookmarkedContents); // 콘솔 로그 추가

    // 북마크 추가 요청 보내기
    if (newBookmarkedContents[index]) {
      addBookmark(newsData[index]);
    }

    // localStorage에 저장
    localStorage.setItem("bookmarks", JSON.stringify(newBookmarkedContents));
  };

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <Root>
      <TypoContainer>
        <Typo size="48px" color="#1D24CA">
          요약 뉴스
        </Typo>
      </TypoContainer>
      <CategoryBox>
        <CategoryButton
          as={selectedCategory === "politics" ? SelectedCategoryButton : "button"}
          onClick={() => {
            navigate("/politics");
            setSelectedCategory("politics");
          }}
        >
          <Typo size="22px">정치</Typo>
        </CategoryButton>
        <CategoryButton
          as={selectedCategory === "economy" ? SelectedCategoryButton : "button"}
          onClick={() => {
            navigate("/economy");
            setSelectedCategory("economy");
          }}
        >
          <Typo size="22px">경제</Typo>
        </CategoryButton>
        <CategoryButton
          as={selectedCategory === "society" ? SelectedCategoryButton : "button"}
          onClick={() => {
            navigate("/society");
            setSelectedCategory("society");
          }}
        >
          <Typo size="22px">사회</Typo>
        </CategoryButton>
        <CategoryButton
          as={selectedCategory === "bookmark" ? SelectedCategoryButton : "button"}
          onClick={() => {
            navigate("/bookmark");
            setSelectedCategory("bookmark");
          }}
        >
          <Typo size="22px">북마크</Typo>
        </CategoryButton>
      </CategoryBox>

      <ContentsBox>
        {isLoading ? ( // 로딩 중일 때 로딩 아이콘 표시
                <LoadingWrapper>

          <LoadingImage src="Loading.gif" alt="Loading..." />
          </LoadingWrapper>

        ) : (
          newsData &&
          newsData.map((news, index) => (
            <Contents key={index}>
              <ContentsBox2>
                <Layout_R>
                  <ImageFrame>
                    <NewsImage
                      src={news.img || defaultImage}
                      onError={handleImageError}
                    />{" "}
                  </ImageFrame>
                  <ReadMoreLink href={news.news_url} style={{ fontSize: "10px" }}>
                    원문 보기{" "}
                  </ReadMoreLink>
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
                    size="12px"
                    style={{ cursor: "pointer" }}
                  >
                    {news.title}
                  </TitleTypo>
                  <ContentTypo size="9px">{news.content}</ContentTypo>
                  <FixedText>
                    <TypoWhite size="8px" top="10px" color="#91969E">
                      {news.journalist}
                    </TypoWhite>
                    <TypoWhite size="8px" top="3px" color="#91969E">
                      {news.date}
                    </TypoWhite>
                  </FixedText>
                </Layout_L>
              </ContentsBox2>
            </Contents>
          ))
        )}
      </ContentsBox>
    </Root>
  );
};
