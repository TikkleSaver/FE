import React, { useEffect, useRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyExpenseCard from "./../../components/expense/MyExpenseCard";
import MyCommentCard from "../../components/expense/MyCommentCard";
import FriendExpenseCard from "../../components/expense/FriendExpenseCard";
import FriendCommentCard from "../../components/expense/FriendCommentCard";
import SubmitBtn from "./../../assets/arrowUp.svg";
import AddExpenseModal from "../../components/expense/modal/AddExpenseModal";
import Colors from "../../constanst/color.mjs";
import { getExpenseList } from "../../api/expense/expenseApi";

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
  padding-bottom: 50px;
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
// 날짜 포맷 함수
const formatDateStr = (date) => date.toISOString().slice(0, 10);

const Expense = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const queryDate = query.get("date");
  const selectedDate = queryDate ? new Date(queryDate) : new Date();

  const loggedInUserId = "meartangLove0005";
  const viewedUserId = location.state?.userId || loggedInUserId;
  const isMyExpense = loggedInUserId === viewedUserId;

  const [date, setDate] = useState(selectedDate);
  const [page, setPage] = useState(1);
  const [expenses, setExpenses] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const loaderRef = useRef(null);

  const loadExpenses = useCallback(
    async (pageToLoad) => {
      if (loading) return;
      setLoading(true);
      try {
        const result = await getExpenseList({
          page: pageToLoad,
          memberId: 1,
          expenseDate: formatDateStr(date),
        });

        const newExpenses = result.expensePreviewDTOList || [];
        if (pageToLoad === 1) {
          setExpenses(newExpenses);
        } else {
          setExpenses((prev) => {
            const existingIds = new Set(prev.map((item) => item.expenseId));
            const uniqueNew = newExpenses.filter(
              (item) => !existingIds.has(item.expenseId)
            );
            return [...prev, ...uniqueNew];
          });
        }

        setHasMore(!result.isLast);
      } catch (e) {
        console.error("지출 리스트 조회 실패:", e);
      } finally {
        setLoading(false);
      }
    },
    [date]
  );

  // 날짜 변경 시 URL 쿼리 갱신
  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    const newDateStr = formatDateStr(newDate);
    setDate(newDate);
    query.set("date", newDateStr);
    navigate({ search: query.toString() }, { replace: true });
  };

  // 날짜 바뀌면 페이지 초기화
  useEffect(() => {
    setExpenses([]);
    setHasMore(true);
    setPage(1);
  }, [date]);

  // page나 date 바뀌면 데이터 로드
  useEffect(() => {
    loadExpenses(page);
  }, [page, date, loadExpenses]);

  // 무한 스크롤 옵저버
  useEffect(() => {
    if (!loaderRef.current || loading || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loading, hasMore]);

  // 쿼리 스트링이 직접 수정된 경우 date 상태 갱신
  useEffect(() => {
    const urlDate = query.get("date");
    if (urlDate) {
      const parsed = new Date(urlDate);
      const current = formatDateStr(date);
      if (formatDateStr(parsed) !== current) {
        setDate(parsed);
      }
    }
  }, [location.search]);

  // 댓글 관련
  const [newComment, setNewComment] = useState("");
  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;
    console.log("새 피드백:", newComment);
    setNewComment("");
  };

  // 모달
  const [showAddModal, setShowAddModal] = useState(false);
  const handleAddExpenseModal = () => setShowAddModal(true);
  const handleCloseAddExpenseModal = () => setShowAddModal(false);

  // 예시 댓글
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
          <h2>{formatDateStr(date).replace(/-/g, ".")}</h2>
          <ArrowButton onClick={() => changeDate(1)}>{">"}</ArrowButton>
        </ExpenseDateHeader>

        <ExpenseItems>
          {expenses.map((item, idx) =>
            isMyExpense ? (
              <MyExpenseCard
                key={item.expenseId ?? idx}
                item={item}
                date={date}
                onDone={() => {
                  setPage(1);
                  setExpenses([]);
                  setHasMore(true);
                  loadExpenses(1);
                }}
              />
            ) : (
              <FriendExpenseCard key={item.id ?? idx} item={item} />
            )
          )}
          <div ref={loaderRef} style={{ height: 40 }} />
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
        </ExpenseComments>
        {!isMyExpense && (
          <CommentInputWrapper>
            <CommentInput
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="피드백을 입력하세요"
            />
            <SubmitButton onClick={handleCommentSubmit}>
              <img src={SubmitBtn} alt="Submit" width="32" height="32" />
            </SubmitButton>
          </CommentInputWrapper>
        )}
      </ExpenseCommentListContainer>

      {showAddModal && (
        <AddExpenseModal
          date={date}
          onClose={handleCloseAddExpenseModal}
          onDone={() => {
            setPage(1);
            setExpenses([]);
            setHasMore(true);
            loadExpenses(1);
          }}
        />
      )}
    </ExpenseContainer>
  );
};

export default Expense;
