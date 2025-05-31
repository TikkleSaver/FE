// src/components/ChangePasswordSection.jsx

// src/components/ChangePasswordSection.jsx

import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { updatePassword } from '../../api/profileApi';
import { useNavigate } from 'react-router-dom';

// yup 스키마 정의
const schema = yup.object().shape({
  password: yup.string().required('현재 비밀번호를 입력해주세요.'),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])/,
      '비밀번호는 영문 소문자, 숫자, 특수문자를 포함해야 합니다.'
    )
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .max(16, '비밀번호는 16자 이하여야 합니다.')
    .required('새 비밀번호를 입력해주세요.'),
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], '비밀번호가 일치하지 않습니다.')
    .required('비밀번호 확인은 필수 입력입니다.'),
});

export default function ChangePasswordSection() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // 입력값이 변경될 때마다 유효성 검사
  });

  const onSubmit = async (data) => {
    try {
      await updatePassword(data.password, data.newPassword);
      alert('비밀번호가 성공적으로 변경되었습니다.');
    } catch (error) {
      const msg = error.response?.data?.message || '비밀번호 변경 실패';
      alert(msg);
      setError('password', { message: msg });
    }
  };

  return (
    <>
      <TitleContainer>
        <img
          src={require('../../images/myprofile/pw_icon.svg').default}
          alt="비밀번호 아이콘"
        />
        <div>
          <span>비밀번호 변경</span>
          <p>
            비밀번호는 최소 8자 이상이며 영문 소문자, 숫자, 특수문자 조합이어야
            합니다.
          </p>
        </div>
        <UpdateBtn2 onClick={handleSubmit(onSubmit)}>변경하기</UpdateBtn2>
      </TitleContainer>

      <PwContainer onSubmit={handleSubmit(onSubmit)} as="form">
        <Label htmlFor="pw">현재 비밀번호</Label>
        <InputPW id="pw" type="password" {...register('password')} />
        {errors.password && <Error>{errors.password.message}</Error>}

        <Label htmlFor="new">새 비밀번호</Label>
        <InputPW id="new" type="password" {...register('newPassword')} />
        {errors.newPassword && <Error>{errors.newPassword.message}</Error>}

        <Label htmlFor="re">새 비밀번호 재입력</Label>
        <InputPW id="re" type="password" {...register('passwordCheck')} />
        {errors.passwordCheck && <Error>{errors.passwordCheck.message}</Error>}

        <MoreBtn to="/savedChallenge">회원탈퇴</MoreBtn>
      </PwContainer>
    </>
  );
}

const Error = styled.div`
  color: #ff0558;
  font-size: 12px;
  padding-left: 5px;
  margin-left: 48px;
  margin-top: 7px;
`;
// styled-components는 기존 코드 그대로 복붙
const PwContainer = styled.div`
  margin: 0 50px 30px 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputPW = styled.input`
  margin: 10px 0 0px 48px;
  width: 290px;
  height: 40px;
  border-radius: 10px;
  border: 1px #cad6d2 solid;
  font-size: 1rem;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
`;

const Label = styled.label`
  color: #7d817f;
  font-size: 1rem;
  font-weight: 400;
  margin-left: 48px;
  margin-top: 20px;
`;

const TitleContainer = styled.div`
  position: relative;
  margin: 20px 50px 0 50px;
  width: 100%;
  min-width: 800px;
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  padding-bottom: 10px;
  border-bottom: 0.7px #cad6d2 solid;
  > img {
    margin: 0 15px;
    height: 23px;
  }
  p {
    white-space: nowrap;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0;
  }
`;

const UpdateBtn2 = styled.button`
  margin-left: 20px;
  height: fit-content;
  padding: 7px 20px;
  font-size: 1.1rem;
  font-weight: 400;
  border-radius: 12px;
  cursor: pointer;
  border: 1px #e5e5e5 solid;
  background-color: transparent;
  white-space: nowrap;
  position: absolute;
  bottom: 10px;
  right: 0;
`;

const MoreBtn = styled.a`
  color: #6b6b6b;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  width: fit-content;
  margin-left: auto;
  &:hover {
    text-decoration: underline;
  }
`;

const Message = styled.div`
  color: red;
  font-size: 0.9rem;
  margin-left: 48px;
`;
