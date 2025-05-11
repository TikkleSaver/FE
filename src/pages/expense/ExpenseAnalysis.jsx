import { useState } from "react";
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

const Container = styled.div`
  max-width: 965px;
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
  margin-right: 20px;
`;

const Top2 = styled.span`
  font-size: 20px;
  margin: 0 20px;
`;

const Top3 = styled.span`
  margin-left: 20px;
`;

const InfoText = styled.p`
  margin-top: 0.5rem;
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
const COLORS = [
  "#3D8D7A",
  "#8BC1AE",
  "#C2E2D4",
  "#2C6F60",
  "#1F4E47",
  "#A5D5C3",
  "#6FA89A",
];

const ExpenseAnalysis = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const pieData = [
    { name: "식비", value: 502300 },
    { name: "카페", value: 402300 },
    { name: "쇼핑", value: 2300 },
    { name: "건강", value: 300 },
    { name: "취미", value: 502300 },
    { name: "교통비", value: 302300 },
    { name: "기타", value: 5020 },
  ];

  const sortedPieData = [...pieData].sort((a, b) => b.value - a.value);

  const barData = [
    { name: "1월", amount: 700000 },
    { name: "2월", amount: 820000 },
    { name: "3월", amount: 502300 },
    { name: "4월", amount: 700000 },
    { name: "5월", amount: 820000 },
    { name: "6월", amount: 0 },
    { name: "7월", amount: 0 },
    { name: "8월", amount: 0 },
    { name: "9월", amount: 0 },
    { name: "10월", amount: 0 },
    { name: "11월", amount: 0 },
    { name: "12월", amount: 0 },
  ];

  const top3 = ["식비", "카페", "교통비"];
  const achievedDays = 18;
  const achievementRate = 58.06;

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) setCurrentYear((prev) => prev - 1);
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) setCurrentYear((prev) => prev + 1);
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
    <Container>
      <CalendarBox>
        <Header>
          <NavButton onClick={handlePrevMonth}>&lt;</NavButton>
          <MonthTitle>{`${currentYear}.${String(currentMonth + 1).padStart(
            2,
            "0"
          )}`}</MonthTitle>
          <NavButton onClick={handleNextMonth}>&gt;</NavButton>
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
                  isAnimationActive={false}
                >
                  {sortedPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
              <Legend>
                {sortedPieData.map((item, index) => (
                  <LegendItem key={item.name}>
                    <ColorBox color={COLORS[index]} />
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
              <Top1>{top3[0]}</Top1> &gt; <Top2>{top3[1]}</Top2> &gt;{" "}
              <Top3>{top3[2]}</Top3>
            </InfoText>
          </InfoBlock>

          <VerticalDivider />

          <InfoBlock>
            <SmallTitle>총 정리</SmallTitle>
            <InfoText>
              이번달은 -원을 사용했으며, <br />
              전달 대비 -원을 아끼셨습니다! <br />
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
              지출 목표 달성률은 <Highlight>{achievementRate}%</Highlight>{" "}
              입니다.
            </InfoText>
          </InfoBlock>
        </Section>
      </CalendarBox>
    </Container>
  );
};

export default ExpenseAnalysis;
