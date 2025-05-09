import React from 'react';
import styled from 'styled-components';
import logoImage from '../../images/logo.svg';
import image352 from '../../images/onboarding/image 352.svg';
import { Link } from 'react-router-dom';

export default function Goal() {
  return (
    <Container>
      <Wrapper>
        <Logo src={logoImage} alt="Logo" />
        <CenterImage src={image352} alt="Image" />
        <Title>하루 최대 지출 목표 금액을 적어주세요</Title>
        <GoalBox>
          <Input type="number" /> <Span>원</Span>
        </GoalBox>
        <Link to="/">
          <NextBtn>티끌모으기 시작하러 가기</NextBtn>
        </Link>
      </Wrapper>
    </Container>
  );
}
const Span = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
`;

const Input = styled.input`
  text-align: right;
  font-size: 1.2rem;
  font-weight: 500;
  width: 160px;
  height: 40px;
  padding-left: 10px;
  border: none;
  border-bottom: 1px solid #000; /* 원하는 색상과 두께로 조정 */
  &:focus {
    outline: none;
  }
`;

//input 태그 스타일
const Container = styled.div`
  position: relative;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: fit-content;
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GoalBox = styled.div`
  margin: 60px;
  /* display: flex;
  align-items: flex-end;
  gap: 10px; */
`;

const NextBtn = styled.button`
  margin-top: 50px;
  height: 45px;
  width: 270px;
  font-size: 17px;
  background-color: #51b69e;
  color: white;
  border: none;
  font-weight: 400;
  border-radius: 6px;
  word-wrap: break-word;
  cursor: pointer;
  box-shadow: 1px 2px 8px #f3f3f3;
`;
const Title = styled.span`
  margin: 5px;
  color: black;
  font-size: 35px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
`;

const Logo = styled.img`
  position: absolute;
  top: -40px;
  left: -200px;
  width: 200px;
  /* margin: 10px 40px; */
`;

const CenterImage = styled.img`
  justify-content: center;
  width: 130px;
  object-fit: cover;
`;
