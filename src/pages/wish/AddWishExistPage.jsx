import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import addImageURL from "../../assets/productAdd.svg";
import lockImageURL from "../../assets/wishLockGrey.svg";
import unlockImageURL from "../../assets/wishUnlockGrey.svg";
import ProductImageUrl from "./../../images/wishProduct.png"    // 임시 사진
import Colors from "../../constanst/color.mjs";
import { createWishExistProductAPI } from "../../api/wish";

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
  margin-left: 35px;
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

// 설정해야할 정보 (카테고리, 공개, 가격)
const ProductInputInfoContainer = styled.div`   
  margin-top: 17px;
  display: flex;            
  flex-direction: column;  
  gap: 25px;   
`;

// 카테고리 상자
const ProductCategoryContainer = styled.div`  

`;

// 카테고리 제목
const ProductCategoryText = styled.div`     
  height: 26px;   
  color: ${Colors.secondary500};
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

// 카테고리 선택 와퍼
const ProductCatgoryTabWrapper = styled.div`     
    margin-top: 5px;
`;

// 카테고리 선택 상자
const ProductCategoryTabBtnContainer = styled.div`    
    flex-wrap: wrap;
    display: flex;
    gap: 10px;
`;

// 카테고리 선택
const ProductCategoryTabBtn = styled.button`   
    background-color: ${(props) =>
        props.$active === "true" ? Colors.primary300 : "white"};
    color: ${(props) =>
        props.$active === "true" ? "white" : Colors.secondary200};
    border: 1px solid
        ${(props) =>
        props.$active === "true" ? Colors.primary300 : Colors.secondary200};
    padding: 6px 15px;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 15px;
`;

// 공개 여부 상자
const ProductPublicContainer = styled.div`  
    width: 282px;
`;

// 공개 여부 와퍼
const ProductPublicWapper = styled.span`  
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// 공개 여부 제목 및 설명 와퍼
const ProductPublicTextWapper = styled.div`  

`;

// 공개 여부 제목
const ProductPublicText = styled.div`     
  height: 26px;
  color: ${Colors.secondary500};
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

// 공개 여부 설명
const ProductPublicExplain = styled.div`     
  display: flex;                
  align-items: center; 
  color: ${Colors.secondary300};
  font-size: 8px; // 13px -- 잊지 말자 크기 수정 
  font-weight: 500;
  line-height: 15px;
  word-wrap: break-word;
  gap: 2.5px;
`;

// 잠금 로고
const  ProductLockImage = styled.span` 
  display: inline-block;
  width: 10px;
  height: 10px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 공개 여부 스위치
const ProductPublicSwitch =  styled.label`  
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  margin-left: 10px;
`;

// 공개 여부 스위치 입력
const ProductPublicSwitchInput = styled.input`  
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: ${Colors.primary600};
  }

  &:checked + span:before {
    transform: translateX(16px);
  }
`;

// 공개 여부 스위치 슬라이드
const ProductPublicSwitchSlider = styled.span`  
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${Colors.secondary100};
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

// 가격 상자
const ProductPriceContainer = styled.div`  

`;

// 가격 제목
const ProductPriceText = styled.div`       
  height: 26px;     
  color: ${Colors.secondary500};
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

// 가격 설명
const ProductPriceExplain = styled.div`     
  display: flex;                
  align-items: center; 
  color: ${Colors.secondary300};
  font-size: 8px;
  font-weight: 500;
  line-height: 15px;
  word-wrap: break-word;
`;

// 가격 입력 상자
const PriceInputContainer = styled.div` 
  margin-top: 5px;
  position: relative;
  width: fit-content;
`;

// 가격 입력
const PriceInput = styled.input`    
  width: 132px;
  height: 40px;
  padding: 0px 30px 0px 10px;
  border: 1px solid ${Colors.secondary100};
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  outline: none;
`;

// 가격 '원' 텍스트
const ProductPriceWonText = styled.div`     
  position: absolute;
  color: ${Colors.secondary300};
  top: 25%;
  right: 10px;
  font-size: 15px;
  font-weight: 600;
  pointer-events: none;
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
  padding: 12px 12px;
  cursor: pointer;
  font-size: 15px;
  margin-top: 40px;
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

function AddWishExistPage() {

  const navigate = useNavigate();
  const [selectedCategory, setCategory] = useState("식비");
  const categories = ["식비", "카페", "쇼핑", "건강", "취미", "교통비", "기타 생활비"];
  const [isPublic, setIsPublic] = useState(false);
  const [inputPrice, setInputPrice] = useState("");
  const location = useLocation();
  const product = location.state?.product;

  const categoryMap = {
    "식비": 1,
    "카페": 2,
    "쇼핑": 3,
    "건강": 4,
    "취미": 5,
    "교통비": 6,
    "기타 생활비": 7,
  };

    // 상품 존재X 예외 처리
    if (!product) {
      return;
    }
    
    const handleAddWish = async () => {
    const wishData = {
      publicStatus: isPublic ? "PRIVATE" : "PUBLIC",
      title: product.title,
      brand: product.brand,
      price: parseInt(inputPrice),
      image: product.image,
      category1: product.category1,
      category2: product.category2,
      category3: product.category3,
      category4: product.category4,
      categoryId: categoryMap[selectedCategory]
    };

    const result = await createWishExistProductAPI(wishData);
    if (result) {
      alert("위시가 성공적으로 추가되었습니다.");
      navigate("/wish/mine");
    }
  };

    return (
        <ProductPageContainer>
          <ProductInfoContainer>
            <ProductImage imageUrl={product.image}/>
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
              <ProductName>{product.title}</ProductName>
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
                        {isPublic ? (
                        <ProductPublicExplain>해당 상품을 공개하지 않습니다.
                          <ProductLockImage imageUrl={lockImageURL} />
                        </ProductPublicExplain>
                        ) : (
                        <ProductPublicExplain>해당 상품을 공개합니다.
                          <ProductLockImage imageUrl={unlockImageURL} />
                        </ProductPublicExplain>
                        )}
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
                    <PriceInputContainer>
                      <PriceInput
                          type="text"
                          placeholder={product.lprice}
                          value={inputPrice}
                          onChange={(e) => setInputPrice(e.target.value)}
                      />
                      <ProductPriceWonText>원</ProductPriceWonText>
                    </PriceInputContainer>
                  </ProductPriceContainer>
              </ProductInputInfoContainer>
              <ProductAddBtn onClick={handleAddWish}>
                <ProductAddImage imageUrl={addImageURL}/>
                위시 추가하기</ProductAddBtn>
            </ProductTextInfoContainer>
          </ProductInfoContainer>
        </ProductPageContainer>
    );
  }
  
  export default AddWishExistPage;