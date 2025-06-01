import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  &:disabled {
    cursor: default;
    color: white;
    opacity: 0.4; /* 시각적으로도 비활성화 상태임을 명확히 */
  }
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
  color: ${(props) => (props.$isToday ? "green" : Colors.secondary400)};
`;

const DateNumber = styled.button`
  all: unset;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.5; /* 시각적으로도 비활성화 상태임을 명확히 */
  }
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
  const location = useLocation();
  const today = new Date();
  const query = new URLSearchParams(location.search);
  // localStorage에서 연도, 월 불러오기 (없으면 오늘 날짜 기준)
  const getInitialYear = () => {
    const savedYear = localStorage.getItem("expenseCalendarYear");
    return savedYear ? Number(savedYear) : today.getFullYear();
  };

  const getInitialMonth = () => {
    const savedMonth = localStorage.getItem("expenseCalendarMonth");
    return savedMonth ? Number(savedMonth) : today.getMonth();
  };

  const [currentYear, setCurrentYear] = useState(getInitialYear);
  const [currentMonth, setCurrentMonth] = useState(getInitialMonth);
  const [dailyBudget, setDailyBudget] = useState(0);
  const [originalGoalCost, setOriginalGoalCost] = useState(null);
  const [debouncedBudget, setDebouncedBudget] = useState(null);
  const [expenseData, setExpenseData] = useState({});
  const memberId = query.get("memberId") || null; // 조회할 지출 내역의의 주인 ID
  const viewerId = query.get("viewerId") || null;

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
    const fetchData = async () => {
      try {
        const [goalCostRes, expensesRes] = await Promise.all([
          getgoalCost(memberId),
          getDailyTotalExpense(memberId, currentYear, currentMonth + 1),
        ]);

        // 지출 목표 금액 처리
        const cost = goalCostRes.result.goalCost;
        setDailyBudget(cost);
        setOriginalGoalCost(cost);
        console.log("지출 목표 금액 조회 성공:", goalCostRes);

        // 지출 내역 처리
        const list = expensesRes.result.dailyExpenseDTOList || [];
        const expenseMap = {};

        list.forEach(({ totalCost, expenseDate }) => {
          const dateObj = new Date(expenseDate);
          const kstDate = new Date(dateObj.getTime() + 9 * 60 * 60 * 1000); // KST 변환
          const dateKey = kstDate.toISOString().slice(0, 10); // YYYY-MM-DD
          expenseMap[dateKey] = totalCost;
        });

        setExpenseData(expenseMap);
        console.log("지출 데이터 조회 성공:", expensesRes);
      } catch (error) {
        console.error("지출 목표 금액 또는 일별 지출 조회 실패", error);
      }
    };

    fetchData();

    localStorage.setItem("expenseCalendarYear", currentYear);
    localStorage.setItem("expenseCalendarMonth", currentMonth);
  }, [memberId, currentYear, currentMonth]);

  useEffect(() => {
    return () => {
      localStorage.removeItem("expenseCalendarYear");
      localStorage.removeItem("expenseCalendarMonth");
    };
  }, []);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((year) => year - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    const today = new Date();
    const thisMonth = today.getMonth(); // 0~11
    const thisYear = today.getFullYear();

    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    // 다음 월이 현재보다 미래면 이동 금지
    if (
      nextYear > thisYear ||
      (nextYear === thisYear && nextMonth > thisMonth)
    ) {
      return;
    }

    setCurrentMonth(nextMonth);
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
  };

  const isNextMonthDisabled = () => {
    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
    const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

    return (
      nextYear > thisYear || (nextYear === thisYear && nextMonth > thisMonth)
    );
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfWeek = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (dateKey) => {
    navigate(
      `/expense?date=${dateKey}${memberId ? `&memberId=${memberId}` : ""}${
        viewerId ? `&viewerId=${viewerId}` : ""
      }`
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

      const todayOnly = new Date(today);
      todayOnly.setHours(0, 0, 0, 0);
      const currentDateOnly = new Date(currentYear, currentMonth, date);
      currentDateOnly.setHours(0, 0, 0, 0);
      const isDisabled = currentDateOnly > todayOnly;

      cells.push(
        <DateCell key={dateKey} $isToday={isToday}>
          <DateNumber
            onClick={() => !isDisabled && handleDateClick(dateKey)}
            disabled={isDisabled}
          >
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
          <ArrowButton
            onClick={handleNextMonth}
            disabled={isNextMonthDisabled()}
          >
            &gt;
          </ArrowButton>
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
        {memberId == null ? (
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
