import React, { useEffect, useState} from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChallengePreviewCard from "../../components/challenge/ChallengePreviewCard";
import SearchIcon from "../../assets/search.svg";
import Colors from "../../constanst/color.mjs";
import { searchChallenges } from "../../api/challenge/searchChallengeApi";
import Dropdown from "../../components/challenge/Dropdown";

const ChallengeSearchPageWrapper= styled.div`
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
  display: ${({ visible }) => (visible ? "flex" : "none")};
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
  const [result, setResult] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const [page, setPage] = useState(1);  
  const [selectedSearchCategory, setSelectedSearchCategory] = useState("전체");
  const categories = ["전체", "식비", "카페", "쇼핑", "건강", "취미", "교통비", "기타 생활비"];

  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(
        `/challenges/search?query=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(selectedSearchCategory)}`
      );
    }
  };

  const categoryMap = {
    전체: null,
    식비: 1,
    카페: 2,
    쇼핑: 3,
    건강: 4,
    취미: 5,
    교통비: 6,
    기타생활비: 7,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryId = categoryMap[category];  // 문자열을 Long으로 변환
        const data = await searchChallenges({
          keyword: query,
          category: categoryId,     // 숫자 or null
          page: page,               // 현재 페이지
        });
        setResult(data);
      } catch (error) {
        console.error("검색 결과 로딩 실패", error);
      }
    };
  
    if (query || category !== "전체") {
      fetchData();
    }
  }, [query, category, page]);

  return (
    <ChallengeSearchPageWrapper>
    <SearchContainer>
      <SearchIconWrapper>
        <img src={SearchIcon} alt="Search Icon" width="20" height="20" />
      </SearchIconWrapper>
      <SearchInput
        type="text"
        placeholder={query}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <SearchCategoryContainer>
      <Dropdown options={categories} onSelect={setSelectedSearchCategory} />
      </SearchCategoryContainer>
    </SearchContainer>
    <ChallengeContainer>
  <ChallengeResultContainer>
    {result.length > 0 && (
      <>
        <SearchChallengeText>
          '{query}' 로 검색한 결과입니다.
        </SearchChallengeText>
        <ChallengeInnerContainer>
          {result.map((ch) => (
            <ChallengePreviewCard
              key={ch.challengeId}
              challengeId={ch.challengeId}
              title={ch.title}
              category={ch.category}
              imgUrl={ch.imgUrl}
            />
          ))}
        </ChallengeInnerContainer>
      </>
    )}
    <NoResultContainer visible={result.length === 0}>
      <NoResultTitle>검색어에 해당하는 챌린지가 없습니다.</NoResultTitle>
      <NoResultSubText>철자를 확인하거나 다른 키워드를 입력해주세요!</NoResultSubText>
    </NoResultContainer>
  </ChallengeResultContainer>
</ChallengeContainer>
    </ChallengeSearchPageWrapper>
  );
}

export default ChallengeSearchPage;