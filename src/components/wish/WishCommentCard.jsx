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

const WishCommentCard = ({ comment }) => {

  return (
    <WishCommentCardContainer>
      <WishUserName>
        <img src={Profile} alt="사용자프로필"/>
        {comment.user}
      </WishUserName>
      <WishCommentText>{comment.comment}</WishCommentText>
      <WishCommentDate>{comment.date}</WishCommentDate>

      <WishEtcBtn>
        <img src={Etc} alt="Etc" width="35" height="35" />
      </WishEtcBtn>
    </WishCommentCardContainer>
  );
};

export default WishCommentCard;
