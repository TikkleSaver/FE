import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import imageUrl from '../../images/challengeImg.png';

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
  font-size: 18px;
  font-weight: 700;
  color: #333333;
  
`;

const Category = styled.span`
  font-size: 14px;
  color: #6b6b6b;
  font-weight: 600;
  white-space: nowrap;
 
  


`;

const ChallengePreviewCard = ({ challengeId, title, category, imgUrl }) => {
  const navigate = useNavigate();

  return (
    <CardContainer onClick={() => navigate(`/challenges/signup-challenge/${challengeId}`)}>
      <ChallengeImage imageUrl={imgUrl} />
      <ChallengeInfo>
        <Title>{title}</Title>
        <Category>{category}</Category>
      </ChallengeInfo>
    </CardContainer>
  );
};

export default ChallengePreviewCard;
