import React, { useState } from 'react';
import styled from 'styled-components';
import image344 from '../../images/onboarding/image 344.svg';
import logoImage from '../../images/logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveCategories } from '../../api/signupApi'; // 경로는 실제 경로에 맞게 수정하세요

export default function Category() {
  const [selectedItems, setSelectedItems] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const memberId = location.state?.memberId;

  const toggleCategory = (category) => {
    setSelectedItems((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };
  const handleNext = async () => {
    if (!memberId) {
      alert('회원 정보가 없습니다.');
      return;
    }

    const result = await saveCategories(memberId, selectedItems);

    if (result) {
      console.log('API 응답:', result);
      navigate('/onboarding/goal', { state: { memberId } }); // 필요 시 memberId 넘기기
    } else {
      alert('카테고리 저장에 실패했습니다.');
    }
  };
  return (
    <Container>
      <Wrapper>
        <Logo src={logoImage} alt="Logo" />
        <CenterImage src={image344} alt="Image" />
        <Title>주로 어떤 상품을 소비하시나요?</Title>
        <CategoryWrap>
          <div></div>
          <CategoryBlue
            onClick={() => toggleCategory(1)}
            $selected={selectedItems.includes(1)}
            style={{ transform: 'translate(-10px,0)' }}
          >
            <CategoryText>식비🍽️</CategoryText>
          </CategoryBlue>
          <CategoryPink
            onClick={() => toggleCategory(2)}
            $selected={selectedItems.includes(2)}
            style={{ transform: 'translate(10px, 0)' }}
          >
            <CategoryText>쇼핑👗👟</CategoryText>
          </CategoryPink>
          <div></div>
          <CategoryPurple
            onClick={() => toggleCategory(3)}
            $selected={selectedItems.includes(3)}
            style={{ transform: 'translate(40px, -10px)' }}
          >
            <CategoryText>기타 생활비🏠</CategoryText>
          </CategoryPurple>
          <CategoryGreen
            onClick={() => toggleCategory(4)}
            $selected={selectedItems.includes(4)}
            style={{ transform: 'translate(45px, 5px)' }}
          >
            <CategoryText>건강 🏋</CategoryText>
          </CategoryGreen>
          <CategoryBlue
            onClick={() => toggleCategory(5)}
            $selected={selectedItems.includes(5)}
            style={{ transform: 'translate(25px, 40px)' }}
          >
            <CategoryText>교통비🚆🚗</CategoryText>
          </CategoryBlue>
          <CategoryYellow
            onClick={() => toggleCategory(6)}
            $selected={selectedItems.includes(6)}
            style={{ transform: 'translate(-30px, -30px)' }}
          >
            <CategoryText>취미🎮📚</CategoryText>
          </CategoryYellow>
          <div></div>
          <CategoryYellow
            onClick={() => toggleCategory(7)}
            $selected={selectedItems.includes(7)}
            style={{ transform: 'translate(-50px, -10px)' }}
          >
            <CategoryText>카페 ☕</CategoryText>
          </CategoryYellow>
          <div></div>
        </CategoryWrap>
        <NextBtn onClick={handleNext}>다음</NextBtn>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: fit-content;
  position: relative;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryWrap = styled.div`
  width: 800px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-top: 40px;
  position: relative;
`;

const NextBtn = styled.button`
  margin-top: 40px;
  height: 45px;
  width: 270px;
  font-size: 17px;
  background-color: #51b69e;
  color: white;
  border: none;
  font-weight: 400;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 1px 2px 8px #f3f3f3;
`;

const Title = styled.span`
  margin: 5px;
  color: black;
  font-size: 35px;
  font-family: Pretendard;
  font-weight: 700;
  word-wrap: break-word;
`;

const CategoryBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 155px;
  height: 45px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  /* border: 1px solid ${(props) =>
    props.$selected ? '#6a6868' : 'transparent'}; */
  border: ${(props) => (props.$selected ? '1px solid #6a6868' : 'none')};
  box-shadow: ${(props) =>
    props.$selected ? '0 0 10px rgba(0, 0, 0, 0.2)' : 'none'};
`;

const CategoryGreen = styled(CategoryBox)`
  background: linear-gradient(180deg, #effffb 0%, #a6f4e1 100%);
`;
const CategoryPurple = styled(CategoryBox)`
  background: linear-gradient(180deg, #f9f3ff 0%, #cfa0ff 100%);
`;
const CategoryYellow = styled(CategoryBox)`
  background: linear-gradient(180deg, #fffffb 0%, #fffd92 100%);
`;
const CategoryBlue = styled(CategoryBox)`
  background: linear-gradient(180deg, #edf3ff 0%, #97b5f1 100%);
`;
const CategoryPink = styled(CategoryBox)`
  background: linear-gradient(180deg, #fff4f7 0%, #f79dba 100%);
`;

const CategoryText = styled.div`
  color: #000000;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const Logo = styled.img`
  position: absolute;
  top: -40px;
  left: -200px;
  width: 200px;
`;

const CenterImage = styled.img`
  justify-content: center;
  width: 130px;
  object-fit: cover;
`;
