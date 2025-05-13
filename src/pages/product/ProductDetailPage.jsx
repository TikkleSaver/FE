import React, { useEffect, useState } from "react";
import styled from "styled-components";
import addImageURL from "../../assets/productAdd.svg";
import ProductImageUrl from "./../../images/wishProduct.png"    // 임시 사진
import Colors from "../../constanst/color.mjs";

// 전체 상자
const ProductPageContainer = styled.div`    
  display: flex;
  justify-content: center;
  width:70%;
  max-width: 100%;
  margin: 240px auto;
`;

// 상품 정보 상자
const ProductInfoContainer = styled.span`   
    display: flex;
`;

// 상품 이미지
const ProductImage = styled.span`  
  display: inline-block;  
  flex-shrink: 0;
  width: 450px;
  height: 450px;
  border-radius: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

// 상품 이미지 제외 정보
const ProductTextInfoContainer = styled.div`  
  margin-left: 30px;
`;

// 상품 카테고리
const ProductCategory = styled.div`   
  color: ${Colors.secondary300};
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

// 상품 이름
const ProductName = styled.div` 
  margin-top: 10px;
  color: ${Colors.secondary500};
  font-size: 28px;
  font-weight: 600;
  line-height: 30px;
  word-wrap: break-word;
`;

// 브랜드
const ProductBrand = styled.div`  
  margin-top: 45px;
  color: ${Colors.secondary400};
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

// 최고가
const ProductHighPrice = styled.div`  
  margin-top: 15px;
  color: ${Colors.secondary400};
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

// 최저가
const ProductLowPrice = styled.div` 
  margin-top: 15px;
  color: ${Colors.secondary400};
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

// 위시 추가 버튼
const ProductAddBtn = styled.button` 
  display: flex;                
  align-items: center;         
  gap: 8px;    
  background-color: ${Colors.primary400};
  width: 177px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 12px 15px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 115px;
  font-weight: 700;
  word-wrap: break-word;
`;

// 위시 추가 로고
const  ProductAddImage = styled.span` 
  display: inline-block;
  width: 25px;
  height: 25px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

function ProductDetailPage() {

    return (
        <ProductPageContainer>
          <ProductInfoContainer>
            <ProductImage imageUrl={ProductImageUrl}/>
            <ProductTextInfoContainer>
              <ProductCategory>문구{">"}필기류{">"}색연필</ProductCategory>
              <ProductName>감성 투명 아이패드 케이스 에어 7세대 6세대 11인치 5세대 4세대 10.9인치 오드밤</ProductName>
              <ProductBrand>브랜드 | 스타벅스</ProductBrand>
              <ProductHighPrice>최고가 | 9000원</ProductHighPrice>
              <ProductLowPrice>최저가 | 2500원</ProductLowPrice>
              <ProductAddBtn>
                <ProductAddImage imageUrl={addImageURL}/>
                위시 추가하기</ProductAddBtn>
            </ProductTextInfoContainer>
          </ProductInfoContainer>
        </ProductPageContainer>
    );
  }
  
  export default ProductDetailPage;