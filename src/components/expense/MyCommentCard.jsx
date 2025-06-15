import React from "react";
import styled from "styled-components";
import Profile from "./../../assets/defaultProfile.svg";
import Colors from "../../constanst/color.mjs";

const CommentCardContainer = styled.div`
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

const CommentDate = styled.div`
  font-size: 12px;
`;

const MyCommentCard = ({ comment }) => {
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
      <CommentText>{comment.content}</CommentText>
      <CommentDate>
        {formatDateTime(comment.updatedAt || comment.createdAt)}
      </CommentDate>
    </CommentCardContainer>
  );
};

export default MyCommentCard;
