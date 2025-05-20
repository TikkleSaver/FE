import React, { useEffect, useState } from "react";
import styled from "styled-components";
import imageUrl from "../../images/challengeImg.png";
import participantsIcon from "../../assets/participants.svg"
import person1 from "../../images/person1.jpg";
import person2 from "../../images/person2.jpg";
import person3 from "../../images/person3.jpg";
import etcIcon from "../../assets/etc.svg";
import unscrapped from "../../assets/unscrapped.svg";
import scraped from "../../assets/scraped.svg";
import copyIcon from "../../assets/copy.svg";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Colors from "../../constanst/color.mjs";
import privateLockIcon from "../../assets/privateChallenge.svg";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

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
margin-left: 40px;
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

const ChallengeInnerContainer = ({ title, category, description, status, isPublic, scrapped, challengerCount, onJoin }) => {
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
              <img src={person1} alt="person1" />
              <img src={person2} alt="person2" />
              <img src={person3} alt="person3" />
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
            <PublicSingUpBtn onClick={() => onJoin('JOINED')}>챌린지 가입하기</PublicSingUpBtn>
          ) : (
            <PrivateSingUpBtn onClick={() => onJoin('PENDING')}>챌린지 가입하기</PrivateSingUpBtn>
          )}

          <IconsContainer>
            <ScrapContainer>
              {scrapped ? (<img src={scraped} alt="스크랩" />) : (<img src={unscrapped} alt="스크랩" />)}
            </ScrapContainer>
            <CopyContainer>
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

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await axios.get(`${baseUrl}/challenges/join-challenge/${challengeId}`);
        setChallengeData(res.data.result);
        setStatus(res.data.result.status);

      } catch (error) {
        console.error('챌린지 정보 불러오기 실패:', error);
      }
    };

    fetchChallenge();
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

  return (
    <SignUpPageContainer>
      <ChallengeInfoContainer>
        <ChallengeImage imageUrl={imgUrl} />
        <ChallengeInnerContainer
          title={title}
          category={category}
          description={description}
          status={status}
          isPublic={isPublic}
          scrapped={scrapped}
          challengerCount={challengerCount}
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