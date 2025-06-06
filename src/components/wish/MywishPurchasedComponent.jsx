import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import agreeImageUrl from "../../assets/wishAgree.svg";
import disagreeImageUrl from "../../assets/wishDisagree.svg";
import commentImageUrl from "../../assets/wishComment.svg";
import unLockImageUrl from "../../assets/wishUnlock.svg";
import etcImageUrl from "../../assets/wishEtc.svg";
import ProfileImageUrl from "./../../assets/defaultProfile.svg";
import ProductImageUrl from "./../../images/wishProduct.png"    // 임시 사진
import Colors from "../../constanst/color.mjs";

// 큰 상자
const CardContainer = styled.div`   
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 8px;
  cursor: pointer;
  margin-top : 50px;
`;

// 상품 이미지 제외 정보
const MyWishInfoContainer = styled.span`    
    display: inline-block;
    width: calc(100% - 255px);
`;

// 프로필 사진 & 닉네임 & 날짜 & 구매 상태 & 만족 여부
const MyWishTopContainer = styled.div`    
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

// 프로필 사진 & 닉네임 & 생성 날짜
const MyWishLeftTopContainer = styled.div`    
  display: flex;
  align-items: center;
`;

// 공개 여부 & 점 3개
const MyWishRightTopContainer = styled.div`   
  display: flex;
  gap: 10px;
`;

// 닉네임 & 날짜
const MyWishNickNDateContainer = styled.span` 
    display: inline-block;
    padding-left: 20px;
`;

// 사람 프로필
const MyWishProfileImg = styled.span`   
    display: inline-block;
    width: 60px;
    height: 60px;
    border-radius: 50%; 
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

// 닉네임
const MyWishNickname = styled.div`  
    color: ${Colors.secondary500};
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    word-wrap: break-word;
`;

// 날짜
const MyWishCreatedDate = styled.div`   
    color: ${Colors.secondary200};
    font-size: 14px;
    font-weight: 600;
    line-height: 30px;
    word-wrap: break-word;
`;

// 공개 여부
const MyWishPublicBtn = styled.button` 
    width: 86px;
    height: 30px;
    flex-shrink: 0;
    font-size: 15px;
    border: 1px solid ${Colors.primary300}; 
    color : ${Colors.primary300}; 
    background : white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 10px; 
`;

// 점 3개
const MyWishEtcImage = styled.span` 
  width: 35px;
  height: 35px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 공개 로고
const MyWishPublicImage = styled.div`
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 상품 이름
const MyWishProductName = styled.div`   
    color: ${Colors.secondary500};
    font-size: 27px;
    font-weight: 600;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 30px;
`;

// 상품 가격
const MyWishProductPrice = styled.div`  
    color: ${Colors.secondary300};
    font-size: 22px;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 22px;
`;

// 상품 이미지
const MyWishProductImg = styled.span`   
    display: inline-block;
    width: 245px;
    height: 245px;
    border-radius: 20px;
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; 
    margin-top: 15px;
`;

// 찬성 & 반대 & 댓글 상자
const MyWishBottomContainer = styled.div`    
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 50px;
    flex-wrap: nowrap;
`;

 // 찬성 & 반대 & 댓글 버튼
const MyWishBottomButtonContainer = styled.span`   
    display: flex;
    gap: 30px;
`;

// 찬성
const MyWishAgreeContainer = styled.span` 
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

// 찬성 로고
const MyWishAgreeImage = styled.span` 
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 찬성 글자
const MyWishAgreeText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 찬성 개수
const MyWishAgreeCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 반대
const MyWishDisagreeContainer = styled.span` 
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

// 반대 로고
const MyWishDisagreeImage = styled.span` 
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 반대 글자
const MyWishDisagreeText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 반대 개수
const MyWishDisagreeCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 댓글
const MyWishCommentContainer = styled.span` 
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

// 댓글 로고
const MyWishCommentImage = styled.span` 
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 댓글 글자
const MyWishCommentText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 댓글 개수
const MyWishCommentCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 구분선
const MyWishLine = styled.div`    
    border-bottom: 1px solid ${Colors.secondary300};
    margin-top: 20px;
    margin-bottom: 20px;
`;

// 만족 불만족 와퍼
const SatisfactionWrapper = styled.div`     
    position: relative;
    height: 0; 
`;

// 만족 불만족 상자
const SatisfactionBtnContainer = styled.div`    
    position: absolute;
    top: 5px;
    right: 45px;
    display: flex;
    gap: 10px;
`;

// 만족 불만족
const SatisfactionBtn = styled.button`   
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
    font-weight: 500;
`;

const MyWishPurchasedCard = () => {
    const navigate = useNavigate();
    const [selectedSatisfaction, setSatisfaction] = useState("");
    const satisfactions = ["만족", "불만족"];

    return (
        <>
        <CardContainer>
            <MyWishInfoContainer>
                <MyWishTopContainer>
                    <MyWishLeftTopContainer>
                        <MyWishProfileImg imageUrl={ProfileImageUrl}/>
                        <MyWishNickNDateContainer>
                            <MyWishNickname>닉네임</MyWishNickname>
                            <MyWishCreatedDate>2025.04.04 11:30</MyWishCreatedDate>
                        </MyWishNickNDateContainer> 
                    </MyWishLeftTopContainer>  
                    <MyWishRightTopContainer>
                        <MyWishPublicBtn>
                        <MyWishPublicImage imageUrl={unLockImageUrl} />
                            공개</MyWishPublicBtn>
                            <MyWishEtcImage imageUrl={etcImageUrl} />
                    </MyWishRightTopContainer>
                </MyWishTopContainer>
                <SatisfactionWrapper>
                    <SatisfactionBtnContainer>
                        {satisfactions.map((satisfaction) => (
                            <SatisfactionBtn
                            key={satisfaction}
                            $active={selectedSatisfaction === satisfaction ? "true" : "false"}
                            onClick={() => setSatisfaction(satisfaction)}
                            >
                            {satisfaction}
                            </SatisfactionBtn>
                        ))}
                    </SatisfactionBtnContainer>
                </SatisfactionWrapper>
                <MyWishProductName>명칭</MyWishProductName>
                <MyWishProductPrice>가격</MyWishProductPrice>
                <MyWishBottomContainer>
                    <MyWishBottomButtonContainer>
                        <MyWishAgreeContainer>
                            <MyWishAgreeImage imageUrl={agreeImageUrl} />
                            <MyWishAgreeText>
                            찬성</MyWishAgreeText>
                            <MyWishAgreeCntText>23</MyWishAgreeCntText>
                        </MyWishAgreeContainer>
                        <MyWishDisagreeContainer>
                            <MyWishDisagreeImage imageUrl={disagreeImageUrl} />
                            <MyWishDisagreeText>
                            반대</MyWishDisagreeText>
                            <MyWishDisagreeCntText>23</MyWishDisagreeCntText>
                        </MyWishDisagreeContainer>
                        <MyWishCommentContainer>
                            <MyWishCommentImage imageUrl={commentImageUrl} />
                            <MyWishCommentText>
                            댓글</MyWishCommentText>
                            <MyWishCommentCntText>23</MyWishCommentCntText>
                        </MyWishCommentContainer>
                    </MyWishBottomButtonContainer>
                </MyWishBottomContainer>
            </MyWishInfoContainer>
            <MyWishProductImg imageUrl={ProductImageUrl}/>
        </CardContainer>
        <MyWishLine/>
        </>
    );
};

export default MyWishPurchasedCard;