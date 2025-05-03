import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const WishlistWrapper = styled.div` 
  position: relative;
  display: inline-block;

  &:hover .dropdown {
    display: block;
  }
`;

const MenuItem = styled.li`
  padding: 0.5rem 1.5rem;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const Dropdown = styled.div`
  display: none;
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 100px;
  background: white;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  border: 0.3px solid #2a6658;
  margin-top : 10px;
  padding: 10px 15px;
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
`;

function WishlistMenu() {
    const navigate = useNavigate();
  
    return (
      <WishlistWrapper as="li">
        <MenuItem>나의 위시리스트</MenuItem>
        <Dropdown className="dropdown">
          <DropdownItem onClick={() => navigate('/products')}>
            상품 검색
          </DropdownItem>
          <DropdownItem onClick={() => navigate('/')}>
            위시 목록
          </DropdownItem>
        </Dropdown>
      </WishlistWrapper>
    );
}

export default WishlistMenu;
