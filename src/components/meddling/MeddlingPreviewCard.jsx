import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import satisfactionImageUrl from "../../assets/wishSatisfaction.svg";
import disSatisfactionImageUrl from "../../assets/wishDisSatisfacrion.svg";
import agreeImageUrl from "../../assets/wishAgree.svg";
import disagreeImageUrl from "../../assets/wishDisagree.svg";
import commentImageUrl from "../../assets/wishComment.svg";
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
const MeddlingInfoContainer = styled.span`    
    display: inline-block;
    width: calc(100% - 272px);
`;

// 프로필 사진 & 닉네임 & 날짜 & 구매 상태 & 만족 여부
const MeddlingTopContainer = styled.div`    
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

// 프로필 사진 & 닉네임 & 생성 날짜
const MeddlingLeftTopContainer = styled.div`
  display: flex;
  align-items: center;
`;

// 구매 완료 & 만족
const MeddlingRightTopContainer = styled.div`   
  display: flex;
  gap: 10px;
`;

// 닉네임 & 날짜
const MeddlingNickNDateContainer = styled.span` 
    display: inline-block;
    padding-left: 20px;
`;

// 사람 프로필
const MeddlingProfileImg = styled.span`   
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
const MeddlingNickname = styled.div`  
    color: ${Colors.secondary500};
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    word-wrap: break-word;
`;

// 날짜
const MeddlingCreatedDate = styled.div`   
    color: ${Colors.secondary200};
    font-size: 14px;
    font-weight: 600;
    line-height: 30px;
    word-wrap: break-word;
`;

// 구매 여부
const MeddlingPurChased = styled.span`    
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    border: 1px solid ${Colors.purchasedBox};
    color :  ${Colors.purchasedBox};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px; 
`;

// 만족 여부 (만족)
const MeddlingSatisfaction = styled.span` 
    width: 86px;
    height: 29px;
    flex-shrink: 0;
    border: 1px solid ${Colors.satisfactionBox}; 
    color : ${Colors.satisfactionBox}; 
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 13px; 
`;


// 만족 여부 (불만족)
const MeddlingDisSatisfaction = styled.span` 
    width: 86px;
    height: 29px;
    flex-shrink: 0;
    border: 1px solid ${Colors.disSatisfactionBox}; 
    color : ${Colors.disSatisfactionBox}; 
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 13px; 
`;

// 만족 로고
const MeddlingSatisfactionImage = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 상품 이름
const MeddlingProductName = styled.div`   
    color: ${Colors.secondary500};
    font-size: 27px;
    font-weight: 600;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 30px;
`;

// 상품 가격
const MeddlingProductPrice = styled.div`  
    color: ${Colors.secondary300};
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 22px;
`;

// 상품 이미지
const MeddlingProductImg = styled.span`   
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

 // 찬성 & 반대 & 댓글 버튼
const MeddlingButtonContainer = styled.div`   
    display: flex;
    width: 100%;
    gap: 30px;
    padding-top : 50px;
`;

// 찬성
const MeddlingAgreeContainer = styled.span` 
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
const MeddlingAgreeImage = styled.span`
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 찬성 글자
const MeddlingAgreeText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 찬성 개수
const MeddlingAgreeCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 반대
const MeddlingDisagreeContainer = styled.span` 
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
const MeddlingDisagreeImage = styled.span` 
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 반대 글자
const MeddlingDisagreeText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 반대 개수
const MeddlingDisagreeCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 댓글
const MeddlingCommentContainer = styled.span` 
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
const MeddlingCommentImage = styled.span` 
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 댓글 글자
const MeddlingCommentText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 댓글 개수
const MeddlingCommentCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 구분선
const MeddlingLine = styled.div`    
    border-bottom: 1px solid ${Colors.secondary300};
    margin-top: 20px;
    margin-bottom: c;
`;


// 날짜 변환
function formatDateTime(dateString) {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date)) return "";

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

const MeddlePreviewCard = ({ wish }) => {
    const navigate = useNavigate();

    // 프로필 여부
    const profileUrl = wish.profileUrl || ProfileImageUrl;

    const handleClick = () => {
        navigate(`/wish-info`, { state: { wishId: wish.wishId } });
    };

    return (
        <>
        <CardContainer onClick={handleClick}>
            <MeddlingInfoContainer>
                <MeddlingTopContainer>
                    <MeddlingLeftTopContainer>
                        <MeddlingProfileImg imageUrl={profileUrl}/>
                        <MeddlingNickNDateContainer>
                            <MeddlingNickname>{wish.nickname}</MeddlingNickname>
                            <MeddlingCreatedDate>{formatDateTime(wish.createdAt)}</MeddlingCreatedDate>
                        </MeddlingNickNDateContainer> 
                    </MeddlingLeftTopContainer>  
                    <MeddlingRightTopContainer>
                        {wish.purchaseStatus === "PURCHASE" && (
                            <MeddlingPurChased>구매 완료</MeddlingPurChased>
                        )}
                        {wish.purchaseStatus === "PURCHASE" && wish.satisfactionStatus === "SATISFIED" && (
                            <MeddlingSatisfaction>
                                <MeddlingSatisfactionImage imageUrl={satisfactionImageUrl} />
                            만족</MeddlingSatisfaction>
                        )}
                        {wish.purchaseStatus === "PURCHASE" && wish.satisfactionStatus === "DISSATISFIED" && (
                            <MeddlingDisSatisfaction>
                                <MeddlingSatisfactionImage imageUrl={disSatisfactionImageUrl} />
                            불만족</MeddlingDisSatisfaction>
                        )}
                    </MeddlingRightTopContainer>
                </MeddlingTopContainer>
                <MeddlingProductName>{wish.title}</MeddlingProductName>
                <MeddlingProductPrice>{wish.price}원</MeddlingProductPrice>
                <MeddlingButtonContainer>
                    <MeddlingAgreeContainer>
                        <MeddlingAgreeImage imageUrl={agreeImageUrl} />
                        <MeddlingAgreeText>
                        찬성</MeddlingAgreeText>
                        <MeddlingAgreeCntText>{wish.likeCnt}</MeddlingAgreeCntText>
                    </MeddlingAgreeContainer>
                    <MeddlingDisagreeContainer>
                        <MeddlingDisagreeImage imageUrl={disagreeImageUrl} />
                        <MeddlingDisagreeText>
                        반대</MeddlingDisagreeText>
                        <MeddlingDisagreeCntText>{wish.unLikeCnt}</MeddlingDisagreeCntText>
                    </MeddlingDisagreeContainer>
                    <MeddlingCommentContainer>
                        <MeddlingCommentImage imageUrl={commentImageUrl} />
                        <MeddlingCommentText>
                        댓글</MeddlingCommentText>
                        <MeddlingCommentCntText>{wish.commentCnt}</MeddlingCommentCntText>
                    </MeddlingCommentContainer>
                </MeddlingButtonContainer>
            </MeddlingInfoContainer>
            <MeddlingProductImg imageUrl={wish.image}/>
        </CardContainer>
        <MeddlingLine/>
        </>
    );
};

export default MeddlePreviewCard;