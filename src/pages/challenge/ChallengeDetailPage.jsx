import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mainIcon from "../../assets/mainIcon.svg";
import certifyIcon from "../../assets/certifyIcon.svg";
import challengerIcon from "../../assets/challengerIcon.svg";
import chaellengeImg from "../../images/challengeImg.png";
import quitBtnIcon from "../../assets/quitBtnIcon.svg"


const ChallengeContainer = styled.div`

  margin: 0 auto;
  padding-top:120px;
  background-color: rgba(163, 209, 198, 0.15);
`;

const ChallengInfoContainer = styled.div`

  margin: 0 auto;
  margin-bottom:50px;
  width:85%;
  display:flex;
  justify-content: space-between;

img
{  
   width:220px;
   height:165;
   border-radius:15px;
}
`;


const ChallengeInnerWrapper= styled.div`
  display: flex;

`;
const ChallengeInfoWrapper = styled.div`
  margin-top:10px;


`;

const ChallengeTitle = styled.span`

font-size:23px;
font-weight:600;
margin-left:30px;
color:#333333;


`;

const ChallengeCheckList= styled.ul`

display:flex;

color: #606060;
  list-style: none;
 display: flex;
  flex-direction: column;
  gap:8px;

li::before {
  content: "-";
  margin-right: 8px; 
 color: #606060;   
}

`;


const ChallengeQuitBtn= styled.button`

width:50px;
height:50px;
border-radius:100px;
background-color: #F9FAFC;
border: 1px solid #E5E5E5;
img{
width:25px;}

`;
const TabContainer = styled.div`

  border-bottom: 2px solid #e0e0e0; // 기본 밑줄
  padding-bottom: 10px;

`;
const TabInnerContainer = styled.div`


  width:85%;
  display: flex;
  gap: 30px;
  position: relative;
    margin: 0 auto;
  


`;
const Tab = styled.div`
  position: relative;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;

  color: ${(props) => (props.$active === "true" ? "#333333" : "#606060")};
  display: flex;
  align-items: center;

  &::after {
    content: "";
    position: absolute;
    bottom: -12px;
    left: 0;
    width: 100%;
    height: 2.5px;
    background-color: ${(props) =>
      props.$active === "true" ? "#FFB129" : "transparent"};
    z-index: 1;
    transition: background-color 0.2s ease;
  }

  img {
  width:20px;
    margin-bottom: 5px;
    margin-right: 8px;
    filter: ${(props) =>
      props.$active === "true"
        ? "brightness(0) saturate(100%)" 
        : "grayscale(100%)"}; 
    transition: filter 0.2s ease;
  }

.CountStyle{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  font-size: 18px;
  font-weight: 500;
  background-color: #E5E5E5;
  color: #606060;
  border-radius: 50%;
  margin-left: 6px;
  }
`;
const TopChallengeInnerContainer = styled.div`

`;
function ChallengeDetailPage() {

  const [selectedTab, setSelectedTab] = useState("메인");
  const tabs = [
    { name: "메인", icon: mainIcon },
    { name: "인증하기", icon: certifyIcon },
    { name: "챌린저", icon: challengerIcon, count: 27 },
  ];

  return (
    <ChallengeContainer>

<ChallengInfoContainer>
    <ChallengeInnerWrapper>
    <img src={chaellengeImg}/>
   
   <ChallengeInfoWrapper>
        <ChallengeTitle>커피값 세이브</ChallengeTitle>
        <ChallengeCheckList>
            <li>
                밥 먹기
            </li>
            <li>
                밥 먹기
            </li>
        </ChallengeCheckList>
        </ChallengeInfoWrapper>
        </ChallengeInnerWrapper>
        <ChallengeQuitBtn>
            <img src={quitBtnIcon} alt="나가기"/>
        </ChallengeQuitBtn>
</ChallengInfoContainer>
<TabContainer>
    <TabInnerContainer>
  {tabs.map((tab) => (
    <Tab
      key={tab.name}
      $active={selectedTab === tab.name ? "true" : "false"}
      onClick={() => setSelectedTab(tab.name)}
    >
      <img src={tab.icon} alt={tab.name} />
      <span>
      {tab.name}
      {tab.name === "챌린저" && tab.count !== undefined && (
        <span className="CountStyle">
          {tab.count}
        </span>
      )}
    </span>
    </Tab>
  ))}
  </TabInnerContainer>
</TabContainer>
      <TopChallengeInnerContainer>
        {/* 선택된 탭에 따른 내용 */}
      </TopChallengeInnerContainer>
    </ChallengeContainer>
  );
}

export default ChallengeDetailPage;