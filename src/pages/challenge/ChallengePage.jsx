import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChallengePreviewCard from "../../components/challenge/ChallengePreviewCard";
import SearchIcon from "../../assets/search.svg"


const ChallengePageContainer = styled.div`
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
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  outline: none;
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

`;

const CateButton = styled.button`
  background-color: ${(props) =>
    props.$active === "true" ? "#51B69E" : "white"};
  color: ${(props) =>
    props.$active === "true" ? "white" : "#999999"};
  border: 1px solid
    ${(props) =>
      props.$active === "true" ? "#51B69E" : "#999999"};
  padding: 6px 15px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;

  
`;


function ChallengePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const categories = ["전체", "식비", "카페", "쇼핑", "건강", "취미", "교통비", "기타 생활비"];

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
      />
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
      <TopChallengeInnerContainer>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      
      </TopChallengeInnerContainer>
    </ChallengeContainer>
    </ChallengePageContainer>
  );
}

export default ChallengePage;