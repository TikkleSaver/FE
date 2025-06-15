import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Profile from "./../../assets/defaultProfile.svg";
import Etc from "./../../assets/etc-vertical.svg";
import Colors from "../../constanst/color.mjs";
import { deleteWishComment, updateWishComment } from "../../api/wish/wishCommentAPI"; 

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

const WishCommentInput = styled.input`
  width: 95%;
  height: 30px;
  padding: 0 50px 0 15px;
  border: 1px solid ${Colors.secondary100};
  border-radius: 15px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
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


const EditButtons = styled.div`
  margin-right: 5%;
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const SaveButton = styled.button`
  align-self: flex-end;
  padding: 5px 15px;
  background-color: ${Colors.primary};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const CancelButton = styled.button`
  padding: 5px 15px;
  background-color: ${Colors.secondary100};
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 33px;
  height: 33px;
  border-radius: 50%;
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

const WishCommentCard = ({ comment, onRefresh }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.contents);

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
    setIsOpen(false);

     const isConfirmed = window.confirm("정말 삭제하시겠습니까?");
      if (!isConfirmed) return;

      try {
          await deleteWishComment(comment.wishCommentId);
          onRefresh?.();  
      } catch (error) {
          alert("삭제 중 오류가 발생했습니다.");
      }
  };

  const handleUpdateSubmit = async () => {
    try {
        const CommentData = {
          contents: editContent
        };

        await updateWishComment(
          comment.wishCommentId,
          CommentData
        );
        setIsEditing(false); 
        onRefresh?.(); 
      } catch (err) {
        alert("수정 중 오류가 발생했습니다");
      }
  };

  return (
    <WishCommentCardContainer>
      <WishUserName>
        <ProfileImage src={profileUrl} alt="사용자프로필"/>
        {comment.nickname}
      </WishUserName>
            {isEditing ? (
        <>
          <WishCommentInput
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <EditButtons>
            <SaveButton onClick={handleUpdateSubmit}>저장</SaveButton>
            <CancelButton
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content); 
              }}
            >
              취소
            </CancelButton>
          </EditButtons>
        </>
      ) : (
        <WishCommentText>{comment.contents}</WishCommentText>
      )}
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
          <EtcDropdownItem
            onClick={() => {
              setIsOpen(false);
              setIsEditing(true);
            }}>
              수정
          </EtcDropdownItem>
          <EtcDropdownItem
            onClick={() => {
              setIsOpen(false);
              handleDeleteClick()}} >
            삭제
          </EtcDropdownItem>
        </EtcDropdown>
      )}
    </WishCommentCardContainer>
  );
};

export default WishCommentCard;
