import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductPreviewCard from "../../components/product/ProductPreviewCard";
import SearchIcon from "../../assets/search.svg"

const ProductPageContainer = styled.div`    // 전체 상자
  width:80%;
  max-width: 100%;
  margin: 120px auto;
`;

const SearchContainer = styled.div` // 검색 상자
  position: relative;
  display: flex;
  align-items: center;
  width:80%;
  margin: 0 auto;
  
`;

const SearchInput = styled.input`   
  width: 100%;
  padding: 18px 18px 18px 55px; 
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  outline: none;
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const ProductContainer = styled.div`    // 상품 상자
  margin: 30px auto;
  width:100%;
`;

const ButtonWrapper = styled.div`   // 버튼 상자
  display: flex;
  justify-content: flex-end;
  padding: 0 55px; 
  margin-bottom: 40px; 
`;

const ProductCreateBtn = styled.button` // 직접 추가 버튼
  width : 140px;
  height: 40px;
  background-color: #51B69E;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  margin-top: 22px;
  font-weight: 600;
  justify-content: center;
`;

const ProductInnerContainer = styled.div`   // 상품 목록 상자
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