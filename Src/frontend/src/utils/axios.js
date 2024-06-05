// src/services/axios.js

import axios from 'axios';

// Axios 인스턴스 생성
const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 5000, // timeout after 5 seconds
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },  
});

/*
// 요청 인터셉터 추가
instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
*/
export default instance;

