import React, { useState, useEffect } from 'react';
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
  const [csrfToken, setCsrfToken] = useState('');


  const navigate = useNavigate();

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };
  useEffect(() => {
    // CSRF 토큰을 가져오는 함수
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get('http://localhost:8000/accounts/csrf/', {
          withCredentials: true,
        });
        setCsrfToken(response.data.csrftoken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loginResponse = await axios.post('http://localhost:8000/accounts/login/',
        {
          username: username,
          password: password,
        },
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
          withCredentials: true,
        },
      );
      console.log('로그인 성공:', loginResponse.data);
      // 로그인 성공 후 CSRF 토큰을 콘솔에 출력
      console.log('CSRF 토큰:', csrfToken);


      // 로그인 성공 후
      setIsLoggedIn(true);
      navigate('/politics');
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