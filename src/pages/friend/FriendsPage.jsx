import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import friendsImg from '../../images/myprofile/fa-solid_user-friends.svg';
import alarm from '../../images/myprofile/alarm_icon.svg';
import redIcon from '../../images/myprofile/red_icon.svg';
import FriendCard from '../../components/friend/FriendCard';
import RequestListModal from '../../components/friend/RequestListModal';
import { fetchFriendList } from '../../api/friendApi'; // API 호출 함수 import

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
  height: 100vh;
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

export default function FriendsPage() {
  const [hasNewRequest, setHasNewRequest] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [myId, setMyId] = useState();

  useEffect(() => {
    async function loadFriends() {
      try {
        setLoading(true);
        const result = await fetchFriendList();
        setFriends(result.friendList);
        setMyId(result.memberId);
      } catch (e) {
        setError('친구 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
    loadFriends();
  }, [showModal]);

  const handleModal = () => {
    setShowModal(false);
  };

  return (
    <SearchFreindPageContainer>
      <ContainerWrapper>
        <img src={friendsImg} alt="friends" style={{ width: '30px' }} />
        <Title>친구</Title>
        <FriendNum>{friends.length}</FriendNum>
        <AlarmBtn onClick={() => setShowModal(true)}>
          <img src={alarm} alt="friends" style={{ width: '35px' }} />
          {hasNewRequest && <RedIcon src={redIcon} alt="friends" />}
        </AlarmBtn>
      </ContainerWrapper>

      <Items>
        {loading && <p>로딩중...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && friends.length === 0 && <p>친구가 없습니다.</p>}
        {!loading &&
          !error &&
          friends.map((item) => (
            <FriendCard key={item.id} item={item} myId={myId} />
          ))}
      </Items>

      {showModal && <RequestListModal onClose={handleModal} />}
    </SearchFreindPageContainer>
  );
}
