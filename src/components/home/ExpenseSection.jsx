import { useState } from 'react';
import styled from 'styled-components';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import Colors from '../../constanst/color.mjs';

const Container = styled.div`
  max-width: 965px;
  margin: 0 auto;
`;

const CalendarBox = styled.div`
  padding: 1.5rem 2rem;
  border: 1.5px solid ${Colors.secondary100};
  border-radius: 25px;
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

const ChartRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Constants
const COLORS = [
  '#3D8D7A',
  '#8BC1AE',
  '#C2E2D4',
  '#2C6F60',
  '#1F4E47',
  '#A5D5C3',
  '#6FA89A',
];

const ExpenseSection = () => {
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const pieData = [
    { name: '식비', value: 502300 },
    { name: '카페', value: 402300 },
    { name: '쇼핑', value: 2300 },
    { name: '건강', value: 300 },
    { name: '취미', value: 502300 },
    { name: '교통비', value: 302300 },
    { name: '기타', value: 5020 },
  ];

  const sortedPieData = [...pieData].sort((a, b) => b.value - a.value);

  const barData = [
    { name: '1월', amount: 700000 },
    { name: '2월', amount: 820000 },
    { name: '3월', amount: 502300 },
    { name: '4월', amount: 700000 },
    { name: '5월', amount: 820000 },
    { name: '6월', amount: 0 },
    { name: '7월', amount: 0 },
    { name: '8월', amount: 0 },
    { name: '9월', amount: 0 },
    { name: '10월', amount: 0 },
    { name: '11월', amount: 0 },
    { name: '12월', amount: 0 },
  ];

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
                  fill: i === currentMonth ? '#3D8D7A' : '#EAEAEA',
                }))}
                margin={{ left: 20 }}
              >
                <XAxis dataKey="name" interval={0} />
                <YAxis
                  domain={[0, 'auto']}
                  tickFormatter={(tick) => tick.toLocaleString()}
                />
                <Bar dataKey="amount">
                  {barData.map((_, i) => (
                    <Cell
                      key={`cell-${i}`}
                      fill={i === currentMonth ? '#3D8D7A' : '#EAEAEA'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Section>
      </CalendarBox>
    </Container>
  );
};

export default ExpenseSection;
