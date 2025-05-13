import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductImageUrl from "./../../images/wishProductImg.png"    // 임시 사진
import Colors from "../../constanst/color.mjs";

const CardContainer = styled.div`
  border-radius: 8px;
  cursor: pointer;
  width: 222px;
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
  font-size: 20px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
  margin-top: 15px;
  margin-left: 10px;
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
  margin: 5px 0;
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
  margin-top: 36px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductPreviewCard = () => {
    const navigate = useNavigate();
  
    return (
      <CardContainer>
        <ProductImage imageUrl={ProductImageUrl} />
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