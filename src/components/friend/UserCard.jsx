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
`;

const UserCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/friendprofile');
  };

  return (
    <Item onClick={handleClick}>
      <ItemImage src={profileImage} />
      <ItemName>{item.name}</ItemName>
    </Item>
  );
};

export default UserCard;
