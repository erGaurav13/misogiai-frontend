import React from "react";
import styled from "styled-components";
import { FiArrowLeft, FiCalendar, FiCheck } from "react-icons/fi";

const PreviewOne = ({ caseStudy }) => {
  return (
    <MinimalContainer>
      <Header>
        <BackButton>
          <FiArrowLeft /> BACK
        </BackButton>
        <Title>{caseStudy?.title}</Title>
        <Meta>
          <MetaItem>
            <FiCalendar /> {caseStudy?.date}
          </MetaItem>
        </Meta>
      </Header>

      <ContentSection>
        <Section>
          <h2>Overview</h2>
          <p>{caseStudy?.overview}</p>
        </Section>

        {caseStudy?.media?.length > 0 && (
          <Section>
            <h2>Media</h2>
            <MediaGrid>
              {caseStudy?.media?.map((item, i) => (
                <MediaItem key={i}>
                  {item?.type === "image" ? (
                    <img src={item?.url} alt="" />
                  ) : (
                    <video controls src={item?.url} />
                  )}
                </MediaItem>
              ))}
            </MediaGrid>
          </Section>
        )}

        {caseStudy?.timeline?.length > 0 && (
          <Section>
            <h2>Timeline</h2>
            <Timeline>
              {caseStudy?.timeline?.map((event, i) => (
                <TimelineItem key={i}>
                  <EventDate>{event?.date}</EventDate>
                  <EventTitle>{event?.title}</EventTitle>
                  <EventDesc>{event?.description}</EventDesc>
                </TimelineItem>
              ))}
            </Timeline>
          </Section>
        )}

        <Section>
          <h2>Outcomes</h2>
          {caseStudy?.outcomes?.metrics && (
            <OutcomeItem>
              <FiCheck /> {caseStudy?.outcomes?.metrics}
            </OutcomeItem>
          )}

          {caseStudy?.outcomes?.testimonials?.length > 0 && (
            <>
              <h3>Testimonials</h3>
              {caseStudy?.outcomes?.testimonials?.map((t, i) => (
                <Testimonial key={i}>
                  <p>"{t?.content}"</p>
                  <cite>- {t?.name}</cite>
                </Testimonial>
              ))}
            </>
          )}
        </Section>
      </ContentSection>
    </MinimalContainer>
  );
};

// Styled Components remain the same as in your original code
const MinimalContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: 'Inter', sans-serif;
  color: #333;
`;

const Header = styled.header`
  margin-bottom: 3rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 2rem;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #666;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  margin: 0 0 1rem;
`;

const Meta = styled.div`
  display: flex;
  gap: 1.5rem;
  color: #666;
  font-size: 0.9rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const Section = styled.section`
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0 0 1.5rem;
  }

  h3 {
    font-size: 1.2rem;
    margin: 2rem 0 1rem;
  }

  p {
    line-height: 1.7;
    color: #444;
  }
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
`;

const MediaItem = styled.div`
  img, video {
    width: 100%;
    border-radius: 4px;
  }
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 1.5rem 0;
`;

const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const EventDate = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const EventTitle = styled.h3`
  font-size: 1.1rem;
  margin: 0;
`;

const EventDesc = styled.p`
  margin: 0;
  color: #555;
`;

const OutcomeItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin: 1rem 0;
`;

const Testimonial = styled.blockquote`
  margin: 1.5rem 0;
  padding: 0;
  border-left: none;

  p {
    font-style: italic;
    color: #555;
    margin-bottom: 0.5rem;
  }

  cite {
    font-style: normal;
    color: #666;
    font-size: 0.9rem;
  }
`;

export default PreviewOne;