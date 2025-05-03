import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Profile from "./../../assets/defaultProfile.svg";
import Etc from "./../../assets/etc-vertical.svg";

const CommentCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 555px;
  margin: 15px 20px;
  gap: 12px;
  color: #333;
`;

const UserName = styled.div`
  display: flex;
  gap: 12px;
  font-size: 16px;
`;

const CommentText = styled.div`
  font-size: 16px;
  word-break: keep-all;
  overflow-wrap: break-word;
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
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  width: 50px;
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #f5f5f5;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

const FriendCommentCard = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <CommentCardContainer>
      <UserName>
        <img src={Profile} alt="사용자프로필" width="33" height="33" />
        {comment.user}
      </UserName>
      <CommentText>{comment.comment}</CommentText>
      <CommentDate>{comment.date}</CommentDate>

      <Button ref={buttonRef} onClick={() => setIsOpen(!isOpen)}>
        <img src={Etc} alt="Etc" width="35" height="35" />
      </Button>

      {isOpen && (
        <Dropdown ref={dropdownRef}>
          <DropdownItem
            onClick={() => {
              setIsOpen(false);
              alert("수정 클릭");
            }}
          >
            수정
          </DropdownItem>
          <DropdownItem
            onClick={() => {
              setIsOpen(false);
              alert("삭제 클릭");
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
