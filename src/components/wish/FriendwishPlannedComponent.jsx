import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
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
const FriendWishInfoContainer = styled.span`    
    display: inline-block;
    width: calc(100% - 272px);
`;

// 프로필 사진 & 닉네임 & 날짜 & 구매 상태 & 만족 여부
const FriendWishTopContainer = styled.div`    
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

// 프로필 사진 & 닉네임 & 생성 날짜
const FriendWishLeftTopContainer = styled.div`    
  display: flex;
  align-items: center;
`;

// 닉네임 & 날짜
const FriendWishNickNDateContainer = styled.span` 
    display: inline-block;
    padding-left: 20px;
`;

// 사람 프로필
const FriendWishProfileImg = styled.span`   
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
const FriendWishNickname = styled.div`  
    color: ${Colors.secondary500};
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    word-wrap: break-word;
`;

// 날짜
const FriendWishCreatedDate = styled.div`   
    color: ${Colors.secondary200};
    font-size: 14px;
    font-weight: 600;
    line-height: 30px;
    word-wrap: break-word;
`;

// 상품 이름
const FriendWishProductName = styled.div`   
    color: ${Colors.secondary500};
    font-size: 27px;
    font-weight: 600;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 30px;
`;

// 상품 가격
const FriendWishProductPrice = styled.div`  
    color: ${Colors.secondary300};
    font-size: 20px;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 22px;
`;

// 상품 이미지
const FriendWishProductImg = styled.span`   
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
const FriendWishButtonContainer = styled.div`    
    display: flex;
    width: 100%;
    gap: 30px;
    padding-top : 50px;
`;

// 찬성
const FriendWishAgreeContainer = styled.span` 
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
const FriendWishAgreeImage = styled.span` 
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 찬성 글자
const FriendWishAgreeText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 찬성 개수
const FriendWishAgreeCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 반대
const FriendWishDisagreeContainer = styled.span` 
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
const FriendWishDisagreeImage = styled.span` 
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 반대 글자
const FriendWishDisagreeText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 반대 개수
const FriendWishDisagreeCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 댓글
const FriendWishCommentContainer = styled.span` 
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
const FriendWishCommentImage = styled.span` 
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 댓글 글자
const FriendWishCommentText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 댓글 개수
const FriendWishCommentCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 구분선
const FriendWishLine = styled.div`    
    border-bottom: 1px solid ${Colors.secondary300};
    margin-top: 20px;
    margin-bottom: 25px;
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

const FriendWishPlannedCard = ({ wish }) => {
    const navigate = useNavigate();

    // 프로필 여부
    const profileUrl = wish.profileUrl || ProfileImageUrl;

    const handleClick = () => {
        navigate(`/wish-info`, { state: { wishId: wish.wishId } });
    };

    return (
        <>
        <CardContainer onClick={handleClick}>
            <FriendWishInfoContainer>
                <FriendWishTopContainer>
                    <FriendWishLeftTopContainer>
                        <FriendWishProfileImg imageUrl={profileUrl}/>
                        <FriendWishNickNDateContainer>
                            <FriendWishNickname>{wish.nickname}</FriendWishNickname>
                            <FriendWishCreatedDate>{formatDateTime(wish.createdAt)}</FriendWishCreatedDate>
                        </FriendWishNickNDateContainer> 
                    </FriendWishLeftTopContainer>  
                </FriendWishTopContainer>
                <FriendWishProductName>{wish.title}</FriendWishProductName>
                <FriendWishProductPrice>{wish.price}원</FriendWishProductPrice>
                <FriendWishButtonContainer>
                    <FriendWishAgreeContainer>
                        <FriendWishAgreeImage imageUrl={agreeImageUrl} />
                        <FriendWishAgreeText>
                        찬성</FriendWishAgreeText>
                        <FriendWishAgreeCntText>{wish.likeCnt}</FriendWishAgreeCntText>
                    </FriendWishAgreeContainer>
                    <FriendWishDisagreeContainer>
                        <FriendWishDisagreeImage imageUrl={disagreeImageUrl} />
                        <FriendWishDisagreeText>
                        반대</FriendWishDisagreeText>
                        <FriendWishDisagreeCntText>{wish.unLikeCnt}</FriendWishDisagreeCntText>
                    </FriendWishDisagreeContainer>
                    <FriendWishCommentContainer>
                        <FriendWishCommentImage imageUrl={commentImageUrl} />
                        <FriendWishCommentText>
                        댓글</FriendWishCommentText>
                        <FriendWishCommentCntText>{wish.commentCnt}</FriendWishCommentCntText>
                    </FriendWishCommentContainer>
                </FriendWishButtonContainer>
            </FriendWishInfoContainer>
            <FriendWishProductImg imageUrl={wish.image}/>
        </CardContainer>
        <FriendWishLine/>
        </>
    );
};

export default FriendWishPlannedCard;