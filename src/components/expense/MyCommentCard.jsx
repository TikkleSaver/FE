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
  return (
    <CommentCardContainer>
      <UserName>
        <img src={Profile} alt="사용자프로필" width="33" height="33" />
        {comment.user}
      </UserName>
      <CommentText>{comment.comment}</CommentText>
      <CommentDate>{comment.date}</CommentDate>
    </CommentCardContainer>
  );
};

export default MyCommentCard;
