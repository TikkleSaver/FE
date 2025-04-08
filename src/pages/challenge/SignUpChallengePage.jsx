import React, { useEffect, useState } from "react";
import styled from "styled-components";
import imageUrl from "../../images/challengeImg.png";
import participantsIcon from "../../assets/participants.svg"
import person1 from "../../images/person1.jpg"
import person2 from "../../images/person2.jpg"
import person3 from "../../images/person3.jpg"
import etcIcon from "../../assets/etc.svg"
import unscrapped from "../../assets/unscrapped.svg"
import scrapped from "../../assets/scrapped.svg"
import copyIcon from "../../assets/copy.svg"

const SignUpPageContainer = styled.div`
  width:70%;
  max-width: 100%;
  margin: 160px auto;
  justify-content: center; 

`;

const ChallengeInfoContainer = styled.div`
  display: flex;
  justify-content: center;  

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

`;

const SingUpBtn = styled.button`

font-size: 18px;
width: 180px;
color: white;
background-color: #3D8D7A;
border: 1px solid #2A6658;
padding: 10px 10px;
border-radius: 10px;

`;


const ButtonContainer = styled.div`

margin-top: 20px; 
display:flex;


`;

const IconsContainer = styled.div`
margin-left: 60px;
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
}

`;



const ChallengeInnerContainer =()=>{
    return (
    <InfoContainer>

    <ChallengeInfo>
    <Title>커피값 세이브커피값 세이브커피값 세이브</Title>
    <Category>기타 생활비</Category>

    <ParticipantsContainer>
    <ParticipantsNumContainer>
      <ParticipantsIcon > <img src={participantsIcon}/></ParticipantsIcon>
      <ParticipantsNum>10명</ParticipantsNum>
    </ParticipantsNumContainer>


    <ParticipantsImgContainer>
        <Participants3Img>
        <img src={person1} alt="person1"/>
        <img src={person2} alt="person2"/>
        <img src={person3} alt="person3"/>
        </Participants3Img>
        <ParticipantsEtc>
        <img src={etcIcon} alt="etc"/>
        </ParticipantsEtc>
    </ParticipantsImgContainer>
    
    </ParticipantsContainer>
    <ChallengeDescription>
    1일 1커피 사먹는 사람들 모여! 3000원씩 한 달이면 9만원 일 년이면 100만원?! 집에서 커피 타오기 인증하는 방. 탕비실 터는 것도 가능^^ 1일 1커피 사먹는 사람들 모여! 3000원씩 한 달이면 9만원 일 년이면 100만원?! 집에서 커피 타오기 인증하는 방. 탕비실 터는 것도 가능^^ 1일 1커피 사먹는 사람들 모여! 3000원씩 한 달이면 9만원 일 년이면 100만원?! 집에서 커피 타오기 인증하는 방. 탕비실 터는 것도 가능^^ 탕비실 터는 것도 가능^^ 탕비실 터는 것도 가능^^ 탕비실 터는 것도 가능^^ 가능^^
    </ChallengeDescription>

    <ButtonContainer>
     <SingUpBtn>챌린지 가입하기</SingUpBtn>
     <IconsContainer>
        <ScrapContainer>
            <img src={unscrapped} alt="스크랩"/>
        </ScrapContainer>
        <CopyContainer>
        <img src={copyIcon} alt="복사"/>
        </CopyContainer>
     </IconsContainer>
    </ButtonContainer>
    </ChallengeInfo>
  </InfoContainer>
    );
}


function SignUpPageChallengePage() {

  return (
    <SignUpPageContainer>
        <ChallengeInfoContainer>
         <ChallengeImage imageUrl={imageUrl} />
         <ChallengeInnerContainer/>
         </ChallengeInfoContainer>
         <CheckListContainer>
            <CheckListText>인증 방식</CheckListText>
            <CheckListInnerContainer>
                <ul>
                    <li>
                    커피를 타는 사진 매일매일 인증하기 ( 커피믹스, 캡슐커피, 차 모두 가능 ) 커피를 타는 사진 매일매일 인증하기 ( 커피믹스, 캡슐커피, 차 모두 가능 ) 커피를 타는 사진 매일매일 인증하기 ( 커피믹스, 캡슐커피, 차 모두 가능 )
                    </li>
                    <li>
                    커피를 타는 사진 매일매일 인증하기 ( 커피믹스, 캡슐커피, 차 모두 가능 )
                    </li>
                </ul>
            </CheckListInnerContainer>
         </CheckListContainer>
      
     
    </SignUpPageContainer>
  );
}

export default SignUpPageChallengePage;