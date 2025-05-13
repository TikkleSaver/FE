import React from "react";
import styled from "styled-components";
import Colors from "../../constanst/color.mjs";

const ExpenseItem = styled.div`
  display: flex;
  gap: 20px;
  border-bottom: 1px solid ${Colors.secondary50};
  width: 390px;
  height: 80px;
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
  color: white;
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
  color: ${Colors.secondary200};
`;

const ItemPrice = styled.div`
  font-size: 17px;
  color: ${Colors.primary700};
`;

const FriendExpenseCard = ({ item }) => {
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
    </ExpenseItem>
  );
};

export default FriendExpenseCard;
