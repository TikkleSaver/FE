import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChallengePreviewCard from "../../components/challenge/ChallengePreviewCard";
import SearchIcon from "../../assets/search.svg";
import Colors from "../../constanst/color.mjs";

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


function ChallengeListPage() {
  const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const categories = ["전체", "식비", "카페", "쇼핑", "건강", "취미", "교통비", "기타 생활비"];

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
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      <ChallengePreviewCard/>
      </ChallengeInnerContainer>
    </ChallengeContainer>
    </ChallengeListWrapper>
  );
}

export default ChallengeListPage;