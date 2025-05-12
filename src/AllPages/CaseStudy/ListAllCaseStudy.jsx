import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCaseStudies } from '../../Redux/CaseStudyRedux/CaseStudy.Action';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
`;

const Th = styled.th`
  background-color: #f4f4f4;
  padding: 1rem;
  border: 1px solid #ddd;
  text-align: left;
`;

const Td = styled.td`
  padding: 0.75rem;
  border: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const PaginationWrapper = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
`;

const LoadingText = styled.p`
  color: #333;
`;

export default function ListAllCaseStudy() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    caseStudies,
    loading,
    error,
    totalPages,
    currentPage,
  } = useSelector((state) => state.caseStudyReducer);

  useEffect(() => {
    dispatch(getAllCaseStudies(page, limit));
  }, [dispatch, page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Container>
      <h2>All Case Studies</h2>

      {loading && <LoadingText>Loading...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && caseStudies?.length > 0 && (
        <>
          <Table>
            <thead>
              <Tr>
                <Th>#</Th>
                <Th>Title</Th>
                <Th>Overview</Th>
                <Th>Tools</Th>
                <Th>Published</Th>
              </Tr>
            </thead>
            <tbody>
              {caseStudies.map((item, index) => (
                <Tr key={item.slug}>
                  <Td>{(page - 1) * limit + index + 1}</Td>
                  <Td>{item.title}</Td>
                  <Td>{item.overview}</Td>
                  <Td>{item.tools?.join(', ')}</Td>
                  <Td>{item.isPublished ? 'Yes' : 'No'}</Td>
                </Tr>
              ))}
            </tbody>
          </Table>

          <PaginationWrapper>
            <PaginationButton disabled={page === 1} onClick={handlePrev}>Previous</PaginationButton>
            <span>Page {currentPage} of {totalPages}</span>
            <PaginationButton disabled={page === totalPages} onClick={handleNext}>Next</PaginationButton>
          </PaginationWrapper>
        </>
      )}
    </Container>
  );
}