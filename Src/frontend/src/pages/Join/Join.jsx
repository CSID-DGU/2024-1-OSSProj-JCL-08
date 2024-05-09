import React, { useState } from 'react';
import styles from './Join.module.css';
//import instance from '../../api/axios';
import { useNavigate } from 'react-router';

export const Join = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPassowrdConfirm] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleIdChange = e => {
    setId(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = e => {
    setPassowrdConfirm(e.target.value);
  };


  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleSignUp = async event => {
    event.preventDefault();}
/*
    try {
      const response = await instance.post(
        '/api/auth/signup',
        {
          id: id,
          password: password,
          email: email,
        },
        {
          withCredentials: true,
        },
      );
      console.log('회원가입 성공:', response.data);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (error) {
      console.log('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    }
  };
*/
  return (
    <div className={styles.container}>
      <div className={styles.title}>회원가입</div>
      <form className={styles.form}>
        <div className={styles.wrapper}>
          <label htmlFor="id">아이디</label>
          <input
            type="id"
            id="id"
            name="id"
            value={id}
            onChange={handleIdChange}
            placeholder="아이디를 입력해주세요."
          />
        </div>
        <div className={styles.wrapper}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호를 입력해주세요."
          />
        </div>
        <div className={styles.wrapper}>
          <label htmlFor="password_confirm">비밀번호 확인</label>
          <input
            type="password"
            id="password_confirm"
            name="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            placeholder="비밀번호를 다시 입력해주세요."
          />
        </div>
        <span className={styles.password_confirm}>
          {passwordConfirm.length !== 0 && password !== passwordConfirm && '비밀번호가 일치하지 않습니다.'}
        </span>
        <div className={styles.wrapper}>
          <label htmlFor="email">이메일</label>
          <input
            type="tel"
            id="phone"
            name="phone"
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