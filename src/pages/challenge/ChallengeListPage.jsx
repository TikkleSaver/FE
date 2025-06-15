import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChallengePreviewCard from "../../components/challenge/ChallengePreviewCard";
import SearchIcon from "../../assets/search.svg";
import Colors from "../../constanst/color.mjs";
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";
import axiosInstance from "../../api/axiosInstance"

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const ChallengeListWrapper= styled.div`
  width:80%;
  max-width: 100%;
  margin: 120px auto;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width:80%;
  margin: 0 auto;
  
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 18px 18px 18px 55px; 
  border: 1px solid ${Colors.secondary100};
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  outline: none;

  &::placeholder {
  color:${Colors.secondary300};
    font-weight: 400;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const ChallengeContainer = styled.div`
  margin: 50px auto;
  width:100%;

`;

const ChallengeInnerContainer = styled.div`
  width: 90%; 
  max-width: 1200px; 
  margin: 5px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr)); 
  gap: 40px;
  justify-content: center;


`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 65px;
  margin-bottom: 40px;

`;

const CateButton = styled.button`
   background-color: ${(props) =>
    props.$active === "true" ? Colors.primary300 : "white"};
  color: ${(props) =>
    props.$active === "true" ? "white" : Colors.secondary200};
  border: 1px solid
    ${(props) =>
      props.$active === "true" ? Colors.primary300 : Colors.secondary100};
  padding: 6px 15px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;

`;

const NoResultContainer = styled.div`

  flex-direction: column;
  justify-content: center;  
  align-items: center;     
  height: 50vh;        
  text-align: center;
  padding: 0 20px;         
  display: flex;
`;

const NoResultTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.secondary200};
  margin-bottom: 10px;
`;

const NoResultSubText = styled.div`
  font-size: 14px;
  color: ${Colors.secondary100};
`;


function ChallengeListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [challengeList, setChallengeList] = useState([]);
    const [page, setPage] = useState(1); 
    const [totalPage, setTotalPage] = useState(1);
    const [pageGroup, setPageGroup] = useState(0);
  
    const categories = ["전체", "식비", "카페", "쇼핑", "건강", "취미", "교통비", "기타 생활비"];
  
    const categoryMap = {
      "전체": null,
      "식비": 1,
      "카페": 2,
      "쇼핑": 3,
      "건강": 4,
      "취미": 5,
      "교통비": 6,
      "기타 생활비": 7,
    };

    const reverseCategoryMap = {
        1: "식비",
        2: "카페",
        3: "쇼핑",
        4: "건강",
        5: "취미",
        6: "교통비",
        7: "기타 생활비",
      };
  
    useEffect(() => {
      const category = categoryMap[selectedCategory];
      const newGroup = Math.floor((page - 1) / 5);
      if (newGroup !== pageGroup) {
        setPageGroup(newGroup);
      }

      axiosInstance.get(`${baseUrl}/challenges/lists`, {
        params: {
          category: category,
          page: page,
        },
      })
      .then(response => {
        console.log("response.data:", response.data);
        const { challengeList, totalPage } = response.data.result;
      
        setChallengeList(challengeList);
        setTotalPage(totalPage);
      })
      .catch(err => {
        console.error("챌린지 리스트 로드 실패:", err);
      });

      
    }, [selectedCategory, page]);
  

    const filteredChallenges = challengeList.filter(challenge =>
      challenge.title.includes(searchTerm)
    );

      return (
        <ChallengeListWrapper>
          <SearchContainer>
            <SearchIconWrapper>
              <img src={SearchIcon} alt="Search Icon" width="20" height="20" />
            </SearchIconWrapper>
            <SearchInput
              type="text"
              placeholder="참여하고 싶은 챌린지를 검색하세요."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchContainer>
    
          <ChallengeContainer>
            <ButtonContainer>
              {categories.map((category) => (
                <CateButton
                  key={category}
                  $active={selectedCategory === category ? "true" : "false"}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </CateButton>
              ))}
            </ButtonContainer>
    
            <ChallengeInnerContainer>
              {filteredChallenges.map((challenge) => (
                <ChallengePreviewCard 
                  challengeId={challenge.challengeId} 
                  title={challenge.title} 
                  category={reverseCategoryMap[challenge.categoryId]} 
                  imgUrl={challenge.imgUrl} 
                />
              ))}
            </ChallengeInnerContainer>
            {filteredChallenges.length === 0 && 
              <NoResultContainer>
                <NoResultTitle>해당하는 카테고리의 챌린지가 없습니다.</NoResultTitle>
                <NoResultSubText>챌린지를 직접 생성해보세요!</NoResultSubText>
            </NoResultContainer>}
            <Pagination 
              page={page} 
              totalPage={totalPage} 
              onPageChange={(newPage) => setPage(newPage)} 
            />
          </ChallengeContainer>
        </ChallengeListWrapper>
  );
}

export default ChallengeListPage;