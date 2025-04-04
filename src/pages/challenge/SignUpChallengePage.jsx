import React, { useEffect, useState } from "react";
import styled from "styled-components";
import imageUrl from "../../images/challengeImg.png";
import participantsIcon from "../../assets/Participants.svg"
const SignUpPageContainer = styled.div`
  width:80%;
  max-width: 100%;
  margin: 140px auto;
`;

const ChallengeInfoContainer = styled.div`
  width:90%;
  max-width: 100%;
  margin: 0 auto;
  display:flex;
`;


const ChallengeInfo = styled.div`
  
   padding: 5px 10px;


`;

const ChallengeImage = styled.div`
  width: 400px;
  height: 300px;
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
  font-size: 14px;
  color: #6B6B6B;
  font-weight: 600;
`;

const ParticipantsContainer = styled.div`

`;

const ParticipantsNum = styled.span`
  font-size: 14px;
  color: #6B6B6B;
  font-weight: 600;
`;



function SignUpPageChallengePage() {

  return (
    <SignUpPageContainer>
        <ChallengeInfoContainer>
          <ChallengeImage imageUrl={imageUrl} />
          <ChallengeInfo>
          <Title>커피값 세이브</Title>
          <Category>카페/간식</Category>
          <ParticipantsContainer>
            <img src={participantsIcon}/>
            <ParticipantsNum>10명</ParticipantsNum>

          </ParticipantsContainer>
          </ChallengeInfo>
        </ChallengeInfoContainer>
     
    </SignUpPageContainer>
  );
}

export default SignUpPageChallengePage;