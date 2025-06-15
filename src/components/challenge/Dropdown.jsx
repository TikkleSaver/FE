import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import categoryIcon from "../../assets/categoryIcon.svg"; 
import Colors from "../../constanst/color.mjs";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const DropdownMenu = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  position: absolute;
  top: 36px;
  right: 0; /* 아이콘 기준 안쪽으로 열리도록 */
  background-color: #ffffff;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 8px;
  width: max-content;
  z-index: 999;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const MenuItem = styled.li`
  list-style: none;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  border-radius: 30px;
  font-size: 15px;
  font-weight: ${({ $isSelected }) => ($isSelected ? 500: 300)};
  color: ${({ $isSelected }) => ($isSelected ? Colors.primary : Colors.secondary200)};
  border: 1.5px solid ${({ $isSelected }) => ($isSelected ? Colors.primary : Colors.secondary100)};

`;



const Dropdown = ({ options, onSelect }) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <Wrapper ref={dropdownRef}>
      <IconButton onClick={() => setOpen((prev) => !prev)}>
        <img src={categoryIcon} alt="카테고리 아이콘" width="24" height="24" />
      </IconButton>

      {open && (
        <DropdownMenu>
          {options.map((option, idx) => (
            <MenuItem
              key={idx}
              $isSelected={option === selectedOption}
              onClick={() => {
                onSelect(option);
                setSelectedOption(option);
                setOpen(false);
              }}
            >
              {option}
            </MenuItem>
          ))}
        </DropdownMenu>
      )}
    </Wrapper>
  );
};

export default Dropdown;
