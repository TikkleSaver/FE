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

const ItemImage = styled.div`
  width: 80px;
  height: 60px;
  border-radius: 20px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ItemDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const ItemCategory = styled.div`
  background-color: ${(props) => props.bgColor || "#f19797"};
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

const categories = [
  { id: 1, label: "식비" },
  { id: 2, label: "카페" },
  { id: 3, label: "쇼핑" },
  { id: 4, label: "건강" },
  { id: 5, label: "취미" },
  { id: 6, label: "교통비" },
  { id: 7, label: "기타 생활비" },
];

const CATEGORY_COLORS = {
  1: "#FB8072", // 식비
  2: "#80B1D3", // 카페
  3: "#FED9A6", // 쇼핑
  4: "#BC80BD", // 건강
  5: "#CCEBC5", // 취미
  6: "#FFED6F", // 교통비
  7: "#D9D9D9", // 기타
};

const FriendExpenseCard = ({ item }) => {
  const categoryLabel =
    categories.find((cat) => cat.id === item.categoryId)?.label || "알 수 없음";
  const imageurl = item.image
    ? item.image
    : require("./../../images/emptyImg.svg").default;
  const categoryColor = CATEGORY_COLORS[item.categoryId] || "#f19797";

  return (
    <ExpenseItem>
      <ItemImage imageUrl={imageurl} />
      <ItemInfo>
        <ItemDetail>
          <ItemCategory bgColor={categoryColor}>{categoryLabel}</ItemCategory>
          <ItemName>{item.expenseName}</ItemName>
          <ItemPlace>{item.expensePlace}</ItemPlace>
        </ItemDetail>
        <ItemPrice>{item.cost}원</ItemPrice>
      </ItemInfo>
    </ExpenseItem>
  );
};

export default FriendExpenseCard;
