import { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import Colors from "../../constanst/color.mjs";

const ExpenseWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Dropdown = styled.div`
  font-size: 0.8em;
  position: absolute;
  top: 100%;
  left: 45%;
  transform: translateX(-50%);
  width: fit-content;
  height: fit-content;
  background: white;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 0.3px solid ${Colors.primary500};
  padding: 2px 10px;
  z-index: 10;
  white-space: nowrap;

  /* 🔽 여기서 visibility/opacity로 부드럽게 처리 */
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
  font-weight: ${(props) => (props.$active ? "500" : "300")};
`;

const Menu = styled.button`
  all: unset;
  width: 60px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const ChallengeMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const isActive = location.pathname.startsWith("/challenges");

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
    <ExpenseWrapper
      as="li"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={isActive ? "active" : ""}
    >
      <Menu>챌린지</Menu>

      <Dropdown className="dropdown" $open={open}>
        <DropdownItem
          onClick={() => navigate("/challenges")}
          $active={location.pathname === "/challenges"}
        >
          챌린지 탐색
        </DropdownItem>
        <DropdownItem
          onClick={() => navigate("/challenges/create-challenge")}
          $active={location.pathname === "/challenges/create-challenge"}
        >
          챌린지 생성
        </DropdownItem>
      </Dropdown>
    </ExpenseWrapper>
  );
};

export default ChallengeMenu;
