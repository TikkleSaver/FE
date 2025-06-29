import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import Colors from "../../constanst/color.mjs";
import {
  getMonthlyTotalExpense,
  getTotalExpenseByCategory,
  getCategoryTop3,
  getMonthExpense,
  getAchievedGoalCost,
} from "../../api/expense/expenseAnalysisApi";

const Wrapper = styled.div`
  width: 100%;
  max-width: 100%;
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`;

const CalendarBox = styled.div`
  padding: 1.5rem 2rem;
  margin-top: 100px;
  border: 1.5px solid ${Colors.secondary100};
  border-radius: 25px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${Colors.secondary100};
  cursor: pointer;

  &:disabled {
    cursor: default;
    color: white;
    opacity: 0.4; /* 시각적으로도 비활성화 상태임을 명확히 */
  }
`;

const MonthTitle = styled.h2`
  font-size: 27px;
  color: ${Colors.secondary400};
  font-weight: bold;
`;

const Section = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: center;
`;

const ChartContainer = styled.div`
  flex: 1;
  min-width: 300px;
  margin-right: 2rem;
`;

const ChartTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  text-align: left;
  margin-bottom: 0.8rem;
`;

const SmallTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.8rem;
`;

const PieSpan = styled.span`
  font-size: 12px;
  color: ${Colors.secondary300};
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.4rem;
`;

const ColorBox = styled.div`
  width: 15px;
  height: 15px;
  background-color: ${(props) => props.color};
  margin-right: 0.5rem;
`;

const InfoBlock = styled.div`
  flex: 1;
  margin-top: 2rem;
`;

const Highlight = styled.span`
  color: red;
  font-weight: bold;
`;

const Top1 = styled.span`
  color: red;
  font-weight: bold;
  font-size: 25px;
  margin-right: 10px;
`;

const Top2 = styled.span`
  font-size: 20px;
  margin: 0 10px;
`;

const Top3 = styled.span`
  margin-left: 10px;
`;

const InfoText = styled.p`
  margin-top: 2.5rem;
  line-height: 2rem;
`;

const VerticalDivider = styled.div`
  width: 1.5px;
  height: 80px;
  background-color: ${Colors.secondary100}; // 원하는 색상
  margin: 2rem 1rem 0 1rem;
  align-self: center;
`;

const ChartRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Constants
const CATEGORY_COLORS = {
  1: "#FB8072", // 식비
  2: "#80B1D3", // 카페
  3: "#FED9A6", // 쇼핑
  4: "#BC80BD", // 건강
  5: "#CCEBC5", // 취미
  6: "#FFED6F", // 교통비
  7: "#D9D9D9", // 기타
};

const ExpenseAnalysis = () => {
  const today = new Date();
  // localStorage에서 연도, 월 불러오기 (없으면 오늘 날짜 기준)
  const getInitialYear = () => {
    const savedYear = localStorage.getItem("expenseAnalysisYear");
    return savedYear ? Number(savedYear) : today.getFullYear();
  };

  const getInitialMonth = () => {
    const savedMonth = localStorage.getItem("expenseAnalysisMonth");
    return savedMonth ? Number(savedMonth) : today.getMonth();
  };

  const [currentYear, setCurrentYear] = useState(getInitialYear);
  const [currentMonth, setCurrentMonth] = useState(getInitialMonth);
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0);
  const [saveExpense, setSaveExpense] = useState(0);
  const [achievedDays, setAchievedDays] = useState(0);
  const [achievementRate, setAchievementRate] = useState(0);

  const categories = [
    { id: 1, label: "식비" },
    { id: 2, label: "카페" },
    { id: 3, label: "쇼핑" },
    { id: 4, label: "건강" },
    { id: 5, label: "취미" },
    { id: 6, label: "교통비" },
    { id: 7, label: "기타 생활비" },
  ];

  const [barData, setBarData] = useState([
    { name: "1월", amount: 0 },
    { name: "2월", amount: 0 },
    { name: "3월", amount: 0 },
    { name: "4월", amount: 0 },
    { name: "5월", amount: 0 },
    { name: "6월", amount: 0 },
    { name: "7월", amount: 0 },
    { name: "8월", amount: 0 },
    { name: "9월", amount: 0 },
    { name: "10월", amount: 0 },
    { name: "11월", amount: 0 },
    { name: "12월", amount: 0 },
  ]);

  const [top3, setTop3] = useState([]);

  useEffect(() => {
    const fetchMonthlyExpense = async () => {
      try {
        const result = await getMonthlyTotalExpense(currentYear);

        const list = result.monthlyExpenseDTOList || [];

        const updatedData = [...barData];

        list.forEach(({ month, totalAmount }) => {
          const idx = month - 1;
          updatedData[idx] = {
            name: `${month}월`,
            amount: totalAmount,
          };
        });

        setBarData(updatedData);
        console.log("월별 지출 목록 조회 성공:", result);
      } catch (error) {
        console.error("월별 지출 목록 조회 실패", error);
      }
    };

    fetchMonthlyExpense();
  }, [currentYear]);

  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const prevMonth = currentMonth === 0 ? 12 : currentMonth;

        const [
          categoryExpenseRes,
          top3Res,
          currentMonthRes,
          prevMonthRes,
          achievedGoalRes,
        ] = await Promise.all([
          getTotalExpenseByCategory(currentYear, currentMonth + 1),
          getCategoryTop3(currentYear, currentMonth + 1),
          getMonthExpense(currentYear, currentMonth + 1),
          getMonthExpense(prevYear, prevMonth),
          getAchievedGoalCost(currentYear, currentMonth + 1),
        ]);

        // pieData 처리
        const list = categoryExpenseRes.categoryExpenseList || [];
        const updatedPieData = list.map(({ categoryId, totalAmount }) => {
          const matchedCategory = categories.find(
            (cat) => cat.id === categoryId
          );
          const color = matchedCategory
            ? CATEGORY_COLORS[matchedCategory.id]
            : "#ccc";
          return {
            name: matchedCategory ? matchedCategory.label : "기타 생활비",
            value: totalAmount,
            fill: color || "#ccc",
          };
        });
        setPieData(updatedPieData);

        // top3 처리
        const ids = [top3Res.category1, top3Res.category2, top3Res.category3];
        const updatedTop3 = ids.map((id) => {
          const matched = categories.find((cat) => cat.id === id);
          return matched ?? { id, label: "" };
        });
        setTop3(updatedTop3);

        // 지출 비교
        const save = prevMonthRes.totalAmount - currentMonthRes.totalAmount;
        setCurrentMonthExpense(currentMonthRes.totalAmount);
        setSaveExpense(save > 0 ? save : 0);

        // 달성률
        setAchievedDays(achievedGoalRes.achievedGoalCostDay);
        setAchievementRate(achievedGoalRes.achievementRate);

        console.log("모든 데이터 조회 성공");
      } catch (error) {
        console.error("데이터 조회 실패", error);
      }
    };

    fetchAll();

    localStorage.setItem("expenseAnalysisYear", currentYear);
    localStorage.setItem("expenseAnalysisMonth", currentMonth);
  }, [currentMonth]);

  const sortedPieData = [...pieData].sort((a, b) => b.value - a.value);

  useEffect(() => {
    return () => {
      localStorage.removeItem("expenseAnalysisYear");
      localStorage.removeItem("expenseAnalysisMonth");
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

  const renderCustomizedLabel = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, name } = props;
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 1.8;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={Colors.secondary300}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={10}
      >
        {name}
      </text>
    );
  };

  return (
    <Wrapper>
      <Container>
        <CalendarBox>
          <Header>
            <NavButton onClick={handlePrevMonth}>&lt;</NavButton>
            <MonthTitle>{`${currentYear}.${String(currentMonth + 1).padStart(
              2,
              "0"
            )}`}</MonthTitle>
            <NavButton
              onClick={handleNextMonth}
              disabled={isNextMonthDisabled()}
            >
              &gt;
            </NavButton>
          </Header>

          <Section>
            <ChartContainer>
              <ChartTitle>카테고리별 지출 비율</ChartTitle>
              <ChartRow>
                <PieChart width={220} height={220}>
                  <Pie
                    data={sortedPieData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={30}
                    label={renderCustomizedLabel}
                    animationDuration={800}
                    animationEasing="ease-out"
                  >
                    {sortedPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
                <Legend>
                  {sortedPieData.map((item, index) => (
                    <LegendItem key={item.name}>
                      <ColorBox color={item.fill} />
                      <PieSpan>{`${
                        item.name
                      } - ${item.value.toLocaleString()}원`}</PieSpan>
                    </LegendItem>
                  ))}
                </Legend>
              </ChartRow>
            </ChartContainer>

            <ChartContainer>
              <ChartTitle>올해의 지출 그래프</ChartTitle>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart
                  data={barData.map((d, i) => ({
                    ...d,
                    fill: i === currentMonth ? "#3D8D7A" : "#EAEAEA",
                  }))}
                  margin={{ left: 20 }}
                >
                  <XAxis dataKey="name" interval={0} />
                  <YAxis
                    domain={[0, "auto"]}
                    tickFormatter={(tick) => tick.toLocaleString()}
                  />
                  <Bar dataKey="amount">
                    {barData.map((_, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={i === currentMonth ? "#3D8D7A" : "#EAEAEA"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </Section>

          <Section>
            <InfoBlock>
              <SmallTitle>지출 TOP3</SmallTitle>
              <InfoText>
                {top3[0]?.label && <Top1>{top3[0].label}</Top1>}
                {top3[1]?.label && (
                  <>
                    {" "}
                    &gt; <Top2>{top3[1].label}</Top2>
                  </>
                )}
                {top3[2]?.label && (
                  <>
                    {" "}
                    &gt; <Top3>{top3[2].label}</Top3>
                  </>
                )}
              </InfoText>
            </InfoBlock>

            <VerticalDivider />

            <InfoBlock>
              <SmallTitle>총 정리</SmallTitle>
              <InfoText>
                이번달은 {currentMonthExpense}원을 사용했으며, <br />
                전달 대비 {saveExpense}원을 아끼셨습니다! <br />
                목표를 재설정하여 소비를 줄여보세요!
              </InfoText>
            </InfoBlock>

            <VerticalDivider />

            <InfoBlock>
              <SmallTitle>지출 목표 달성률</SmallTitle>
              <InfoText>
                이번달 지출 목표 달성 일은{" "}
                <Highlight>총 {achievedDays}일</Highlight>이며,
                <br />
                지출 목표 달성률은 <Highlight>
                  {achievementRate}%
                </Highlight>{" "}
                입니다.
              </InfoText>
            </InfoBlock>
          </Section>
        </CalendarBox>
      </Container>
    </Wrapper>
  );
};

export default ExpenseAnalysis;
