import React from 'react';
import styled from 'styled-components';

const CaseStudyContainer = styled.div`
  width: 99vw;
  padding: 40px;
//   background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
  display: grid;
  justify-content: center;
  align-items: center;
  margin-top: 4%;
//   outline: 2px solid #333;  /* Added outline border */
  outline-offset: -5px;  /* Adjust if needed to position the outline */
//   border: 1px solid red;

  /* Responsive Design */
  @media (max-width: 768px) {
    padding: 20px;
    margin-top: 10%;
  }

  @media (max-width: 480px) {
    width: 90vw;
    padding: 15px;
    margin-top: 10%;
  }
`;

const Title = styled.h1`
  font-size: 2.8rem;
  color: #333;
  text-align: center;
  margin-bottom: 20px;

  /* Responsive Design */
  @media (max-width: 768px) {
    font-size: 2.2rem;
    display: grid;
  justify-content: center;
  align-items: center;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    display: grid;
  justify-content: center;
  align-items: center;
  }
`;

const Overview = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-top: 10px;

  /* Responsive Design */
  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const MediaSection = styled.section`
  margin-top: 40px;
  text-align: center;

  h2 {
    font-size: 2rem;
    color: #333;
  }

  .media-container {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
    flex-wrap: wrap;
  }

  .media-image {
    max-width: 45%;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .media-video {
    max-width: 600px;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .media-image {
      max-width: 80%;
    }

    .media-video {
      max-width: 90%;
    }
  }

  @media (max-width: 480px) {
    .media-image {
      max-width: 100%;
    }

    .media-video {
      max-width: 100%;
    }
  }
`;

const TimelineSection = styled.section`
  margin-top: 50px;

  h2 {
    font-size: 2rem;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }

  .timeline {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: 30px;
    padding: 0 50px;
  }

  .timeline-item {
    position: relative;
    text-align: center;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 12px;
    width: 45%;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .timeline-item:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 12px;
    background-color: #5cb85c;
    border-radius: 50%;
    border: 4px solid white;
  }

  .timeline-item h3 {
    font-size: 1.5rem;
    color: #333;
  }

  .timeline-item span {
    display: block;
    font-size: 1rem;
    color: #777;
    margin-top: 5px;
  }

  .timeline-item p {
    font-size: 1.1rem;
    color: #444;
    margin-top: 10px;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    padding: 0 20px;
  }

  @media (max-width: 480px) {
    .timeline {
      flex-direction: column;
    }

    .timeline-item {
      width: 100%;
      margin-bottom: 20px;
    }
  }
`;

const ToolsSection = styled.section`
  margin-top: 50px;

  h2 {
    font-size: 2rem;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }

  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  li {
    background-color: #e0e0e0;
    padding: 8px 12px;
    border-radius: 25px;
    font-size: 1rem;
    color: #555;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    ul {
      gap: 15px;
    }

    li {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    ul {
      gap: 10px;
    }

    li {
      font-size: 0.8rem;
    }
  }
`;

const OutcomesSection = styled.section`
  margin-top: 50px;

  h2 {
    font-size: 2rem;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
  }

  p {
    font-size: 1.2rem;
    color: #444;
    text-align: center;
    margin-top: 20px;
  }

  blockquote {
    margin-top: 20px;
    padding: 15px;
    background-color: #f9f9f9;
    border-left: 5px solid #5cb85c;
    font-style: italic;
    font-size: 1.1rem;
    text-align: center;
  }

  footer {
    text-align: right;
    font-size: 1rem;
    color: #777;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    blockquote {
      font-size: 1rem;
    }

    p {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    blockquote {
      font-size: 0.9rem;
    }

    p {
      font-size: 0.9rem;
    }
  }
`;

const ViewCaseStudy = () => {
  return (
    <CaseStudyContainer>
      <Title>Redesigning XYZ Website</Title>
      <Overview>This was a complete redesign project for a legacy website.</Overview>

      <MediaSection>
        <h2>Media</h2>
        <div className="media-container">
          <img src="https://example.com/image1.jpg" alt="Project Image" className="media-image" />
          <iframe
            src="https://youtube.com/samplevideo"
            frameBorder="0"
            allowFullScreen
            className="media-video"
          ></iframe>
        </div>
      </MediaSection>

      <TimelineSection>
        <h2>Timeline</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Planning</h3>
            <span>2024-01-01</span>
            <p>Wireframing and goals</p>
          </div>
          <div className="timeline-item">
            <h3>Development</h3>
            <span>2024-02-01</span>
            <p>React + Node.js</p>
          </div>
        </div>
      </TimelineSection>

      <ToolsSection>
        <h2>Tools</h2>
        <ul>
          <li>React</li>
          <li>Node.js</li>
          <li>MongoDB</li>
          <li>Figma</li>
        </ul>
      </ToolsSection>

      <OutcomesSection>
        <h2>Outcomes</h2>
        <p><strong>Metrics:</strong> Increased conversion by 30%</p>
        <h3>Testimonials</h3>
        <blockquote>
          <p>"Amazing work! Our traffic grew rapidly."</p>
          <footer>- Client XYZ</footer>
        </blockquote>
      </OutcomesSection>
    </CaseStudyContainer>
  );
};

export default ViewCaseStudy;
