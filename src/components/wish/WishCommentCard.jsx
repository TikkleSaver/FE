import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Profile from "./../../assets/defaultProfile.svg";
import Etc from "./../../assets/etc-vertical.svg";
import Colors from "../../constanst/color.mjs";
import { deleteWishComment } from "../../api/wish/wishCommentAPI"; 

const WishCommentCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 555px;
  margin: 15px 20px;
  gap: 12px;
  color: ${Colors.secondary500};
`;

const WishUserName = styled.div`
  display: flex;
  gap: 12px;
  font-size: 16px;
`;

const WishCommentText = styled.div`
  font-size: 16px;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const WishCommentDate = styled.div`
  font-size: 12px;
`;

const WishEtcBtn = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  padding: 0;
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const EtcDropdown = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: white;
  border: 1px solid ${Colors.secondary50};
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  width: 50px;
`;

const EtcDropdownItem = styled.div`
  padding: 10px;
  font-size: 14px;
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

const WishCommentCard = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef();

  const profileUrl = comment.profileUrl || Profile;

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
          await deleteWishComment(comment.wishCommentId);
          alert("위시 댓글 성공적으로 삭제되었습니다.");
          window.location.reload(); 
      } catch (error) {
          alert("삭제 중 오류가 발생했습니다.");
      }
  };

  return (
    <WishCommentCardContainer>
      <WishUserName>
        <img src={profileUrl} alt="사용자프로필"/>
        {comment.nickname}
      </WishUserName>
      <WishCommentText>{comment.contents}</WishCommentText>
      <WishCommentDate>{formatDateTime(comment.createdAt)}</WishCommentDate>

      {comment.isAuthor && (
        <WishEtcBtn
          onClick={(e) => {
           e.stopPropagation()
            setIsOpen((prev) => !prev);
          }}  >
          <img src={Etc} alt="Etc" width="35" height="35" />
        </WishEtcBtn>
      )}
      {isOpen && (
        <EtcDropdown ref={dropdownRef}>
          <EtcDropdownItem>
              수정
          </EtcDropdownItem>
          <EtcDropdownItem
            onClick={handleDeleteClick}>
            삭제
          </EtcDropdownItem>
        </EtcDropdown>
      )}
    </WishCommentCardContainer>
  );
};

export default WishCommentCard;
