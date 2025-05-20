import React from "react";
import styled from "styled-components";
import Colors from "../../constanst/color.mjs";

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 8px;
`;

const PageButton = styled.button`
  padding: 8px 12px;
  border: none;
  background-color: white;
  color: ${({ $active }) => ($active ? Colors.primary500 : 'black')};
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${({ $active }) => ($active ? 'bold' : 'normal')};

  &:hover {
    color: ${Colors.primary500};
  }
`;

const Pagination = ({ page, totalPage, onPageChange }) => {
  const pageGroup = Math.floor((page - 1) / 5);
  const startPage = pageGroup * 5 + 1;

  return (
    <PaginationContainer>
      {pageGroup > 0 && (
        <PageButton onClick={() => onPageChange(startPage - 1)}>
          &lt;
        </PageButton>
      )}

      {Array.from({ length: 5 }).map((_, idx) => {
        const pageNumber = startPage + idx;
        if (pageNumber > totalPage) return null;

        return (
          <PageButton
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            $active={pageNumber === page}
          >
            {pageNumber}
          </PageButton>
        );
      })}

      {startPage + 5 <= totalPage && (
        <PageButton onClick={() => onPageChange(startPage + 5)}>
          &gt;
        </PageButton>
      )}
    </PaginationContainer>
  );
};

export default Pagination;
