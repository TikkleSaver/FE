import React from 'react';
import styled from 'styled-components';
import { deleteFriend } from '../../api/friendApi'; // 경로는 실제 프로젝트 구조에 맞게 수정

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

const DeleteModal = ({ profile, onClose }) => {
  // 배경 클릭 시 모달 닫기
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDelete = async () => {
    try {
      console.log(profile.friendId);
      await deleteFriend(profile.friendId);
      onClose();
      // 필요시 친구 목록 새로고침 로직 여기에
    } catch (error) {
      alert('친구 삭제에 실패했습니다.');
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{profile.nickname} 님을 제거하기</ModalTitle>
        <span>정말로 {profile.nickname} 님을 친구에서 삭제하시겠어요?</span>
        <SubmitButton onClick={handleDelete}>친구 삭제하기</SubmitButton>

        <CloseButton onClick={onClose}>괜찮아요</CloseButton>
      </ModalBox>
    </Overlay>
  );
};

export default DeleteModal;
