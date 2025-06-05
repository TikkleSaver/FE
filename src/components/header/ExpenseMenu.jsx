import { useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const ExpenseWrapper = styled.div`
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
  font-weight: ${(props) => (props.$active ? "bold" : "normal")};
`;

const Menu = styled.button`
  all: unset;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
`;

const ExpenseMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef(null);

  const isActive = location.pathname.startsWith("/expense");

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
      <Menu>소비 일기</Menu>

      <Dropdown className="dropdown" $open={open}>
        <DropdownItem
          onClick={() => {
            const token = localStorage.getItem("accessToken");
            if (token) {
              navigate("/expense-calendar");
            } else {
              alert("로그인 후 이용해주세요");
            }
          }}
          $active={location.pathname === "/expense-calendar"}
        >
          지출 내역
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            const token = localStorage.getItem("accessToken");
            if (token) {
              navigate("/expense-analysis");
            } else {
              alert("로그인 후 이용해주세요");
            }
          }}
          $active={location.pathname === "/expense-analysis"}
        >
          지출 분석
        </DropdownItem>
      </Dropdown>
    </ExpenseWrapper>
  );
};

export default ExpenseMenu;
