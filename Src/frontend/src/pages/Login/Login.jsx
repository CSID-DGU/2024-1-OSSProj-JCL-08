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
      const { token } = tokenResponse.data;
      const currentDate = new Date().getTime();
      const expirationDate = new Date(currentDate + 60 * 60 * 1000);
      localStorage.setItem('token', token);
      localStorage.setItem('expirationDate', expirationDate.toString());
      console.log('로그인 성공:', tokenResponse.data);
/*
      // 유저 정보 받아오기
      const userResponse = await axios.get('/api/mypage', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = userResponse.data;
      console.log('유저정보:', user);
*/
      // 로그인 성공 후
      setIsLoggedIn(true);
      //setUserState(user);

      navigate('/main');
      window.location.reload();
    } catch (error) {
      console.error('로그인 실패:', error.response.data.reason);
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
