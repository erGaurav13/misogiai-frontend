import React, { useState } from "react";
import styled from "styled-components";
import { IoArrowBack, IoCalendar, IoCheckmarkDone, IoChevronForward } from "react-icons/io5";
import { FaQuoteLeft } from "react-icons/fa";

const PreviewThree = ({ caseStudy }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedTestimonial, setExpandedTestimonial] = useState(null);

  return (
    <InteractiveContainer>
      <Hero>
        <BackButton onClick={() => window.history.back()}>
          <IoArrowBack /> Back to Case Studies
        </BackButton>
        <HeroContent>
          <Title>{caseStudy?.title}</Title>
          <Meta>
            <MetaItem>
              <IoCalendar /> {caseStudy?.date}
            </MetaItem>
          </Meta>
        </HeroContent>
      </Hero>

      <NavTabs>
        <Tab active={activeTab === "overview"} onClick={() => setActiveTab("overview")}>
          Overview
        </Tab>
        <Tab active={activeTab === "media"} onClick={() => setActiveTab("media")}>
          Media
        </Tab>
        <Tab active={activeTab === "timeline"} onClick={() => setActiveTab("timeline")}>
          Timeline
        </Tab>
        <Tab active={activeTab === "outcomes"} onClick={() => setActiveTab("outcomes")}>
          Outcomes
        </Tab>
      </NavTabs>

      <ContentArea>
        <TabContentWrapper>
          {activeTab === "overview" && (
            <TabContent>
              <SectionTitle>Project Overview</SectionTitle>
              <OverviewText>{caseStudy?.overview}</OverviewText>
              
              <StatsGrid>
                {caseStudy?.stats?.map((stat, i) => (
                  <StatCard key={i}>
                    <StatValue>{stat?.value}</StatValue>
                    <StatLabel>{stat?.label}</StatLabel>
                  </StatCard>
                ))}
              </StatsGrid>
            </TabContent>
          )}

          {activeTab === "media" && caseStudy?.media?.length > 0 && (
            <TabContent>
              <SectionTitle>Project Media</SectionTitle>
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
            </TabContent>
          )}

          {activeTab === "timeline" && caseStudy?.timeline?.length > 0 && (
            <TabContent>
              <SectionTitle>Project Timeline</SectionTitle>
              <Timeline>
                {caseStudy?.timeline.map((event, i) => (
                  <TimelineItem key={i}>
                    <TimelineDate>{event?.date}</TimelineDate>
                    <TimelineContent>
                      <TimelineTitle>{event?.title}</TimelineTitle>
                      <TimelineDescription>{event?.description}</TimelineDescription>
                    </TimelineContent>
                    <TimelineArrow />
                  </TimelineItem>
                ))}
              </Timeline>
            </TabContent>
          )}

          {activeTab === "outcomes" && (
            <TabContent>
              <SectionTitle>Key Outcomes</SectionTitle>
              <OutcomeCard>
                <OutcomeHeader>
                  <IoCheckmarkDone />
                  <h3>Results Achieved</h3>
                </OutcomeHeader>
                <OutcomeText>{caseStudy?.outcomes?.metrics}</OutcomeText>
              </OutcomeCard>

              {caseStudy?.outcomes?.testimonials?.length > 0 && (
                <>
                  <SectionTitle>Client Testimonials</SectionTitle>
                  <Testimonials>
                    {caseStudy?.outcomes?.testimonials?.map((t, i) => (
                      <TestimonialCard 
                        key={i}
                        expanded={expandedTestimonial === i}
                        onClick={() => setExpandedTestimonial(expandedTestimonial === i ? null : i)}
                      >
                        <TestimonialHeader>
                          <QuoteIcon />
                          <TestimonialAuthor>{t?.name}</TestimonialAuthor>
                          <ExpandIcon expanded={expandedTestimonial === i} />
                        </TestimonialHeader>
                        <TestimonialText expanded={expandedTestimonial === i}>
                          {t?.content}
                        </TestimonialText>
                      </TestimonialCard>
                    ))}
                  </Testimonials>
                </>
              )}
            </TabContent>
          )}
        </TabContentWrapper>
      </ContentArea>
    </InteractiveContainer>
  );
};

// Styled Components
const InteractiveContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
`;

const Hero = styled.section`
  background: linear-gradient(135deg, #6e45e2, #88d3ce);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  width: 100%;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd' opacity='0.1'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  margin-bottom: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-2px);
  }
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin: 0 0 1rem;
  line-height: 1.2;
`;

const Meta = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  opacity: 0.9;
`;

const NavTabs = styled.nav`
  display: flex;
  border-bottom: 1px solid #eee;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Tab = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: none;
  cursor: pointer;
  font-weight: 600;
  color: ${props => props.active ? '#6e45e2' : '#666'};
  position: relative;
  transition: all 0.3s ease;

  &:after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.active ? '#6e45e2' : 'transparent'};
    transition: all 0.3s ease;
  }

  &:hover {
    color: #6e45e2;
  }
`;

const ContentArea = styled.div`
  width: 100%;
  padding: 2rem 0;
  background: #fff;
`;

const TabContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const TabContent = styled.div`
  width: 100%;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3436;
  margin: 0 0 2rem;
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 5px;
    background: linear-gradient(to bottom, #6e45e2, #88d3ce);
    border-radius: 3px;
  }
`;

const OverviewText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 3rem;
  max-width: 800px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  width: 100%;
`;

const StatCard = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #6e45e2;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const MediaGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
  width: 100%;
`;

const MediaCard = styled.div`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }

  img, video {
    width: 100%;
    display: block;
  }
`;

const Timeline = styled.div`
  margin: 2rem 0;
  width: 100%;
`;

const TimelineItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: #f8f9fa;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: #f0f2f5;
    transform: translateX(5px);
  }
`;

const TimelineDate = styled.div`
  min-width: 120px;
  font-weight: 600;
  color: #6e45e2;
`;

const TimelineContent = styled.div`
  flex: 1;
`;

const TimelineTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 0.5rem;
  color: #2d3436;
`;

const TimelineDescription = styled.p`
  margin: 0;
  color: #666;
`;

const TimelineArrow = styled(IoChevronForward)`
  color: #6e45e2;
  font-size: 1.2rem;
`;

const OutcomeCard = styled.div`
  background: #f8f9fa;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 3rem;
  width: 100%;
`;

const OutcomeHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;

  svg {
    color: #6e45e2;
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1.3rem;
    margin: 0;
    color: #2d3436;
  }
`;

const OutcomeText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  margin: 0;
`;

const Testimonials = styled.div`
  margin: 2rem 0;
  width: 100%;
`;

const TestimonialCard = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    background: #f0f2f5;
  }
`;

const TestimonialHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuoteIcon = styled(FaQuoteLeft)`
  color: #6e45e2;
  opacity: 0.5;
`;

const TestimonialAuthor = styled.div`
  flex: 1;
  font-weight: 600;
  color: #2d3436;
`;

const ExpandIcon = styled(IoChevronForward)`
  color: #6e45e2;
  transform: ${props => props.expanded ? 'rotate(90deg)' : 'rotate(0)'};
  transition: transform 0.3s ease;
`;

const TestimonialText = styled.p`
  margin: ${props => props.expanded ? '1rem 0 0' : '0'};
  max-height: ${props => props.expanded ? '500px' : '0'};
  overflow: hidden;
  transition: all 0.3s ease;
  color: #555;
  line-height: 1.7;
  padding-left: 2.5rem;
`;

export default PreviewThree;