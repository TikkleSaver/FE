import React, { useState } from 'react';
import styled from 'styled-components';
import ChallengePreviewCard from '../../components/challenge/ChallengePreviewCard';
import profileImage from '../../images/profile.svg';
import check from '../../images/myprofile/material-symbols_check-rounded.svg';
import { Link } from 'react-router-dom';
import AddExpenseModal from '../../components/expense/modal/AddExpenseModal';
import CancelModal from '../../components/friend/CancelModal';
import DeleteModal from '../../components/friend/DeleteModal';

export default function FriendProfile() {
  const [friendStatus, setFriendStatus] = useState('accepted'); // 상태: 'none' | 'pending' | 'accepted'
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleFriendRequest = () => {
    if (friendStatus === 'none') {
      setFriendStatus('pending'); // 친구 요청 보냄
    }
  };
  const handleAddExpenseModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddExpenseModal = () => {
    setShowAddModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <Wrapper>
      <ProfileContainer>
        <img src={profileImage} alt="My Page" />
        <ProfileBox>
          <Top>
            <NickName>티모</NickName>
            <ButtonGroup>
              <UpdateBtn
                onClick={
                  friendStatus === 'none'
                    ? handleFriendRequest
                    : friendStatus === 'pending'
                    ? handleAddExpenseModal
                    : friendStatus === 'accepted'
                    ? () => setShowDeleteModal(true)
                    : undefined
                }
                $status={friendStatus}
              >
                {friendStatus === 'none' && '친구 요청'}
                {friendStatus === 'pending' && '대기 중'}
                {friendStatus === 'accepted' && (
                  <>
                    친구
                    <img
                      src={check}
                      alt="친구 상태"
                      style={{
                        width: '18px',
                        height: '18px',
                        marginLeft: '8px',
                      }}
                    />
                  </>
                )}
              </UpdateBtn>
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
        <TopChallengeText>
          <div>참여중인 챌린지</div>
          <MoreBtn to="/savedChallenge">{'더보기>'}</MoreBtn>
        </TopChallengeText>
        <TopChallengeInnerContainer>
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
          <ChallengePreviewCard />
        </TopChallengeInnerContainer>
      </ChallengeContainer>
      {showAddModal && <CancelModal onClose={handleCloseAddExpenseModal} />}
      {showDeleteModal && <DeleteModal onClose={handleCloseDeleteModal} />}
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

const UpdateBtn = styled.button`
  margin-left: 20px;
  width: 150px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  border: ${({ $status }) =>
    $status === 'accepted' ? '1px solid #51b69e' : 'none'};

  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ $status }) =>
    $status === 'none'
      ? '#51b69e'
      : $status === 'pending'
      ? '#C7C7C7'
      : '#fff'};

  color: ${({ $status }) =>
    $status === 'none' ? 'white' : $status === 'pending' ? 'white' : '#51b69e'};
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
  width: fit-content;
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
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
  font-size: 25px;
  font-weight: 600;

  > span {
    color: #6b6b6b;
    font-size: 1rem;
    font-weight: 400;
  }
`;

const MoreBtn = styled(Link)`
  color: #6b6b6b;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
