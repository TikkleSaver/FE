import React, { useEffect, useState } from "react";
import styled from "styled-components";
import top3RankImg from "../../images/top3RankImg.png";
import axios from "axios";
import defaultProfileImg from "../../assets/defaultProfile.svg"
import Pagination from "../pagination/Pagination";
import axiosInstance from "../../api/axiosInstance";
import { fetchChallengerList } from "../../api/challenge/challengeDetailApi";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const ChallengerWrapper = styled.div`
  width: 70%;
  margin: 70px auto;
`;

const ChallengerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 55px;
`;

const ChallengerInfo = styled.div`
  display: flex;
`;

const ChallengerImg = styled.div`
 
img
{  
   width: 100px;
   aspect-ratio: 1 / 1;
   border-radius: 50px;
   object-fit: cover;      
   object-position: center;
}
`;

const ChallengerName = styled.div`
  font-size: 20px;
  margin-top: 20px;
  margin-left: 25px;
`;

const ChallengerProfileBtn = styled.button`
  border-radius: 15px;
  padding: 13px 18px;
  font-size: 20px;
  background-color: #51b69e;
  color: white;
  border: none;
`;

function CertifyComponent({ name, imgSrc }) {
  return (
    <ChallengerContainer>
      <ChallengerInfo>
        <ChallengerImg ><img src={ imgSrc ? imgSrc : defaultProfileImg} alt="프로필 이미지"/></ChallengerImg>
        <ChallengerName>{name}</ChallengerName>
      </ChallengerInfo>
      <ChallengerProfileBtn>프로필 보러가기</ChallengerProfileBtn>
    </ChallengerContainer>
  );
}

const ChallengerComponent = ({challengeId}) => {
    const [memberList, setMemberList] = useState([]);
    const [page, setPage] = useState(1); 
    const [totalPage, setTotalPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);

    useEffect(() => {
      if (!challengeId) return;
  
      const loadChallengerList = async () => {
        try {
          const newGroup = Math.floor((page - 1) / 5);
          if (newGroup !== pageGroup) {
            setPageGroup(newGroup);
          }
  
          const { memberList, totalPage } = await fetchChallengerList(challengeId, page);
          setMemberList(memberList);
          setTotalPage(totalPage);
        } catch (error) {
         
        }
      };
  
      loadChallengerList();
    }, [page, challengeId]);
  

  const mockData = [
    { name: "홍길동", imgSrc: top3RankImg },
    { name: "김철수", imgSrc: top3RankImg },
    { name: "박영희", imgSrc: top3RankImg },
    { name: "이민호", imgSrc: top3RankImg },
    { name: "최지우", imgSrc: top3RankImg },
  ];

  return (
    <ChallengerWrapper>
      {memberList.map((item, index) => (
        <CertifyComponent key={index} name={item.memberName} imgSrc={item.memberImgUrl} />
      ))}
      <Pagination 
              page={page} 
              totalPage={totalPage} 
              onPageChange={(newPage) => setPage(newPage)} 
            />
    </ChallengerWrapper>
  );
};

export default ChallengerComponent;
