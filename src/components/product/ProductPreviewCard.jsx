import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Colors from "../../constanst/color.mjs";

const CardContainer = styled.div`
  border-radius: 8px;
  cursor: pointer;
  width: 222px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

// 상품 이미지
const ProductImage = styled.div`  
  width: 222px;
  height: 166px;
  border-radius: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

// 상품명
const ProductName = styled.div`   
  color: ${Colors.secondary500};
  width : 198px;
  font-size: 18px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  margin-top: 15px;
  margin-left: 10px;

  b {
    font-weight: 700; 
  }
`;

// 상품 가격 설명 상자
const ProductInfoContainer = styled.div`  
  display: flex;
  flex-direction: column;
`;

// 버튼 상자
const BottomContainer = styled.div` 
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 최고가
const ProductHighPrice = styled.div`  
  color: ${Colors.secondary300};
  width: 145px;
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  margin-top: 10px;
  margin-left: 10px;
`;

// 최저가
const ProductLowPrice = styled.div` 
  color: ${Colors.secondary300};
  width: 145px;
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  margin-top: 5px;
  margin-left: 10px;
`;

// 담기 버튼
const ProductWishBtn = styled.button` 
  width: 50px;
  height: 25px;
  background-color: ${Colors.primary500};
  color: white;
  border: none;
  border-radius: 10px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 12px;
  margin-top: 40px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductPreviewCard = ({ item }) => {
  const navigate = useNavigate();

  const handleAddWishExistClick = (e) => {
    e.stopPropagation(); 
    navigate("/wish/add/exist", { state: { product: item } }); 
  };

  return (
    <CardContainer>
      <ProductImage imageUrl={item.image} />
      <ProductName dangerouslySetInnerHTML={{ __html: item.title }} />
      <BottomContainer>
        <ProductInfoContainer>
          <ProductHighPrice>브랜드 : {item.brand}</ProductHighPrice>
          <ProductLowPrice>가격 : {item.lprice} 원</ProductLowPrice>
        </ProductInfoContainer>
        <ProductWishBtn onClick={handleAddWishExistClick}>담기</ProductWishBtn>
      </BottomContainer>
    </CardContainer>
  );
};
  
export default ProductPreviewCard;