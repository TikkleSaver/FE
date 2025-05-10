import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search.svg';

import FriendCard from '../../components/friend/FriendCard';
import friends from '../../images/myprofile/fa-solid_user-friends.svg';
import alarm from '../../images/myprofile/alarm_icon.svg';
import redIcon from '../../images/myprofile/red_icon.svg';
import DeleteModal from '../../components/friend/DeleteModal';
import RequestListModal from '../../components/friend/RequestListModal';

const SearchFreindPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 100%;
  margin: 92px auto;
`;
const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  height: 30px;
  max-width: 800px;
  min-width: 450px;

  margin: 0 auto;
  position: fixed;
  z-index: 3;
  background-color: white;
  border-bottom: 1px solid #e5e5e5;
  padding: 20px 0;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  max-width: 650px;
  padding-right: 8px;
  box-sizing: border-box;
  margin-top: 80px;
`;
const Title = styled.span`
  margin: 0 5px;
  font-size: 1.5rem;
  font-weight: 600;
`;

const FriendNum = styled.span`
  color: #606060;
  background: #e5e5e5;
  border-radius: 50%;
  font-size: 1rem;
  font-weight: 600;
  width: 30px;
  padding: 5.5px 0;
  text-align: center;
`;
const RedIcon = styled.img`
  position: absolute;
  top: 5px;
  right: 6px;
  height: 10px;
`;

const AlarmBtn = styled.div`
  margin-left: auto;
  position: relative;
  width: 35px;
  cursor: pointer;
`;

const items = Array(10).fill({
  name: '티모시',
  image: 'food.jpg',
});
export default function FriendsPage() {
  const [hasNewRequest, setHasNewRequest] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };
  return (
    <SearchFreindPageContainer>
      <ContainerWrapper>
        <img src={friends} alt="friends" style={{ width: '30px' }} />
        <Title>친구</Title>
        <FriendNum>{items.length}</FriendNum>
        <AlarmBtn onClick={() => setShowDeleteModal(true)}>
          <img src={alarm} alt="friends" style={{ width: '35px' }} />
          {hasNewRequest && <RedIcon src={redIcon} alt="friends" />}
        </AlarmBtn>
      </ContainerWrapper>

      <Items>
        {items.map((item, index) => (
          <FriendCard key={index} item={item} />
        ))}
      </Items>
      {showDeleteModal && <RequestListModal onClose={handleCloseDeleteModal} />}
    </SearchFreindPageContainer>
  );
}
