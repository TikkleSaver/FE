import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductPreviewCard from "../../components/product/ProductPreviewCard";
import SearchIcon from "../../assets/search.svg"
import Colors from "../../constanst/color.mjs";

// 전체 상자
const ProductPageContainer = styled.div`    
  width:80%;
  max-width: 100%;
  margin: 120px auto;
`;

// 검색 상자
const SearchContainer = styled.div` 
  position: relative;
  display: flex;
  align-items: center;
  width:80%;
  margin: 0 auto;
`;

// 검색 입력
const SearchInput = styled.input`   
  width: 100%;
  padding: 18px 18px 18px 55px; 
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  outline: none;
`;

// 검색 아이콘 와퍼
const SearchIconWrapper = styled.div`
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

// 상품 상자
const ProductContainer = styled.div`  
  margin: 30px auto;
  width:100%;
`;

// 버튼 상자
const ButtonWrapper = styled.div`   
  display: flex;
  justify-content: flex-end;
  padding: 0 55px; 
  margin-bottom: 40px; 
`;

// 직접 추가 버튼
const ProductCreateBtn = styled.button` 
  width : 140px;
  height: 45px;
  background-color: ${Colors.primary300};
  color: white;
  border: none;
  border-radius: 15px;
  font-size: 20px;
  margin-top: 22px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 상품 목록 상자
const ProductInnerContainer = styled.div`   
  width: 90%; 
  max-width: 1200px; 
  margin: 5px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr)); 
  gap: 50px;
  justify-content: center;
`;

function ProductPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <ProductPageContainer>
            <SearchContainer>
                <SearchIconWrapper>
                    <img src={SearchIcon} alt="Search Icon" width="20" height="20" />
                </SearchIconWrapper>
                <SearchInput
                    type="text"
                    placeholder="원하는 상품을 검색하세요."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </SearchContainer>
            <ProductContainer>
                <ButtonWrapper>
                    <ProductCreateBtn>직접 추가</ProductCreateBtn>
                </ButtonWrapper>
                <ProductInnerContainer>
                    <ProductPreviewCard/>
                    <ProductPreviewCard/>
                    <ProductPreviewCard/>
                    <ProductPreviewCard/>
                    <ProductPreviewCard/>
                    <ProductPreviewCard/>
                    <ProductPreviewCard/>
                    <ProductPreviewCard/>
                    <ProductPreviewCard/>
                    <ProductPreviewCard/>
                    <ProductPreviewCard/>
                    <ProductPreviewCard/>
               </ProductInnerContainer>
            </ProductContainer>
        </ProductPageContainer>
    );
  }
  
  export default ProductPage;