import React, { useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
//import instance from '../../api/axios';
//import { LoginState, UserState } from '../../stores/login-store';
import { useSetRecoilState } from 'recoil';

export const Login = () => {
  //const setIsLoggedIn = useSetRecoilState(LoginState);
  //const setUserState = useSetRecoilState(UserState);

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleIdChange = e => {
    setId(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleLogin = async event => {
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <img className={styles.image} src="logo.png" alt="로고" />
      <div className={styles.subcontainer}>
        <form className={styles.form}>
          <div className={styles.wrapper}>
            <input
              type="id"
              id="id"
              value={id}
              onChange={handleIdChange}
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
