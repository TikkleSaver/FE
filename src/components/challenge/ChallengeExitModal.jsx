import React from 'react';
import styled from 'styled-components';
import { exitChallengRequest } from "../../api/challenge/challengeDetailApi";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.57);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 550px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    color: #606060;
  }
`;

const ModalTitle = styled.h2`
  font-size: 26px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background-color: #c7c7c7;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  padding: 5px 0;
  width: 70%;
`;

const SubmitButton = styled.button`
  background-color: #e54444;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
  padding: 5px 0;
  width: 70%;
  margin: 30px 0 15px;
`;

const ChallengeExitModal = ({challengeId, onClose }) => {
  // 배경 클릭 시 모달 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };


  const exitChallenge = async (challengeId) => {
    try {
      await exitChallengRequest(challengeId);
      alert('챌린지를 나갔습니다.');
      onClose();
      //추후 마이페이지로 이동시켜야함
    } catch (error) {
      alert('챌린지 나가기 실패');
    }
  };


  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalTitle>챌린지를 나가시겠습니까?</ModalTitle>
        <span>챌린지를 나가면 그동안 진행했던 챌린지의 정보들이 사라집니다.</span>
        <SubmitButton onClick={()=>exitChallenge(challengeId)}>챌린지 나가기</SubmitButton>
        <CloseButton onClick={onClose}>취소하기</CloseButton>
      </ModalBox>
    </Overlay>
  );
};

export default ChallengeExitModal;
