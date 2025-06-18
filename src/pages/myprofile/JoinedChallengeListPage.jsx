import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChallengePreviewCard from '../../components/challenge/ChallengePreviewCard';
import SearchIcon from '../../assets/search.svg';
import { useLocation } from 'react-router-dom';
import Colors from '../../constanst/color.mjs';
import { fetchJoinChallengeList } from '../../api/challenge/challengeListApi';

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

function JoinedChallengeListPage() {
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
  const [challenges, setChallenges] = useState([]);

  const memberId = location.state?.memberId || [];

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const data = await fetchJoinChallengeList(memberId);
        setChallenges(data);
      } catch (err) {
        console.error('인기 챌린지 불러오기 실패:', err);
      }
    };

    loadChallenges();
  }, []);

  return (
    <ChallengePageContainer>
      <ChallengeContainer>
        <TopChallengeText>🏃‍♂️참여중인 챌린지</TopChallengeText>
        <TopChallengeInnerContainer>
          {challenges?.map((challenge) => (
            <ChallengePreviewCard
              key={challenge.challengeId}
              challengeId={challenge.challengeId}
              title={challenge.title}
              category={reverseCategoryMap[challenge.categoryId]}
              imgUrl={challenge.imgUrl}
            />
          ))}
        </TopChallengeInnerContainer>
      </ChallengeContainer>
    </ChallengePageContainer>
  );
}

export default JoinedChallengeListPage;
