import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mainIcon from "../../assets/mainIcon.svg";
import certifyIcon from "../../assets/certifyIcon.svg";
import challengerIcon from "../../assets/challengerIcon.svg";
import quitBtnIcon from "../../assets/quitBtnIcon.svg";
import ChallengeMainComponent from "../../components/challenge/ChallengeMainComponent";
import ChallengeCertifyComponent from "../../components/challenge/ChallengeCertifyComponent";
import ChallengerComponent from "../../components/challenge/ChallengerComponent";
import { useParams, useNavigate  } from 'react-router-dom';
import { fetchChallenge } from "../../api/challenge/challengeDetailApi";
import plus from "../../assets/plus.svg"
import Colors from "../../constanst/color.mjs";
import editBtnIcon from "../../assets/edit.svg"
import ChallengeRequestModal from "../../components/challenge/ChallengeRequestModal";
import ChallengeExitModal from "../../components/challenge/\bChallengeExitModal";
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

`;


const ChallengeInnerWrapper= styled.div`
  display: flex;

img
{  
   width:220px;
   height:165px;
   border-radius:15px;
   object-fit: cover;      
   object-position: center;
}

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

const TabChallengeContainer = styled.div`

`;

const TopChallengeInnerContainer = styled.div`

`;

const BtnContainer = styled.div`
 display:flex;
 gap:20px;

`;

const EditChallengeBtn = styled.button`

width:50px;
height:50px;
border-radius:100px;
background-color: #F9FAFC;
border: 1px solid #E5E5E5;
img{
width:25px;}
`;

const AcceptBtnContainer = styled.button`

width:160px;
height:50px;
border-radius:10px;
background-color: #F9FAFC;
border: 1px solid #E5E5E5;
display:flex;
padding: 13px 8px 8px 8px;
`;
const AcceptBtnIcon = styled.img`
width:22px;
height:22px;

`;
const AcceptBtnText = styled.div`
font-size:16px;
padding-top:2px;
padding-left:5px;
color: ${Colors.secondary400}
`;



function ChallengeDetailPage() {
  const [selectedTab, setSelectedTab] = useState("메인");
  const { challengeId } = useParams();
  const [challengeData, setChallengeData] = useState(null);
  const [status, setStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberId, setMemberId] = useState(null); 
  const [leaderId, setLeaderId] = useState(null); 
  const [publicStatus, setPublicSatus] = useState('');
  const navigate = useNavigate();

 console.log("leaderId",leaderId)


 const handleUpdateChallenge = () => {
  navigate(`/challenge-info/${challengeId}/update-challenge`);
};

   const handleModal = () => {
    setShowModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const loadChallenge = async () => {
      try {
        const data = await fetchChallenge(challengeId);
        setChallengeData(data);
        setMemberId(data.memberId)
        setStatus(data.status);
        setLeaderId(data.leaderId);
        setPublicSatus(data.isPublic);
      } catch (error) {
        
      }
    };
    loadChallenge();
  }, [challengeId]);




  if (!challengeData) return <div>로딩 중...</div>;

  const {
    title,
    category,
    description,
    imgUrl,
    missionMethods,
    isPublic,
    scrapped,
    challengerCount
  } = challengeData;

  const tabs = [
    { name: "메인", icon: mainIcon },
    { name: "인증하기", icon: certifyIcon },
    { name: "챌린저", icon: challengerIcon, count: challengerCount },
  ];

  return (
    <>
      <ChallengeContainer>
        <ChallengInfoContainer>
          <ChallengeInnerWrapper>
            <img src={imgUrl} />
            <ChallengeInfoWrapper>
              <ChallengeTitle>{title}</ChallengeTitle>
              <ChallengeCheckList>
              {missionMethods.map((method, index) => (
              <li key={index}>{method}</li>
            ))}
              </ChallengeCheckList>
            </ChallengeInfoWrapper>
          </ChallengeInnerWrapper>


  <BtnContainer>
  {memberId === leaderId ? (
    <>
    {isPublic === "PRIVATE" ? (
  <AcceptBtnContainer onClick={() => setShowModal(true)}>
    <AcceptBtnIcon src={plus} />
    <AcceptBtnText>챌린지 참여 요청</AcceptBtnText>
  </AcceptBtnContainer>
) : null}
  <EditChallengeBtn onClick={() => handleUpdateChallenge() }>
  <img src={editBtnIcon} alt="수정하기" />
  </EditChallengeBtn>
  </>

  ) : (
    <ChallengeQuitBtn onClick={() => setShowDeleteModal(true)}>
    <img src={quitBtnIcon} alt="나가기" />
    </ChallengeQuitBtn>
  )}
  </BtnContainer>
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
                    <span className="CountStyle">{tab.count}</span>
                  )}
                </span>
              </Tab>
            ))}
          </TabInnerContainer>
        </TabContainer>
      </ChallengeContainer>

      <TabChallengeContainer>
        <TopChallengeInnerContainer>
          {selectedTab === "메인" && <ChallengeMainComponent />}
          {selectedTab === "인증하기" && <ChallengeCertifyComponent />}
          {selectedTab === "챌린저" && <ChallengerComponent challengeId={challengeId} />}
        </TopChallengeInnerContainer>
      </TabChallengeContainer>
      {showModal && <ChallengeRequestModal onClose={handleModal} challengeId={challengeId}  />}
      {showDeleteModal && (
        <ChallengeExitModal challengeId={challengeId} onClose={handleCloseDeleteModal} />
      )}
    </>
    
  );
}

export default ChallengeDetailPage;