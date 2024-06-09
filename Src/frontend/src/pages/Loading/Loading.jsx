import React, { useState, useEffect } from 'react';
import styles from './Loading.module.css';
import { useNavigate } from 'react-router';
import axios from '../../utils/axios'; 


export const Loading = () => {
  const navigate = useNavigate();
  const [csrfToken, setCsrfToken] = useState('');

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
  }, []);

  const fetchAndNavigate = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/mainpage/politics/`);
      // 뉴스 데이터를 Politics 페이지로 넘깁니다.
      navigate('/politics', { state: { newsData: response.data.summarized_news } });
    } catch (error) {
      console.error('뉴스 데이터 가져오기 실패:', error);
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>오늘도 바빠서 뉴스를 </div>
      <div className={styles.title}>놓치셨나요? </div>
      <img src="Loading1.png" />
            <button onClick={fetchAndNavigate}>정치 뉴스 보기</button>



    </div>
  );
};