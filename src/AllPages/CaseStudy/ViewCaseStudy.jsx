import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSingleCaseStudy } from "../../Redux/CaseStudyRedux/CaseStudy.Action";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FaQuoteLeft, FaArrowLeft } from "react-icons/fa";
import PreviewThree from "../PreviewPages/PreviewThree";
import PreviewTwo from "../PreviewPages/PreviewTwo";
import PreviewOne from "../PreviewPages/PreviewOne";

// Helper function to format date
const formatDate = (date) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

// Styled components
const Wrapper = styled.div`
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 4rem 1rem;
  display: flex;
  justify-content: center;
`;

const CaseStudyContainer = styled.div`
  background-color: #fff;
  padding: 2.5rem;
  width: 100%;
  max-width: 1100px;
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: #2a2a72;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  position: relative;

  &:after {
    content: "";
    display: block;
    width: 80px;
    height: 5px;
    background: linear-gradient(90deg, #884ebe, #4a6bff);
    margin-top: 1rem;
    border-radius: 3px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #2a2a72;
  margin: 2.5rem 0 1.5rem;
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 5px;
    background: linear-gradient(to bottom, #884ebe, #4a6bff);
    border-radius: 3px;
  }
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 1.5rem;
`;

const HighlightText = styled.span`
  background: linear-gradient(90deg, #884ebe, #4a6bff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-weight: 600;
`;

const MediaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const MediaItem = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img,
  video {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  margin: 3rem 0;
  padding-left: 30px;

  &:before {
    content: "";
    position: absolute;
    left: 7px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #884ebe, #4a6bff);
  }
`;

const TimelineItem = styled.div`
  position: relative;
  margin-bottom: 2.5rem;
  padding-left: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 5px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #884ebe;
    border: 3px solid #fff;
    box-shadow: 0 0 0 2px #884ebe;
  }
`;

const TimelineDate = styled.div`
  font-size: 0.9rem;
  color: #884ebe;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const TimelineTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2a2a72;
  margin-bottom: 0.8rem;
`;

const TimelineContent = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #666;
  background: #f8f9ff;
  padding: 1rem;
  border-radius: 8px;
  border-left: 3px solid #884ebe;
`;

const OutcomesSection = styled.div`
  margin: 3rem 0;
`;

const OutcomeItem = styled.div`
  background: linear-gradient(
    90deg,
    rgba(136, 78, 190, 0.1),
    rgba(74, 107, 255, 0.1)
  );
  padding: 1.5rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
`;

const OutcomeTitle = styled.h4`
  font-size: 1.2rem;
  color: #2a2a72;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;

  &:before {
    content: "✓";
    color: #884ebe;
    margin-right: 0.8rem;
    font-size: 1.4rem;
  }
`;

const TestimonialsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const TestimonialCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(136, 78, 190, 0.2);
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  &:before {
    content: "\\201C";
    font-family: Georgia, serif;
    font-size: 4rem;
    color: rgba(136, 78, 190, 0.1);
    position: absolute;
    top: 10px;
    left: 10px;
    line-height: 1;
  }
`;

const TestimonialContent = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #884ebe, #4a6bff);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 1rem;
  font-size: 1.2rem;
`;

const AuthorInfo = styled.div`
  h5 {
    font-size: 1.1rem;
    color: #2a2a72;
    margin: 0;
  }

  p {
    font-size: 0.9rem;
    color: #777;
    margin: 0;
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  background: linear-gradient(90deg, #884ebe, #4a6bff);
  color: white;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 2rem;
  box-shadow: 0 4px 15px rgba(136, 78, 190, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(136, 78, 190, 0.4);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const ViewCaseStudy = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { caseStudy, loading, error } = useSelector(
    (store) => store.caseStudyReducer
  );

  useEffect(() => {
    dispatch(getSingleCaseStudy(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Wrapper>
        <CaseStudyContainer>
          <Paragraph>Loading case study...</Paragraph>
        </CaseStudyContainer>
      </Wrapper>
    );
  }

  if (error) {
    return (
      <Wrapper>
        <CaseStudyContainer>
          <Paragraph style={{ color: "#ff4d4f" }}>{error}</Paragraph>
        </CaseStudyContainer>
      </Wrapper>
    );
  }

  return (
    <>
      <PreviewThree caseStudy={caseStudy}></PreviewThree>
      {/* <PreviewTwo caseStudy={caseStudy}></PreviewTwo> */}
      {/* <PreviewOne caseStudy={caseStudy}></PreviewOne> */}
      {/* <CaseStudyContainer>
        <Title>{caseStudy?.title}</Title>

        <SectionTitle>Overview</SectionTitle>
        <Paragraph>
          <HighlightText>{caseStudy?.title}</HighlightText> {caseStudy?.overview}
        </Paragraph>

        {caseStudy?.media && caseStudy?.media?.length > 0 && (
          <>
            <SectionTitle>Media</SectionTitle>
            <MediaContainer>
              {caseStudy?.media?.map((mediaItem, index) => (
                <MediaItem key={index}>
                  {mediaItem?.type === "image" ? (
                    <img src={mediaItem?.url} alt={`media-${index}`} />
                  ) : (
                    <video controls>
                      <source src={mediaItem?.url} type="video/mp4" />
                    </video>
                  )}
                </MediaItem>
              ))}
            </MediaContainer>
          </>
        )}

        {caseStudy?.timeline && caseStudy?.timeline?.length > 0 && (
          <>
            <SectionTitle>Project Timeline</SectionTitle>
            <TimelineContainer>
              {caseStudy?.timeline?.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineDate>{formatDate(event?.date)}</TimelineDate>
                  <TimelineTitle>{event?.title}</TimelineTitle>
                  <TimelineContent>{event?.description}</TimelineContent>
                </TimelineItem>
              ))}
            </TimelineContainer>
          </>
        )}

        {caseStudy?.outcomes && (
          <OutcomesSection>
            <SectionTitle>Key Outcomes</SectionTitle>
            <OutcomeItem>
              <OutcomeTitle>Metrics & Results</OutcomeTitle>
              <Paragraph>{caseStudy?.outcomes?.metrics}</Paragraph>
            </OutcomeItem>

            {caseStudy?.outcomes?.testimonials &&
              caseStudy?.outcomes?.testimonials?.length > 0 && (
                <>
                  <SectionTitle>Client Testimonials</SectionTitle>
                  <TestimonialsContainer>
                    {caseStudy?.outcomes?.testimonials?.map(
                      (testimonial, index) => (
                        <TestimonialCard key={index}>
                          <TestimonialContent>
                            {testimonial?.content}
                          </TestimonialContent>
                          <TestimonialAuthor>
                            <AuthorAvatar>
                              {testimonial?.name
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AuthorAvatar>
                            <AuthorInfo>
                              <h5>{testimonial?.name}</h5>
                              <p>{testimonial?.position || "Client"}</p>
                            </AuthorInfo>
                          </TestimonialAuthor>
                        </TestimonialCard>
                      )
                    )}
                  </TestimonialsContainer>
                </>
              )}
          </OutcomesSection>
        )}

        <BackButton onClick={() => window.history.back()}>
          <FaArrowLeft /> Back to Case Studies
        </BackButton>
      </CaseStudyContainer> */}
    </>
  );
};

export default ViewCaseStudy;
