import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Top from '../../components/home/Top';
import ChallengePreviewCard from '../../components/challenge/ChallengePreviewCard';
import ExpenseSection from '../../components/home/ExpenseSection';
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
const MoreBtn = styled(Link)`
  color: #6b6b6b;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
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
  return (
    <>
      <Top />
      <ChallengeContainer>
        <TopChallengeText>
          <div>챌린지 도전하기</div>
          <MoreBtn>{'더보기>'}</MoreBtn>
          {/* <MoreBtn to="/savedChallenge">{'더보기>'}</MoreBtn> */}
        </TopChallengeText>
        <TopChallengeInnerContainer>
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
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
