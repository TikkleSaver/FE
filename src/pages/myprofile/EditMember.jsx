import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import editIcon2 from '../../images/myprofile/edit_icon2.svg';
import ChangePasswordSection from '../../components/member/ChangePasswordSection'; // 경로는 실제 위치에 맞게 조정
import EditProfileSection from '../../components/member/EditProfileSection'; // 새로 추가

import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function EditMember() {
  const location = useLocation();
  const navigate = useNavigate();

  const { profile } = location.state || {};

  const [nickname, setNickname] = useState(profile.nickname);
  const inputRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${spanWidth + 10}px`; // padding 여유
    }
  }, [nickname]);

  return (
    <Wrapper>
      <TitleContainer>
        <img src={editIcon2} alt="My Page" />
        <span>프로필 편집</span>
      </TitleContainer>

      <EditProfileSection profile={profile} />
      <ChangePasswordSection />
    </Wrapper>
  );
}

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

const Wrapper = styled.div`
  width: 80%;
  margin: 120px auto;
`;
