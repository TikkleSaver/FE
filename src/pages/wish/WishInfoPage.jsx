import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WishCommentCard from "../../components/wish/WishCommentCard";
import satisfactionImageUrl from "../../assets/wishSatisfaction.svg";
import agreeImageUrl from "../../assets/wishAgree.svg";
import disagreeImageUrl from "../../assets/wishDisagree.svg";
import commentImageUrl from "../../assets/wishComment.svg";
import SubmitImageUrl from "./../../assets/arrowUp.svg";
import etcImageUrl from "../../assets/wishEtc.svg";
import Colors from "../../constanst/color.mjs";

const WishInfoPageContainer = styled.div`
    display: flex;
    justify-content: center;
    width:70%;
    max-width: 100%;
    margin: 120px auto;
`;

const WishInfoBox = styled.div`
    width: 1141px;
    height: 650px;
    border-radius: 10px;
    border: 1px #E5E5E5 solid;
`;

const WishInfoTopContainer = styled.div`    // 프로필 사진 & 닉네임 & 날짜 & 구매 상태 & 만족 여부 & 점 3개
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
`;

const WishInfoLeftTopContainer = styled.div`    // 프로필 사진 & 닉네임 & 생성 날짜
  display: flex;
  align-items: center;
`;

const WishInfoRightTopContainer = styled.div`   // 구매 완료 & 만족 & 점 3개
  display: flex;
  gap: 10px;
`;

const WishInfoNickNDateContainer = styled.span` // 닉네임 & 날짜
    display: inline-block;
    padding-left: 20px;
`;


const WishInfoProfileImg = styled.span`   // 사람 프로필
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%; 
    background: #111111;
`;

const WishInfoNickname = styled.div`  // 닉네임
    color: black;
    font-size: 20px;
    font-family: Inter;
    font-weight: 800;
    line-height: 30px;
    word-wrap: break-word;
`;

const WishInfoCreatedDate = styled.div`   // 날짜
    color: #A6A9AF;
    font-size: 14px;
    font-family: Inter;
    font-weight: 800;
    line-height: 30px;
    word-wrap: break-word;
`;

const WishInfoPurChased = styled.span`    // 구매 여부
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    border: 1px solid #B60000;
    color :  #B60000;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px; 
`;

const WishInfoSatisfaction = styled.span` // 만족 여부
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    border: 1px solid #0341BE; 
    color : #0341BE; 
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 13px; 
`;

const WishInfoSatisfactionImage = styled.div`   // 만족 임티
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const WishInfoEtcImage = styled.span` // 점 3개
  width: 35px;
  height: 35px;
  margin-left: 10px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const WishInfoTopLine = styled.div`    // 상위 구분선
  width: 100%;
  border-bottom: 1px solid #E5E5E5;
`;

const WishInfoMiddleContainer = styled.div`    // 가운데 핵심 요소들
    display: flex;
`;

const WishInfoLeftMiddleContainer = styled.div`    // 상품 사진 & 버튼
`;

const WishInfoProductImage = styled.span`  // 상품 이미지
  display: inline-block;  
  flex-shrink: 0;
  width: 480px;
  height: 480px;
  background-color: #C4C4C4;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const WishInfoButtonContainer = styled.div`    // 찬성 & 반대 & 댓글 버튼
    display: flex;
    width: 100%;
    gap: 30px;
    margin : 25px 20px;
`;

const WishInfoAgreeContainer = styled.span` // 찬성
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const WishInfoAgreeImage = styled.span` // 찬성 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const WishInfoAgreeText = styled.span` // 찬성 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const WishInfoAgreeCntText = styled.span` // 찬성 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const WishInfoDisagreeContainer = styled.span` // 반대
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const WishInfoDisagreeImage = styled.span` // 반대 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const WishInfoDisagreeText = styled.span` // 반대 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const WishInfoDisagreeCntText = styled.span` // 반대 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const WishInfoCommentContainer = styled.span` // 댓글
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const WishInfoCommentImage = styled.span` // 댓글 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const WishInfoCommentText = styled.span` // 댓글 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const WishInfoCommentCntText = styled.span` // 댓글 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const WishInfoRightMiddleContainer = styled.div`   // 상품 설명 & 댓글
`;

const WishInfoProductContainer = styled.div`    // 상품 카테고리, 상품명, 브랜드, 가격
    width: 625px;
    margin-left: 25px;
`;

const WishInfoProductCategory = styled.div`    // 상품 카테고리
    margin-top: 5px;
    height: 37px;
    color: #6B6B6B;
    font-size: 16px;
    font-family: Inter;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
`;

const WishInfoProductName = styled.div`    // 상품 명
    width: 545px;
    color: black;
    font-size: 20px;
    font-family: Inter;
    font-weight: 700;
    line-height: 30px;
    word-wrap: break-word;
`;

const WishInfoProductBrand = styled.div`    // 브랜드
    margin-top: 35px;
    color: black;
    font-size: 15px;
    font-family: Inter;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
`;

const WishInfoProductPrice = styled.div`    // 가격
    color: black;
    font-size: 15px;
    font-family: Inter;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
    margin-bottom: 15px;
`;

const WishInfoLine = styled.div`    // 하위 구분선
  width: 95%;
  border-bottom: 1px solid #E5E5E5;
`;


const WishInfoCommentListContainer = styled.div`    // 댓글 상자
  margin-top: 7px;
  margin-left: 9px;
  display: flex;
  flex-direction: column;
  width: 639px;
  height: 335px;
  box-sizing: border-box;
  overflow: hidden;
`;

const WishInfoComments = styled.div`    // 댓글 목록
  display: flex;
  flex-direction: column;
  width: 630px;
  height: 500px;
  overflow-y: auto;
  padding-right: 8px;
  box-sizing: border-box;
  scrollbar-gutter: stable both-edges;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${Colors.btnStroke};
    border-radius: 10px;
    cursor: pointer;
  }
`;

const CommentInputWrapper = styled.div` // 댓글 입력 상자
  right: 20px;
  position: relative;
  padding: 10px 20px;
  margin-bottom: 5px;
  background-color: white;
`;

const CommentInput = styled.input`  // 댓글 입력
  width: 630px;
  height: 57px;
  padding: 0 50px 0 15px; 
  border: 1px solid ${Colors.secondary100};
  border-radius: 15px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
`;

const SubmitBtn = styled.button`    // 댓글 제출 버튼
  weight: 33px;
  height: 33px;
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
`;

function WishInfoPage() {

  const [newComment, setNewComment] = useState("");

  const comments = Array(9).fill({
    user: "meartangLove0005",
    comment:
      "마라탕에 돈을 너무 많이 쓰는 거 아냐..?? 지출 목표 금액을 훌쩍 넘었어!!! 아껴!!",
    date: "2025.03.28 11:10",
  });

    return (
        <WishInfoPageContainer>
            <WishInfoBox>
                <WishInfoTopContainer>
                    <WishInfoLeftTopContainer>
                        <WishInfoProfileImg/>
                        <WishInfoNickNDateContainer>
                            <WishInfoNickname>닉네임</WishInfoNickname>
                            <WishInfoCreatedDate>2025.04.04 11:30</WishInfoCreatedDate>
                        </WishInfoNickNDateContainer> 
                    </WishInfoLeftTopContainer>  
                    <WishInfoRightTopContainer>
                        <WishInfoPurChased>구매 완료</WishInfoPurChased>
                        <WishInfoSatisfaction>
                        <WishInfoSatisfactionImage imageUrl={satisfactionImageUrl} />
                            만족</WishInfoSatisfaction>
                        <WishInfoEtcImage imageUrl={etcImageUrl} />
                    </WishInfoRightTopContainer>
                </WishInfoTopContainer>
                <WishInfoTopLine/>
                <WishInfoMiddleContainer>
                    <WishInfoLeftMiddleContainer>
                        <WishInfoProductImage/>
                        <WishInfoButtonContainer>
                            <WishInfoAgreeContainer>
                                <WishInfoAgreeImage imageUrl={agreeImageUrl} />
                                <WishInfoAgreeText>
                                찬성</WishInfoAgreeText>
                                <WishInfoAgreeCntText>23</WishInfoAgreeCntText>
                            </WishInfoAgreeContainer>
                            <WishInfoDisagreeContainer>
                                <WishInfoDisagreeImage imageUrl={disagreeImageUrl} />
                                <WishInfoDisagreeText>
                                반대</WishInfoDisagreeText>
                                <WishInfoDisagreeCntText>23</WishInfoDisagreeCntText>
                            </WishInfoDisagreeContainer>
                            <WishInfoCommentContainer>
                                <WishInfoCommentImage imageUrl={commentImageUrl} />
                                <WishInfoCommentText>
                                댓글</WishInfoCommentText>
                                <WishInfoCommentCntText>23</WishInfoCommentCntText>
                            </WishInfoCommentContainer>
                        </WishInfoButtonContainer>
                    </WishInfoLeftMiddleContainer>
                    <WishInfoRightMiddleContainer>
                        <WishInfoProductContainer>
                            <WishInfoProductCategory>카테고리</WishInfoProductCategory>
                            <WishInfoProductName>감성 투명 아이패드 케이스 에어 7세대 6세대 11인치 5세대 4세대 10.9인치 오드밤 브랜드 가격</WishInfoProductName>
                            <WishInfoProductBrand>브랜드 | 스타벅스</WishInfoProductBrand>
                            <WishInfoProductPrice>가격 | 4000원</WishInfoProductPrice>
                            <WishInfoLine/>
                        </WishInfoProductContainer>
                        <WishInfoCommentListContainer>
                            <WishInfoComments>
                            {comments.map((c, i) =>
                                <WishCommentCard key={i} comment={c} />
                            )}
                            </WishInfoComments>{" "}
                            <CommentInputWrapper>
                                <CommentInput
                                value={newComment}
                                />
                                <SubmitBtn>
                                <img src={SubmitImageUrl} alt="Etc"/>
                                </SubmitBtn>
                            </CommentInputWrapper>
                        </WishInfoCommentListContainer>
                    </WishInfoRightMiddleContainer>
                </WishInfoMiddleContainer>
            </WishInfoBox>
        </WishInfoPageContainer>
    );
};

export default WishInfoPage;