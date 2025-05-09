import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChallengePreviewCard from '../../components/challenge/ChallengePreviewCard';
import profileImage from '../../images/profile.svg';
import friend from '../../images/myprofile/friend.svg';

export default function MyProfile() {
  return (
    <Wrapper>
      <ProfileContainer>
        <img src={profileImage} alt="My Page" />
        <ProfileBox>
          <Top>
            <NickName>티모</NickName>
            <ButtonGroup>
              <UpdateBtn>프로필 편집</UpdateBtn>
              <PlusBtn>
                + <img src={friend} alt="My Page" />
              </PlusBtn>
            </ButtonGroup>
          </Top>
          <Bottom>
            <Group>
              <Number>0</Number>
              <Name>위시리스트</Name>
            </Group>
            <Group>
              <Number>4</Number>
              <Name>참여중인 챌린지</Name>
            </Group>
            <Group>
              <Number>17</Number>
              <Name>친구</Name>
            </Group>
          </Bottom>
        </ProfileBox>
      </ProfileContainer>
      <ChallengeContainer>
        <TopChallengeText>저장한 챌린지</TopChallengeText>
        <TopChallengeInnerContainer>
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
        </TopChallengeInnerContainer>
      </ChallengeContainer>
    </Wrapper>
  );
}
const Group = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.span`
  color: black;
  font-size: 1.2rem;
  font-weight: 400;
`;
const Number = styled.span`
  margin: 30px 0;
  color: black;
  font-size: 1.3rem;
  font-weight: 500;
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const PlusBtn = styled.button`
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: 400;
  border-radius: 6px;
  word-wrap: break-word;
  cursor: pointer;
  border: 1px #e5e5e5 solid;
  background-color: transparent;

  img {
    width: 15px;
    height: 15px;
  }
`;

const UpdateBtn = styled.button`
  margin-left: 20px;
  width: 150px;
  font-size: 15px;
  font-weight: 400;
  border-radius: 6px;
  word-wrap: break-word;
  cursor: pointer;
  border: 1px #e5e5e5 solid;
  background-color: transparent;
`;

const Top = styled.div`
  display: flex;
  height: fit-content;
  justify-content: space-between;
  min-width: 100%;
  max-width: fit-content;
`;
const Bottom = styled.div`
  display: flex;
  width: max-content;
  gap: 40px;
`;

const NickName = styled.span`
  min-width: max-content;
  color: black;
  font-size: 27px;
  font-family: Pretendard;
  font-weight: 500;
`;
const ProfileBox = styled.div`
  margin-right: 220px;
  width: fit-content;
  display: flex;
  flex-direction: column;
`;
const Wrapper = styled.div`
  width: 80%;
  max-width: fit-content;
  margin: 120px auto;
`;
const ProfileContainer = styled.div`
  display: flex;
  margin: 50px 30px;
  width: fit-content;
  align-items: center;
  > img {
    width: 220px;
    height: 220px;
    margin: 0 50px;
  }
`;
const ChallengeContainer = styled.div`
  margin: 50px auto;
  width: 100%;
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

const TopChallengeText = styled.div`
  width: 100%;
  margin-bottom: 30px;
  font-size: 25px;
  font-weight: 600;
`;
