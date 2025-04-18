import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import logo from "../../images/logo.svg";

const StyledHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white; /* 배경을 흰색으로 설정 */
  z-index: 1000; 
`;

const Header = styled.div`
  max-width: 1400px;
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
    color: #2A6658;
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

  return (
    <StyledHeader>
      <Header>
        <div className="header-mobile">
          <div onClick={() => navigate("/")}>
            <img className="logo" src={logo} alt="Logo" />
          </div>
        </div>
        <ul className="header__menulist">
          <li
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => navigate("/")}
          >
            참견소
          </li>
          <li
            className={location.pathname.startsWith("/challenges") ? "active" : ""}
            onClick={() => navigate("/challenges")}
          >
            챌린지
          </li>
          <li
             className={location.pathname === "/" ? "active" : ""}
             onClick={() => navigate("/")}
          >
            소비 일기
          </li>
          <li
            className={location.pathname === "/" ? "active" : ""}
            onClick={() => navigate("/")}
          >
            나의 위시리스트
          </li>
        
          <button
            className="apply"
            onClick={() => ""}
          >
            로그인
          </button>
        </ul>
      </Header>
    </StyledHeader>
  );
}

export default MainHeader;
