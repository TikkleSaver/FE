import React, { useEffect, useState } from "react";
import styled from "styled-components";
import participantsIcon from "../../assets/participants.svg"
import defaultImg from "../../images/profile.svg";
import etcIcon from "../../assets/etc.svg";
import unscrapped from "../../assets/unscrapped.svg";
import scraped from "../../assets/scraped.svg";
import copyIcon from "../../assets/copy.svg";
import { useParams } from 'react-router-dom';
import Colors from "../../constanst/color.mjs";
import privateLockIcon from "../../assets/privateChallenge.svg";
import { fetchChallenge } from "../../api/challenge/challengeDetailApi";
import { toggleChallengeScrap, joinChallenge } from "../../api/challenge/challenegeSignUpApi";

const SignUpPageContainer = styled.div`
  width:70%;
  max-width: 100%;
  margin: 160px auto;
  justify-content: center; 

`;

const ChallengeInfoContainer = styled.div`
  display: flex;

`;

const InfoContainer = styled.div`

 margin-left:20px;
 position: relative;
 height: 300px;

`;


const ChallengeInfo = styled.div`
  
   padding: 5px 10px;

`;

const ChallengeImage = styled.div`
  width: 420px;
  height: 315px;
  flex-shrink: 0; 
  background-color: rgba(57, 57, 57, 0.8);
  border-radius: 20px;
  margin-bottom: 10px;
  margin-right: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; /* 이미지를 반복하지 않도록 설정 */
`;

const Title = styled.span`
  font-size: 25px;
  font-weight: 700;
  color: #333333;
`;

const PrivateIcon = styled.img`
width: 25px;
position: relative;
top: 3px;
left: 3px;

`;

const Category = styled.span`
  font-size: 18px;
  color: #6B6B6B;
  font-weight: 500;
  margin-left: 12px;

`;

const ParticipantsContainer = styled.div`

display: flex;
`;

const ParticipantsNumContainer = styled.div`

margin-top: 9px;
`;


const ParticipantsIcon = styled.span`
 

img{
width: 23px;
margin-top:10px;
}

`;
const ParticipantsNum = styled.span`
  font-size: 20px;
  color: #6B6B6B;
  font-weight: 600;
  margin-left: 8px;

`;

const ParticipantsImgContainer = styled.div`
display: flex;
margin-left: 10px;
margin-top:5px;    

`;
const Participants3Img = styled.span`
display: flex;
  align-items: center;

  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
    border: 1px solid white; // 겹칠 때 깔끔하게 보이게
    margin-left: -10px;

    &:first-child {
      margin-left: 0;
    }
  }

`;

const ParticipantsEtc = styled.span`

`;

const ChallengeDescription = styled.div`


  font-size: 18px;
  color: #6B6B6B;
  font-weight: 400;
  margin-top:5px;
  line-height: 1.2;
  word-break: keep-all;     
  white-space: normal;    
  overflow-wrap: break-word; 

`;

const ButtonContainer = styled.div`

margin-top: 20px; 
display:flex;


`;

const IconsContainer = styled.div`
margin-left: 30px;
display:flex;
gap:10px;
`;

const ScrapContainer = styled.div`

width: 50px;
height: 50px;
background-color: #F9FAFC;
border-radius: 100px;
display: flex;
justify-content: center; 
align-items: center;   
border: 1px solid #E5E5E5;

img{
width:30px;
cursor: pointer;
}

`;

const CopyContainer = styled.div`

width: 50px;
height: 50px;
background-color: #F9FAFC;
border-radius: 100px;
display: flex;
justify-content: center; 
align-items: center;   
border: 1px solid #E5E5E5;

img{
width:30px;
}

`;

const CheckListContainer = styled.div`

margin-top:50px;

`;

const CheckListText = styled.div`
font-size: 23px;
font-weight: 600;
margin-left: 10px;
margin-bottom: 15px;

`;
const CheckListInnerContainer = styled.div`
width: 100%;
background-color: #F9FAFC;
border-radius: 10px;
display: flex;
align-items: center;   
border: 1.5px solid #E5E5E5;
padding: 10px 5px;

ul{
 display: flex;
  flex-direction: column;
  gap: 15px; 

}
li{

font-size: 18px;
font-weight:500;
color:#333333
word-break: keep-all;     
white-space: normal;    
overflow-wrap: break-word; 
}

`;

const PublicSingUpBtn = styled.button`

font-size: 18px;
width: 180px;
color: white;
background-color: ${Colors.primary};
border: 1px solid ${Colors.primary500};
padding: 10px 10px;
border-radius: 10px;
cursor: pointer;

`;

const PrivateSingUpBtn = styled.button`

font-size: 18px;
width: 180px;
color: white;
background-color: ${Colors.primary};
border: 1px solid #2A6658;
padding: 10px 10px;
border-radius: 10px;
cursor: pointer;

`;
const PendingBtn = styled.button`

font-size: 18px;
width: 180px;
color:  ${Colors.secondary400};
background-color: ${Colors.secondary100};
border: 1px solid ${Colors.secondary200};
padding: 10px 10px;
border-radius: 10px;


`;
const JoinedBtn = styled.button`

font-size: 18px;
width: 180px;
color:  ${Colors.secondary400};
background-color: ${Colors.secondary100};
border: 1px solid ${Colors.secondary200};
padding: 10px 10px;
border-radius: 10px;

`;

const ChallengeInnerContainer = ({ challengeId, title, category, description, status, isPublic, scrapped: initialScrapped, challengerCount, top3Challenger, onJoin }) => {
const [scrapped, setScrapped] = useState(initialScrapped);

const toggleScrap = async () => {
  try {
    const result = await toggleChallengeScrap(challengeId, scrapped);
    setScrapped(result.scrapped);
    console.log(result.message);
  } catch (error) {
    console.error('스크랩 상태 변경 실패:', error);
  }
};

const handleJoinClick = async (newStatus) => {
  try {
    await joinChallenge(challengeId);
    onJoin(newStatus); 
  } catch (error) {
    console.error('챌린지 가입 실패:', error);
  }
};

const copyCurrentUrl = () => {
  const currentUrl = window.location.href;
  navigator.clipboard.writeText(currentUrl)
    .then(() => alert("페이지 주소가 복사되었습니다!"))
    .catch((err) => alert("복사에 실패했습니다."));
};

  return (
    <InfoContainer>
      <ChallengeInfo>
        <Title>{title}</Title>
        {isPublic === 'PRIVATE' && <PrivateIcon src={privateLockIcon} />}
        <Category>{category}</Category>
        <ParticipantsContainer>
          <ParticipantsNumContainer>
            <ParticipantsIcon>
              <img src={participantsIcon} alt="참여 아이콘" />
            </ParticipantsIcon>
            <ParticipantsNum>{challengerCount}명</ParticipantsNum>
          </ParticipantsNumContainer>
          <ParticipantsImgContainer>
            <Participants3Img>
            {top3Challenger.map((c, idx) => (
  <img
    key={idx}
    src={c.imageUrl || defaultImg}
    alt={`챌린저 ${idx}`}
  />
))}
            </Participants3Img>
            <ParticipantsEtc>
              <img src={etcIcon} alt="etc" />
            </ParticipantsEtc>
          </ParticipantsImgContainer>
        </ParticipantsContainer>
        <ChallengeDescription>{description}</ChallengeDescription>
        <ButtonContainer>
        {status === 'JOINED' ? (
        <JoinedBtn>챌린지 가입 완료</JoinedBtn>
          ) : status === 'PENDING' ? (
           <PendingBtn>가입 요청 중...</PendingBtn>
          ) : isPublic === 'PUBLIC' ? (
         <PublicSingUpBtn onClick={() => handleJoinClick('JOINED')}>챌린지 가입하기</PublicSingUpBtn>
          ) : (
         <PrivateSingUpBtn onClick={() => handleJoinClick('PENDING')}>챌린지 가입하기</PrivateSingUpBtn>
          )}
          <IconsContainer>
          <ScrapContainer onClick={toggleScrap}>
        {scrapped ? (
          <img src={scraped} alt="스크랩됨" />
        ) : (
          <img src={unscrapped} alt="스크랩 안됨" />
        )}
      </ScrapContainer>
            <CopyContainer onClick={copyCurrentUrl}>
              <img src={copyIcon} alt="복사" />
            </CopyContainer>
          </IconsContainer>
        </ButtonContainer>
      </ChallengeInfo>
    </InfoContainer>
  );
};

function SignUpPageChallengePage() {
  const { challengeId } = useParams();
  const [challengeData, setChallengeData] = useState(null);
  const [status, setStatus] = useState(null);
  const [challenger, setChallenger] = useState([]);

  useEffect(() => {
    const fetchChallengeInfo = async () => {
      try {
        const res = await fetchChallenge(challengeId);
        setChallengeData(res);
        setStatus(res.status);
        setChallenger(res.top3Challenger)

      } catch (error) {
        console.error('챌린지 정보 불러오기 실패:', error);
      }
    };

    fetchChallengeInfo();
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
    challengerCount,
    top3Challenger
  } = challengeData;

  return (
    <SignUpPageContainer>
      <ChallengeInfoContainer>
        <ChallengeImage imageUrl={imgUrl} />
        <ChallengeInnerContainer
          challengeId={challengeId}
          title={title}
          category={category}
          description={description}
          status={status}
          isPublic={isPublic}
          scrapped={scrapped}
          challengerCount={challengerCount}
          top3Challenger={top3Challenger}
          onJoin={setStatus}
        />
      </ChallengeInfoContainer>
      <CheckListContainer>
        <CheckListText>인증 방식</CheckListText>
        <CheckListInnerContainer>
          <ul>
            {missionMethods.map((method, index) => (
              <li key={index}>{method}</li>
            ))}
          </ul>
        </CheckListInnerContainer>
      </CheckListContainer>
    </SignUpPageContainer>
  );
}
export default SignUpPageChallengePage;