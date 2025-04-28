import React, { useEffect, useState } from 'react';
import * as S from '../style/Login.style';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../../images/logo.svg';

export default function SignUp() {
  const [ID, setID] = useState('');
  const [Password, setPassword] = useState('');
  const [idValid, setIDValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate(); // 페이지 이동용 훅

  const onChangeId = (e) => {
    setID(e.target.value);
    const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    setIDValid(regex.test(e.target.value));
  };

  const onChangePasswords = (e) => {
    setPassword(e.target.value);
    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[#*?!]).{8,}$/;
    setPasswordValid(regex.test(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // form 기본 제출 막기
    if (!idValid || !passwordValid) {
      alert('이메일과 비밀번호를 모두 올바르게 입력해주세요');
      return;
    }
    // 로그인 성공 로직 추가하면 됨
    navigate('/'); // 로그인 성공 시 홈으로 이동
  };

  return (
    <S.HomeWrap>
      <S.WrapLogin>
        <Link to="/">
          <S.Logo src={logoImage} alt="Logo" />
        </Link>
        <S.Form onSubmit={handleSubmit}>
          <S.InputWrapper>
            <S.Label htmlFor="id">아이디</S.Label>
            <S.Input id="id" placeholder="아이디를 입력해주세요" />
            <S.checkBtn type="button">중복확인</S.checkBtn>
          </S.InputWrapper>

          <S.Label htmlFor="pw">비밀번호</S.Label>
          <S.Input
            id="pw"
            type="password"
            value={Password}
            onChange={onChangePasswords}
            placeholder="비밀번호를 입력해주세요"
          />
          <S.Label htmlFor="pw2">비밀번호 확인</S.Label>
          <S.Input
            id="pw2"
            type="password"
            placeholder="비밀번호를 재입력해주세요"
          />
          <S.Label htmlFor="nickname">닉네임</S.Label>
          <S.Input id="nickname" placeholder="닉네임을 입력해주세요" />
          <S.SubmitButton type="submit">회원가입</S.SubmitButton>
        </S.Form>
        <S.WrapLink>
          <Link
            to="/login"
            style={{ color: '#9C9C9C', textDecoration: 'none' }}
          >
            <S.LinkStyle>로그인</S.LinkStyle>
          </Link>
        </S.WrapLink>
      </S.WrapLogin>
    </S.HomeWrap>
  );
}
