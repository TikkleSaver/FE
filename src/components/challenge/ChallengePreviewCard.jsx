import React from 'react';
import styled from 'styled-components';
import {useNavigate } from 'react-router-dom';

const CardContainer = styled.div`
  border-radius: 8px;
  cursor: pointer;
  width: 250px;
`;

const ChallengeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
`;

const ChallengeImage = styled.div`
  width: 250px;
  height: 188px;
  background-color: rgba(57, 57, 57, 0.8);
  border-radius: 20px;
  margin-bottom: 10px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* 이미지를 반복하지 않도록 설정 */
`;

const Title = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #333333;
  
`;

const CategoryContainer = styled.span`
  font-weight: 600;
  white-space: nowrap;
  gap:4px;
  display:flex;


`;

 const CategoryColor = styled.div`
  width:12px;
  height:12px;
  background-color: ${({ color }) => color || "#6b6b6b"};
  margin-top:2px;
  border-radius:10px;

`;
const Category = styled.div`
  font-size: 14px;
  color: #6b6b6b;
  font-weight: 600;
  white-space: nowrap;

`;

const ChallengePreviewCard = ({ challengeId, title, category, imgUrl, from , fromProfile}) => {

  
  const navigate = useNavigate();

  const handleClick = () => {

    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    if (from === 'joined-challenge' && fromProfile==="my") {
      navigate(`/challenge-info/${challengeId}`);
    } else {
      navigate(`/challenges/signup-challenge/${challengeId}`);
    }
  };

  const categoryColorMap = {
    "식비": "#FB8072",
    "카페": "#80B1D3",
    "쇼핑": "#FED9A6",
    "건강": "#BC80BD",
    "취미": "#CCEBC5",
    "교통비": "#FFFFB3",
    "기타 생활비": "#D9D9D9",
  };

  const categoryColor = categoryColorMap[category] || "#6b6b6b"; // fallback color


  return (
    <CardContainer  onClick={handleClick}>
      <ChallengeImage imageUrl={imgUrl} />
      <ChallengeInfo>
        <Title>{title}</Title>
        <CategoryContainer>
          <CategoryColor color={categoryColor} />
        <Category>{category}</Category>
        </CategoryContainer>
      </ChallengeInfo>
    </CardContainer>
  );
};

export default ChallengePreviewCard;
