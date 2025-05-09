import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import agreeImageUrl from "../../assets/wishAgree.svg";
import disagreeImageUrl from "../../assets/wishDisagree.svg";
import commentImageUrl from "../../assets/wishComment.svg";


const CardContainer = styled.div`   // 큰 상자
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 8px;
  cursor: pointer;
  margin-top : 50px;
`;

const FriendWishInfoContainer = styled.span`    // 상품 이미지 제외 정보
    display: inline-block;
    width: calc(100% - 272px);
`;

const FriendWishTopContainer = styled.div`    // 프로필 사진 & 닉네임 & 날짜 & 구매 상태 & 만족 여부
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const FriendWishLeftTopContainer = styled.div`    // 프로필 사진 & 닉네임 & 생성 날짜
  display: flex;
  align-items: center;
`;

const FriendWishNickNDateContainer = styled.span` // 닉네임 & 날짜
    display: inline-block;
    padding-left: 20px;
`;


const FriendWishProfileImg = styled.span`   // 사람 프로필
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%; 
    background: #111111;
`;

const FriendWishNickname = styled.div`  // 닉네임
    color: black;
    font-size: 20px;
    font-family: Inter;
    font-weight: 800;
    line-height: 30px;
    word-wrap: break-word;
`;

const FriendWishCreatedDate = styled.div`   // 날짜
    color: #A6A9AF;
    font-size: 14px;
    font-family: Inter;
    font-weight: 800;
    line-height: 30px;
    word-wrap: break-word;
`;

const FriendWishProductName = styled.div`   // 상품 이름
    color: black;
    font-size: 35px;
    font-family: Inter;
    font-weight: 700;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 40px;
`;

const FriendWishProductPrice = styled.div`  // 상품 가격
    color: #6B6B6B;
    font-size: 22px;
    font-family: Inter;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 22px;
`;

const FriendWishProductImg = styled.span`   // 상품 이미지
    display: inline-block;
    width: 245px;
    height: 245px;
    background: #D9D9D9;
    border-radius: 20px;
`;

const FriendWishButtonContainer = styled.div`    // 찬성 & 반대 & 댓글 버튼
    display: flex;
    width: 100%;
    gap: 30px;
    padding-top : 50px;
`;

const FriendWishAgreeContainer = styled.span` // 찬성
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const FriendWishAgreeImage = styled.span` // 찬성 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const FriendWishAgreeText = styled.span` // 찬성 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const FriendWishAgreeCntText = styled.span` // 찬성 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const FriendWishDisagreeContainer = styled.span` // 반대
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const FriendWishDisagreeImage = styled.span` // 반대 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const FriendWishDisagreeText = styled.span` // 반대 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const FriendWishDisagreeCntText = styled.span` // 반대 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const FriendWishCommentContainer = styled.span` // 댓글
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const FriendWishCommentImage = styled.span` // 댓글 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const FriendWishCommentText = styled.span` // 댓글 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const FriendWishCommentCntText = styled.span` // 댓글 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const FriendWishLine = styled.div`    // 구분선
    width: 100%;
    height: 100%;
    outline: 0.5px solid #7D817F;
    outline-offset: 0px;
    margin-top: 20px;
    margin-bottom: 75px;
`;

const FriendWishPlannedPreviewCard = () => {
    const navigate = useNavigate();

    return (
        <>
        <CardContainer>
            <FriendWishInfoContainer>
                <FriendWishTopContainer>
                    <FriendWishLeftTopContainer>
                        <FriendWishProfileImg/>
                        <FriendWishNickNDateContainer>
                            <FriendWishNickname>닉네임</FriendWishNickname>
                            <FriendWishCreatedDate>2025.04.04 11:30</FriendWishCreatedDate>
                        </FriendWishNickNDateContainer> 
                    </FriendWishLeftTopContainer>  
                </FriendWishTopContainer>
                <FriendWishProductName>명칭</FriendWishProductName>
                <FriendWishProductPrice>가격</FriendWishProductPrice>
                <FriendWishButtonContainer>
                    <FriendWishAgreeContainer>
                        <FriendWishAgreeImage imageUrl={agreeImageUrl} />
                        <FriendWishAgreeText>
                        찬성</FriendWishAgreeText>
                        <FriendWishAgreeCntText>23</FriendWishAgreeCntText>
                    </FriendWishAgreeContainer>
                    <FriendWishDisagreeContainer>
                        <FriendWishDisagreeImage imageUrl={disagreeImageUrl} />
                        <FriendWishDisagreeText>
                        찬성</FriendWishDisagreeText>
                        <FriendWishDisagreeCntText>23</FriendWishDisagreeCntText>
                    </FriendWishDisagreeContainer>
                    <FriendWishCommentContainer>
                        <FriendWishCommentImage imageUrl={commentImageUrl} />
                        <FriendWishCommentText>
                        찬성</FriendWishCommentText>
                        <FriendWishCommentCntText>23</FriendWishCommentCntText>
                    </FriendWishCommentContainer>
                </FriendWishButtonContainer>
            </FriendWishInfoContainer>
            <FriendWishProductImg/>
        </CardContainer>
        <FriendWishLine/>
        </>
    );
};

export default FriendWishPlannedPreviewCard;