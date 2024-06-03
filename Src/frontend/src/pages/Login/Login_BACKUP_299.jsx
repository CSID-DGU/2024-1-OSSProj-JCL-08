import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { LoginState, UserState } from '../../stores/login-store';
import { useSetRecoilState } from 'recoil';
import axios from '../../utils/axios'; 

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


  const handleSubmit = async (event) => {
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
        }
      );
      console.log('로그인 성공:', loginResponse.data);
      // 로그인 성공 후 CSRF 토큰을 콘솔에 출력
      console.log('CSRF 토큰:', csrfToken);


      // 로그인 성공 후
      setIsLoggedIn(true);
      navigate('/main');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src="logo.png" alt="로고" />
      <div className={styles.subcontainer}>
        <form className={styles.form}  onSubmit={handleSubmit}>
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