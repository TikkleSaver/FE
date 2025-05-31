import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import profileImage from '../../images/profile.svg';
import friend from '../../images/myprofile/friend_gray.svg';
import cover from '../../images/myprofile/cover.svg';
import { Link, useNavigate } from 'react-router-dom';
import { updateProfile } from '../../api/profileApi';

export default function EditProfileSection({ profile }) {
  const [nickname, setNickname] = useState(profile.nickname);
  const inputRef = useRef(null);
  const spanRef = useRef(null);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [profileSrc, setProfileSrc] = useState(
    profile.profileUrl || profileImage
  );
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${spanWidth + 10}px`;
    }
  }, [nickname]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileSrc(newImageUrl);
      setSelectedFile(file);
    }
  };
  const handleSubmit = async () => {
    try {
      await updateProfile(nickname, selectedFile);
      //   alert('프로필이 성공적으로 업데이트되었습니다.');
      navigate('/myprofile');
    } catch (error) {
      alert('프로필 업데이트에 실패했습니다.');
    }
  };

  return (
    <ProfileContainer>
      <ImageWrapper onClick={handleImageClick}>
        <ProfileImage src={profileSrc} alt="profile" />
        <CoverImage src={cover} alt="cover" />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </ImageWrapper>
      <ProfileBox>
        <Top>
          <div style={{ position: 'relative' }}>
            <NickName
              maxLength={10}
              ref={inputRef}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <NickNameInputSizer ref={spanRef}>
              {nickname || ' '}
            </NickNameInputSizer>
          </div>
          <ButtonGroup>
            <UpdateBtn onClick={handleSubmit}>완료</UpdateBtn>
            <PlusBtn>
              + <img src={friend} alt="Add friend" />
            </PlusBtn>
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
  );
}

// 스타일 컴포넌트들은 기존 코드 그대로 복사
const NickNameInputSizer = styled.span`
  position: absolute;
  visibility: hidden;
  white-space: pre;
  font-size: 27px;
  font-weight: 500;
  padding-left: 10px;
`;

const NickName = styled.input`
  color: black;
  font-size: 27px;
  font-weight: 500;
  text-align: center;
  border: none;
  border-bottom: 1px solid #6b6b6b;
  &:focus {
    outline: none;
  }
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  color: #d9d9d9;
`;

const Name = styled.span`
  font-size: 1.2rem;
  font-weight: 400;
`;

const Number = styled.span`
  margin: 30px 0;
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
  cursor: pointer;
  border: 1px #e5e5e5 solid;
  background-color: transparent;
  padding: 0 3px;
  color: #d9d9d9;
  justify-content: center;

  img {
    width: 15px;
    height: 15px;
  }
`;

const UpdateBtn = styled.button`
  margin-left: 20px;
  width: 150px;
  font-size: 1.1rem;
  font-weight: 400;
  border-radius: 6px;
  cursor: pointer;
  border: 1px #e5e5e5 solid;
  background-color: transparent;
  color: inherit;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none; /* 밑줄 제거 */
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  min-width: 100%;
`;

const Bottom = styled.div`
  display: flex;
  width: max-content;
  gap: 40px;
`;

const ProfileBox = styled.div`
  margin-right: 300px;
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

const ProfileContainer = styled.div`
  display: flex;
  margin: 30px 30px 50px;
  width: fit-content;
  align-items: center;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 50px;
`;

const ProfileImage = styled.img`
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  object-fit: cover;
  z-index: 1;
`;

const CoverImage = styled.img`
  position: absolute;
  width: 220px;
  height: 220px;
  z-index: 2;
  pointer-events: none;
`;
