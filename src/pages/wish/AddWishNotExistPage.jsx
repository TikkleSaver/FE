import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import lockImageURL from "../../assets/wishLockGrey.svg";
import unlockImageURL from "../../assets/wishUnlockGrey.svg";
import wishEmptyImageURL from "../../assets/wishEmptyImg.svg"
import Colors from "../../constanst/color.mjs";
import { createWishNotExistProduct } from "../../api/wish/wishAPI";

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

// 설정해야할 정보 (제품명, 브랜드, 카테고리, 공개, 가격)
const ProductInputInfoContainer = styled.div`   
  margin-top: -15px;
  display: flex;            
  flex-direction: column;  
  gap: 15px;   
`;

// 제품명 상자
const ProductNameContainer = styled.div`  

`;

// 제품명 제목
const ProductNameText = styled.div`   
  height: 26px;  
  color: ${Colors.secondary500};
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

// 제품명 입력 상자
const ProductNameInputContainer = styled.div` 
  position: relative;
  width: fit-content;
`;

// 제품명 입력
const PRoductNameInput = styled.input`    
  width: 520px;
  height: 40px;
  padding: 0px 10px 0px 10px;
  border: 1px solid ${Colors.secondary100};
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  outline: none;
`;

// 브랜드 상자
const ProductBrandContainer = styled.div`  

`;

// 브랜드 제목
const ProductBrandText = styled.div`   
  height: 26px;      
  color: ${Colors.secondary500};
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  word-wrap: break-word;
`;

// 브랜드 입력 상자
const ProductBrandInputContainer = styled.div` 
  position: relative;
  width: fit-content;
`;

// 브랜드 입력
const PRoductBrandInput = styled.input`    
  width: 520px;
  height: 40px;
  padding: 0px 10px 0px 10px;
  border: 1px solid ${Colors.secondary100};
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  outline: none;
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
  font-size: 13px;
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
  gap: 2.5px;
`;

// 가격 입력 상자
const ProductPriceInputContainer = styled.div` 
  margin-top: 5px;
  position: relative;
  width: fit-content;
`;

// 가격 입력
const PRoductPriceInput = styled.input`    
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

// 작성 완료 버튼
const ProductAddBtn = styled.button` 
  display: flex;                
  align-items: center;   
  justify-content: center;        
  background-color: ${Colors.primary400};
  width: 130px;
  height: 45px;
  color: white;
  border: none;
  border-radius: 15px;
  padding: 12px 12px;
  cursor: pointer;
  font-size: 15px;
  margin-top: 35px;
  font-weight: 700;
  word-wrap: break-word;
`;

function AddWishNotExistPage() {

    const navigate = useNavigate();
    const [selectedCategory, setCategory] = useState("식비");
    const categories = ["식비", "카페", "쇼핑", "건강", "취미", "교통비", "기타 생활비"];
    const [isPublic, setIsPublic] = useState(false);
    const [inputName, setInputName] = useState("");
    const [inputBrand, setInputBrand] = useState("");
    const [inputPrice, setInputPrice] = useState("");
    const [imageFile, setImageFile] = useState(null);

    const categoryMap = {
      "식비": 1,
      "카페": 2,
      "쇼핑": 3,
      "건강": 4,
      "취미": 5,
      "교통비": 6,
      "기타 생활비": 7,
    };

    // 상품 사진
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleImageChange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl);
        setImageFile(file);
      }
    };

    const handleAddWish = async () => {
      if (!inputName.trim()) {
        alert("제품명을 입력해주세요.");
        return;
      }

      if (!inputBrand.trim()) {
        alert("브랜드를 입력해주세요.");
        return;
      }

      if (!inputPrice.trim()) {
        alert("가격을 입력해주세요.");
        return;
      }

      if (!imageFile) {
        alert("사진을 반드시 등록해주세요.");
        return;
      }

      const priceNumber = parseInt(inputPrice.replace(/,/g, ""), 10);
      if (isNaN(priceNumber) || priceNumber <= 0) {
        alert("유효한 숫자 형식의 가격을 입력해주세요.");
        return;
      }

      const wishData = {
        publicStatus: isPublic ? "PRIVATE" : "PUBLIC",
        title: inputName,
        brand: inputBrand,
        price: parseInt(inputPrice),
        categoryId: categoryMap[selectedCategory]
      };

      const formData = new FormData();
      formData.append("request", new Blob([JSON.stringify(wishData)], { type: "application/json" }));

      if (imageFile) {
        formData.append("file", imageFile); 
      }

      const result = await createWishNotExistProduct(formData);
      if (result) {
        alert("위시가 성공적으로 추가되었습니다.");
        navigate("/wish/mine");
      }
    };

    return (
        <ProductPageContainer>
          <ProductInfoContainer>
            <ProductImage imageUrl={preview || wishEmptyImageURL} onClick={handleClick}>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={handleImageChange}
                />
            </ProductImage>
            <ProductTextInfoContainer>
              <ProductInputInfoContainer>
                <ProductNameContainer>
                  <ProductNameText>제품 명</ProductNameText>
                  <ProductNameInputContainer>
                    <PRoductNameInput
                        type="text"
                        placeholder=""
                        value={inputName}
                        onChange={(e) => setInputName(e.target.value)}
                    />
                  </ProductNameInputContainer>
                </ProductNameContainer>
                <ProductBrandContainer>
                  <ProductBrandText>브랜드</ProductBrandText>
                  <ProductBrandInputContainer>
                    <PRoductBrandInput
                        type="text"
                        placeholder=""
                        value={inputBrand}
                        onChange={(e) => setInputBrand(e.target.value)}
                    />
                  </ProductBrandInputContainer>
                </ProductBrandContainer>
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
                    <ProductPriceInputContainer>
                      <PRoductPriceInput
                          type="text"
                          placeholder=""
                          value={inputPrice}
                          onChange={(e) => setInputPrice(e.target.value)}
                      />
                      <ProductPriceWonText>원</ProductPriceWonText>
                    </ProductPriceInputContainer>
                  </ProductPriceContainer>
              </ProductInputInfoContainer>
              <ProductAddBtn onClick={handleAddWish}>작성 완료</ProductAddBtn>
            </ProductTextInfoContainer>
          </ProductInfoContainer>
        </ProductPageContainer>
    );
  }
  
  export default AddWishNotExistPage;