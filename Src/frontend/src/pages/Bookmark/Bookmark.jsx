import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Bookmark = () => {
    const [bookmarkedNews, setBookmarkedNews] = useState([]);
    useEffect(() => {
      // 뉴스 데이터 불러오기
      const fetchAllNewsData = async () => {
          try {
              // 각 카테고리별 뉴스 데이터를 동시에 불러옵니다.
              const responses = await Promise.all([
                  axios.get('http://localhost:8000/mainpage/politics/'),
                  axios.get('http://localhost:8000/mainpage/economy/'),
                  axios.get('http://localhost:8000/mainpage/society/')
              ]);
  
              // 각 응답에서 summarized_news 데이터를 추출합니다.
              const allNewsData = responses.map(response => response.data.summarized_news);
  
              // 모든 뉴스 데이터를 하나의 배열로 결합합니다.
              // 여기서는 간단히 모든 배열을 연결합니다. 필요에 따라 다른 방식으로 처리할 수도 있습니다.
              return allNewsData.flat(); // flat() 함수를 사용하여 모든 뉴스 데이터를 하나의 배열로 평탄화합니다.
          } catch (error) {
              console.error("뉴스 데이터를 불러오는 데 실패했습니다.", error);
              return []; // 오류가 발생한 경우, 빈 배열 반환
          }
      };

        const loadBookmarkedNews = async () => {
            const allNewsData = await fetchAllNewsData();
            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedContents')); // 북마크 정보 불러오기

            // 북마크된 뉴스 데이터만 필터링
            const filteredNews = allNewsData.filter((news, index) => savedBookmarks && savedBookmarks[index]);
            setBookmarkedNews(filteredNews);
        };

        loadBookmarkedNews();
    }, []);

    return (
        <div>
            <h1>북마크한 뉴스</h1>
            <div>
                {bookmarkedNews.map((news, index) => (
                    <div key={index}>
                        <h2>{news.title}</h2>
                        <p>{news.content}</p>
                        {/* 기타 뉴스 정보 표시 */}
                    </div>
                ))}
            </div>
        </div>
    );
};

