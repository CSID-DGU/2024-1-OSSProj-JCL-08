import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { LoginState, UserState } from '../../stores/login-store';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';

export const Login = () => {
  const setIsLoggedIn = useSetRecoilState(LoginState);
  const setUserState = useSetRecoilState(UserState);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const tokenResponse = await axios.post('http://localhost:8000/accounts/login/',
        {
          username: username,
          password: password,
        },
        {
          withCredentials: true,
        },
      );
      const { refresh, access } = tokenResponse.data; // JWT 토큰 사용 시 수정
      const currentDate = new Date().getTime();
      const expirationDate = new Date(currentDate + 60 * 60 * 1000);
      localStorage.setItem('accessToken', access); // 수정됨
      localStorage.setItem('refreshToken', refresh); // 수정됨
      localStorage.setItem('expirationDate', expirationDate.toString());
      console.log('로그인 성공:', tokenResponse.data);

      // 유저 정보 받아오기
      const userResponse = { // URL 수정 필요
        headers: {
          Authorization: `Bearer ${access}`, // 수정됨
        },
      };
      const user = userResponse.data;
      console.log('유저정보:', user);

      // 로그인 성공 후
      setIsLoggedIn(true);
      setUserState(user); // 유저 상태 업데이트

      navigate('/main');
    } catch (error) {
      if (error.response && error.response.data) {
        // 서버가 응답으로 오류 메시지를 보냈을 경우
        console.error('로그인 실패:', error.response.data.reason);
      } else {
        // 서버 응답이 없거나 네트워크 오류 등의 다른 문제가 발생한 경우
        console.error('로그인 실패:', error.message);
      }
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src="logo.png" alt="로고" />
      <div className={styles.subcontainer}>
        <form className={styles.form}>
          <div className={styles.wrapper}>
            <input
              type="username"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              placeholder="아이디"
            />
          </div>
          <div className={styles.wrapper}>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호"
            />
          </div>
          <button
            className={styles.login_button}
            type="submit"
            onClick={handleLogin}
          >
            Login
          </button>
          <div>
            <img src="Line-left.png" /> Or better yet...
            <img src="Line-left.png" />
          </div>
          <button
            className={styles.join_button}
            type="button"
            onClick={() => navigate("/join")}
          >
            Don't you have account? Sign up
          </button>
        </form>
      </div>
    </div>
  );
};