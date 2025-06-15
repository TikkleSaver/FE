import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/search.svg';
import UserCard from '../../components/friend/UserCard';
import { searchMembers } from '../../api/member/memberApi'; // 실제 경로로 수정

const SearchFreindPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 100%;
  margin: 92px auto;
`;

const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 70%;
  max-width: 800px;
  margin: 0 auto;
  position: fixed;
  z-index: 2;
  background-color: white;
`;

const SearchContainer = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 18px 18px 18px 55px;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 16px;
  font-weight: 500;
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

const FriendItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 75%;
  max-width: 700px;
  padding-right: 8px;
  box-sizing: border-box;
  margin-top: 90px;
`;

const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

const LoadMoreButton = styled.button`
  width: 100px;
  height: 35px;
  background-color: white;
  color: #333;
  border: 2px solid #999;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export default function SearchFreindPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0); // 0부터 시작
  const [userList, setUserList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const latestSearch = useRef('');

  // 검색어 변경 시 페이지 초기화
  useEffect(() => {
    setPage(0);
  }, [searchTerm]);

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      try {
        latestSearch.current = searchTerm;

        const result = await searchMembers(searchTerm, page);

        // 만약 검색 중 다른 검색어로 바뀌었다면 무시
        if (latestSearch.current !== searchTerm) return;

        if (page === 0) {
          setUserList(result);
        } else {
          setUserList((prev) => [...prev, ...result]);
        }

        // 더 가져올 게 없으면 버튼 숨김 (10개 미만이면 마지막 페이지로 간주)
        setHasMore(result.length === 10);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchAndSetUsers();
  }, [searchTerm, page]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <SearchFreindPageContainer>
      <ContainerWrapper>
        <SearchContainer>
          <SearchIconWrapper>
            <img src={SearchIcon} alt="Search Icon" width="20" height="20" />
          </SearchIconWrapper>
          <SearchInput
            type="text"
            placeholder="친구하고 싶은 사용자를 찾아보세요."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </ContainerWrapper>

      <FriendItems>
        {userList.map((item, index) => {
          return <UserCard key={index} item={item} />;
        })}
      </FriendItems>

      {hasMore && (
        <LoadMoreWrapper>
          <LoadMoreButton onClick={handleLoadMore}>더 보기</LoadMoreButton>
        </LoadMoreWrapper>
      )}
    </SearchFreindPageContainer>
  );
}
