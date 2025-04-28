import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 965px;
  margin: 0 auto;
`;

const CalendarWrapper = styled.div`
  padding: 1.5rem 0;
  margin-top: 100px;
  border: 1.5px solid #b5b3c6;
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
  color: #b5bec6;
  cursor: pointer;
`;

const Title = styled.h2`
  font-size: 27px;
  color: #4a5660;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const Day = styled.div`
  font-weight: bold;
  color: #b5bec6;
  margin-bottom: 0.5rem;
`;

const DateCell = styled.div`
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.isToday ? "green" : "#4A5660 ")};
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
    border-bottom: 2px solid #ccc;
    background: transparent;
    padding: 6px 4px;
    font-size: 14px;
    outline: none;
    width: 100px;
    margin-left: 8px;
  }
`;

const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

// 임시 데이터
const dummyExpenses = {
  "2025-04-01": -120000,
  "2025-04-03": -80000,
  "2025-04-04": -120000,
  "2025-04-05": 100,
  "2025-04-06": -120000,
  "2025-04-07": -120000,
  "2025-04-08": -120000,
  "2025-04-10": -80000,
  "2025-04-11": -120000,
  "2025-04-12": 100,
  "2025-04-13": -120000,
  "2025-04-14": -120000,
  "2025-04-15": -120000,
  "2025-04-17": -80000,
  "2025-04-18": -120000,
  "2025-04-19": 19,
  "2025-04-20": 100,
};

const ExpenseCalendar = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth()); // 0~11월
  const [dailyBudget, setDailyBudget] = useState(15000);

  // 이전 달로 변경하는 함수
  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  // 다음 달로 변경하는 함수
  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  // 날짜를 가져오는 함수
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // 달의 시작 요일을 가져오는 함수
  const getStartDayOfWeek = (year, month) => {
    return new Date(year, month, 1).getDay();
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
      const expense = dummyExpenses[dateKey];

      const isToday =
        date === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      const isOverBudget =
        expense !== undefined && Math.abs(expense) > dailyBudget;

      cells.push(
        <DateCell key={dateKey} isToday={isToday}>
          <div>{date}</div>
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
