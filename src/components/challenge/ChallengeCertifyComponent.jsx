import React, { useState } from "react"; 
import styled from "styled-components";
import prevMonthIcon from "../../assets/prevMonthIcon.svg"
import nextMonthIcon from "../../assets/nextMonthIcon.svg"
import emptyImg from "../../images/emptyImg.svg"
import Colors from "../../constanst/color.mjs";

const ChallengeCertifyWrapper = styled.div`
  width: 80%;
  max-width: 100%;
  margin: 30px auto;
  display:flex;
  align-items: stretch;

`;

const Divider = styled.div`
  width: 1px;
  height:300px;
  background-color: #ccc;
 margin: auto 100px; 
`;
const CalendarContainer = styled.div`

  margin: 20px auto;
  padding: 20px;
  flex: 1;
  height: auto;
  min-height: 480px;

  border: 2px solid ${Colors.secondary100};
  border-radius: 10px;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

const MonthYear = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #4A5660;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-top: 10px;
`;

const Day = styled.div`
  padding: 20px;
  font-size: 18px;
  font-weight: 500;
  color: ${Colors.secondary100};
`;

const DateCell = styled.div`
  position: relative;
  padding: 15px;
  padding-bottom: 35px;
  margin: 2px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: 600;
  color: ${({ isToday, isSelected, isDisabled }) =>
    isDisabled ? "transparent" : isSelected ? "#fff" : isToday ? "#539E84" : "#4A5660"};
  cursor: ${({ isDisabled }) => (isDisabled ? "default" : "pointer")};

  &::before {
    content: "";
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${({ isSelected, isDisabled }) =>
      isDisabled ? "transparent" : isSelected ? "#A3D1C6" : "transparent"};
    z-index: 0;
  }

  span {
    position: relative;
    z-index: 1;
    color: ${({ isDisabled }) => (isDisabled ? "transparent" : "inherit")};  /* 숫자 숨김 */
  }

  &:hover::before {
    background-color: ${({ isSelected, isDisabled }) =>
      isDisabled
        ? "transparent"
        : isSelected
        ? "#A3D1C6"
        : "#D7F2EB"};
  }
`;
const ChallengeCertifyContainer = styled.div`
  width: 450px;
  flex: 1;
  height: auto;
  margin: 20px auto;
  border: 2px solid ${Colors.secondary100};
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;  // 세로 방향
  align-items: center;     // 가로 중앙 정렬
  justify-content: center; // 세로 중앙 정렬

 
`;

const ChallengeCertifyText = styled.div`
    font-size: 22px;
    font-weight: 600;
    margin-top: 18px;
    color: #4A5660;

`;

const ChallengeCertifyImg= styled.img`
  width: 200px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 15px;
  margin-top: 40px;
`;

const CertifyTextContainer = styled.div`
  display: flex;
  position: relative;
  width:75%;
  margin: 40px auto;
  
`;

const CertifyTextInput = styled.input`
  width: 100%;
  padding-top:10px;
  padding-left:5px;
  padding-bottom:10px;
  border: none;
  border-bottom: 2px solid #333;
  font-size: 16px;
  font-weight: 600;
  outline: none;
`;

const CharCount = styled.div`
  position: absolute;
  right: 5px;
  bottom: 10px; /* input 높이에 따라 조절하세요 */
  font-size: 12px;
  color: #999;
`;

const CertifyBtn = styled.button`
    border: 1px solid ${Colors.primary500};
    background-color: ${Colors.primary};
    color: white;
    padding: 10px 30px;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    margin-left: 230px;
    margin-bottom: 10px;
  
`;


function CalendarComponent({ selectedDate, setSelectedDate }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date();
  
    const goToPreviousMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };
  
    const goToNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };
  
    const getDaysInMonth = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const numDays = new Date(year, month + 1, 0).getDate();
      const daysArray = [];
  
      for (let i = 0; i < firstDay; i++) daysArray.push(null);
      for (let i = 1; i <= numDays; i++) daysArray.push(i);
  
      return daysArray;
    };
  
    const handleDateClick = (day) => {
      if (day) {
        setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
      }
    };
  
    const isSameDay = (date1, date2) =>
      date1 &&
      date2 &&
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate();
  
    return (
      <CalendarContainer>
        <Header>
          <Button onClick={goToPreviousMonth}><img src={prevMonthIcon} /></Button>
          <MonthYear>
            {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
          </MonthYear>
          <Button onClick={goToNextMonth}><img src={nextMonthIcon} /></Button>
        </Header>
        <DaysContainer>
          {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
            <Day key={day}>{day}</Day>
          ))}
          {getDaysInMonth().map((day, index) => {
            const dateObj = day ? new Date(currentDate.getFullYear(), currentDate.getMonth(), day) : null;
            return (
                <DateCell
                key={index}
                isToday={isSameDay(dateObj, today)}
                isSelected={isSameDay(dateObj, selectedDate)}
                isDisabled={!day}   
                onClick={() => handleDateClick(day)}
              >
                <span>{day}</span>
              </DateCell>
            );
          })}
        </DaysContainer>
      </CalendarContainer>
    );
  }

  function CertifyComponent({ selectedDate }) {
    const [text, setText] = useState('');
  
    const handleChange = (e) => {
      const value = e.target.value;
      if (value.length <= 20) setText(value);
    };
  
    const formattedDate = selectedDate 
      ? `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${selectedDate.getDate()}`
      : '날짜를 선택해주세요';
  
    return (
      <ChallengeCertifyContainer>
        <ChallengeCertifyText>
          {formattedDate} 인증 업로드
        </ChallengeCertifyText>
        <ChallengeCertifyImg src={emptyImg} />
        <CertifyTextContainer>
          <CertifyTextInput
            value={text}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
          />
          <CharCount>{text.length}/20</CharCount>
        </CertifyTextContainer>
        <CertifyBtn>등록하기</CertifyBtn>
      </ChallengeCertifyContainer>
    );
  }

const ChallengeCertifyComponent = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <ChallengeCertifyWrapper>
            <CalendarComponent 
              selectedDate={selectedDate} 
              setSelectedDate={setSelectedDate} 
            />
          <Divider />
            <CertifyComponent selectedDate={selectedDate} />
        </ChallengeCertifyWrapper>
      );
};
export default ChallengeCertifyComponent;