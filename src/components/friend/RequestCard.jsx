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
  margin: 10px 0;
  cursor: pointer;
`;

const ItemImage = styled.img`
  width: 40px;
  border-radius: 20px;
`;

const ItemName = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  white-space: nowrap;
`;
const BaseButton = styled.button`
  margin-left: 5px;
  height: fit-content;
  padding: 5px 15px;
  font-size: 0.8rem;
  font-weight: 400;
  border-radius: 10px;
  color: #606060;
  cursor: pointer;
  border: 1px #e5e5e5 solid;
  background-color: transparent;
  white-space: nowrap;
  z-index: 2;
`;

const AcceptedBtn = styled(BaseButton)`
  &:hover {
    background-color: #51b69e;
    border: none;
    color: white;
  }
`;

const UpdateBtn2 = styled(BaseButton)`
  &:hover {
    background-color: #e54444;
    border: none;
    color: white;
  }
`;

const BtnGroup = styled.div`
  margin-left: auto;
  display: flex;
  flex-wrap: nowrap;
  margin-left: auto;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const RequestCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/friendprofile');
  };

  return (
    <Item onClick={handleClick}>
      <ItemImage src={profileImage} />
      <Right>
        <ItemName>{item.name}님이 친구 요청을 보냈어요</ItemName>
        <BtnGroup>
          <AcceptedBtn>수락</AcceptedBtn>
          <UpdateBtn2>거절</UpdateBtn2>
        </BtnGroup>
      </Right>
    </Item>
  );
};

export default RequestCard;
