import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Colors from '../../constanst/color.mjs';
import profileImage from '../../images/profile.svg';

const Item = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid ${Colors.secondary50};
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 60px;
  border-radius: 20px;
`;

const ItemName = styled.div`
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
`;
const UpdateBtn2 = styled.button`
  margin-left: 10px;
  height: fit-content;
  padding: 10px 15px;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 12px;
  color: #606060;
  cursor: pointer;
  border: 1px #e5e5e5 solid;
  background-color: transparent;
  white-space: nowrap;
  z-index: 2;
  &:hover {
    background-color: #51b69e;
    border: none;
    color: white;
  }
`;
const BtnGroup = styled.div`
  margin-left: auto;
  display: flex;
  flex-wrap: nowrap;
`;
const FriendCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/friendprofile', { state: { memberId: item.id } });
  };

  // 친구 위시리스트로 이동
  const handleWishlistClick = (e) => {
    e.stopPropagation(); // 부모 클릭 방지
    navigate('/wish/friend', { state: { memberId: item.id } });
  };

  return (
    <Item onClick={handleClick}>
      <ItemImage src={item.profileUrl} />
      <ItemName>{item.nickname}</ItemName>
      <BtnGroup>
        <UpdateBtn2 onClick={handleWishlistClick}>위시리스트</UpdateBtn2>
        <UpdateBtn2>구매 목록</UpdateBtn2>
      </BtnGroup>
    </Item>
  );
};

export default FriendCard;
