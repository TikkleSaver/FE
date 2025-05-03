import React from "react";
import styled from "styled-components";
import top3RankImg from "../../images/top3RankImg.png";

const ChallengerWrapper = styled.div`
  width: 70%;
  margin: 70px auto;
`;

const ChallengerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 55px;
`;

const ChallengerInfo = styled.div`
  display: flex;
`;

const ChallengerImg = styled.img`
  width: 100px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50px;
`;

const ChallengerName = styled.div`
  font-size: 20px;
  margin-top: 20px;
  margin-left: 25px;
`;

const ChallengerProfileBtn = styled.button`
  border-radius: 15px;
  padding: 13px 18px;
  font-size: 20px;
  background-color: #51b69e;
  color: white;
  border: none;
`;

function CertifyComponent({ name, imgSrc }) {
  return (
    <ChallengerContainer>
      <ChallengerInfo>
        <ChallengerImg src={imgSrc} />
        <ChallengerName>{name}</ChallengerName>
      </ChallengerInfo>
      <ChallengerProfileBtn>프로필 보러가기</ChallengerProfileBtn>
    </ChallengerContainer>
  );
}

const ChallengerComponent = () => {
  // 목데이터 배열
  const mockData = [
    { name: "홍길동", imgSrc: top3RankImg },
    { name: "김철수", imgSrc: top3RankImg },
    { name: "박영희", imgSrc: top3RankImg },
    { name: "이민호", imgSrc: top3RankImg },
    { name: "최지우", imgSrc: top3RankImg },
  ];

  return (
    <ChallengerWrapper>
      {mockData.map((item, index) => (
        <CertifyComponent key={index} name={item.name} imgSrc={item.imgSrc} />
      ))}
    </ChallengerWrapper>
  );
};

export default ChallengerComponent;
