import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import emptyImageUrl from '../../images/emptyCertificationImg.svg';
import top3RankImg from '../../images/profile.svg';
import firstCrown from '../../assets/1stCrown.svg';
import secondCrown from '../../assets/2stCrown.svg';
import thirdCrown from '../../assets/3stCrown.svg';
import { useParams } from "react-router-dom";
import { getMissionProofMain } from "../../api/challenge/challengeDetailApi"; 


const ChallengeMainWrapper = styled.div`
  width: 85%;
  max-width: 100%;
  margin: 30px auto;
  display: flex;
`;

const LeftContainer = styled.div`
  width: 60%;
`;
const RightContainer = styled.div``;

const AchievementRateContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-bottom: 2px solid #dddddd; // 원하는 색상과 두께로 조절
`;
const AchievementText = styled.div`
  font-size: 19px;
  font-weight: 600;
  margin-left: 5px;
`;
const AchievementRateText = styled.div`
  font-size:21px;
  font-weight:600
  width: fit-content;
  margin-left: auto; 
  font-weight: 600;
  color:#51B69E;
  margin-bottom:30px;
`;

const AchievementRateInnerContainer = styled.div`
  position: relative;
  height: 15px;
  width: 100%;
  background-color: #e0e0e0; // 회색 기본 줄
  border-radius: 10px;
  overflow: hidden;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 5px;
`;

const RateBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ rate }) => rate}%;
  background-color: #51b69e;
  transition: width 0.3s ease;
  border-radius: 10px;
`;

const CertificationRecordContainer = styled.div`
  display: flex;
  align-items: center;
  padding-top: 20px;
  width: fit-content;
`;

const VerticalDivider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #d3d3d3;
  margin: 0 40px;
`;
const SuccessContainer = styled.div`
  margin-left: 5px;
`;
const SuccessText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #979595;
  margin-bottom: 15px;
`;
const SuccessCount = styled.div`
  font-size: 23px;
  font-weight: 700;
  color: #333333;
`;

const FailedContainer = styled.div``;

const FailedText = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #979595;
  margin-bottom: 15px;
`;
const FailedCount = styled.div`
  font-size: 23px;
  font-weight: 700;
  color: #333333;
`;

const CertificationImgContainer = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CertificationImg = styled.img`
  width: calc((100% - 10px * 6) / 7);
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 10px;
`;
const MonthlyRankContainer = styled.div`
  width: 100%;
  gap: 10px;
`;
const MonthlyRankText = styled.div`
  font-size: 19px;
  font-weight: 600;
  margin-left: 110px;
`;

const MonthlyRankInnerContainer = styled.div`
  margin-top: 28px;
  margin-left: 105px;
  display: flex;
  gap: 25px;
`;

const TopRankImgWrapper = styled.div`
  margin-top: 15px;
  position: relative;
  width: 80px;
  height: 80px;
`;

const TopRankImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const RankIcon = styled.img`
  position: absolute;
  top: -20px;
  right: -15px;
  width: 32px;
  height: 32px;
`;

const AchievementSection = ({ rate }) => (
  <AchievementRateContainer>
    <AchievementText>달성률</AchievementText>
    <AchievementRateInnerContainer>
      <RateBar rate={rate} />
    </AchievementRateInnerContainer>
    <AchievementRateText>{rate}%</AchievementRateText>
  </AchievementRateContainer>
);

const CertificationRecordSection = ({ successCount, failedCount }) => (
  <CertificationRecordContainer>
    <SuccessContainer>
      <SuccessText>인증 성공</SuccessText>
      <SuccessCount>{successCount}회</SuccessCount>
    </SuccessContainer>
    <VerticalDivider />
    <FailedContainer>
      <FailedText>인증 실패</FailedText>
      <FailedCount>{failedCount}회</FailedCount>
    </FailedContainer>
  </CertificationRecordContainer>
);

const CertificationImageGrid = ({ images }) => (
  <CertificationImgContainer>
    {images.map((src, idx) => (
      <CertificationImg key={idx} src={src} alt="Certification" />
    ))}
  </CertificationImgContainer>
);

const MonthlyRankSection = ({ top3 }) => (
  <MonthlyRankContainer>
    <MonthlyRankText>이번 달 순위는?</MonthlyRankText>
    <MonthlyRankInnerContainer>
      {top3.map(({ img, crown, alt }, idx) => (
        <TopRankImgWrapper key={idx}>
          <TopRankImg src={img} alt={alt} />
          <RankIcon src={crown} alt={`${idx + 1}위`} />
        </TopRankImgWrapper>
      ))}
    </MonthlyRankInnerContainer>
  </MonthlyRankContainer>
);

const ChallengeMainComponent = () => {
  const { challengeId } = useParams();
  const [rate, setRate] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [failCount, setFailCount] = useState(0);
  const [imageList, setImageList] = useState([]);
  const [top3List, setTop3List] = useState([]);

  const createDateImageArray = (missionProofs, today = new Date()) => {
    const dateMap = new Map();
    missionProofs.forEach(({ createdAt, imageUrl }) => {
      const date = new Date(createdAt).getDate(); 
      dateMap.set(date, imageUrl);
    });
  
    const todayDate = today.getDate();
    const imageArray = [];
  
    for (let i = 1; i <= todayDate; i++) {
      if (dateMap.has(i)) {
        imageArray.push(dateMap.get(i));
      } else {
        imageArray.push(emptyImageUrl);
      }
    }
  
    return imageArray;
  };

  const createTop3List = (top3Rankings) => {
    const crownList = [firstCrown, secondCrown, thirdCrown];
  
    return top3Rankings.map((ranking, idx) => ({
      img: ranking.imageUrl ?? top3RankImg,
      crown: crownList[idx],
      alt: `${idx + 1}st Place`
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getMissionProofMain(challengeId);

        setRate(Math.round(result.successRate * 100) / 100);
        setSuccessCount(result.successCount);
        setFailCount(result.failCount);

        const filledImageList = createDateImageArray(result.missionProofs);
        setImageList(filledImageList);

        const top3 = createTop3List(result.top3Rankings);
        setTop3List(top3);

      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    };

    fetchData();
  }, [challengeId]);

  return (
    <ChallengeMainWrapper>
      <LeftContainer>
        <AchievementSection rate={rate} />
        <CertificationRecordSection successCount={successCount} failedCount={failCount} />
        <CertificationImageGrid images={imageList} />
      </LeftContainer>
      <RightContainer>
        <MonthlyRankSection top3={top3List} />
      </RightContainer>
    </ChallengeMainWrapper>
  );
};
export default ChallengeMainComponent;
