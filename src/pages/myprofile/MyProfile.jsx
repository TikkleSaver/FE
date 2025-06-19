import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChallengePreviewCard from '../../components/challenge/ChallengePreviewCard';
import profileImage from '../../images/profile.svg';
import friend from '../../images/myprofile/friend.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../api/profileApi'; // 파일 경로는 상황에 맞게 수정
import Colors from '../../constanst/color.mjs';

export default function MyProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  const reverseCategoryMap = {
    1: '식비',
    2: '카페',
    3: '쇼핑',
    4: '건강',
    5: '취미',
    6: '교통비',
    7: '기타 생활비',
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data.result); // ApiResponse 구조라면 .result 안에 있음
      } catch (e) {
        console.error('프로필 가져오기 실패:', e);
      }
    };

    fetchProfile();
  }, []);
  if (!profile) return <div>Loading...</div>;

  return (
    <Wrapper>
      <ProfileContainer>
        <img
          src={profile.profileUrl ? profile.profileUrl : profileImage}
          alt="My Page"
        />{' '}
        <ProfileBox>
          <Top>
            <NickName>{profile.nickname}</NickName>
            <ButtonGroup>
              <UpdateBtn as={Link} to="/editprofile" state={{ profile }}>
                프로필 편집
              </UpdateBtn>

              <PlusBtn as={Link} to="/searchFreind">
                + <img src={friend} alt="My Page" />
              </PlusBtn>
            </ButtonGroup>
          </Top>
          <Bottom>
            <Group
              onClick={() => navigate('/wish/mine')}
              style={{ cursor: 'pointer' }}
            >
              <Number>{profile.wishListNum}</Number>
              <Name>위시리스트</Name>
            </Group>
            <Group
              onClick={() =>
                navigate('/challenges/join', {
                  state: { memberId: profile.id ,fromProfile: 'my'},
                })
              }
              style={{ cursor: 'pointer' }}
              
            >
              <Number>{profile.challengeNum}</Number>
              <Name>참여중인 챌린지</Name>
            </Group>
            <Group
              onClick={() => navigate('/friends')}
              style={{ cursor: 'pointer' }}
            >
              <Number>{profile.friendNum}</Number>
              <Name>친구</Name>
            </Group>
          </Bottom>
        </ProfileBox>
      </ProfileContainer>
      <ChallengeContainer>
        <TopChallengeText>
          <div>저장한 챌린지</div>{' '}
          <MoreBtn
            onClick={() =>
              navigate('/savedChallenge', {
                state: { scrapedList: profile.challengeScrapedList },
              })
            }
          >
            {'더보기>'}
          </MoreBtn>
        </TopChallengeText>
        {profile.challengeScrapedList.length === 0 ? (
          <NoResultContainer visible={true}>
            <NoResultTitle>저장한 챌린지가 없습니다.</NoResultTitle>
            <NoResultSubText>챌린지를 탐색해 저장해보세요!</NoResultSubText>
          </NoResultContainer>
        ) : (
          <TopChallengeInnerContainer>
            {profile.challengeScrapedList.slice(0, 4).map((challenge) => (
              <ChallengePreviewCard
                key={challenge.challengeId}
                challengeId={challenge.challengeId}
                title={challenge.title}
                category={reverseCategoryMap[challenge.categoryId]}
                imgUrl={challenge.imgUrl}
              />
            ))}
          </TopChallengeInnerContainer>
        )}
      </ChallengeContainer>
    </Wrapper>
  );
}

const NoResultSubText = styled.div`
  font-size: 14px;
  color: ${Colors.secondary100};
`;

const NoResultTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.secondary200};
  margin-bottom: 10px;
`;
const NoResultContainer = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh;
  text-align: center;
  padding: 0 20px;
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
`;

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
  padding: 0 3px;
  text-decoration: none;
  color: inherit;
  justify-content: center; /* 중앙 정렬 */

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

  /* Link로 쓸 때 깨지는 것 방지 */
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
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
  width: 1090px;
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
  width: 1090px;
  margin-bottom: 30px;
  font-size: 25px;
  font-weight: 600;
  > span {
    color: #6b6b6b;
    font-size: 1rem;
    font-weight: 400;
  }
`;

const MoreBtn = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: #6b6b6b;
  font-size: 1rem;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
