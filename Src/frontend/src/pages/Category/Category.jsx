import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState('politics'); // 기본값은 '정치'
  const [newsData, setNewsData] = useState([]);

  // 카테고리에 따른 뉴스 데이터를 불러오는 함수
  const fetchNewsData = async (category) => {
    const response = await axios.get(`http://localhost:8000/mainpage/${category}/`); 
    setNewsData(response.data.summarized_news);
  };

  // selectedCategory가 변경될 때마다 fetchNewsData 함수를 호출
  useEffect(() => {
    fetchNewsData(selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <h1>뉴스 요약</h1>
      <div>
        <button onClick={() => setSelectedCategory('politics')}>정치</button>
        <button onClick={() => setSelectedCategory('economy')}>경제</button>
        <button onClick={() => setSelectedCategory('society')}>사회</button>
      </div>
      <div>
        {newsData.map((news, index) => (
          <div key={index}>
            <h2>{news.title}</h2>
            <p>{news.content}</p>
            <a href={news.news_url}>기사 보기</a>
          </div>
        ))}
      </div>
    </div>
  );
};

