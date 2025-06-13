import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Profile from "./../../assets/defaultProfile.svg";
import Etc from "./../../assets/etc-vertical.svg";
import Colors from "../../constanst/color.mjs";

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
  right: -30px;
  background: none;
  border: none;
  padding: 0;
  width: 35px;
  height: 35px;
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

const WishCommentCard = ({ comment }) => {

    const profileUrl = comment.profileUrl || Profile;

  return (
    <WishCommentCardContainer>
      <WishUserName>
        <img src={profileUrl} alt="사용자프로필"/>
        {comment.nickname}
      </WishUserName>
      <WishCommentText>{comment.contents}</WishCommentText>
      <WishCommentDate>{formatDateTime(comment.createdAt)}</WishCommentDate>

      {comment.isAuthor && (
        <WishEtcBtn>
          <img src={Etc} alt="Etc" width="35" height="35" />
        </WishEtcBtn>
      )}
    </WishCommentCardContainer>
  );
};

export default WishCommentCard;
