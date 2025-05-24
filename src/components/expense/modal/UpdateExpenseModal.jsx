import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Camera from "./../../../images/emptyImg.svg";
import Colors from "../../../constanst/color.mjs";
import { getExpense } from "../../../api/expense/expenseApi";
import { updateExpense } from "../../../api/expense/expenseApi";

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

const UploadImage = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: ${({ hasPreview }) => (hasPreview ? "cover" : "contain")};
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UpdateExpenseModal = ({ expenseId, memberId, date, onClose, onDone }) => {
  const categories = [
    { id: 1, label: "식비" },
    { id: 2, label: "카페" },
    { id: 3, label: "쇼핑" },
    { id: 4, label: "건강" },
    { id: 5, label: "취미" },
    { id: 6, label: "교통비" },
    { id: 7, label: "기타 생활비" },
  ];
  const [loading, setLoading] = useState(true);

  const [expenseName, setExpenseName] = useState("");
  const [expensePlace, setExpensePlace] = useState("");
  const [cost, setCost] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  // ✅ API로 데이터 받아오기
  useEffect(() => {
    const fetchExpense = async () => {
      const data = await getExpense({ expenseId, memberId });
      console.log(data);
      setExpenseName(data.expenseName);
      setExpensePlace(data.expensePlace);
      setCost(data.cost);
      setSelectedCategory({ id: data.categoryId, label: data.categoryName });
      setPreviewImage(data.image || null); // 이미지 URL 설정
      setLoading(false);
    };

    fetchExpense();
  }, [expenseId, memberId]);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    const formValues = {
      memberId,
      expenseId,
      expenseName,
      expensePlace,
      cost,
      expenseDate: date || new Date(),
    };

    try {
      const result = await updateExpense(
        { ...formValues, categoryId: selectedCategory.id },
        file
      );
      console.log("✅ 서버 응답:", result.data);
      alert("지출이 수정되었습니다!");
      if (onDone) onDone();
      onClose();
    } catch (err) {
      console.error("등록 실패:", err.response?.data || err.message);
      alert("등록 실패 😥");
    }
    onClose();
  };

  if (loading) return null;

  return (
    <Overlay onClick={(e) => e.target === e.currentTarget && onClose()}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <HeaderRow>
          <ModalTitle>지출 수정하기</ModalTitle>
          <CloseButton onClick={onClose}>X</CloseButton>
        </HeaderRow>
        <Row>
          <ImageUpload onClick={handleImageClick}>
            <UploadImage
              hasPreview={!!previewImage}
              imageUrl={previewImage || Camera}
            />
            <HiddenFileInput
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileChange}
            />
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
                key={cat.id}
                selected={selectedCategory?.id === cat.id}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat.label}
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
