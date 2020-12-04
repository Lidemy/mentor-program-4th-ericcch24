import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getLimitPost } from "../../WebAPI";

const PaginationContainer = styled.div`
  margin: 20px auto;
  text-align: center;
`;
const PageButton = styled.button`
  border: 0.5px solid #ddd;
  font-size: 16px;
  padding: 5px 10px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 8px;
  background: ${(props) => props.color};

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;

export default function Pagination({ setPosts, pageNumberCount, limit }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClickPage = (page) => {
    getLimitPost(page, limit).then((posts) => setPosts(posts));
    setCurrentPage(page);
  };

  return (
    <PaginationContainer>
      {pageNumberCount.map((page) => (
        <PageButton
          color={
            currentPage === page ? "rgba(0, 0, 0, 0.4)" : "rgba(0, 0, 0, 0.1)"
          }
          onClick={() => handleClickPage(page)}
        >
          {page}
        </PageButton>
      ))}
    </PaginationContainer>
  );
}

Pagination.propTypes = {
  setPosts: PropTypes.func,
  pageNumberCount: PropTypes.array,
  limit: PropTypes.number,
};
