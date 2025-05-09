import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import lockImageURL from "../../assets/wishLock.svg";

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
  margin-left: 45px;
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

const ProductInputInfoContainer = styled.div`   // 설정해야할 정보 (카테고리, 공개, 가격)
  margin-top: 20px;
  display: flex;            
  flex-direction: column;  
  gap: 15px;   
`;

const ProductCategoryContainer = styled.div`  // 카테고리 상자

`;

const ProductCategoryText = styled.div`     // 카테고리 제목
  color: #333333;
  font-size: 15px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

const ProductCatgoryTabWrapper = styled.div`     // 카테고리 선택 와퍼
    margin-top: 10px;
`;

const ProductCategoryTabBtnContainer = styled.div`    // 카테고리 선택 상자
    flex-wrap: wrap;
    top: 5px;
    display: flex;
    gap: 10px;
`;

const ProductCategoryTabBtn = styled.button`   // 카테고리 선택
    background-color: ${(props) =>
        props.$active === "true" ? "#51B69E" : "white"};
    color: ${(props) =>
        props.$active === "true" ? "white" : "#999999"};
    border: 1px solid
        ${(props) =>
        props.$active === "true" ? "#51B69E" : "#999999"};
    padding: 6px 15px;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 15.45px;
`;

const ProductPublicContainer = styled.div`  // 공개 여부 상자
    width: 265px;
`;

const ProductPublicWapper = styled.span`  // 공개 여부 와퍼
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ProductPublicTextWapper = styled.div`  // 공개 여부 제목 및 설명 와퍼

`;

const ProductPublicText = styled.div`     // 공개 여부 제목
  color: #333333;
  font-size: 15px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

const ProductPublicExplain = styled.div`     // 공개 여부 설명
  display: flex;                
  align-items: center; 
  color: #6B6B6B;
  font-size: 8px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 15px;
  word-wrap: break-word;
  gap: 2.5px;
`;

const  ProductLockImage = styled.span` // 잠금 로고
  display: inline-block;
  width: 10px;
  height: 10px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const ProductPublicSwitch =  styled.label`  // 공개 여부 스위치
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  margin-left: 10px;
`;

const ProductPublicSwitchInput = styled.input`  // 공개 여부 스위치 입력
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #194238;
  }

  &:checked + span:before {
    transform: translateX(16px);
  }
`;

const ProductPublicSwitchSlider = styled.span`  // 공개 여부 스위치 슬라이드
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 14px;
    width: 14px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ProductPriceContainer = styled.div`  // 가격 상자

`;

const ProductPriceText = styled.div`     // 가격 제목
  color: #333333;
  font-size: 15px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

const ProductPriceExplain = styled.div`     // 가격 설명
  display: flex;                
  align-items: center; 
  color: #6B6B6B;
  font-size: 8px;
  font-family: Pretendard;
  font-weight: 500;
  line-height: 15px;
  word-wrap: break-word;
  gap: 2.5px;
`;

const SearchContainer = styled.div` // 가격 입력 상자
  margin-top: 10px;
  position: relative;
  width: fit-content;
`;

const SearchInput = styled.input`    // 가격 입력
  width: 132px;
  height: 40px;
  padding: 0px 30px 0px 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  outline: none;
`;

const ProductPriceWonText = styled.div`     // 가격 '원' 텍스트
  position: absolute;
  color: #6B6B6B;
  top: 25%;
  right: 10px;
  font-size: 15px;
  font-family: Pretendard;
  font-weight: 600;
  pointer-events: none;
`;

const ProductSatisfactionContainer = styled.div`  // 만족 여부 상자

`;

const ProductSatisfactionText = styled.div`     // 만족 여부 제목
  color: #333333;
  font-size: 15px;
  font-family: Pretendard;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

const ProductSatisfactionTabWrapper = styled.div`     // 만족 여부 선택 와퍼
    margin-top: 10px;
`;

const ProductSatisfactionTabBtnContainer = styled.div`    // 만족 여부 선택 상자
    flex-wrap: wrap;
    top: 5px;
    display: flex;
    gap: 10px;
`;

const ProductSatisfactionTabBtn = styled.button`   // 만족 여부 선택
    background-color: ${(props) =>
        props.$active === "true" ? "#51B69E" : "white"};
    color: ${(props) =>
        props.$active === "true" ? "white" : "#999999"};
    border: 1px solid
        ${(props) =>
        props.$active === "true" ? "#51B69E" : "#999999"};
    padding: 6px 15px;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 15.45px;
`;

const ProductButtonWapper = styled.span`  // 수정 완료 취소 버튼 와퍼
    display: flex;
    align-items: center;
    gap: 25px;
`;

const ProductUpdateBtn = styled.button` // 수정 완료 버튼
  display: flex;                
  align-items: center;    
  justify-content: center;     
  background-color: #3D8D7A;
  width: 112px;
  height: 45px;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 12px 12px;
  cursor: pointer;
  font-size: 15px;
  margin-top: 40px;
  font-weight: 700;
  word-wrap: break-word;
`;

const ProductCancelBtn = styled.button` // 수정 취소 버튼
  display: flex;                
  align-items: center;    
  justify-content: center;     
  background-color: #3D8D7A;
  width: 112px;
  height: 45px;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 12px 12px;
  cursor: pointer;
  font-size: 15px;
  margin-top: 40px;
  font-weight: 700;
  word-wrap: break-word;
`;

function ProductDetailPage() {

    const navigate = useNavigate();
    const [selectedCategory, setCategory] = useState("식비");
    const categories = ["식비", "카페", "쇼핑", "건강", "취미", "교통비", "기타 생활비"];
    const [selectedSatisfaction, setSatisfaction] = useState("만족");
    const satisfactions = ["만족", "불만족"];
    const [isPublic, setIsPublic] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <ProductPageContainer>
          <ProductInfoContainer>
            <ProductImage />
            <ProductTextInfoContainer>
              <ProductCategory>문구{">"}필기류{">"}색연필</ProductCategory>
              <ProductName>감성 투명 아이패드 케이스 에어 7세대 6세대 11인치 5세대 4세대 10.9인치 오드밤</ProductName>
              <ProductInputInfoContainer>
                <ProductCategoryContainer>
                  <ProductCategoryText>카테고리</ProductCategoryText>
                  <ProductCatgoryTabWrapper>
                        <ProductCategoryTabBtnContainer>
                            {categories.map((category) => (
                                <ProductCategoryTabBtn
                                key={category}
                                $active={selectedCategory === category ? "true" : "false"}
                                onClick={() => setCategory(category)}
                                >
                                {category}
                                </ProductCategoryTabBtn>
                            ))}
                        </ProductCategoryTabBtnContainer>
                    </ProductCatgoryTabWrapper>
                  </ProductCategoryContainer>
                  <ProductPublicContainer>
                    <ProductPublicWapper>
                      <ProductPublicTextWapper>
                        <ProductPublicText>공개 설정</ProductPublicText>
                        <ProductPublicExplain>해당 상품을 공개하지 않습니다.
                          <ProductLockImage imageUrl={lockImageURL} />
                        </ProductPublicExplain>
                      </ProductPublicTextWapper>
                      <ProductPublicSwitch>
                        <ProductPublicSwitchInput 
                          type="checkbox" 
                          checked={isPublic} 
                          onChange={() => setIsPublic(prev => !prev)} 
                        />
                        <ProductPublicSwitchSlider />
                      </ProductPublicSwitch>
                    </ProductPublicWapper>
                  </ProductPublicContainer>
                  <ProductPriceContainer>
                    <ProductPriceText>가격</ProductPriceText>
                    <ProductPriceExplain>가격은 원 단위로 입력하세요.</ProductPriceExplain>
                    <SearchContainer>
                      <SearchInput
                          type="text"
                          placeholder=""
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <ProductPriceWonText>원</ProductPriceWonText>
                    </SearchContainer>
                  </ProductPriceContainer>
                  <ProductSatisfactionContainer>
                    <ProductSatisfactionText>만족 여부</ProductSatisfactionText>
                    <ProductSatisfactionTabWrapper>
                        <ProductSatisfactionTabBtnContainer>
                            {satisfactions.map((satisfaction) => (
                                <ProductSatisfactionTabBtn
                                key={satisfaction}
                                $active={selectedSatisfaction === satisfaction ? "true" : "false"}
                                onClick={() => setSatisfaction(satisfaction)}
                                >
                                {satisfaction}
                                </ProductSatisfactionTabBtn>
                            ))}
                        </ProductSatisfactionTabBtnContainer>
                    </ProductSatisfactionTabWrapper>
                  </ProductSatisfactionContainer>
              </ProductInputInfoContainer>
              <ProductButtonWapper>
                <ProductUpdateBtn>수정 완료</ProductUpdateBtn>
                <ProductCancelBtn>수정 취소</ProductCancelBtn>
              </ProductButtonWapper>
            </ProductTextInfoContainer>
          </ProductInfoContainer>
        </ProductPageContainer>
    );
  }
  
  export default ProductDetailPage;