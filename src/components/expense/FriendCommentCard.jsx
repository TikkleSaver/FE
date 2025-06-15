import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Profile from "./../../assets/defaultProfile.svg";
import Etc from "./../../assets/etc-vertical.svg";
import Colors from "../../constanst/color.mjs";
import {
  deleteExpenseComment,
  updateExpenseComment,
} from "../../api/expense/expenseCommentApi";

const CommentCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 555px;
  margin: 15px 20px;
  gap: 12px;
  color: ${Colors.secondary500};
`;

const UserName = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
`;

const CommentText = styled.div`
  font-size: 16px;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const CommentInput = styled.input`
  width: 95%;
  height: 30px;
  padding: 0 50px 0 15px;
  border: 1px solid ${Colors.secondary100};
  border-radius: 15px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
`;

const CommentDate = styled.div`
  font-size: 12px;
`;

const Button = styled.button`
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  padding: 0;
  width: 35px;
  height: 35px;
  cursor: pointer;
`;

const Dropdown = styled.div`
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

const DropdownItem = styled.div`
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

const FriendCommentCard = ({ comment, onDone }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const dropdownRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return ""; // invalid date 처리

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  const handleUpdateSubmit = async () => {
    try {
      const result = await updateExpenseComment({
        expenseCommentId: comment.expenseCommentId,
        memberId: comment.memberId,
        content: editContent, // 수정된 내용으로 보내야 함
      });
      console.log("✅ 서버 응답:", result.data);
      alert("지출 피드백이 수정되었습니다!");
      setIsEditing(false); // 수정 모드 종료
      if (onDone) onDone();
    } catch (err) {
      console.error("수정 실패:", err.response?.data || err.message);
      alert("수정 실패 😥");
    }
  };

  const handleDeleteSubmit = async () => {
    try {
      const result = await deleteExpenseComment({
        expenseCommentId: comment.expenseCommentId,
        memberId: comment.memberId,
      });
      console.log("✅ 서버 응답:", result.data);
      alert("지출 피드백이 삭제되었습니다!");
      if (onDone) onDone();
    } catch (err) {
      console.error("삭제 실패:", err.response?.data || err.message);
      alert("삭제 실패 😥");
    }
  };

  return (
    <CommentCardContainer>
      <UserName>
        <img
          src={comment.profileUrl || Profile}
          alt="사용자프로필"
          width="33"
          height="33"
          style={{ borderRadius: "50%" }}
        />
        {comment.nickname}
      </UserName>

      {isEditing ? (
        <>
          <CommentInput
            type="text"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <EditButtons>
            <SaveButton onClick={handleUpdateSubmit}>저장</SaveButton>
            <CancelButton
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content); // 수정 취소 시 원래 내용 복원
              }}
            >
              취소
            </CancelButton>
          </EditButtons>
        </>
      ) : (
        <CommentText>{comment.content}</CommentText>
      )}

      <CommentDate>
        {formatDateTime(comment.updatedAt || comment.createdAt)}
      </CommentDate>

      <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        <img src={Etc} alt="Etc" width="35" height="35" />
      </Button>

      {isOpen && !isEditing && (
        <Dropdown ref={dropdownRef}>
          <DropdownItem
            onClick={() => {
              setIsOpen(false);
              setIsEditing(true); // 수정 모드로 전환
            }}
          >
            수정
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setIsOpen(false);
              handleDeleteSubmit();
            }}
          >
            삭제
          </DropdownItem>
        </Dropdown>
      )}
    </CommentCardContainer>
  );
};

export default FriendCommentCard;
