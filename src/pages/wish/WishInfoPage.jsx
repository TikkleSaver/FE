import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import WishCommentCard from "../../components/wish/WishCommentCard";
import satisfactionImageUrl from "../../assets/wishSatisfaction.svg";
import disSatisfactionImageUrl from "../../assets/wishDisSatisfacrion.svg";
import agreeImageUrl from "../../assets/wishAgree.svg";
import disagreeImageUrl from "../../assets/wishDisagree.svg";
import agreeImageGreenUrl from "../../assets/wishAgreeColor.svg";
import disagreeImageGreenUrl from "../../assets/wishDisagreeColor.svg";
import commentImageUrl from "../../assets/wishComment.svg";
import SubmitImageUrl from "./../../assets/arrowUp.svg";
import etcImageUrl from "../../assets/wishEtc.svg";
import ProfileImageUrl from "./../../assets/defaultProfile.svg";
import ProductImageUrl from "./../../images/wishProduct.png"    // 임시 사진
import Colors from "../../constanst/color.mjs";
import { getWishInfo, deleteWish } from "../../api/wish/wishAPI";
import { getWishCommentList, createWishComment } from "../../api/wish/wishCommentAPI";
import { createWishVote, getWishVote, deleteWishVote } from "../../api/wish/wishVoteAPI"; 

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
    border: 1px ${Colors.secondary50} solid;
`;

// 프로필 사진 & 닉네임 & 날짜 & 구매 상태 & 만족 여부 & 점 3개
const WishInfoTopContainer = styled.div`    
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px;
`;

 // 프로필 사진 & 닉네임 & 생성 날짜
const WishInfoLeftTopContainer = styled.div`   
  display: flex;
  align-items: center;
`;

// 구매 완료 & 만족 & 점 3개
const WishInfoRightTopContainer = styled.div`   
  display: flex;
  gap: 10px;
  position: relative;
`;

// 닉네임 & 날짜
const WishInfoNickNDateContainer = styled.span` 
    display: inline-block;
    padding-left: 20px;
`;

// 사람 프로필
const WishInfoProfileImg = styled.span`   
    display: inline-block;
    width: 50px;
    height: 50px;
    border-radius: 50%; 
    background-image: ${({ imageUrl }) => `url(${imageUrl})`};
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

// 닉네임
const WishInfoNickname = styled.div`  
    color: ${Colors.secondary500};
    font-size: 20px;
    font-weight: 800;
    line-height: 30px;
    word-wrap: break-word;
`;

// 날짜
const WishInfoCreatedDate = styled.div`   
    color: ${Colors.secondary200};
    font-size: 14px;
    font-weight: 800;
    line-height: 30px;
    word-wrap: break-word;
`;

// 구매 여부
const WishInfoPurChased = styled.span`    
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
const WishInfoSatisfaction = styled.span` 
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
const WishInfoDisSatisfaction = styled.span` 
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

// 만족 임티
const WishInfoSatisfactionImage = styled.div`   
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 점 3개
const WishInfoEtcImage = styled.span` 
  width: 35px;
  height: 35px;
  margin-left: 10px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;


// 수정 삭제 드롭다운
const EtcDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: -30px;
  background-color: white;
  border: 1px solid ${Colors.secondary50};
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  width: 57px;
  height: 94px;
  display: flex;           
  flex-direction: column;   
  align-items: center;        
  justify-content: center; 
`;

// 수정 삭제 드롭다운 내용
const EtcDropdownItem = styled.div`
  padding: 10px;
  font-size: 15px;
  color: ${Colors.secondary500};
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${Colors.secondary25};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${Colors.secondary50};
  }
`;

// 상위 구분선
const WishInfoTopLine = styled.div`    
  width: 100%;
  border-bottom: 1px solid ${Colors.secondary50};
`;

// 가운데 핵심 요소들
const WishInfoMiddleContainer = styled.div`    
    display: flex;
`;

// 상품 사진 & 버튼
const WishInfoLeftMiddleContainer = styled.div`    
`;

// 상품 이미지
const WishInfoProductImage = styled.span`  
  display: inline-block;  
  flex-shrink: 0;
  width: 480px;
  height: 480px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

 // 찬성 & 반대 & 댓글 버튼
const WishInfoButtonContainer = styled.div`   
    display: flex;
    width: 100%;
    gap: 30px;
    margin : 25px 20px;
`;

// 찬성
const WishInfoAgreeContainer = styled.span` 
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
const WishInfoAgreeImage = styled.span` 
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 찬성 글자
const WishInfoAgreeText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 찬성 개수
const WishInfoAgreeCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 반대
const WishInfoDisagreeContainer = styled.span` 
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
const WishInfoDisagreeImage = styled.span` 
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

// 반대 글자
const WishInfoDisagreeText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 반대 개수
const WishInfoDisagreeCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 댓글
const WishInfoCommentContainer = styled.span` 
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
const WishInfoCommentImage = styled.span` 
  width: 20px;
  height: 20px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; 
`;

 // 댓글 글자
const WishInfoCommentText = styled.span`
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

// 댓글 개수
const WishInfoCommentCntText = styled.span` 
    color: ${Colors.secondary300};
    font-size: 15px;
    word-wrap: break-word;
`;

 // 상품 설명 & 댓글
const WishInfoRightMiddleContainer = styled.div`  
`;

// 상품 카테고리, 상품명, 브랜드, 가격
const WishInfoProductContainer = styled.div`    
    width: 625px;
    margin-left: 25px;
`;

// 상품 카테고리
const WishInfoProductCategory = styled.div`    
    margin-top: 5px;
    height: 37px;
    color: ${Colors.secondary200};
    font-size: 16px;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
`;

// 상품 명
const WishInfoProductName = styled.div`    
    width: 545px;
    color: ${Colors.secondary500};
    font-size: 20px;
    font-weight: 700;
    line-height: 30px;
    word-wrap: break-word;
    b {
        font-weight: 600; 
    }
`;

// 브랜드
const WishInfoProductBrand = styled.div`    
    margin-top: 35px;
    color: ${Colors.secondary500};
    font-size: 15px;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
`;

// 가격
const WishInfoProductPrice = styled.div`    
    color: ${Colors.secondary500};
    font-size: 15px;
    font-weight: 500;
    line-height: 30px;
    word-wrap: break-word;
    margin-bottom: 15px;
`;

// 하위 구분선
const WishInfoLine = styled.div`    
  width: 95%;
  border-bottom: 1px solid ${Colors.secondary50};
`;

// 댓글 상자
const WishInfoCommentListContainer = styled.div`    
  margin-top: 7px;
  margin-left: 9px;
  display: flex;
  flex-direction: column;
  width: 639px;
  height: 340px;
  box-sizing: border-box;
  overflow: hidden;
`;

// 댓글 목록
const WishInfoComments = styled.div`    
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

// 댓글 입력 상자
const CommentInputWrapper = styled.div` 
  right: 20px;
  position: relative;
  padding: 10px 20px;
  margin-bottom: 5px;
  background-color: white;
`;

// 댓글 입력
const CommentInput = styled.input`  
  width: 630px;
  height: 57px;
  padding: 0 50px 0 15px; 
  border: 1px solid ${Colors.secondary100};
  border-radius: 15px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
`;

// 댓글 제출 버튼
const SubmitBtn = styled.button`    
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

function WishInfoPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { wishId } = location.state || {};
    const [newComment, setNewComment] = useState("");
    const [wishInfo, setWishInfo] = useState([]);
    const [comments, setComments] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [voted, setVoted] = useState(null); 
    const [likeCnt, setLikeCnt] = useState(0);
    const [unLikeCnt, setUnLikeCnt] = useState(0);

    const dropdownRef = useRef();
    
    const categoryMap = {
        1: "식비",
        2: "카페",
        3: "쇼핑",
        4: "건강",
        5: "취미",
        6: "교통비",
        7: "기타 생활비",
    };

    // 프로필 여부
    const profileUrl = wishInfo.profileUrl || ProfileImageUrl;

    // API 연동
    useEffect(() => {
        const fetch = async () => {
            try {
                const wish = await getWishInfo(wishId);
                setWishInfo(wish);
                const commentList = await getWishCommentList(wishId);
                setComments(commentList.wishCommentList || []);
                const data = await getWishVote(wishId);
                setVoted(data.result.likeStatus);
            } catch (error) {
                console.error("API 불러오기 실패", error);
            }
        };
        fetch();
    }, [wishId, refreshTrigger]);

    const handleEditClick = (e) => {
        e.stopPropagation(); 
        setIsOpen(false); 

        if (wishInfo.productType === "MYPRODUCT") {
            navigate("/wish/update/not-exist", { state: { wishId: wishInfo.wishId  } });
        } else {
            navigate("/wish/update/exist", { state: { wishId: wishInfo.wishId } });
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleDeleteClick = async (e) => {
        e.stopPropagation(); 
        setIsOpen(false);
    
        const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
        if (!isConfirmed) return;
    
        try {
            await deleteWish(wishInfo.wishId);
            alert("위시가 성공적으로 삭제되었습니다.");
            navigate(-1)
        } catch (error) {
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    const handleAddComment = async () => {
        const CommentData = {
            contents: newComment
        };
    
        const result = await createWishComment(wishInfo.wishId, CommentData);
        if (result) {
            setNewComment(""); 
            setRefreshTrigger(prev => prev + 1);
        }
    };

    useEffect(() => {
        setLikeCnt(wishInfo.likeCnt ?? 0);
        setUnLikeCnt(wishInfo.unLikeCnt ?? 0);
    }, [wishInfo]);

    const handleCreateDeleteVote = async (newStatus) => {
        try {
            if (voted === newStatus) {
                await deleteWishVote(wishInfo.wishId);
            if (newStatus === "LIKE") {
                setLikeCnt((prev) => prev - 1);
            } else if (newStatus === "UNLIKE") {
                setUnLikeCnt((prev) => prev - 1);
            }
            setVoted(null);
            } else {
                await createWishVote(wishInfo.wishId, newStatus);
            if (newStatus === "LIKE") {
                setLikeCnt((prev) => prev + 1);
                if (voted === "UNLIKE") setUnLikeCnt((prev) => prev - 1);
            } else if (newStatus === "UNLIKE") {
                setUnLikeCnt((prev) => prev + 1);
                if (voted === "LIKE") setLikeCnt((prev) => prev - 1);
            }
                setVoted(newStatus);
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
    };

    return (
        <WishInfoPageContainer>
            <WishInfoBox>
                <WishInfoTopContainer>
                    <WishInfoLeftTopContainer>
                        <WishInfoProfileImg imageUrl={profileUrl}/>
                        <WishInfoNickNDateContainer>
                            <WishInfoNickname>{wishInfo.nickname}</WishInfoNickname>
                            <WishInfoCreatedDate>{formatDateTime(wishInfo.createdAt)}</WishInfoCreatedDate>
                        </WishInfoNickNDateContainer> 
                    </WishInfoLeftTopContainer>  
                    <WishInfoRightTopContainer>
                        {wishInfo.purchaseStatus === "PURCHASE" && (
                            <WishInfoPurChased>구매 완료</WishInfoPurChased>
                        )}
                        {wishInfo.purchaseStatus === "PURCHASE" && wishInfo.satisfactionStatus === "SATISFIED" && (
                            <WishInfoSatisfaction>
                            <WishInfoSatisfactionImage imageUrl={satisfactionImageUrl} />
                            만족
                            </WishInfoSatisfaction>
                        )}
                        {wishInfo.purchaseStatus === "PURCHASE" && wishInfo.satisfactionStatus === "DISSATISFIED" && (
                            <WishInfoDisSatisfaction>
                            <WishInfoSatisfactionImage imageUrl={disSatisfactionImageUrl} />
                            불만족
                            </WishInfoDisSatisfaction>
                        )}
                        {wishInfo.isAuthor && (
                            <WishInfoEtcImage imageUrl={etcImageUrl} 
                                    onClick={(e) => {
                                    e.stopPropagation()
                                    setIsOpen((prev) => !prev);
                                }}   />
                        )}
                        {isOpen && (
                            <EtcDropdown ref={dropdownRef}>
                            <EtcDropdownItem 
                                onClick={handleEditClick}>
                                수정
                            </EtcDropdownItem>
                            <EtcDropdownItem
                                onClick={handleDeleteClick}>
                                삭제
                            </EtcDropdownItem>
                            </EtcDropdown>
                        )}
                    </WishInfoRightTopContainer>
                </WishInfoTopContainer>
                <WishInfoTopLine/>
                <WishInfoMiddleContainer>
                    <WishInfoLeftMiddleContainer>
                        <WishInfoProductImage imageUrl={wishInfo.productImg}/>
                        <WishInfoButtonContainer>
                        <WishInfoAgreeContainer
                        onClick={(e) => {
                            e.stopPropagation();
                             handleCreateDeleteVote("LIKE");
                        }}>
                        <WishInfoAgreeImage imageUrl={voted === "LIKE" ? agreeImageGreenUrl : agreeImageUrl} />
                            <WishInfoAgreeText>
                                찬성</WishInfoAgreeText>
                                <WishInfoAgreeCntText>{likeCnt}</WishInfoAgreeCntText>
                            </WishInfoAgreeContainer>
                            <WishInfoDisagreeContainer
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCreateDeleteVote("UNLIKE");
                            }}>
                        <WishInfoDisagreeImage imageUrl={voted === "UNLIKE" ? disagreeImageGreenUrl : disagreeImageUrl} />
                                <WishInfoDisagreeText>
                                반대</WishInfoDisagreeText>
                                <WishInfoDisagreeCntText>{unLikeCnt}</WishInfoDisagreeCntText>
                            </WishInfoDisagreeContainer>
                            <WishInfoCommentContainer>
                                <WishInfoCommentImage imageUrl={commentImageUrl} />
                                <WishInfoCommentText>
                                댓글</WishInfoCommentText>
                                <WishInfoCommentCntText>{wishInfo.commentCnt}</WishInfoCommentCntText>
                            </WishInfoCommentContainer>
                        </WishInfoButtonContainer>
                    </WishInfoLeftMiddleContainer>
                    <WishInfoRightMiddleContainer>
                        <WishInfoProductContainer>
                            <WishInfoProductCategory>{categoryMap[wishInfo.categoryId]}</WishInfoProductCategory>
                            <WishInfoProductName dangerouslySetInnerHTML={{ __html: wishInfo.title }} />
                            <WishInfoProductBrand>브랜드 | {wishInfo.brand}</WishInfoProductBrand>
                            <WishInfoProductPrice>가격 | {wishInfo.price}원</WishInfoProductPrice>
                            <WishInfoLine/>
                        </WishInfoProductContainer>
                        <WishInfoCommentListContainer>
                            <WishInfoComments>
                            {comments.map((c, i) =>
                                <WishCommentCard key={i} comment={c} onRefresh={handleRefresh} />
                            )}
                            </WishInfoComments>{" "}
                            <CommentInputWrapper>
                                <CommentInput
                                type="text"
                                value={newComment} placeholder="위시에 피드백을 남겨주세요!"
                                onChange={(e) => setNewComment(e.target.value)}
                                />
                                <SubmitBtn onClick={handleAddComment}>
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