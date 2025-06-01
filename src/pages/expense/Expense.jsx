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
import {
  createExpenseComment,
  getExpenseCommentList,
} from "../../api/expense/expenseCommentApi";

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

const LoadingMessage = styled.div`
  text-align: center;
  width: 100%;
  padding-top: 20px;
  color: ${Colors.secondary300}; // 필요 시 색상도 조정
`;

const formatDateStr = (date) => date.toISOString().slice(0, 10);

const Expense = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);

  const initialDate = query.get("date")
    ? new Date(query.get("date"))
    : new Date();
  const memberId = query.get("memberId");
  const viewerId = query.get("viewerId");
  const isMyExpense = memberId === viewerId;

  const [date, setDate] = useState(initialDate);

  // 지출
  const [page, setPage] = useState(1);
  const [expenses, setExpenses] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  // 댓글
  const [commentsPage, setCommentsPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [commentsHasMore, setCommentsHasMore] = useState(true);

  // 입력 & 모달
  const [newComment, setNewComment] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const isFetchingRef = useRef({ expense: false, comment: false });
  const aborters = useRef({ expense: null, comment: null });
  const loaderRef = useRef(null);
  const commentsLoaderRef = useRef(null);

  // 로딩중
  const [isLoadingExpense, setIsLoadingExpense] = useState(false);
  const [isLoadingComment, setIsLoadingComment] = useState(false);

  const resetStateForNewDate = () => {
    setPage(1);
    setExpenses([]);
    setHasMore(true);

    setCommentsPage(1);
    setComments([]);
    setCommentsHasMore(true);
  };

  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);

    query.set("date", formatDateStr(newDate));
    navigate({ search: query.toString() }, { replace: true });

    setDate(newDate);
  };

  const safeFetch = useCallback(async ({ kind, apiFn, pageNum, onSuccess }) => {
    aborters.current[kind]?.abort?.();
    const controller = new AbortController();
    aborters.current[kind] = controller;

    isFetchingRef.current[kind] = true;
    if (kind === "expense") setIsLoadingExpense(true);
    if (kind === "comment") setIsLoadingComment(true);

    try {
      const result = await apiFn({ signal: controller.signal });
      if (!controller.signal.aborted) {
        onSuccess(result);
      }
    } catch (e) {
      if (e.name !== "AbortError") console.error(`${kind} fetch 실패:`, e);
    } finally {
      if (!controller.signal.aborted) {
        isFetchingRef.current[kind] = false;
        if (kind === "expense") setIsLoadingExpense(false);
        if (kind === "comment") setIsLoadingComment(false);
      }
    }
  }, []);

  useEffect(() => {
    safeFetch({
      kind: "expense",
      pageNum: page,
      apiFn: () =>
        getExpenseList({
          page,
          memberId,
          expenseDate: formatDateStr(date),
        }),
      onSuccess: (res) => {
        const list = res.expensePreviewDTOList || [];
        setExpenses((prev) =>
          page === 1
            ? list
            : [
                ...prev,
                ...list.filter(
                  (i) => !prev.some((p) => p.expenseId === i.expenseId)
                ),
              ]
        );
        setHasMore(!res.isLast);
      },
    });
  }, [page, date, memberId, safeFetch]);

  //댓글
  useEffect(() => {
    safeFetch({
      kind: "comment",
      pageNum: commentsPage,
      apiFn: () =>
        getExpenseCommentList({
          page: commentsPage,
          memberId,
          expenseDate: formatDateStr(date),
        }),
      onSuccess: (res) => {
        const list = res.expenseCommentDTOList || [];
        setComments((prev) =>
          commentsPage === 1
            ? list
            : [
                ...prev,
                ...list.filter(
                  (c) =>
                    !prev.some((p) => p.expenseCommentId === c.expenseCommentId)
                ),
              ]
        );
        setCommentsHasMore(!res.isLast);
      },
    });
  }, [commentsPage, date, memberId, safeFetch]);

  useEffect(() => {
    resetStateForNewDate();
  }, [date]);

  //IntersectionObservers
  // 지출
  useEffect(() => {
    if (!loaderRef.current) return;
    const el = loaderRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isFetchingRef.current.expense) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore]);

  // 댓글
  useEffect(() => {
    if (!commentsLoaderRef.current) return;
    const el = commentsLoaderRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          commentsHasMore &&
          !isFetchingRef.current.comment
        ) {
          setCommentsPage((p) => p + 1);
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [commentsHasMore]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      await createExpenseComment({
        memberId,
        content: newComment,
        expenseDate: formatDateStr(date),
      });
      alert("지출 피드백이 등록되었습니다!");
      setNewComment("");
      setCommentsPage(1);
    } catch (e) {
      console.error("피드백 등록 실패:", e);
      alert("피드백 등록 실패");
    }
  };

  return (
    <ExpenseContainer>
      <ExpenseListContainer>
        <ExpenseDateHeader>
          <ArrowButton onClick={() => changeDate(-1)}>{"<"}</ArrowButton>
          <h2>{formatDateStr(date).replace(/-/g, ".")}</h2>
          <ArrowButton onClick={() => changeDate(1)}>{">"}</ArrowButton>
        </ExpenseDateHeader>

        <ExpenseItems>
          {isLoadingExpense && page === 1 ? (
            <LoadingMessage>지출 정보를 불러오는 중...</LoadingMessage> // 🔄 여기에 스켈레톤 컴포넌트를 넣어도 좋음
          ) : (
            expenses.map((item, idx) =>
              isMyExpense ? (
                <MyExpenseCard
                  key={item.expenseId ?? idx}
                  item={item}
                  date={date}
                  onDone={() => setPage(1)}
                />
              ) : (
                <FriendExpenseCard key={item.expenseId ?? idx} item={item} />
              )
            )
          )}
          <div ref={loaderRef} style={{ height: 40 }} />
        </ExpenseItems>

        {isMyExpense && (
          <AddExpenseButton onClick={() => setShowAddModal(true)}>
            + 지출 추가하기
          </AddExpenseButton>
        )}
      </ExpenseListContainer>

      <ExpenseCommentListContainer>
        <ExpenseCommentTittle>
          친구의 하루 소비에 피드백을 남겨주세요!
        </ExpenseCommentTittle>

        <ExpenseComments>
          {isLoadingComment && commentsPage === 1 ? (
            <LoadingMessage>피드백을 불러오는 중...</LoadingMessage>
          ) : (
            comments.map((c, i) =>
              isMyExpense ? (
                <MyCommentCard key={c.expenseCommentId ?? i} comment={c} />
              ) : viewerId == c.commenterId ? (
                <FriendCommentCard
                  key={c.expenseCommentId ?? i}
                  comment={c}
                  onDone={() => setCommentsPage(1)}
                />
              ) : (
                <MyCommentCard key={c.expenseCommentId ?? i} comment={c} />
              )
            )
          )}
          <div ref={commentsLoaderRef} style={{ height: 40 }} />
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
          onClose={() => setShowAddModal(false)}
          onDone={() => setPage(1)}
        />
      )}
    </ExpenseContainer>
  );
};

export default Expense;
