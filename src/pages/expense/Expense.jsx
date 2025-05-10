import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import MyExpenseCard from "./../../components/expense/MyExpenseCard";
import MyCommentCard from "../../components/expense/MyCommentCard";
import FriendExpenseCard from "../../components/expense/FriendExpenseCard";
import FriendCommentCard from "../../components/expense/FriendCommentCard";
import SubmitBtn from "./../../assets/arrowUp.svg";
import AddExpenseModal from "../../components/expense/modal/AddExpenseModal";
import Colors from "../../constanst/color.mjs";

// 최상위 container
const ExpenseContainer = styled.div`
  margin: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 35px;
`;

// 지출 리스트 container
const ExpenseListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${Colors.secondary100};
  border-radius: 20px;
  width: 472px;
  height: 610px;
  box-sizing: border-box;
  overflow: hidden;
`;

// 지출 아이템 목록
const ExpenseItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;
  height: 500px;
  overflow-y: auto;
  padding-right: 8px;
  box-sizing: border-box;
  scrollbar-gutter: stable both-edges;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${Colors.btnStroke};
    border-radius: 10px;
    cursor: pointer;
  }
`;

// 지출 일자
const ExpenseDateHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  color: ${Colors.secondary400};
`;

// 지출 일자 변경 버튼
const ArrowButton = styled.button`
  background: none;
  border: none;
  padding-top: 10px;
  font-size: 1.5rem;
  color: ${Colors.secondary100};
  cursor: pointer;
`;

// 지출 피드백 리스트 container
const ExpenseCommentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${Colors.secondary100};
  border-radius: 20px;
  width: 619px;
  height: 610px;
  box-sizing: border-box;
  overflow: hidden;
`;

// 지출 피드백 타이틀
const ExpenseCommentTittle = styled.div`
  width: 295px;
  height: 30px;
  margin: 20px 30px 10px 30px;
  color: ${Colors.secondary400};
  font-weight: bold;
`;

const ExpenseComments = styled.div`
  display: flex;
  flex-direction: column;
  width: 610px;
  height: 500px;
  overflow-y: auto;
  padding-right: 8px;
  box-sizing: border-box;
  scrollbar-gutter: stable both-edges;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${Colors.btnStroke};
    border-radius: 10px;
    cursor: pointer;
  }
`;

const CommentInputWrapper = styled.div`
  position: relative;
  padding: 10px 20px;
  background-color: white;
`;

const CommentInput = styled.input`
  width: 570px;
  height: 45px;
  padding: 0 50px 0 15px; /* 오른쪽에 버튼 공간 확보 */
  border: 1px solid ${Colors.secondary100};
  border-radius: 20px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

const AddExpenseButton = styled.button`
  position: sticky;
  bottom: 0;
  background-color: white;
  width: 100%;
  padding: 15px 0;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  border-top: 1px solid ${Colors.secondary25};
`;

const Expense = () => {
  const location = useLocation();
  const selectedDate = location.state?.date;
  const [newComment, setNewComment] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // 임시 로그인한 사용자 ID
  const loggedInUserId = "meartangLove0005";

  // 보고 있는 지출 목록의 소유자와 비교
  const viewedUserId = location.state?.userId || "meartangLove0005"; // 본인 기본값
  const isMyExpense = loggedInUserId === viewedUserId;

  const [date, setDate] = useState(
    selectedDate ? new Date(selectedDate) : new Date()
  );

  const formatDate = (date) =>
    date.toISOString().split("T")[0].replace(/-/g, ".");

  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    setDate(newDate);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;
    // 실제로는 서버에 전송하거나 상태 업데이트
    console.log("새 피드백:", newComment);
    setNewComment("");
  };

  // 지출 추가 모달 열기
  const handleAddExpenseModal = () => {
    setShowAddModal(true);
  };

  // 지출 추가가 모달 닫기
  const handleCloseAddExpenseModal = () => {
    setShowAddModal(false);
  };

  const items = Array(9).fill({
    expenseName: "마라탕",
    expensePlace: "춘리 마라탕",
    category: "식비",
    cost: 15000,
    expenseDate: "2025-03-28",
    image: "food.jpg",
  });

  const comments = Array(9).fill({
    user: "meartangLove0005",
    comment:
      "마라탕이 돈 너무 많이 쓰는 거 아냐..?? 너 돈 많은가보다?? 좀 아껴 써. 지출 목표금액보다 많이 썼어~!!!",
    date: "2025.03.28 11:10",
  });

  return (
    <ExpenseContainer>
      <ExpenseListContainer>
        <ExpenseDateHeader>
          <ArrowButton onClick={() => changeDate(-1)}>{"<"}</ArrowButton>
          <h2>{formatDate(date)}</h2>
          <ArrowButton onClick={() => changeDate(1)}>{">"}</ArrowButton>
        </ExpenseDateHeader>
        <ExpenseItems>
          {items.map((item, index) =>
            isMyExpense ? (
              <MyExpenseCard key={index} item={item} />
            ) : (
              <FriendExpenseCard key={index} item={item} />
            )
          )}
        </ExpenseItems>
        {isMyExpense && (
          <AddExpenseButton onClick={handleAddExpenseModal}>
            + 지출 추가하기
          </AddExpenseButton>
        )}
      </ExpenseListContainer>
      <ExpenseCommentListContainer>
        <ExpenseCommentTittle>
          친구의 하루 소비에 피드백을 남겨주세요!
        </ExpenseCommentTittle>
        <ExpenseComments>
          {comments.map((c, i) =>
            isMyExpense ? (
              <MyCommentCard key={i} comment={c} />
            ) : (
              <FriendCommentCard key={i} comment={c} />
            )
          )}
        </ExpenseComments>{" "}
        {!isMyExpense && (
          <CommentInputWrapper>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <SubmitButton onClick={handleCommentSubmit}>
              <img src={SubmitBtn} alt="Etc" width="32" height="32" />
            </SubmitButton>
          </CommentInputWrapper>
        )}
      </ExpenseCommentListContainer>

      {showAddModal && <AddExpenseModal onClose={handleCloseAddExpenseModal} />}
    </ExpenseContainer>
  );
};

export default Expense;
