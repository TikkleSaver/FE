import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import profileImage from '../../images/profile.svg';
import friend from '../../images/myprofile/friend_gray.svg';
import editIcon2 from '../../images/myprofile/edit_icon2.svg';
import pwIcon from '../../images/myprofile/pw_icon.svg';
import cover from '../../images/myprofile/cover.svg';

import { Link } from 'react-router-dom';

export default function EditProfile() {
  const [nickname, setNickname] = useState('티모');
  const inputRef = useRef(null);
  const spanRef = useRef(null);

  const [profileSrc, setProfileSrc] = useState(profileImage);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${spanWidth + 10}px`; // padding 여유
    }
  }, [nickname]);

  const handleImageClick = () => {
    fileInputRef.current.click(); // input 클릭 유도
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setProfileSrc(newImageUrl);
    }
  };

  return (
    <Wrapper>
      <TitleContainer>
        <img src={editIcon2} alt="My Page" />
        <span>프로필 편집</span>
      </TitleContainer>
      <ProfileContainer>
        <ImageWrapper onClick={handleImageClick}>
          <ProfileImage src={profileSrc} alt="My Page" />{' '}
          <CoverImage src={cover} alt="My Page" />
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
              <UpdateBtn as={Link} to="/myprofile">
                완료
              </UpdateBtn>
              <PlusBtn>
                + <img src={friend} alt="My Page" />
              </PlusBtn>
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

      <TitleContainer>
        <img src={pwIcon} alt="My Page" />
        <div>
          <span>비밀번호 변경</span>
          <p>
            비밀번호는 최소 6자 이상이어야 하며 숫자, 영문, 특수 문자(!$@%)의
            조합을 포함해야 합니다.
          </p>
        </div>
        <UpdateBtn2 onClick={() => alert('변경되었습니다')}>
          변경하기
        </UpdateBtn2>
      </TitleContainer>
      <PwContainer>
        <Label htmlFor="pw">현재 비밀번호</Label>
        <InputPW id="pw" type="password" />

        <Label htmlFor="new">새 비밀번호</Label>
        <InputPW id="new" type="password" />

        <Label htmlFor="re">새 비밀번호 재입력</Label>
        <InputPW id="re" type="password" />
        <MoreBtn to="/savedChallenge">{'회원탈퇴'}</MoreBtn>
      </PwContainer>
    </Wrapper>
  );
}
const MoreBtn = styled(Link)`
  color: #6b6b6b;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
  width: fit-content;
  &:hover {
    text-decoration: underline;
  }
  margin-left: auto; /* 오른쪽 정렬 */
`;
const UpdateBtn2 = styled.button`
  margin-left: 20px;
  height: fit-content;
  padding: 7px 20px;
  font-size: 1.1rem;
  font-weight: 400;
  border-radius: 12px;
  cursor: pointer;
  border: 1px #e5e5e5 solid;
  background-color: transparent;
  white-space: nowrap;
  position: absolute;
  bottom: 10px;
  right: 0;
`;

const PwContainer = styled.div`
  /* margin: 0 0 30px 98px; */
  margin: 0 50px 30px 50px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InputPW = styled.input`
  margin: 10px 0 20px;
  width: 290px;
  height: 40px;
  border-radius: 10px;
  border: 1px #cad6d2 solid;
  font-size: 1rem;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
  margin-left: 48px;
`;

const Label = styled.label`
  color: #7d817f;
  font-size: 1rem;
  font-weight: 400;
  margin-left: 48px;
`;
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

const TitleContainer = styled.div`
  position: relative;
  margin: 20px 50px;
  width: 100%;
  min-width: 800px;
  display: flex;
  font-size: 1.5rem;
  font-weight: 700;
  padding-bottom: 10px;
  border-bottom: 0.7px #cad6d2 solid;
  > img {
    margin: 0 15px;
    height: 23px;
  }
  p {
    white-space: nowrap;
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0;
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
  word-wrap: break-word;
  cursor: pointer;
  border: 1px #e5e5e5 solid;
  background-color: transparent;
  padding: 0 3px;
  text-decoration: none;
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
  word-wrap: break-word;
  cursor: pointer;
  border: 1px #e5e5e5 solid;
  background-color: transparent;
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

const ProfileBox = styled.div`
  margin-right: 300px;
  width: fit-content;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: 120px auto;
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
  border-radius: 50%; // 원형으로 만들기
  object-fit: cover; // 이미지 비율 유지하며 프레임에 꽉 차게
  overflow: hidden;
  z-index: 1;
`;

const CoverImage = styled.img`
  position: absolute;
  width: 220px;
  height: 220px;
  z-index: 2; // 더 위에 올라오도록
  pointer-events: none; // 클릭 방해하지 않도록
`;
