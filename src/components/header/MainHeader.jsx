import React, { useState } from 'react'; // 추가
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../images/logo.svg';
import WishlistMenu from './WishListHeader';
import ProfileMenu from './ProfileMenu';
import ExpenseMenu from './ExpenseMenu';

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white; /* 배경을 흰색으로 설정 */
  z-index: 1000;
`;

const Header = styled.div`
  max-width: 1300px;
  min-width: 840px; /* 헤더 뭉게지지 않게 하기 위함 */
  margin: 0 auto;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;

  .logo {
    margin-left: 1rem;
    cursor: pointer;
    width: 180px;
  }

  .header__menulist {
    list-style: none;
    display: flex;
    align-items: center;
  }

  li {
    padding: 0.5rem 1.5rem;
    transition: color 0.3s ease, transform 0.3s ease;
    cursor: pointer;
  }

  li:hover {
    transform: scale(1.1);
  }

  .active {
    transform: scale(1.1);
    color: #2a6658;
    font-weight: 600;
  }

  .apply {
    padding: 10px 30px;
    background-color: #51b69e;
    border-radius: 10px;
    border: 1px solid #51b69e;
    color: white;
    cursor: pointer;
  }
`;

function MainHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  // 실제 로그인 여부 판단 로직에 맞게 대체할 것
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 관리

  // 로그인 페이지에서는 헤더를 보여주지 않음
  if (
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/onboarding/category' ||
    location.pathname === '/onboarding/goal'
  ) {
    return null;
  }

  return (
    <StyledHeader>
      <Header>
        <div className="header-mobile">
          <div onClick={() => navigate('/')}>
            <img className="logo" src={logo} alt="Logo" />
          </div>
        </div>
        <ul className="header__menulist">
          <li
            className={location.pathname === '/' ? 'active' : ''}
            onClick={() => navigate('/meddling')}
          >
            참견소
          </li>
          <li
            className={
              location.pathname.startsWith('/challenges') ? 'active' : ''
            }
            onClick={() => navigate('/challenges')}
          >
            챌린지
          </li>
          <ExpenseMenu />
          <WishlistMenu />

          {isLoggedIn ? (
            <ProfileMenu setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <button className="apply" onClick={() => navigate('/login')}>
              로그인
            </button>
          )}
        </ul>
      </Header>
    </StyledHeader>
  );
}

export default MainHeader;
