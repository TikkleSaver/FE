import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Colors from "../../constanst/color.mjs";
import { getdailyExpenseList } from "../../api/expense/expenseCalendarApi";

const Wrapper = styled.div`
  max-width: 965px;
  margin: 0 auto;
`;

const CalendarWrapper = styled.div`
  padding: 1.5rem 0;
  margin-top: 100px;
  border: 1.5px solid ${Colors.secondary100};
  border-radius: 25px;
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0%.5;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  margin: 0 3rem;
  font-size: 1.5rem;
  color: ${Colors.secondary100};
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 27px;
  color: ${Colors.secondary400};
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const Day = styled.div`
  font-weight: bold;
  color: ${Colors.secondary100};
  margin-bottom: 0.5rem;
`;

const DateCell = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.isToday ? "green" : "${Colors.secondary400}")};
`;

const DateNumber = styled.div`
  cursor: pointer;
`;

const ExpenseAmount = styled.div`
  color: ${(props) => (props.isOver ? "red" : "black")};
  font-size: 0.9rem;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const Footer = styled.div`
  margin: 1rem 0 0 2rem;
  text-align: left;
  font-weight: bold;

  input {
    border: none;
    border-bottom: 2px solid ${Colors.secondary100};
    background: transparent;
    padding: 6px 4px;
    font-size: 14px;
    outline: none;
    width: 100px;
    margin-left: 8px;
  }
`;

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

const ExpenseCalendar = () => {
  const navigate = useNavigate();
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0~11월
  const [dailyBudget, setDailyBudget] = useState(15000);
  const [expenseData, setExpenseData] = useState({});
  const memberId = 1;

  useEffect(() => {
    console.log("useEffect 실행 - API 호출 시도");
    const fetchExpenses = async () => {
      try {
        const result = await getdailyExpenseList({
          memberId,
          year: currentYear,
          month: currentMonth + 1,
        });
        console.log("API 호출 성공:", result);

        // 1. dailyExpenseDTOList가 있는지 확인
        const list = result.dailyExpenseDTOList || [];

        // 2. 배열을 날짜키: totalCost 객체로 변환
        const expenseMap = {};

        list.forEach(({ totalCost, expenseDate }) => {
          // ISO 날짜에서 시간 제거, 예: '2025-05-23T00:00:00.000+00:00' -> '2025-05-23'
          const dateKey = expenseDate.split("T")[0];
          expenseMap[dateKey] = totalCost;
        });

        // 3. 상태에 저장
        setExpenseData(expenseMap);
      } catch (error) {
        console.error("지출 데이터 불러오기 실패", error);
      }
    };

    fetchExpenses();
  }, [memberId, currentYear, currentMonth]);

  // 이전 달로 변경하는 함수
  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  // 다음 달로 변경하는 함수
  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  // 날짜를 가져오는 함수
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 달의 시작 요일을 가져오는 함수
  const getStartDayOfWeek = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // 특정 날짜의 지출 목록 페이지로 이동하는 함수
  const handleDateClick = (dateKey) => {
    navigate(`/expense?date=${dateKey}`); // dateKey: '2025-04-15'
  };

  const renderCells = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const startDay = getStartDayOfWeek(currentYear, currentMonth);

    const cells = [];
    const today = new Date();

    for (let i = 0; i < startDay; i++) {
      cells.push(<DateCell key={`empty-${i}`} />);
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(date).padStart(2, "0")}`;
      const expense = expenseData[dateKey];

      const isToday =
        date === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      const isOverBudget =
        expense !== undefined && Math.abs(expense) > dailyBudget;

      cells.push(
        <DateCell key={dateKey} isToday={isToday}>
          <DateNumber onClick={() => handleDateClick(dateKey)}>
            {date}
          </DateNumber>
          {expense !== undefined && (
            <ExpenseAmount isOver={isOverBudget}>{expense}원</ExpenseAmount>
          )}
        </DateCell>
      );
    }

    return cells;
  };

  return (
    <Wrapper>
      <CalendarWrapper>
        <CalendarHeader>
          <ArrowButton onClick={handlePrevMonth}>&lt;</ArrowButton>
          <Title>{`${currentYear}.${String(currentMonth + 1).padStart(
            2,
            "0"
          )}`}</Title>
          <ArrowButton onClick={handleNextMonth}>&gt;</ArrowButton>
        </CalendarHeader>

        <Grid>
          {daysOfWeek.map((day) => (
            <Day key={day}>{day}</Day>
          ))}
          {renderCells()}
        </Grid>
      </CalendarWrapper>
      <Footer>
        지출 목표 금액 :{" "}
        <input
          type="number"
          value={dailyBudget === "" ? "" : dailyBudget}
          min={0}
          onChange={(e) => {
            const value = e.target.value;
            setDailyBudget(value === "" ? "" : Number(value));
          }}
        />{" "}
      </Footer>
    </Wrapper>
  );
};

export default ExpenseCalendar;
