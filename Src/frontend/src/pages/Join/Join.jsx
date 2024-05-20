import React, { useState } from 'react';
import styles from './Join.module.css';
import { useNavigate } from 'react-router';
import axios from 'axios';


export const Join = () => {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = e => {
    setUsername(e.target.value);
  };

  const handlePassword1Change = e => {
    setPassword1(e.target.value);
  };

  const handlePassword2Change = e => {
    setPassword2(e.target.value);
  };


  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:8000/accounts/register/', {
          username: username,
          password1: password1,
          password2: password2,
          email: email,
        },
        {
          withCredentials: true,
        },
      );
      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다.');
      navigate('/');
    } catch (error) {
      console.log('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>회원가입</div>
      <form className={styles.form} >
        <div className={styles.wrapper}>
          <label htmlFor="username">아이디</label>
          <input
            type="username"
            id="username"
            name="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="아이디를 입력해주세요."
          />
        </div>
        <div className={styles.wrapper}>
          <label htmlFor="password1">비밀번호</label>
          <input
            type="password"
            id="password1"
            name="password"
            value={password1}
            onChange={handlePassword1Change}
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
        <div className={styles.wrapper}>
          <label htmlFor="password_confirm">비밀번호 확인</label>
          <input
            type="password"
            id="password2"
            name="password"
            value={password2}
            onChange={handlePassword2Change}
            placeholder="비밀번호를 다시 입력해주세요."
          />
        </div>
        <span className={styles.password_confirm}>
          {password2.length !== 0 && password1 !== password2 && '비밀번호가 일치하지 않습니다.'}
        </span>
        <div className={styles.wrapper}>
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력해주세요."
          />
          <button className={styles.login_button} type="button" onClick={handleSignUp}>
          저장하기 <img src='Arrow.svg'/>
        </button>
        </div>
      </form>
    </div>
  );
};