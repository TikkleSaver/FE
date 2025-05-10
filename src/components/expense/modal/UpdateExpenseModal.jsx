import React from "react";
import styled from "styled-components";
import Camera from "./../../../assets/camera.svg";
import Colors from "../../../constanst/color.mjs";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.57);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 550px;
  background-color: white;
  border-radius: 40px;
  padding: 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const HeaderRow = styled.div`
  position: relative;
  height: 20px;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 26px;
  margin: 0;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: ${Colors.secondary500};
`;

const Row = styled.div`
  display: flex;
  gap: 20px;
  align-self: center;
  justify-content: center;
  width: 100%;
`;

const Column = styled.div`
  flex: 1;
`;

const Label = styled.h5`
  margin: 10px 0 6px;
  font-size: 14px;
  color: ${Colors.secondary500};
`;

const Input = styled.input`
  width: 95%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid ${Colors.secondary100};
  border-radius: 8px;
  font-size: 14px;
  color: ${Colors.secondary300};

  &::placeholder {
    color: ${Colors.secondary100};
  }
`;

const CategoryWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const CategoryButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  border: ${({ selected }) => (selected ? "none" : "0.5px solid #CCCCCC")};
  background-color: ${({ selected }) => (selected ? "#51b69e" : "white")};
  color: ${({ selected }) => (selected ? "white" : "#999999")};
  cursor: pointer;
  font-size: 14px;
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  margin-top: 12px;
  padding: 10px 35px;
  background-color: ${Colors.primary};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
`;

const ImageUpload = styled.div`
  width: 170px;
  height: 170px;
  background-color: ${Colors.secondary100};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  cursor: pointer;
`;

const UpdateExpenseModal = ({ onClose, item }) => {
  const categories = [
    "식비",
    "카페",
    "쇼핑",
    "건강",
    "취미",
    "교통비",
    "기타 생활비",
  ];
  const [selectedCategory, setSelectedCategory] = React.useState(item.category);
  const [expenseName, setExpenseName] = React.useState(item.expenseName);
  const [expensePlace, setExpensePlace] = React.useState(item.expensePlace);
  const [cost, setCost] = React.useState(item.cost);

  const handleSubmit = () => {
    const updated = {
      ...item,
      category: selectedCategory,
      expenseName,
      expensePlace,
      cost,
    };
    //onSubmit(updated); -> 나중에 api 연결 수정
    onClose();
  };

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <HeaderRow>
          <ModalTitle>지출 수정하기</ModalTitle>
          <CloseButton onClick={onClose}>X</CloseButton>
        </HeaderRow>
        <Row>
          <ImageUpload>
            <img src={Camera} alt="사진" width="40" height="40" />
          </ImageUpload>
          <Column>
            <Label>지출명</Label>
            <Input
              value={expenseName}
              placeholder="지출명을 입력하세요"
              onChange={(e) => setExpenseName(e.target.value)}
            />
            <Label>지출처</Label>
            <Input
              value={expensePlace}
              placeholder="지출처를 입력하세요"
              onChange={(e) => setExpensePlace(e.target.value)}
            />
          </Column>
        </Row>
        <div>
          <Label>카테고리</Label>
          <CategoryWrap>
            {categories.map((cat) => (
              <CategoryButton
                key={cat}
                selected={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </CategoryButton>
            ))}
          </CategoryWrap>
          <Label>금액</Label>
          <Input
            type="number"
            value={cost}
            placeholder="지출 금액을 입력하세요"
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <SubmitButton onClick={handleSubmit}>저장하기</SubmitButton>
      </ModalBox>
    </Overlay>
  );
};

export default UpdateExpenseModal;
