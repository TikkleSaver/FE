import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import agreeImageUrl from "../../assets/wishAgree.svg";
import disagreeImageUrl from "../../assets/wishDisagree.svg";
import agreeImageGreenUrl from "../../assets/wishAgreeColor.svg";
import disagreeImageGreenUrl from "../../assets/wishDisagreeColor.svg";
import commentImageUrl from "../../assets/wishComment.svg";
import unLockImageUrl from "../../assets/wishUnlock.svg";
import lockImageUrl from "../../assets/wishLock.svg";
import etcImageUrl from "../../assets/wishEtc.svg";
import ProfileImageUrl from "./../../assets/defaultProfile.svg";
import ProductImageUrl from "./../../images/wishProduct.png"    // 임시 사진
import Colors from "../../constanst/color.mjs";
import { deleteWish, updateWishSatisfactionStatus, updateWishPublicSatus } from "../../api/wish/wishAPI";
import { createWishVote, getWishVote, deleteWishVote } from "../../api/wish/wishVoteAPI"; 

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
  position: relative;
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
    b {
        font-weight: 600; 
    }
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
    top: -10px;
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

const MyWishPurchasedCard = ({ wish }) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [publicStatus, setPublicStatus] = useState(wish.publicStatus);
    const [voted, setVoted] = useState(null); 
    const [likeCnt, setLikeCnt] = useState(wish.likeCnt);
    const [unLikeCnt, setUnLikeCnt] = useState(wish.unLikeCnt);

    const dropdownRef = useRef();

    // 공개 여부
    const isPublic = publicStatus === "PUBLIC";
    const publicIconUrl = isPublic ? unLockImageUrl : lockImageUrl;
    const publicText = isPublic ? "공개" : "비공개";

    // 프로필 여부
    const profileUrl = wish.profileUrl || ProfileImageUrl;

    // 만족 여부
    const satisfactions = ["만족", "불만족"];
    const mapStatusToText = {
        SATISFIED: "만족",
        DISSATISFIED: "불만족",
    };
    const [selectedSatisfaction, setSatisfaction] = useState(
        mapStatusToText[wish.satisfactionStatus] || ""
    );

    const handleClick = () => {
        navigate(`/wish-info`, { state: { wishId: wish.wishId } });
    };

    const handleEditClick = (e) => {
        e.stopPropagation(); 
        setIsOpen(false); 

        if (wish.productType === "MYPRODUCT") {
            navigate("/wish/update/not-exist", { state: { wishId: wish.wishId  } });
        } else {
            navigate("/wish/update/exist", { state: { wishId: wish.wishId } });
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
            await deleteWish(wish.wishId);
            alert("위시가 성공적으로 삭제되었습니다.");
            window.location.reload(); 
        } catch (error) {
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    const handleSatisfactionClick = async (satisfaction) => {
        const statusMap = {
            만족: "SATISFIED",
            불만족: "DISSATISFIED",
        };
        const newStatus = statusMap[satisfaction];

        try {
            await updateWishSatisfactionStatus(wish.wishId, newStatus);
            setSatisfaction(satisfaction);
        } catch (error) {
            alert("만족/불만족 변경 중 오류가 발생했습니다.");
        }
    };

    const handlePublicStatus = async () => {
        const result = await updateWishPublicSatus(wish.wishId);
        if (result) {
            setPublicStatus((prev) => (prev === "PUBLIC" ? "PRIVATE" : "PUBLIC"));
        }
    };
    
    const handleCreateDeleteVote = async (newStatus) => {
        try {
            if (voted === newStatus) {
                await deleteWishVote(wish.wishId);
            if (newStatus === "LIKE") {
                setLikeCnt((prev) => prev - 1);
            } else if (newStatus === "UNLIKE") {
                setUnLikeCnt((prev) => prev - 1);
            }
            setVoted(null);
            } else {
                await createWishVote(wish.wishId, newStatus);
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

    useEffect(() => {
        const fetchVoteStatus = async () => {
        try {
            const data = await getWishVote(wish.wishId);
            setVoted(data.result.likeStatus);
        } catch (error) {
            console.error("투표 상태 불러오기 실패:", error);
        }
        };
        fetchVoteStatus();
    }, [wish.wishId]);

    return (
        <>
        <CardContainer onClick={handleClick}>
            <MyWishInfoContainer>
                <MyWishTopContainer>
                    <MyWishLeftTopContainer>
                        <MyWishProfileImg imageUrl={profileUrl}/>
                        <MyWishNickNDateContainer>
                            <MyWishNickname>{wish.nickname}</MyWishNickname>
                            <MyWishCreatedDate>{formatDateTime(wish.createdAt)}</MyWishCreatedDate>
                        </MyWishNickNDateContainer> 
                    </MyWishLeftTopContainer>  
                    <MyWishRightTopContainer>
                        <MyWishPublicBtn
                            onClick={(e) => {
                                e.stopPropagation(); 
                                handlePublicStatus();
                            }}>
                        <MyWishPublicImage imageUrl={publicIconUrl} />
                            {publicText}</MyWishPublicBtn>
                            <MyWishEtcImage imageUrl={etcImageUrl}
                                onClick={(e) => {
                                e.stopPropagation()
                                setIsOpen((prev) => !prev);
                            }}   />
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
                    </MyWishRightTopContainer>
                </MyWishTopContainer>
                <SatisfactionWrapper>
                    <SatisfactionBtnContainer>
                        {satisfactions.map((satisfaction) => (
                            <SatisfactionBtn
                            key={satisfaction}
                            $active={selectedSatisfaction === satisfaction ? "true" : "false"}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleSatisfactionClick(satisfaction);
                                }}
                            >
                            {satisfaction}
                            </SatisfactionBtn>
                        ))}
                    </SatisfactionBtnContainer>
                </SatisfactionWrapper>
                <MyWishProductName dangerouslySetInnerHTML={{ __html: wish.title }} />
                <MyWishProductPrice>{wish.price}원</MyWishProductPrice>
                <MyWishBottomContainer>
                    <MyWishBottomButtonContainer>
                        <MyWishAgreeContainer
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCreateDeleteVote("LIKE");
                            }}>
                            <MyWishAgreeImage imageUrl={voted === "LIKE" ? agreeImageGreenUrl : agreeImageUrl} />
                            <MyWishAgreeText>
                            찬성</MyWishAgreeText>
                            <MyWishAgreeCntText>{likeCnt}</MyWishAgreeCntText>
                        </MyWishAgreeContainer>
                        <MyWishDisagreeContainer
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCreateDeleteVote("UNLIKE");
                            }}>
                           <MyWishDisagreeImage imageUrl={voted === "UNLIKE" ? disagreeImageGreenUrl : disagreeImageUrl} />
                            <MyWishDisagreeText>
                            반대</MyWishDisagreeText>
                            <MyWishDisagreeCntText>{unLikeCnt}</MyWishDisagreeCntText>
                        </MyWishDisagreeContainer>
                        <MyWishCommentContainer>
                            <MyWishCommentImage imageUrl={commentImageUrl} />
                            <MyWishCommentText>
                            댓글</MyWishCommentText>
                            <MyWishCommentCntText>{wish.commentCnt}</MyWishCommentCntText>
                        </MyWishCommentContainer>
                    </MyWishBottomButtonContainer>
                </MyWishBottomContainer>
            </MyWishInfoContainer>
            <MyWishProductImg imageUrl={wish.image}/>
        </CardContainer>
        <MyWishLine/>
        </>
    );
};

export default MyWishPurchasedCard;