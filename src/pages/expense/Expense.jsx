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

const formatDateStr = (date) => date.toISOString().slice(0, 10);

const Expense = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search);
  const selectedDate = query.get("date")
    ? new Date(query.get("date"))
    : new Date();
  const memberId = query.get("memberId");
  const viewerId = query.get("viewerId");
  const isMyExpense = memberId === viewerId;

  const [date, setDate] = useState(selectedDate);
  const [page, setPage] = useState(1);
  const [expenses, setExpenses] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const loaderRef = useRef(null);

  // 댓글 관련 상태
  const [comments, setComments] = useState([]);
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsHasMore, setCommentsHasMore] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const commentsLoaderRef = useRef(null);

  // 지출 리스트 불러오기
  const loadExpenses = useCallback(
    async (pageToLoad) => {
      if (loading) return;
      setLoading(true);
      try {
        const result = await getExpenseList({
          page: pageToLoad,
          memberId: memberId,
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
    [date, memberId, loading]
  );

  // 댓글 리스트 불러오기
  const loadComments = useCallback(
    async (pageToLoad) => {
      if (commentsLoading) return;
      setCommentsLoading(true);
      try {
        const result = await getExpenseCommentList({
          page: pageToLoad,
          memberId: memberId,
          expenseDate: formatDateStr(date),
        });
        const newComments = result.expenseCommentDTOList || [];

        if (pageToLoad === 1) {
          setComments(newComments);
        } else {
          setComments((prev) => {
            const existingIds = new Set(prev.map((c) => c.expenseCommentId));
            const uniqueNew = newComments.filter(
              (c) => !existingIds.has(c.expenseCommentId)
            );
            return [...prev, ...uniqueNew];
          });
        }
        setCommentsHasMore(!result.isLast);
      } catch (e) {
        console.error("피드백 리스트 조회 실패:", e);
      } finally {
        setCommentsLoading(false);
      }
    },
    [memberId, date, commentsLoading]
  );

  // 날짜 변경 함수
  const changeDate = (days) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    const newDateStr = formatDateStr(newDate);
    setDate(newDate);
    query.set("date", newDateStr);
    navigate({ search: query.toString() }, { replace: true });
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") return;
    try {
      await createExpenseComment({
        memberId: memberId,
        content: newComment,
        expenseDate: formatDateStr(date),
      });
      alert("지출 피드백이 등록되었습니다!");
      setNewComment("");
      setCommentsPage(1);
      setComments([]);
      setCommentsHasMore(true);
      loadComments(commentsPage);
    } catch (e) {
      console.error("피드백 등록 실패:", e);
      alert("피드백 등록 실패");
    }
  };

  // 날짜가 바뀔 때마다 초기화
  useEffect(() => {
    setExpenses([]);
    setHasMore(true);
    setPage(1);
  }, [date]);

  // 페이지 또는 날짜가 바뀔 때마다 리스트 로드
  useEffect(() => {
    loadExpenses(page);
  }, [page, date, loadExpenses]);

  useEffect(() => {
    setComments([]);
    setCommentsPage(1);
    setCommentsHasMore(true);
    setCommentsLoading(false);
    loadComments(1); // 첫 페이지 명시적으로 호출
  }, [date]);

  useEffect(() => {
    if (commentsPage === 1 || commentsLoading) return;
    loadComments(commentsPage);
  }, [commentsPage]);

  // 지출 무한스크롤 옵저버
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

  // 댓글 무한스크롤 옵저버
  useEffect(() => {
    if (!commentsLoaderRef.current || commentsLoading || !commentsHasMore)
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCommentsPage((prev) => prev + 1);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(commentsLoaderRef.current);
    return () => observer.disconnect();
  }, [commentsLoading, commentsHasMore]);

  // URL 쿼리에서 날짜 정보가 바뀌면 상태에 반영
  useEffect(() => {
    const urlDate = query.get("date");
    if (urlDate) {
      const parsed = new Date(urlDate);
      if (formatDateStr(parsed) !== formatDateStr(date)) {
        setDate(parsed);
      }
    }
  }, [location.search]);

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
                  loadExpenses(commentsPage);
                }}
              />
            ) : (
              <FriendExpenseCard key={item.id ?? idx} item={item} />
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
          {comments.map((c, i) =>
            isMyExpense ? (
              <MyCommentCard key={c.expenseCommentId ?? i} comment={c} />
            ) : viewerId == c.commenterId ? (
              <FriendCommentCard
                key={c.expenseCommentId ?? i}
                comment={c}
                onDone={() => {
                  setCommentsPage(1);
                  setComments([]);
                  setCommentsHasMore(true);
                  loadComments(1);
                }}
              />
            ) : (
              <MyCommentCard key={c.expenseCommentId ?? i} comment={c} />
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
