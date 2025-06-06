import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Colors from '../../constanst/color.mjs';
import alarm from '../../images/myprofile/alarm_icon.svg';
import redIcon from '../../images/myprofile/red_icon.svg';
import close from '../../images/myprofile/material-symbols-light_close.svg';
import RequestCard from './RequestCard';
import { getFriendRequests } from '../../api/friendRequestApi';

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
  position: relative;
  width: 400px;
  height: fit-content;
  max-height: 70%;
  background-color: white;
  border-radius: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 10px 30px;
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
`;

const RedIcon = styled.img`
  position: absolute;
  top: 5px;
  right: 6px;
  height: 10px;
`;

const AlarmBtn = styled.div`
  position: relative;
  width: 35px;
  cursor: pointer;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
`;
const CloseButton = styled.img`
  width: 20px;
  position: absolute;
  right: -10px;
  top: 0;
`;
const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  padding: 0 10px; /* 오른쪽 패딩 추가 */

  /* 추가된 부분 */
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;

  max-height: 100%;

  /* 스크롤바 얇고 깔끔하게 (웹킷 브라우저용) */
  &::-webkit-scrollbar {
    width: 4px; /* 세로 스크롤 두께 */
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2); /* 스크롤바 색상 */
    border-radius: 2px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
`;
const items = Array(6).fill({
  name: '티모시',
  image: 'food.jpg',
});

const RequestListModal = ({ onClose }) => {
  const [requests, setRequests] = useState([]);

  // 삭제 함수
  const handleRemove = (indexToRemove) => {
    setRequests((prev) => prev.filter((_, i) => i !== indexToRemove));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const result = await getFriendRequests();
        setRequests(result.friendReqList); // 응답 구조에 따라 조정
      } catch (error) {
        alert('친구 요청 목록을 불러오는 데 실패했습니다.');
      }
    };

    fetchFriendRequests();
  }, []);

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Top>
          <AlarmBtn>
            <img src={alarm} alt="friends" style={{ width: '35px' }} />
            <RedIcon src={redIcon} alt="friends" />
          </AlarmBtn>
          <ModalTitle>친구 요청 알림</ModalTitle>
          <CloseButton onClick={onClose} src={close} alt="close" />
        </Top>
        <Items>
          {requests.length === 0 ? (
            <span style={{ margin: '10px', color: '#888' }}>
              요청이 없습니다
            </span>
          ) : (
            requests?.map((item, index) => (
              <RequestCard
                key={index}
                item={item}
                onRemove={() => handleRemove(index)}
              />
            ))
          )}
        </Items>
      </ModalBox>
    </Overlay>
  );
};

export default RequestListModal;
