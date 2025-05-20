import { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const WishListWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Dropdown = styled.div`
  font-size: 0.8em;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: fit-content;
  height: fit-content;
  background: white;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 0.3px solid #2a6658;
  padding: 2px 10px;
  z-index: 10;
  white-space: nowrap;

  visibility: ${(props) => (props.$open ? "visible" : "hidden")};
  opacity: ${(props) => (props.$open ? 1 : 0)};
  pointer-events: ${(props) => (props.$open ? "auto" : "none")};
  transition: opacity 0.2s ease, visibility 0.2s ease;
`;

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  color: black;
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
`;

const Menu = styled.button`
  all: unset;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const WishListMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const isActive = 
  location.pathname.startsWith("/products") ||
  location.pathname.startsWith("/wish/mine");

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 200);
  };

  return (
    <WishListWrapper
      as="li"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={isActive ? "active" : ""}
    >
      <Menu>나의 위시리스트</Menu>

      <Dropdown className="dropdown" $open={open}>
        <DropdownItem
          onClick={() => navigate("/products")}
          $active={location.pathname === "/products"}
        >
          상품 검색
        </DropdownItem>
        <DropdownItem
          onClick={() => navigate("/wish/mine")}
          $active={location.pathname === "/wish/mine"}
        >
          위시 목록
        </DropdownItem>
      </Dropdown>
    </WishListWrapper>
  );
};

export default WishListMenu;
