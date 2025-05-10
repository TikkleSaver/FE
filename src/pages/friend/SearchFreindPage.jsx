import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search.svg';

import FriendCard from '../../components/friend/FriendCard';

const SearchFreindPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 100%;
  margin: 92px auto;
`;
const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  max-width: 800px;
  margin: 0 auto;
  position: fixed;
  z-index: 2;
  background-color: white;
`;
const SearchContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 18px 18px 18px 55px;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 500;
  outline: none;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;
// 지출 아이템 목록
const ExpenseItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  max-width: 700px;
  padding-right: 8px;
  box-sizing: border-box;
  margin-top: 90px;
`;

const items = Array(9).fill({
  name: '티모시',
  image: 'food.jpg',
});
export default function SearchFreindPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchFreindPageContainer>
      <ContainerWrapper>
        <SearchContainer>
          <SearchIconWrapper>
            <img src={SearchIcon} alt="Search Icon" width="20" height="20" />
          </SearchIconWrapper>
          <SearchInput
            type="text"
            placeholder="친구하고 싶은 사용자를 찾아보세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </ContainerWrapper>

      <ExpenseItems>
        {items.map((item, index) => (
          <FriendCard key={index} item={item} />
        ))}
      </ExpenseItems>
    </SearchFreindPageContainer>
  );
}
