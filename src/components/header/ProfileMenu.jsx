import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import profileImage from '../../images/profile.svg'; // 예시용 프로필 이미지
import icon1 from '../../images/header/profile_icon1.svg';
import icon2 from '../../images/header/profile_icon2.svg';
import icon3 from '../../images/header/logout_icon.svg';
import { logout } from '../../api/loginApi';
import { getUserInfo } from '../../api/profileApi';

export default function ProfileMenu({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await getUserInfo();
        setUserInfo(result); // ApiResponse 구조라면 .result 안에 있음
      } catch (e) {
        console.error('유저 정보 가져오기 실패:', e);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();

      setIsLoggedIn(false);
      alert('로그아웃 되었습니다');
      navigate('/');
    } catch (err) {
      alert('로그아웃 실패: ' + (err.response?.data?.message || '오류 발생'));
    }
  };

  return (
    <WishlistWrapper as="li">
      <ProfileButton className="profile-button">
        <img src={userInfo?.profileUrl ?? profileImage} alt="My Page" />
      </ProfileButton>

      <Dropdown className="dropdown">
        <DropdownItem onClick={() => navigate('/myprofile')}>
          <img src={icon1} alt="My Page" />내 프로필
        </DropdownItem>
        <DropdownItem onClick={() => navigate('/friends')}>
          <img src={icon2} alt="My Page" />
          친구 목록
        </DropdownItem>
        <DropdownItem
          style={{ borderTop: '1px solid #CAD6D2' }}
          onClick={handleLogout}
        >
          <img src={icon3} alt="My Page" />
          로그아웃
        </DropdownItem>
      </Dropdown>
    </WishlistWrapper>
  );
}
const WishlistWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover .dropdown {
    display: block;
  }
`;

const Dropdown = styled.div`
  font-size: 0.8em;
  display: none;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  height: fit-content;
  background: white;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 0.3px solid #2a6658;
  margin-top: 20px;
  padding: 2px 10px;
  z-index: 10;
  white-space: nowrap;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;

  img {
    margin-right: 5px;
  }
`;

const ProfileButton = styled.button`
  all: unset; /* 기본 버튼 스타일 완전히 제거 */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  padding: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;
