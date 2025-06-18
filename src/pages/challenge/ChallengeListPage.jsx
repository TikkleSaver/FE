import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChallengePreviewCard from "../../components/challenge/ChallengePreviewCard";
import SearchIcon from "../../assets/search.svg";
import Colors from "../../constanst/color.mjs";
import Pagination from "../../components/pagination/Pagination";
import {fetchChallengeList} from "../../api/challenge/challengeListApi";
import { useSearchParams, useNavigate } from "react-router-dom";
import Dropdown from "../../components/challenge/Dropdown";

const ChallengeListWrapper= styled.div`
  width:100%;
  max-width: 100%;
  margin: 120px auto;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width:100%;
  margin: 0 auto;
  padding: 30px 0;
  background-color: rgba(163, 209, 198, 0.15);
 justify-content: center; 
  
`;

const SearchInput = styled.input`
 width: 60%;
   
  padding: 18px 18px 18px 55px; 
  border: 0px solid ${Colors.secondary100};
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  outline: none;

  &::placeholder {
  color:${Colors.secondary300};
    font-weight: 400;
  }
`;

const SearchIconWrapper = styled.div`
  position: relative;
  left: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const SearchCategoryContainer = styled.div`
width:25px;
height:25px;
display: flex;
align-items: center;
justify-content: center;
background-color: white;
padding:15px;
border-radius: 50px;
margin-left:20px;


`;

const ChallengeContainer = styled.div`
  margin: 50px auto;
  width:80%;

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
    const [result, setResult] = useState([]);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("query");
    const category = searchParams.get("category");
    const [selectedSearchCategory, setSelectedSearchCategory] = useState("전체");
    const navigate = useNavigate();
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && searchTerm.trim()) {
        navigate(
          `/challenges/search?query=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedSearchCategory)}`
        );
      }
    };
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

        fetchChallengeList(category, page)
          .then(({ challengeList, totalPage }) => {
            setChallengeList(challengeList);
            setTotalPage(totalPage);
          })
          .catch(error => {
            console.error("챌린지 리스트 로드 실패:", error);
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
        onKeyDown={handleKeyPress}
      />
      <SearchCategoryContainer>
      <Dropdown options={categories} onSelect={setSelectedSearchCategory} />
      </SearchCategoryContainer>
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
  {challengeList.map((challenge) => (
    <ChallengePreviewCard 
      key={challenge.challengeId}
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