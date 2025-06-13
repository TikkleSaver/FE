import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ProductPreviewCard from "../../components/product/ProductPreviewCard";
import SearchIcon from "../../assets/search.svg"
import Colors from "../../constanst/color.mjs";
import { fetchShoppingData } from "../../api/product/naver"

// 전체 상자
const ProductPageContainer = styled.div`    
  width:80%;
  max-width: 100%;
  margin: 120px auto;
`;

// 검색 상자
const SearchContainer = styled.div` 
  position: relative;
  display: flex;
  align-items: center;
  width:80%;
  margin: 0 auto;
`;

// 검색 입력
const SearchInput = styled.input`   
  width: 100%;
  padding: 18px 18px 18px 55px; 
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 600;
  outline: none;
`;

// 검색 아이콘 와퍼
const SearchIconWrapper = styled.div`
  position: absolute;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

// 상품 상자
const ProductContainer = styled.div`  
  margin: 30px auto;
  width:100%;
`;

// 버튼 상자
const ButtonWrapper = styled.div`   
  display: flex;
  justify-content: flex-end;
  padding: 0 55px; 
  margin-bottom: 40px; 
`;

// 직접 추가 버튼
const ProductCreateBtn = styled.button`   // 잊지 말자 좌우 간격 줄이기
  width : 120px;
  height: 35px;
  background-color: ${Colors.primary300};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  margin-top: 22px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 상품 목록 상자
const ProductInnerContainer = styled.div`   
  width: 90%; 
  max-width: 1200px; 
  margin: 5px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr)); 
  gap: 50px;
  justify-content: center;
`;

// 더보기 상자
const LookMoreBtnWrapper = styled.div`   
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;

// 더보기 버튼
const LookMoreBtn = styled.button` 
  width : 80px;
  height: 35px;
  background-color: transparent;
  color: ${Colors.primary500};
  border: 2px solid ${Colors.primary500};
  border-radius: 15px;
  font-size: 15px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProductPage() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 
  const latestSearch = useRef("");

  // searchTerm(검색어) 바뀌면 page 1로 초기화
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  // page 또는 searchTerm(검색어) 바뀔 때 데이터 불러오기
  useEffect(() => {
    const shoppingData = async () => {
      try {
        latestSearch.current = searchTerm;
        const result = await fetchShoppingData({ query: searchTerm || "가구", page });
        if (latestSearch.current !== searchTerm) return;
        const newItems = result.items;

        if (page === 1) {
          setData(newItems); // 새로 검색할 때 데이터 초기화
        } else {
          setData((prevData) => [...prevData, ...newItems]); // 페이지 증가 시 데이터 추가
        }

        setHasMore(newItems.length === 12);
      } catch (e) {
        console.error("Error fetching data", e);
      }
    };

    shoppingData();
  }, [page, searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // 더 보기 버튼 클릭 시 페이지 증가
  const loadMore = () => {
    if (hasMore) {
      setPage(page + 1); // 페이지 번호 증가
    }
  };

  // 상품 상세 보기로 이동동
  const handleCardClick = (item) => {
    navigate("/product-info", { state: { product: item } });
  };

    return (
        <ProductPageContainer>
            <SearchContainer>
                <SearchIconWrapper>
                    <img src={SearchIcon} alt="Search Icon" width="20" height="20" />
                </SearchIconWrapper>
                <SearchInput
                    type="text"
                    placeholder="원하는 상품을 검색하세요."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </SearchContainer>
            <ProductContainer>
                <ButtonWrapper>
                    <ProductCreateBtn onClick={() => navigate("/wish/add/not-exist")}>
                      직접 추가
                    </ProductCreateBtn>
                </ButtonWrapper>
                <ProductInnerContainer>
                  {data.map((item, idx) => (
                    <div key={idx} onClick={() => handleCardClick(item)} style={{ cursor: "pointer" }}>
                      <ProductPreviewCard item={item} />
                    </div>
                  ))}
                </ProductInnerContainer>
                       {hasMore && (
                <LookMoreBtnWrapper>
                  <LookMoreBtn onClick={loadMore}>더 보기</LookMoreBtn>
                </LookMoreBtnWrapper>
              )}
            </ProductContainer>
        </ProductPageContainer>
    );
  }
  
  export default ProductPage;