import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChallengePreviewCard from "../../components/challenge/ChallengePreviewCard";
import SearchIcon from "../../assets/search.svg"
import Colors from "../../constanst/color.mjs";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import categoryIcon from "../../assets/categoryIcon.svg"
import Dropdown from "../../components/challenge/Dropdown";
import { fetchChallenge } from "../../api/challenge/challengeDetailApi";
import { fetchChallengeList } from "../../api/challenge/challengeListApi";


const ChallengePageContainer = styled.div`
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
  width: 80%;

`;
const TopChallengeInnerContainer = styled.div`
  width: 90%; 
  max-width: 1200px; 
  margin: 5px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr)); 
  gap: 40px;
  justify-content: center;

`;

const TopChallengeText = styled.div`

  margin-left: 65px;
  margin-bottom: 30px;
  font-size: 25px;
  font-weight: 600;
  
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-left: 65px;
  margin-bottom: 50px;
  position: relative;
  margin: 0 auto;
  width: 72%;
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

const MoreBtn = styled(Link)`
  color: ${Colors.secondary200};
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  position: absolute;
  right: 0px;

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


function ChallengePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedSearchCategory, setSelectedSearchCategory] = useState("전체");
  const categories = ["전체", "식비", "카페", "쇼핑", "건강", "취미", "교통비", "기타 생활비"];
  const [challengeList, setChallengeList] = useState([]);
   const [page, setPage] = useState(1); 


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
    

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(
        `/challenges/search?query=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedSearchCategory)}`
      );
    }
  };


  useEffect(() => {
    const category = categoryMap[selectedCategory];

    const loadChallenge = async () => {
      try {
        const result = await fetchChallengeList(category, page)
        const limitedList = result.challengeList.slice(0, 8); // 앞에서 8개만 자름
        setChallengeList(limitedList);
      } catch (error) {
        console.error("챌린지 불러오기 실패:", error);
      }
    };
  
    loadChallenge();
  }, [selectedCategory, page]);

  return (
    <ChallengePageContainer>
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
      <TopChallengeText>
      인기 챌린지🔥
      </TopChallengeText>
      <TopChallengeInnerContainer>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      </TopChallengeInnerContainer>
    </ChallengeContainer>

 
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
          <MoreBtn to="/challenges/challenge-list">{'더보기 >'}</MoreBtn>
        </ButtonContainer>
        <ChallengeContainer>
    
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
            {challengeList.length === 0 && 
              <NoResultContainer>
                <NoResultTitle>해당하는 카테고리의 챌린지가 없습니다.</NoResultTitle>
                <NoResultSubText>챌린지를 직접 생성해보세요!</NoResultSubText>
            </NoResultContainer>}
      
    </ChallengeContainer>
    </ChallengePageContainer>
  );
}

export default ChallengePage;