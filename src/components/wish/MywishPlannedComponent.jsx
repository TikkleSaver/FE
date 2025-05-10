import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import agreeImageUrl from "../../assets/wishAgree.svg";
import disagreeImageUrl from "../../assets/wishDisagree.svg";
import commentImageUrl from "../../assets/wishComment.svg";
import unLockImageUrl from "../../assets/wishUnlock.svg";
import etcImageUrl from "../../assets/wishEtc.svg";


const CardContainer = styled.div`   // 큰 상자
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 8px;
  cursor: pointer;
  margin-top : 50px;
`;

const MyWishInfoContainer = styled.span`    // 상품 이미지 제외 정보
    display: inline-block;
    width: calc(100% - 255px);
`;

const MyWishTopContainer = styled.div`    // 프로필 사진 & 닉네임 & 날짜 & 구매 상태 & 만족 여부
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const MyWishLeftTopContainer = styled.div`    // 프로필 사진 & 닉네임 & 생성 날짜
  display: flex;
  align-items: center;
`;

const MyWishRightTopContainer = styled.div`   // 공개 여부 & 점 3개
  display: flex;
  gap: 10px;
`;

const MyWishNickNDateContainer = styled.span` // 닉네임 & 날짜
    display: inline-block;
    padding-left: 20px;
`;


const MyWishProfileImg = styled.span`   // 사람 프로필
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%; 
    background: #111111;
`;

const MyWishNickname = styled.div`  // 닉네임
    color: black;
    font-size: 20px;
    font-family: Inter;
    font-weight: 800;
    line-height: 30px;
    word-wrap: break-word;
`;

const MyWishCreatedDate = styled.div`   // 날짜
    color: #A6A9AF;
    font-size: 14px;
    font-family: Inter;
    font-weight: 800;
    line-height: 30px;
    word-wrap: break-word;
`;


const MyWishPublicBtn = styled.button` // 공개 여부
    width: 89px;
    height: 30px;
    flex-shrink: 0;
    border: 1px solid #539E84; 
    color : #539E84; 
    background : #FFFFFF;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 10px; 
`;

const MyWishEtcImage = styled.span` // 점 3개
  width: 35px;
  height: 35px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;


const MyWishSatisfactionImage = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const MyWishProductName = styled.div`   // 상품 이름
    color: black;
    font-size: 35px;
    font-family: Inter;
    font-weight: 700;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 40px;
`;

const MyWishProductPrice = styled.div`  // 상품 가격
    color: #6B6B6B;
    font-size: 22px;
    font-family: Inter;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 22px;
`;

const MyWishProductImg = styled.span`   // 상품 이미지
    display: inline-block;
    width: 245px;
    height: 245px;
    background: #D9D9D9;
    border-radius: 20px;
    margin-top: 20px;
`;

const MyWishBottomContainer = styled.div`    // 찬성 & 반대 & 댓글 & 구매 확정 버튼 상자
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-top: 50px;
    flex-wrap: nowrap;
`;

const MyWishBottomButtonContainer = styled.span`    // 찬성 & 반대 & 댓글 버튼
    display: flex;
    gap: 30px;
`;

const MyWishAgreeContainer = styled.span` // 찬성
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const MyWishAgreeImage = styled.span` // 찬성 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const MyWishAgreeText = styled.span` // 찬성 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MyWishAgreeCntText = styled.span` // 찬성 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MyWishDisagreeContainer = styled.span` // 반대
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const MyWishDisagreeImage = styled.span` // 반대 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const MyWishDisagreeText = styled.span` // 반대 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MyWishDisagreeCntText = styled.span` // 반대 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MyWishCommentContainer = styled.span` // 댓글
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const MyWishCommentImage = styled.span` // 댓글 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const MyWishCommentText = styled.span` // 댓글 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MyWishCommentCntText = styled.span` // 댓글 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MyWishPurchaseBtn = styled.button` // 구매 확정
    width: 100px;
    height: 36px;
    flex-shrink: 0;
    border: 0px; 
    color : #FFFFFF; 
    background : #2A6658;
    border-radius: 10px;
    margin-right: 30px;
`;

const MyWishLine = styled.div`    // 구분선
    width: 100%;
    height: 100%;
    outline: 0.5px solid #7D817F;
    outline-offset: 0px;
    margin-top: 20px;
    margin-bottom: 75px;
`;

const MeddlePreviewCard = () => {
    const navigate = useNavigate();

    return (
        <>
        <CardContainer>
            <MyWishInfoContainer>
                <MyWishTopContainer>
                    <MyWishLeftTopContainer>
                        <MyWishProfileImg/>
                        <MyWishNickNDateContainer>
                            <MyWishNickname>닉네임</MyWishNickname>
                            <MyWishCreatedDate>2025.04.04 11:30</MyWishCreatedDate>
                        </MyWishNickNDateContainer> 
                    </MyWishLeftTopContainer>  
                    <MyWishRightTopContainer>
                        <MyWishPublicBtn>
                        <MyWishSatisfactionImage imageUrl={unLockImageUrl} />
                            공개</MyWishPublicBtn>
                            <MyWishEtcImage imageUrl={etcImageUrl} />
                    </MyWishRightTopContainer>
                </MyWishTopContainer>
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
                    <MyWishPurchaseBtn>구매 확정</MyWishPurchaseBtn>
                </MyWishBottomContainer>
            </MyWishInfoContainer>
            <MyWishProductImg/>
        </CardContainer>
        <MyWishLine/>
        </>
    );
};

export default MeddlePreviewCard;