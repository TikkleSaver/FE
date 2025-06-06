import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChallengePreviewCard from '../../components/challenge/ChallengePreviewCard';
import profileImage from '../../images/profile.svg';
import check from '../../images/myprofile/material-symbols_check-rounded.svg';
import { Link, useLocation } from 'react-router-dom';
import CancelModal from '../../components/friend/CancelModal';
import DeleteModal from '../../components/friend/DeleteModal';
import { fetchFriendProfile } from '../../api/friendApi'; // 아까 만든 API 함수
import { sendFriendReq } from '../../api/friendRequestApi';

export default function FriendProfile() {
  const location = useLocation();
  const memberId = location.state?.memberId;
  const [friendStatus, setFriendStatus] = useState('accepted'); // 상태: 'none' | 'pending' | 'accepted'
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const [requestId, setRequestId] = useState(null);

  const handleFriendRequest = async () => {
    try {
      const data = await sendFriendReq(profile.memberId);
      setRequestId(data.result.requestId);

      if (friendStatus === 'none') {
        setFriendStatus('pending'); // 친구 요청 보냄
      }
      alert('친구 요청 성공');
    } catch (error) {
      alert('친구 요청 실패');
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

  useEffect(() => {
    console.log('memberId:', memberId);

    const fetchProfile = async (memberId) => {
      try {
        console.log('fetchProfile:', memberId);

        const data = await fetchFriendProfile(memberId);
        setProfile(data.result);

        console.log('data:', data);
      } catch (e) {
        console.error('프로필 가져오기 실패:', e);
      }
    };

    if (memberId) {
      fetchProfile(memberId);
    }
  }, [memberId, showDeleteModal, showAddModal]);

  // profile 정보에 따라 friendStatus 설정
  useEffect(() => {
    if (!profile) return;

    if (profile.friendReqInfo?.requestId) {
      setRequestId(profile.friendReqInfo.requestId);
    }

    if (profile.friendId) {
      setFriendStatus('accepted');
    } else if (profile.friendReqInfo === null) {
      setFriendStatus('none');
    } else if (profile.friendReqInfo.senderId === memberId) {
      setFriendStatus('pending2');
    } else {
      setFriendStatus('pending');
    }
  }, [profile]);

  if (!profile) return <div>Loading...</div>; // 무조건 필요

  return (
    <Wrapper>
      <ProfileContainer>
        <img src={profile?.profileUrl ?? profileImage} alt="프로필 이미지" />
        <ProfileBox>
          <Top>
            <NickName>{profile?.nickname}</NickName>
            <ButtonGroup>
              <UpdateBtn
                onClick={
                  friendStatus === 'none'
                    ? handleFriendRequest
                    : friendStatus === 'pending'
                    ? handleAddExpenseModal
                    : friendStatus === 'accepted'
                    ? () => setShowDeleteModal(true)
                    : friendStatus === 'pending2'
                    ? () => {
                        /* 친구 수락 핸들러 작성 */
                      }
                    : undefined
                }
                $status={friendStatus}
              >
                {friendStatus === 'pending2' && '친구 받아주기'}
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
              <Number>{profile.wishListNum}</Number>
              <Name>위시리스트</Name>
            </Group>
            <Group>
              <Number>{profile.challengeNum}</Number>
              <Name>참여중인 챌린지</Name>
            </Group>
            <Group>
              <Number>{profile.friendNum}</Number>
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
      {showAddModal && (
        <CancelModal
          friendReqId={requestId}
          onClose={handleCloseAddExpenseModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          friendId={profile.friendId}
          onClose={handleCloseDeleteModal}
        />
      )}
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
      : $status === 'pending2'
      ? '#51b69e'
      : $status === 'pending'
      ? '#C7C7C7'
      : '#fff'};

  color: ${({ $status }) => ($status === 'accepted' ? '#51b69e' : 'white')};
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
