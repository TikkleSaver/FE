import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Colors from "../../constanst/color.mjs";
import {
  getDailyTotalExpense,
  getgoalCost,
  patchGoalCost,
} from "../../api/expense/expenseCalendarApi";

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
  color: ${(props) => (props.isToday ? "green" : Colors.secondary400)};
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
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [dailyBudget, setDailyBudget] = useState(0);
  const [originalGoalCost, setOriginalGoalCost] = useState(null);
  const [debouncedBudget, setDebouncedBudget] = useState(null);
  const [expenseData, setExpenseData] = useState({});
  const memberId = 41; // 조회할 지출 내역의의 주인 ID
  const viewerId = 41;

  // debounce 로직 (dailyBudget이 변할 때마다 1초 뒤에 업데이트)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (dailyBudget !== null && dailyBudget !== "") {
        setDebouncedBudget(dailyBudget);
      }
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [dailyBudget]);

  // PATCH(debouncedBudget이 바뀌면) API 호출
  useEffect(() => {
    const updateGoalCost = async () => {
      try {
        await patchGoalCost(debouncedBudget);
        setOriginalGoalCost(debouncedBudget);
        console.log("지출 목표 금액 업데이트 성공:", debouncedBudget);

        const result = await getgoalCost(memberId);
        const cost = result.result.goalCost;
        setDailyBudget(cost);
        setOriginalGoalCost(cost);
      } catch (error) {
        console.error("지출 목표 금액 업데이트 실패", error);
      }
    };

    if (
      debouncedBudget !== null &&
      debouncedBudget !== "" &&
      debouncedBudget !== originalGoalCost
    ) {
      updateGoalCost();
    }
  }, [debouncedBudget, originalGoalCost]);

  // GET API 호출 로직
  useEffect(() => {
    const fetchGoalCost = async () => {
      try {
        const result = await getgoalCost(memberId);
        const cost = result.result.goalCost; // 백엔드 응답 형식에 따라 수정
        setDailyBudget(cost);
        setOriginalGoalCost(cost);
        console.log("지출 목표 금액 조회 성공:", result);
      } catch (error) {
        console.error("지출 목표 금액 조회 실패", error);
      }
    };

    const fetchExpenses = async () => {
      try {
        const result = await getDailyTotalExpense(
          memberId,
          currentYear,
          currentMonth + 1
        );
        const list = result.result.dailyExpenseDTOList || [];

        const expenseMap = {};

        list.forEach(({ totalCost, expenseDate }) => {
          // UTC → KST 변환
          const dateObj = new Date(expenseDate);
          const kstDate = new Date(dateObj.getTime() + 9 * 60 * 60 * 1000);
          const dateKey = kstDate.toISOString().slice(0, 10); // YYYY-MM-DD
          expenseMap[dateKey] = totalCost;
        });

        setExpenseData(expenseMap);
        console.log("API 호출 성공:", result);
      } catch (error) {
        console.error("지출 데이터 불러오기 실패", error);
      }
    };

    fetchGoalCost();
    fetchExpenses();
  }, [memberId, currentYear, currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfWeek = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (dateKey) => {
    navigate(
      `/expense?date=${dateKey}&memberId=${memberId}&viewerId=${viewerId}`
    );
  };

  const renderCells = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const startDay = getStartDayOfWeek(currentYear, currentMonth);
    const cells = [];

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
        {memberId === viewerId ? (
          <input
            type="number"
            value={dailyBudget === "" ? "" : dailyBudget}
            min={0}
            onChange={(e) => {
              const value = e.target.value;
              setDailyBudget(value === "" ? "" : Number(value));
            }}
          />
        ) : (
          <span>{dailyBudget.toLocaleString()} 원</span>
        )}
      </Footer>
    </Wrapper>
  );
};

export default ExpenseCalendar;
