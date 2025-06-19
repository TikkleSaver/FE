import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChallengePreviewCard from '../../components/challenge/ChallengePreviewCard';
import SearchIcon from '../../assets/search.svg';
import { useLocation } from 'react-router-dom';
import Colors from '../../constanst/color.mjs';

const ChallengePageContainer = styled.div`
  width: 80%;
  max-width: 100%;
  margin: 140px auto;
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
const TopChallengeText = styled.div`
  padding-bottom: 15px;
  margin-bottom: 30px;
  font-size: 25px;
  font-weight: 600;
  border-bottom: 1.5px solid ${Colors.secondary100};
`;
const NoResultSubText = styled.div`
  font-size: 14px;
  color: ${Colors.secondary100};
`;

const NoResultTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.secondary200};
  margin-bottom: 10px;
`;
const NoResultContainer = styled.div`
  width: 1100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50vh;
  text-align: center;
  padding: 0 20px;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
`;
function SavedChallenge() {
  const reverseCategoryMap = {
    1: '식비',
    2: '카페',
    3: '쇼핑',
    4: '건강',
    5: '취미',
    6: '교통비',
    7: '기타 생활비',
  };
  const location = useLocation();
  const scrapedList = location.state?.scrapedList || [];

  return (
    <ChallengePageContainer>
      <ChallengeContainer>
        <TopChallengeText>저장한 챌린지</TopChallengeText>
        {scrapedList.length === 0 ? (
          <NoResultContainer visible={true}>
            <NoResultTitle>저장한 챌린지가 없습니다.</NoResultTitle>
          </NoResultContainer>
        ) : (
          <TopChallengeInnerContainer>
            {scrapedList.map((challenge) => (
              <ChallengePreviewCard
                key={challenge.challengeId}
                challengeId={challenge.challengeId}
                title={challenge.title}
                category={reverseCategoryMap[challenge.categoryId]}
                imgUrl={challenge.imgUrl}
              />
            ))}
          </TopChallengeInnerContainer>
        )}
      </ChallengeContainer>
    </ChallengePageContainer>
  );
}

export default SavedChallenge;
