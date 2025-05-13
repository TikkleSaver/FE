import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChallengePreviewCard from '../../components/challenge/ChallengePreviewCard';
import SearchIcon from '../../assets/search.svg';

const ChallengePageContainer = styled.div`
  width: 80%;
  max-width: 100%;
  margin: 120px auto;
`;
const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 50px;
`;

const CateButton = styled.button`
  background-color: ${(props) =>
    props.$active === 'true' ? '#51B69E' : 'white'};
  color: ${(props) => (props.$active === 'true' ? 'white' : '#999999')};
  border: 1px solid
    ${(props) => (props.$active === 'true' ? '#51B69E' : '#999999')};
  padding: 6px 15px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
`;

const ChallengeContainer = styled.div`
  margin: 50px auto;
  width: fit-content;
`;
const TopChallengeInnerContainer = styled.div`
  width: fit-content;
  min-width: max-content;
  margin: 5px auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: 30px;
  justify-content: center;
`;

function SavedChallenge() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = [
    '전체',
    '식비',
    '카페',
    '쇼핑',
    '건강',
    '취미',
    '교통비',
    '기타 생활비',
  ];

  return (
    <ChallengePageContainer>
      <ChallengeContainer>
        <ButtonContainer>
          {categories.map((category) => (
            <CateButton
              key={category}
              $active={selectedCategory === category ? 'true' : 'false'}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </CateButton>
          ))}
        </ButtonContainer>
        <TopChallengeInnerContainer>
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
        </TopChallengeInnerContainer>
      </ChallengeContainer>
    </ChallengePageContainer>
  );
}

export default SavedChallenge;
