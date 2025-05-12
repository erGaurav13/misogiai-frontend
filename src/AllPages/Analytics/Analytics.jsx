 
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCaseStudies } from "../../Redux/CaseStudyRedux/CaseStudy.Action";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: flex-start; /* Align content to the top */
  align-items: center; /* Center content horizontally */
  flex-direction: column;
  padding-left: 1rem;
  min-height: 100vh; /* Ensure the container takes full height of the screen */
  background-color: #f0f2f5;
  width: 100vw;
  box-sizing: border-box; /* Make sure padding is considered within the width */
`;

const TableWrapper = styled.div`
  width: 100%; /* Take full width */
  max-width: 1100px; /* This keeps the table from stretching too wide */
  margin-top: 1rem;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #007bff;
  color: white;
  padding: 1rem;
  text-align: left;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
  font-size: 0.95rem;
  text-align: left;
  color: #333;
`;

const Tr = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.5rem;
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 1rem;
`;

const LoadingText = styled.p`
  color: #333;
  font-size: 1rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Analytics() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const limit = 5;

  const { caseStudies, loading, error, totalPages, currentPage } = useSelector(
    (state) => state.caseStudyReducer
  );

  useEffect(() => {
    dispatch(getAllCaseStudies(page, limit));
  }, [dispatch, page]);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handleEdit = (slug) => {
    // Logic for handling the edit action (e.g., navigate to edit page)
    console.log("Editing case study with slug:", slug);
  };

  const handlePreview = (slug) => {
    // Logic for handling the preview action (e.g., navigate to preview page)
    console.log("Previewing case study with slug:", slug);
  };

  return (
    <Container>
      <Title>All Case Studies</Title>

      {loading && <LoadingText>Loading...</LoadingText>}
      {error && <ErrorText>{error}</ErrorText>}

      {!loading && !error && caseStudies?.length > 0 && (
        <TableWrapper>
          <Table>
            <thead>
              <Tr>
                <Th>#</Th>
                <Th>Title</Th>
                <Th>Overview</Th>
                <Th>Tools</Th>
                <Th>Published</Th>
                <Th>Actions</Th> {/* New column for actions */}
                <Th>Actions</Th> {/* New column for actions */}
              </Tr>
            </thead>
            <tbody>
              {caseStudies.map((item, index) => (
                <Tr key={item.slug}>
                  <Td>{(page - 1) * limit + index + 1}</Td>
                  <Td>{item.title}</Td>
                  <Td>{item.overview}</Td>
                  <Td>{item.tools?.join(", ")}</Td>
                  <Td>{item.isPublished ? "Yes" : "No"}</Td>
                  <Td>
                    <Link to={`/edit-case-study/${item?._id}`}>
                      <Button onClick={() => handleEdit(item.slug)}>
                        Edit
                      </Button>
                    </Link>
                  </Td>
                  <Td>
                    <Button onClick={() => handlePreview(item.slug)}>
                      Preview
                    </Button>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
          <PaginationWrapper>
            <PaginationButton disabled={page === 1} onClick={handlePrev}>
              Previous
            </PaginationButton>
            <span>{`Page ${currentPage} of ${totalPages}`}</span>
            <PaginationButton
              disabled={page === totalPages}
              onClick={handleNext}
            >
              Next
            </PaginationButton>
          </PaginationWrapper>
        </TableWrapper>
      )}
    </Container>
  );
}
