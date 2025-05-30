import React, { useEffect, useState } from 'react';
import * as S from '../style/Login.style';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../../images/logo.svg';
import { login } from '../../api/loginApi'; //
import styled from 'styled-components';

const Error = styled.div`
  width: 290px;
  color: #ff0558;
  font-size: 12px;
  padding-left: 5px;
  margin: 10px 0 5px;
`;
export default function Login() {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginId || !password) {
      return;
    }
    const result = await login(loginId, password);
    if (!result.success) {
      setError(true);
      return;
    }

    alert('로그인 성공');
    navigate('/');
  };

  return (
    <S.HomeWrap>
      <S.WrapLogin>
        <Link to="/">
          <S.Logo src={logoImage} alt="Logo" />
        </Link>
        <S.Form onSubmit={handleSubmit}>
          <S.InputWrapper>
            <S.Input
              id="id"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="아이디를 입력해주세요"
            />
          </S.InputWrapper>
          <S.Input
            id="pw"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호를 입력해주세요"
          />

          {error && (
            <Error>
              아이디(로그인 전화번호, 로그인 전용 아이디) 또는 비밀번호가 잘못
              되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요
            </Error>
          )}

          <S.SubmitButton type="submit" disabled={!loginId || !password}>
            로그인
          </S.SubmitButton>
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
