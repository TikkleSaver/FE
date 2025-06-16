import React, { useState, useEffect } from "react"; 
import styled from "styled-components";
import prevMonthIcon from "../../assets/prevMonthIcon.svg"
import nextMonthIcon from "../../assets/nextMonthIcon.svg"
import emptyImg from "../../images/emptyImg.svg"
import Colors from "../../constanst/color.mjs";
import { useParams,useNavigate, useLocation } from "react-router-dom";
import { submitMissionProof, getMonthlyProofs, updateMissionProof } from "../../api/challenge/challengeDetailApi";

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

  &::after {
    content: ${({ hasProof }) => (hasProof ? "'•'" : "''")};
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
    color: ${Colors.primary};
  }

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
    font-size: 18px;
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


function CalendarComponent({  currentDate,
  setCurrentDate,
  selectedDate,
  setSelectedDate,
  missionProofs = []}) {
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
    date1 && date2 &&
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

  const hasProof = (day) => {
    return missionProofs?.some(proof => {
      const proofDate = new Date(proof.createdAt);
      return proofDate.getFullYear() === currentDate.getFullYear()
        && proofDate.getMonth() === currentDate.getMonth()
        && proofDate.getDate() === day;
    });
  };

  return (
    <CalendarContainer>
      <Header>
        <Button onClick={goToPreviousMonth}><img src={prevMonthIcon} alt="prev" /></Button>
        <MonthYear>{currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월</MonthYear>
        <Button onClick={goToNextMonth}><img src={nextMonthIcon} alt="next" /></Button>
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
              hasProof={hasProof(day)}
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


function CertifyComponent({ selectedDate, currentProof, setCurrentProof, missionProofs, setMissionProofs }) {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [isModifying, setIsModifying] = useState(false);

  const { challengeId } = useParams();

  const dateToUse = selectedDate || new Date();
  const formattedDate = `${dateToUse.getFullYear()}-${String(dateToUse.getMonth() + 1).padStart(2, '0')}-${String(dateToUse.getDate()).padStart(2, '0')}`;
  const isToday = dateToUse.toDateString() === new Date().toDateString();
  const printDate = `${dateToUse.getFullYear()}.${String(dateToUse.getMonth() + 1).padStart(2, '0')}.${String(dateToUse.getDate()).padStart(2, '0')}`;


  useEffect(() => {
    if (currentProof) {
      setText(currentProof.content || '');
      setFile(null);
      setIsModifying(false);
    } else {
      setText('');
      setFile(null);
      setIsModifying(false);
    }
  }, [currentProof]);


  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 20) setText(value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    try {
      let response;
      if (currentProof) {
        response = await updateMissionProof(currentProof.missionProofId, { content: text }, file);
        alert('미션 인증이 수정되었습니다.');
      } else {
        response = await submitMissionProof(challengeId, formattedDate, text, file);
        alert('미션 인증이 등록되었습니다.');
      }
  
      setIsModifying(false);
  
      const year = dateToUse.getFullYear();
      const month = dateToUse.getMonth() + 1;
      const refreshed = await getMonthlyProofs(challengeId, year, month);
  
      setMissionProofs(refreshed.result);
      console.log("수정하기", missionProofs)
  
      const updatedProof = refreshed.result.find(p => p.date === formattedDate) || null;
      setCurrentProof(updatedProof);
  
    } catch (error) {
      alert('미션 인증 처리에 실패했습니다.');
    }
  };
  

  if (currentProof) {
    return (
      <ChallengeCertifyContainer>
        <ChallengeCertifyText>
          {printDate} 인증 완료
        </ChallengeCertifyText>
  
        {/* 이미지 클릭 시 파일 업로드 */}
        {isModifying ? (
          <>
            <label htmlFor="file-upload">
  <ChallengeCertifyImg
    src={
      file
        ? URL.createObjectURL(file)
        : currentProof.imageUrl // 기존 이미지가 있을 경우 보여줌
    }
    alt="미리보기 이미지"
    style={{ cursor: "pointer" }}
  />
</label>
<input
  id="file-upload"
  type="file"
  onChange={handleFileChange}
  style={{ display: "none" }}
/>
          </>
        ) : (
          <ChallengeCertifyImg
            src={currentProof.imageUrl}
            alt="인증 이미지"
          />
        )}
  
        <CertifyTextContainer>
          <CertifyTextInput
            value={text}
            readOnly={!isModifying}
            onChange={handleChange}
          />
          <CharCount>{text.length}/20</CharCount>
        </CertifyTextContainer>
  
        {isToday && !isModifying && (
          <CertifyBtn onClick={() => setIsModifying(true)}>수정하기</CertifyBtn>
        )}
  
        {isModifying && (
          <CertifyBtn onClick={handleSubmit}>수정 완료</CertifyBtn>
        )}
      </ChallengeCertifyContainer>
    );
  }

  // 인증 안된 날인데 오늘인 경우 → 등록 가능
  if (!currentProof && isToday) {
    return (
      <ChallengeCertifyContainer>
        <ChallengeCertifyText>
        아직 오늘의 인증이 업로드되지 않았어요!
        </ChallengeCertifyText>
        <ChallengeCertifyImg
          src={file ? URL.createObjectURL(file) : emptyImg}
          alt="preview"
        />
        <input type="file" onChange={handleFileChange} style={{ marginTop: "20px" }} />
        <CertifyTextContainer>
          <CertifyTextInput
            value={text}
            onChange={handleChange}
            placeholder="내용을 입력하세요"
          />
          <CharCount>{text.length}/20</CharCount>
        </CertifyTextContainer>
        <CertifyBtn onClick={handleSubmit}>등록하기</CertifyBtn>
      </ChallengeCertifyContainer>
    );
  }

  // 인증 안된 날 & 오늘도 아님 → 기본 안내 표시
  return (
    <ChallengeCertifyContainer>
      <ChallengeCertifyText>
        {printDate} 인증이 완료되지 않은 날입니다.
      </ChallengeCertifyText>
      <ChallengeCertifyImg src={emptyImg} alt="기본 이미지" />
    </ChallengeCertifyContainer>
  );
}

  const ChallengeCertifyComponent = () => {
  const { challengeId } = useParams();

  const [currentDate, setCurrentDate] = useState(new Date()); // 현재 달
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [missionProofs, setMissionProofs] = useState([]);     // 해당 달의 인증 데이터 전체
  const [currentProof, setCurrentProof] = useState(null);     // 선택된 날짜 인증 데이터

  useEffect(() => {
    const fetchMissionProofsByMonth = async () => {
      try {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const response = await getMonthlyProofs(challengeId, year, month);
        setMissionProofs(response.result);
        console.log("getMonthlyProofs 응답:", response);
      } catch (error) {
        console.error("인증 데이터 불러오기 실패:", error);
        setMissionProofs([]);
      }
    };
  
    fetchMissionProofsByMonth();
  }, [challengeId, currentDate]);
  
  
  // 2) selectedDate가 바뀔 때 missionProofs에서 찾기
  useEffect(() => {
    if (!selectedDate) {
      setCurrentProof(null);
      return;
    }
  
    const formattedSelectedDate = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    console.log("선택한 날짜 (formattedSelectedDate):", formattedSelectedDate);
  
    const matchedProof = missionProofs.find(proof => {
      const proofDate = new Date(proof.createdAt);
      const formattedProofDate = `${proofDate.getFullYear()}-${String(proofDate.getMonth() + 1).padStart(2, '0')}-${String(proofDate.getDate()).padStart(2, '0')}`;
      console.log("비교할 인증 날짜 (formattedProofDate):", formattedProofDate, " - 원본:", proof.createdAt);
      return formattedProofDate === formattedSelectedDate;
    });
  
    if (!matchedProof) {
      console.log("해당 날짜에 인증 데이터가 없습니다.");
    } else {
      console.log("매칭된 인증 데이터:", matchedProof);
    }
  
    setCurrentProof(matchedProof || null);
  }, [selectedDate, missionProofs]);

  return (
    <ChallengeCertifyWrapper>
      <CalendarComponent
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        setCurrentProof={setCurrentProof}    
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        missionProofs={missionProofs}
      />
      <Divider />
      <CertifyComponent selectedDate={selectedDate} currentProof={currentProof} />
    </ChallengeCertifyWrapper>
  );
};


export default ChallengeCertifyComponent;