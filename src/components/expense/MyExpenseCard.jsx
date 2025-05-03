import React from "react";
import styled from "styled-components";
import PenIcon from "./../../assets/pen.svg";
import TrashIcon from "./../../assets/trash.svg";

const ExpenseItem = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  border-bottom: 1px solid #e5e5e5;
  width: 390px;
  padding: 10px;
  margin-bottom: 10px;
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: left;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 60px;
  border-radius: 20px;
`;

const ItemDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const ItemCategory = styled.div`
  background-color: #f19797;
  color: #fff;
  font-size: 11px;
  border-radius: 2px;
  padding: 0 4px;
`;

const ItemName = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

const ItemPlace = styled.div`
  font-size: 13px;
  color: #999;
`;

const ItemPrice = styled.div`
  font-size: 17px;
  color: #1e1e1e;
`;

const ButtonContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const MyExpenseCard = ({ item }) => {
  const imageSrc = require(`./../../assets/${item.image}`);

  return (
    <ExpenseItem>
      <ItemImage src={imageSrc} />
      <ItemInfo>
        <ItemDetail>
          <ItemCategory>{item.category}</ItemCategory>
          <ItemName>{item.expenseName}</ItemName>
          <ItemPlace>{item.expensePlace}</ItemPlace>
        </ItemDetail>
        <ItemPrice>{item.cost}원</ItemPrice>
      </ItemInfo>
      <ButtonContainer>
        <Button onClick={() => alert("수정 클릭")}>
          <img src={PenIcon} alt="수정" width="24" height="24" />
        </Button>
        <Button onClick={() => alert("삭제 클릭")}>
          <img src={TrashIcon} alt="삭제" width="24" height="24" />
        </Button>
      </ButtonContainer>
    </ExpenseItem>
  );
};

export default MyExpenseCard;
