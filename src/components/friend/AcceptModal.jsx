import React from 'react';
import styled from 'styled-components';
import { acceptFriendReq, deleteFriendReq } from '../../api/friendRequestApi';

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

const AcceptModal = ({ nickname, friendReqId, onClose }) => {
  // 배경 클릭 시 모달 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAccept = async (e) => {
    e.stopPropagation();
    try {
      await acceptFriendReq(friendReqId);
      onClose();
      alert('친구 요청을 수락했습니다.');
    } catch (error) {
      alert('친구 요청 수락에 실패했습니다.');
    }
  };

  const handleReject = async (e) => {
    e.stopPropagation();
    try {
      await deleteFriendReq(friendReqId);
      onClose();
      alert('친구 요청을 거절했습니다.');
    } catch (error) {
      alert('친구 요청 거절에 실패했습니다.');
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalTitle>친구 요청</ModalTitle>
        <span>{nickname}님 에게 친구 요청이 왔어요</span>
        <SubmitButton onClick={(e) => handleAccept(e)}>수락하기</SubmitButton>

        <CloseButton onClick={(e) => handleReject(e)}>거절하기</CloseButton>
      </ModalBox>
    </Overlay>
  );
};

export default AcceptModal;
