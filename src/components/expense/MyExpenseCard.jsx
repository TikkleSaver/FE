import React from "react";
import styled from "styled-components";
import PenIcon from "./../../assets/pen.svg";
import TrashIcon from "./../../assets/trash.svg";
import Colors from "../../constanst/color.mjs";
import UpdateExpenseModal from "./modal/UpdateExpenseModal";
import { deleteExpense } from "../../api/expense/expenseApi";

const ExpenseItem = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  border-bottom: 1px solid ${Colors.secondary50};
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

const categories = [
  { id: 1, label: "식비" },
  { id: 2, label: "카페" },
  { id: 3, label: "쇼핑" },
  { id: 4, label: "건강" },
  { id: 5, label: "취미" },
  { id: 6, label: "교통비" },
  { id: 7, label: "기타 생활비" },
];

const MyExpenseCard = ({ item, date, onDone }) => {
  const [isEditOpen, setIsEditOpen] = React.useState(false);
  const categoryLabel =
    categories.find((cat) => cat.id === item.categoryId)?.label || "알 수 없음";
  const imageurl = item.image
    ? item.image
    : require("./../../images/emptyImg.svg").default;

  // ✅ API로 데이터 받아오기
  const handleDelete = async () => {
    try {
      const result = await deleteExpense({
        expenseId: item.expenseId,
        memberId: item.memberId,
      });
      console.log("✅ 서버 응답:", result);
      alert(result);
      if (onDone) onDone();
    } catch (err) {
      console.error("삭제 실패:", err.response?.data || err.message);
      alert("삭제 실패 😥");
    }
  };

  return (
    <>
      <ExpenseItem>
        <ItemImage imageUrl={imageurl} />
        <ItemInfo>
          <ItemDetail>
            <ItemCategory>{categoryLabel}</ItemCategory>
            <ItemName>{item.expenseName}</ItemName>
            <ItemPlace>{item.expensePlace}</ItemPlace>
          </ItemDetail>
          <ItemPrice>{item.cost}원</ItemPrice>
        </ItemInfo>
        <ButtonContainer>
          <Button
            onClick={() => {
              setIsEditOpen(true);
              console.log("🧾 MyExpenseCard item:", item);
            }}
          >
            <img src={PenIcon} alt="수정" width="24" height="24" />
          </Button>
          <Button onClick={handleDelete}>
            <img src={TrashIcon} alt="삭제" width="24" height="24" />
          </Button>
        </ButtonContainer>
      </ExpenseItem>
      {isEditOpen && (
        <UpdateExpenseModal
          expenseId={item.expenseId}
          memberId={item.memberId}
          date={date}
          onDone={onDone}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default MyExpenseCard;
