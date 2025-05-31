import React, { useState, useEffect } from 'react';
import * as S from '../style/Login.style';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../../images/logo.svg';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { signUp } from '../../api/signupApi';
import { checkEmailDuplicate } from '../../api/signupApi';

// yup 스키마 정의
const schema = yup.object().shape({
  email: yup
    .string()
    .email('올바른 이메일 형식이 아닙니다. 다시 확인해주세요!')
    .required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
      '비밀번호는 영문 소문자, 숫자, 특수문자를 포함해야 합니다.'
    )
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.')

    .required('비밀번호를 입력해주세요.'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.') // 비밀번호 일치 확인
    .required('비밀번호 확인은 필수 입력입니다.'),
  nickname: yup
    .string()
    .min(2, '닉네임은 두 글자 이상이어야 합니다.')
    .max(8, '닉네임은 8자 이하여야 합니다.')
    .required('닉네임을 입력해주세요.'),
});

export default function SignUp() {
  const navigate = useNavigate(); // 페이지 이동용 훅
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  // useForm 훅 사용
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema), // yup 스키마를 리졸버로 설정
    mode: 'onChange', // 입력값이 변경될 때마다 유효성 검사
  });

  const onSubmit = async (data) => {
    if (!isEmailChecked) {
      alert('이메일 중복확인을 해주세요.');
      return;
    }
    try {
      const result = await signUp(data);
      const memberId = result.data.id;

      alert(`환영합니다 ${data.nickname}님, 티끌모으기입니다!`);
      navigate('/onboarding/category', {
        state: { memberId },
      });
    } catch (error) {
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const email = watch('email');
  const isEmailValid = email && !errors.email;

  const handleCheckEmail = async () => {
    if (!email) {
      alert('이메일을 입력해주세요.');
      return;
    }

    try {
      await checkEmailDuplicate(email);
      alert('사용가능한 이메일입니다.'); // "사용가능한 이메일입니다." 출력
      setIsEmailChecked(true); // 중복확인 성공
    } catch (e) {
      alert('이미 사용 중인 이메일입니다.');
      setIsEmailChecked(false); // 실패 시도 다시 초기화
    }
  };
  // 이메일 변경 시 중복확인 상태 초기화
  useEffect(() => {
    setIsEmailChecked(false);
  }, [email]);

  return (
    <S.HomeWrap>
      <S.WrapLogin>
        <Link to="/">
          <S.Logo src={logoImage} alt="Logo" />
        </Link>
        <S.Form onSubmit={handleSubmit(onSubmit)}>
          <S.InputWrapper>
            <S.Label htmlFor="id">아이디</S.Label>
            <S.Input
              id="id"
              type="email"
              {...register('email')}
              isError={!!errors.email} // 에러가 있을 때 true
              placeholder="아이디를 입력해주세요"
            />
            <S.checkBtn
              type="button"
              onClick={handleCheckEmail}
              disabled={!isEmailValid}
            >
              중복확인
            </S.checkBtn>

            {errors.email && <Error>{errors.email.message}</Error>}
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Label htmlFor="pw">비밀번호</S.Label>
            <S.Input
              id="pw"
              type="password"
              {...register('password')}
              placeholder="비밀번호를 입력해주세요"
              isError={!!errors.password} // 에러가 있을 때 true
            />
            {errors.password && <Error>{errors.password.message}</Error>}
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Label htmlFor="pw2">비밀번호 확인</S.Label>
            <S.Input
              id="pw2"
              type="password"
              {...register('passwordCheck')}
              isError={!!errors.passwordCheck} // 에러가 있을 때 true
              placeholder="비밀번호를 재입력해주세요"
            />
            {errors.passwordCheck && (
              <Error>{errors.passwordCheck.message}</Error>
            )}
          </S.InputWrapper>
          <S.InputWrapper>
            <S.Label htmlFor="nickname">닉네임</S.Label>
            <S.Input
              id="nickname"
              placeholder="닉네임을 입력해주세요"
              {...register('nickname')}
              isError={!!errors.nickname}
            />
            {errors.nickname && <Error>{errors.nickname.message}</Error>}
          </S.InputWrapper>

          <S.SubmitButton type="submit" disabled={!isValid}>
            회원가입
          </S.SubmitButton>
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

const Error = styled.div`
  color: #ff0558;
  font-size: 12px;
  padding-left: 5px;
`;
