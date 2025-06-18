import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Top from '../../components/home/Top';
import ChallengePreviewCard from '../../components/challenge/ChallengePreviewCard';
import ExpenseSection from '../../components/home/ExpenseSection';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchTop4Challenges } from '../../api/challenge/challengeApi';

const ChallengeContainer = styled.div`
  margin: 50px auto;
  width: 1090px;
`;
const TopChallengeText = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
  font-size: 25px;
  font-weight: 600;
  > span {
    color: #6b6b6b;
    font-size: 1rem;
    font-weight: 400;
  }
`;
const MoreBtn = styled.span`
  color: #6b6b6b;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
  cursor: pointer;
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
export default function MainPage() {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState([]);

  const reverseCategoryMap = {
    1: '식비',
    2: '카페',
    3: '쇼핑',
    4: '건강',
    5: '취미',
    6: '교통비',
    7: '기타 생활비',
  };

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const data = await fetchTop4Challenges();
        setChallenges(data);
      } catch (err) {
        console.error('인기 챌린지 불러오기 실패:', err);
      }
    };

    loadChallenges();
  }, []);

  return (
    <>
      <Top />
      <ChallengeContainer>
        <TopChallengeText>
          <div>챌린지 도전하기</div>
          <MoreBtn onClick={() => navigate('/challenges')}>{'더보기>'}</MoreBtn>
        </TopChallengeText>
        <TopChallengeInnerContainer>
          {challenges.map((challenge) => (
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
      {/* 수정필요 */}
      <ChallengeContainer>
        <TopChallengeText>
          <div>소비 차트 한눈에 보기</div>
        </TopChallengeText>
        <ExpenseSection />
      </ChallengeContainer>
    </>
  );
}
