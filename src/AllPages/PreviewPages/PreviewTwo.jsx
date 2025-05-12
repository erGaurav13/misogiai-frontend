import React from "react";
import styled from "styled-components";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheck,
  FaQuoteLeft,
} from "react-icons/fa";

const PreviewTwo = ({ caseStudy }) => {
  return (
    <DetailedContainer>
      <HeroSection>
        <BackButton>
          <FaArrowLeft /> BACK TO CASE STUDIES
        </BackButton>
        <HeroContent>
          <Title>{caseStudy?.title}</Title>
          <Meta>
            <MetaItem>
              <FaCalendarAlt /> {caseStudy?.date}
            </MetaItem>
          </Meta>
        </HeroContent>
      </HeroSection>

      <MainContent>
        <OverviewSection>
          <SectionHeader>
            <SectionNumber>01</SectionNumber>
            <h2>Project Overview</h2>
          </SectionHeader>
          <OverviewContent>
            <p>{caseStudy?.overview}</p>
            {caseStudy?.details && (
              <DetailsGrid>
                {Object.entries(caseStudy?.details)?.map(([key, value]) => (
                  <DetailItem key={key}>
                    <DetailLabel>{key}:</DetailLabel>
                    <DetailValue>{value}</DetailValue>
                  </DetailItem>
                ))}
              </DetailsGrid>
            )}
          </OverviewContent>
        </OverviewSection>

        {caseStudy?.media?.length > 0 && (
          <MediaSection>
            <SectionHeader>
              <SectionNumber>02</SectionNumber>
              <h2>Project Media</h2>
            </SectionHeader>
            <MediaGallery>
              {caseStudy?.media?.map((item, i) => (
                <MediaCard key={i}>
                  {item?.type === "image" ? (
                    <img src={item?.url} alt="" />
                  ) : (
                    <video controls src={item?.url} />
                  )}
                </MediaCard>
              ))}
            </MediaGallery>
          </MediaSection>
        )}

        {caseStudy?.timeline?.length > 0 && (
          <TimelineSection>
            <SectionHeader>
              <SectionNumber>03</SectionNumber>
              <h2>Project Timeline</h2>
            </SectionHeader>
            <TimelineContainer>
              {caseStudy?.timeline?.map((event, i) => (
                <TimelineEvent key={i}>
                  <EventMarker />
                  <EventContent>
                    <EventDate>{event?.date}</EventDate>
                    <EventTitle>{event?.title}</EventTitle>
                    <EventDescription>{event?.description}</EventDescription>
                  </EventContent>
                </TimelineEvent>
              ))}
            </TimelineContainer>
          </TimelineSection>
        )}

        <OutcomesSection>
          <SectionHeader>
            <SectionNumber>04</SectionNumber>
            <h2>Key Outcomes</h2>
          </SectionHeader>
          <OutcomesGrid>
            <MetricsCard>
              <h3>Results Achieved</h3>
              <p>{caseStudy?.outcomes?.metrics}</p>
            </MetricsCard>

            {caseStudy?.outcomes?.testimonials?.length > 0 && (
              <TestimonialsCard>
                <h3>Client Testimonials</h3>
                <TestimonialsList>
                  {caseStudy?.outcomes?.testimonials?.map((t, i) => (
                    <TestimonialItem key={i}>
                      <QuoteIcon />
                      <TestimonialText>{t?.content}</TestimonialText>
                      <TestimonialAuthor>- {t?.name}</TestimonialAuthor>
                    </TestimonialItem>
                  ))}
                </TestimonialsList>
              </TestimonialsCard>
            )}
          </OutcomesGrid>
        </OutcomesSection>
      </MainContent>
    </DetailedContainer>
  );
};

// Styled Components
const DetailedContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-family: "Inter", sans-serif;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #2c3e50, #4ca1af);
  color: white;
  padding: 4rem 2rem;
  position: relative;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0 0 1rem;
  line-height: 1.2;
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
`;

const MainContent = styled.div`
  padding: 4rem 2rem;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  h2 {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
    color: #2c3e50;
  }
`;

const SectionNumber = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #4ca1af;
`;

const OverviewSection = styled.section`
  margin-bottom: 4rem;
`;

const OverviewContent = styled.div`
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: #555;
    margin-bottom: 2rem;
  }
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const DetailItem = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
`;

const DetailLabel = styled.h4`
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #7f8c8d;
  margin: 0 0 0.5rem;
`;

const DetailValue = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: #2c3e50;
  margin: 0;
`;

const MediaSection = styled.section`
  margin-bottom: 4rem;
`;

const MediaGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const MediaCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  img,
  video {
    width: 100%;
    display: block;
  }
`;

const TimelineSection = styled.section`
  margin-bottom: 4rem;
`;

const TimelineContainer = styled.div`
  position: relative;
  padding-left: 30px;

  &:before {
    content: "";
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #4ca1af, #2c3e50);
  }
`;

const TimelineEvent = styled.div`
  display: flex;
  margin-bottom: 2rem;
  position: relative;
`;

const EventMarker = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #4ca1af;
  border: 3px solid white;
  position: absolute;
  left: 8px;
  top: 5px;
  box-shadow: 0 0 0 2px #4ca1af;
`;

const EventContent = styled.div`
  margin-left: 3rem;
  padding: 1rem 0;
`;

const EventDate = styled.div`
  font-size: 0.9rem;
  color: #4ca1af;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.h3`
  font-size: 1.3rem;
  margin: 0 0 1rem;
  color: #2c3e50;
`;

const EventDescription = styled.p`
  color: #555;
  line-height: 1.7;
  margin: 0;
`;

const OutcomesSection = styled.section``;

const OutcomesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MetricsCard = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  border-left: 4px solid #4ca1af;

  h3 {
    font-size: 1.3rem;
    color: #2c3e50;
    margin: 0 0 1.5rem;
  }

  p {
    line-height: 1.8;
    color: #555;
    margin: 0;
  }
`;

const TestimonialsCard = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;

  h3 {
    font-size: 1.3rem;
    color: #2c3e50;
    margin: 0 0 1.5rem;
  }
`;

const TestimonialsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TestimonialItem = styled.div`
  position: relative;
`;

const QuoteIcon = styled(FaQuoteLeft)`
  color: rgba(76, 161, 175, 0.2);
  font-size: 2.5rem;
  position: absolute;
  top: -10px;
  left: -10px;
`;

const TestimonialText = styled.p`
  font-style: italic;
  line-height: 1.7;
  color: #555;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
`;

const TestimonialAuthor = styled.div`
  font-weight: 500;
  color: #2c3e50;
  padding-left: 1.5rem;
`;

export default PreviewTwo;
