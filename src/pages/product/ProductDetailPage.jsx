import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import addImageURL from "../../assets/productAdd.svg";
import Colors from "../../constanst/color.mjs";

// 전체 상자
const ProductPageContainer = styled.div`    
  display: flex;
  justify-content: center;
  width:80%;
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
  display: flex;     
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
  b {
    font-weight: 600; 
  }
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

// 쇼핑몰
const ProductMallName = styled.div`  
  margin-top: 10px;
  color: ${Colors.secondary400};
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

// 최저가
const ProductLowPrice = styled.div` 
  margin-top: 10px;
  color: ${Colors.secondary400};
  font-size: 20px;
  font-weight: 500;
  line-height: 30px;
  word-wrap: break-word;
`;

// 상품 정보 URL
const ProductURL = styled.div` 
  margin-top: 10px;
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
  width: 160px;
  height: 45px;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 12px 15px;
  cursor: pointer;
  font-size: 15px;
  margin-top: auto;
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

// 링크 디자인
const StyledLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-size: 17px;

  &:hover {
    color: inherit;
  }
`;

function ProductDetailPage() {

  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  // 위시 추가 페이지로 이동
  const handleAddWishExistClick = () => {
    navigate("/wish/add/exist", { state: { product } });
  };

  // 상품 존재X 예외 처리
  if (!product) return;

    return (
        <ProductPageContainer>
          <ProductInfoContainer>
            <ProductImage imageUrl={product.image} />
            <ProductTextInfoContainer>
              <ProductCategory>
                  {[
                    product.category1,
                    product.category2,
                    product.category3,
                    product.category4
                  ]
                    .filter(Boolean)
                    .join(" > ")}
              </ProductCategory>
              <ProductName dangerouslySetInnerHTML={{ __html: product.title }} />
              <ProductBrand>브랜드 | {product.brand}</ProductBrand>
              <ProductMallName>쇼핑몰 | {product.mallName}</ProductMallName>
              <ProductLowPrice>가격 | {product.lprice}원</ProductLowPrice>
              <ProductURL>URL | <StyledLink href={product.link} target="_blank" rel="noopener noreferrer">{product.link}</StyledLink></ProductURL>
              <ProductAddBtn onClick={handleAddWishExistClick}>
                <ProductAddImage imageUrl={addImageURL}/>
                위시 추가하기</ProductAddBtn>
            </ProductTextInfoContainer>
          </ProductInfoContainer>
        </ProductPageContainer>
    );
  }
  
  export default ProductDetailPage;