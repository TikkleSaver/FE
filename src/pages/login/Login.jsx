import React, { useEffect, useState } from 'react';
import * as S from '../style/Login.style';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../../images/logo.svg';

export default function Login() {
  const [Password, setPassword] = useState('');
  const [idValid, setIDValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const navigate = useNavigate(); // 페이지 이동용 훅

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
            {/* <S.Label htmlFor="id">아이디</S.Label> */}
            <S.Input id="id" placeholder="아이디를 입력해주세요" />
          </S.InputWrapper>

          {/* <S.Label htmlFor="pw">비밀번호</S.Label> */}
          <S.Input
            id="pw"
            type="password"
            value={Password}
            onChange={onChangePasswords}
            placeholder="비밀번호를 입력해주세요"
          />
          <S.SubmitButton type="submit">로그인</S.SubmitButton>
        </S.Form>
        <S.WrapLink>
          <Link
            to="/signup"
            style={{ color: '#9C9C9C', textDecoration: 'none' }}
          >
            <S.LinkStyle>회원가입</S.LinkStyle>
          </Link>
        </S.WrapLink>
      </S.WrapLogin>
    </S.HomeWrap>
  );
}
