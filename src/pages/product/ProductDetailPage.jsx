import React, { useEffect, useState } from "react";
import styled from "styled-components";
import addImageURL from "../../assets/productAdd.svg";

const ProductPageContainer = styled.div`    // 전체 상자
  width:80%;
  max-width: 100%;
  margin: 240px auto;
`;

const ProductInfoContainer = styled.span`   // 상품 정보 상자
    display: flex;
`;

const ProductImage = styled.span`  // 상품 이미지
  display: inline-block;  
  flex-shrink: 0;
  width: 450px;
  height: 450px;
  background-color: #C4C4C4;
  border-radius: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const ProductTextInfoContainer = styled.div`  // 상품 이미지 제외 정보
  margin-left: 75px;
`;

const ProductCategory = styled.div`   // 상품 카테고리
  color: #6B6B6B;
  font-size: 16px;
  font-family: Inter;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

const ProductName = styled.div` // 상품 이름
  margin-top: 10px;
  color: black;
  font-size: 28px;
  font-family: Inter;
  font-weight: 600;
  line-height: 30px;
  word-wrap: break-word;
`;

const ProductBrand = styled.div`  // 브랜드
  margin-top: 45px;
  color: #333333;
  font-size: 20px;
  font-family: Inter;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

const ProductHighPrice = styled.div`  // 최고가
  margin-top: 15px;
  color: #333333;
  font-size: 20px;
  font-family: Inter;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

const ProductLowPrice = styled.div` // 최저가
  margin-top: 15px;
  color: #333333;
  font-size: 20px;
  font-family: Inter;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

const ProductAddBtn = styled.button` // 위시 추가 버튼
  display: flex;                
  align-items: center;         
  gap: 8px;    
  background-color: #3D8D7A;
  width: 177px;
  height: 50px;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 12px 12px;
  cursor: pointer;
  font-size: 18px;
  margin-top: 135px;
  font-weight: 700;
  word-wrap: break-word;
`;

const  ProductAddImage = styled.span` // 위시 추가 로고
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
            <ProductImage />
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