import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  border-radius: 8px;
  cursor: pointer;
  width: 222px;
`;

const ProductImage = styled.div`  // 상품 이미지
  width: 222px;
  height: 166px;
  background-color: #C4C4C4;
  border-radius: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProductName = styled.div`   // 상품명
  color: black;
  width : 198px;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  margin-top: 10px;
  margin-left: 10px;
`;

const ProductInfoContainer = styled.div`  // 상품 가격 설명 상자
  display: flex;
  flex-direction: column;
`;

const BottomContainer = styled.div` // 버튼 상자
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 10px 0 0px;
`;

const ProductHighPrice = styled.div`  // 최고가
  color: #6B6B6B;
  width: 145px;
  font-size: 15px;
  font-family: Inter;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  margin-top: 10px;
  margin-left: 10px;
`;

const ProductLowPrice = styled.div` // 최저가
  color: #6B6B6B;
  width: 145px;
  font-size: 15px;
  font-family: Inter;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  margin-top: 5px;
  margin-left: 10px;
`;

const ProductWishBtn = styled.button` // 담기 버튼
  background-color: #2a6658;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 22px;
  font-weight: 600;
`;

const ProductPreviewCard = () => {
    const navigate = useNavigate();
  
    return (
      <CardContainer>
        <ProductImage />
        <ProductName>바닐라딜라이트</ProductName>
        <BottomContainer>
          <ProductInfoContainer>
            <ProductHighPrice>최고가 : 40000원</ProductHighPrice>
            <ProductLowPrice>최저가 : 10000원</ProductLowPrice>
          </ProductInfoContainer>
          <ProductWishBtn>담기</ProductWishBtn>
        </BottomContainer>
      </CardContainer>
    );
  };
  
  export default ProductPreviewCard;