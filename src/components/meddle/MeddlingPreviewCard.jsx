import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import satisfactionImageUrl from "../../images/Meddling/satisfaction.png";
import agreeImageUrl from "../../images/Meddling/Agree.png";
import disagreeImageUrl from "../../images/Meddling/DisAgree.png";
import commentImageUrl from "../../images/Meddling/comment.png";


const CardContainer = styled.div`   // 큰 상자
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 8px;
  cursor: pointer;
  margin-top : 50px;
`;

const MeddlingInfoContainer = styled.span`    // 상품 이미지 제외 정보
    display: inline-block;
    width: calc(100% - 272px);
`;

const MeddlingTopContainer = styled.div`    // 프로필 사진 & 닉네임 & 날짜 & 구매 상태 & 만족 여부
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const MeddlingLeftTopContainer = styled.div`    // 프로필 사진 & 닉네임 & 생성 날짜
  display: flex;
  align-items: center;
`;

const MeddlingRightTopContainer = styled.div`   // 구매 완료 & 만족
  display: flex;
  gap: 10px;
`;

const MeddlingNickNDateContainer = styled.span` // 닉네임 & 날짜
    display: inline-block;
    padding-left: 20px;
`;


const MeddlingProfileImg = styled.span`   // 사람 프로필
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%; 
    background: #111111;
`;

const MeddlingNickname = styled.div`  // 닉네임
    color: black;
    font-size: 20px;
    font-family: Inter;
    font-weight: 800;
    line-height: 30px;
    word-wrap: break-word;
`;

const MeddlingCreatedDate = styled.div`   // 날짜
    color: #A6A9AF;
    font-size: 14px;
    font-family: Inter;
    font-weight: 800;
    line-height: 30px;
    word-wrap: break-word;
`;

const MeddlingPurChased = styled.span`    // 구매 여부
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

const MeddlingSatisfaction = styled.span` // 만족 여부
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

const MeddlingSatisfactionImage = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const MeddlingProductName = styled.div`   // 상품 이름
    color: black;
    font-size: 35px;
    font-family: Inter;
    font-weight: 700;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 40px;
`;

const MeddlingProductPrice = styled.div`  // 상품 가격
    color: #6B6B6B;
    font-size: 22px;
    font-family: Inter;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
    padding-top: 22px;
`;

const MeddlingProductImg = styled.span`   // 상품 이미지
    display: inline-block;
    width: 242px;
    height: 242px;
    background: #D9D9D9;
    border-radius: 20px;
`;

const MeddlingButtonContainer = styled.div`    // 찬성 & 반대 & 댓글 버튼
    display: flex;
    width: 100%;
    gap: 30px;
    padding-top : 50px;
`;

const MeddlingAgreeContainer = styled.span` // 찬성
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const MeddlingAgreeImage = styled.span` // 찬성 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const MeddlingAgreeText = styled.span` // 찬성 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MeddlingAgreeCntText = styled.span` // 찬성 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MeddlingDisagreeContainer = styled.span` // 반대
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const MeddlingDisagreeImage = styled.span` // 반대 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const MeddlingDisagreeText = styled.span` // 반대 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MeddlingDisagreeCntText = styled.span` // 반대 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MeddlingCommentContainer = styled.span` // 댓글
    width: 89px;
    height: 29px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    gap: 6px; 
`;

const MeddlingCommentImage = styled.span` // 댓글 로고
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

const MeddlingCommentText = styled.span` // 댓글 글자
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MeddlingCommentCntText = styled.span` // 댓글 개수
    color: #7D817F;
    font-size: 15px;
    word-wrap: break-word;
`;

const MeddlingLine = styled.div`    // 구분선
    width: 100%;
    height: 100%;
    outline: 0.5px solid #7D817F;
    outline-offset: 0px;
    margin-top: 20px;
    margin-bottom: 50px;
`;

const MeddlePreviewCard = () => {
    const navigate = useNavigate();

    return (
        <>
        <CardContainer>
            <MeddlingInfoContainer>
                <MeddlingTopContainer>
                    <MeddlingLeftTopContainer>
                        <MeddlingProfileImg/>
                        <MeddlingNickNDateContainer>
                            <MeddlingNickname>닉네임</MeddlingNickname>
                            <MeddlingCreatedDate>2025.04.04 11:30</MeddlingCreatedDate>
                        </MeddlingNickNDateContainer> 
                    </MeddlingLeftTopContainer>  
                    <MeddlingRightTopContainer>
                        <MeddlingPurChased>구매 완료</MeddlingPurChased>
                        <MeddlingSatisfaction>
                        <MeddlingSatisfactionImage imageUrl={satisfactionImageUrl} />
                            만족</MeddlingSatisfaction>
                    </MeddlingRightTopContainer>
                </MeddlingTopContainer>
                <MeddlingProductName>명칭</MeddlingProductName>
                <MeddlingProductPrice>가격</MeddlingProductPrice>
                <MeddlingButtonContainer>
                    <MeddlingAgreeContainer>
                        <MeddlingAgreeImage imageUrl={agreeImageUrl} />
                        <MeddlingAgreeText>
                        찬성</MeddlingAgreeText>
                        <MeddlingAgreeCntText>23</MeddlingAgreeCntText>
                    </MeddlingAgreeContainer>
                    <MeddlingDisagreeContainer>
                        <MeddlingDisagreeImage imageUrl={disagreeImageUrl} />
                        <MeddlingDisagreeText>
                        찬성</MeddlingDisagreeText>
                        <MeddlingDisagreeCntText>23</MeddlingDisagreeCntText>
                    </MeddlingDisagreeContainer>
                    <MeddlingCommentContainer>
                        <MeddlingCommentImage imageUrl={commentImageUrl} />
                        <MeddlingCommentText>
                        찬성</MeddlingCommentText>
                        <MeddlingCommentCntText>23</MeddlingCommentCntText>
                    </MeddlingCommentContainer>
                </MeddlingButtonContainer>
            </MeddlingInfoContainer>
            <MeddlingProductImg/>
        </CardContainer>
        <MeddlingLine/>
        </>
    );
};

export default MeddlePreviewCard;