import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ChallengePreviewCard from "../../components/challenge/ChallengePreviewCard";
import SearchIcon from "../../assets/search.svg";
import Colors from "../../constanst/color.mjs";

const ChallengeSearchPageWrapper= styled.div`
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

const ChallengeResultContainer = styled.div`
  display:block;
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

const SearchChallengeText = styled.div`
  margin-left: 65px;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 500;
  
`;

const NoResultContainer = styled.div`
  flex-direction: column;
  justify-content: center;  
  align-items: center;     
  height: 50vh;        
  text-align: center;
  padding: 0 20px;         
  display: none;
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

function ChallengeSearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ChallengeSearchPageWrapper>
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
      <ChallengeResultContainer>
      <SearchChallengeText>
      ‘커피’로 검색한 결과입니다.
      </SearchChallengeText>
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
      </ChallengeResultContainer>
      <NoResultContainer>
        <NoResultTitle>검색어에 해당하는 챌린지가 없습니다.</NoResultTitle>
        <NoResultSubText>철자를 확인하거나 다른 키워드를 입력해주세요!</NoResultSubText>
    </NoResultContainer>
    </ChallengeContainer>
    </ChallengeSearchPageWrapper>
  );
}

export default ChallengeSearchPage;