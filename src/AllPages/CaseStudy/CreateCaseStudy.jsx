import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { createCaseStudy } from "../../Redux/CaseStudyRedux/CaseStudy.Action";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// Initial form state
let obj = {
  title: "",
  slug: "",
  overview: "",
  media: [{ type: "", url: "" }],
  timeline: [{ title: "", description: "", date: "" }],
  tools: [],
  outcomes: { metrics: "", testimonials: [{ name: "", content: "" }] },
  isPublished: false,
  theme: 1,
};

// Styled components
const Wrapper = styled.div`
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  // height: 100vh;
  width: 100vw;
  margin-top: 4%;
`;

const FormBox = styled.div`
  background-color: #fff;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  border-radius: 8px; /* Added border-radius for a rounded look */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Add subtle shadow for a modern look */
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  color: #884ebe;
  margin-bottom: 2rem;
`;

const Text = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: #884ebe;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #884ebe;
  color: white;
  font-size: 1.2rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #7a3ca6;
  }

  &:disabled {
    background-color: #ccc;
  }
`;

const Select = styled.select`
width: 100%;
padding: 10px;
margin: 1rem 0;
border: 1px solid #ccc;
border-radius: 4px;
font-size: 1rem;

&:focus {
  border-color: #884ebe;
}
`;

const Option = styled.option`
padding: 10px;
`;


const CreateCaseStudy = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(obj);
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.caseStudyReducer);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleMediaChange = (index, e) => {
    const { name, value } = e.target;
    const newMedia = [...form.media];
    newMedia[index][name] = value;
    setForm({ ...form, media: newMedia });
  };

  const handleTimelineChange = (index, e) => {
    const { name, value } = e.target;
    const newTimeline = [...form.timeline];
    newTimeline[index][name] = value;
    setForm({ ...form, timeline: newTimeline });
  };

  const handleOutcomeChange = (index, e) => {
    const { name, value } = e.target;
    const newOutcomes = { ...form.outcomes };
    newOutcomes.testimonials[index][name] = value;
    setForm({ ...form, outcomes: newOutcomes });
  };

  const handleAddMedia = () => {
    setForm({
      ...form,
      media: [...form.media, { type: "", url: "" }],
    });
  };

  const handleAddTimeline = () => {
    setForm({
      ...form,
      timeline: [...form.timeline, { title: "", description: "", date: "" }],
    });
  };

  const handleAddTestimonial = () => {
    setForm({
      ...form,
      outcomes: {
        ...form.outcomes,
        testimonials: [
          ...form.outcomes.testimonials,
          { name: "", content: "" },
        ],
      },
    });
  };

  const handleSubmit = () => {
    // Handle form submission logic
    console.log(form); // Example of how to log the collected data

    dispatch(createCaseStudy(form)); // Assuming you want to dispatch login for now
  };

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "light");
  }, []);

  console.log(success,"success")
  useEffect(() => {
    if (success) {
      navigate("/list-casestudy"); // or your desired route
    }
  }, [success, navigate]);
  return (
    <Wrapper>
      <FormBox>
        <Title>
          Create <span style={{ color: "#884ebe" }}>CASESTUDY</span>
        </Title>

        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Enter the title"
            onChange={handleChange}
            name="title"
            value={form.title}
          />
        </div>

        <div>
          <Label>Slug</Label>
          <Input
            type="text"
            placeholder="Enter the slug"
            onChange={handleChange}
            name="slug"
            value={form.slug}
          />
        </div>

        <div>
          <Label>Overview</Label>
          <Input
            type="text"
            placeholder="Enter an overview"
            onChange={handleChange}
            name="overview"
            value={form.overview}
          />
        </div>

        <div>
          <p>Media (Image/Video URL)</p>
          {form.media.map((media, index) => (
            <div key={index}>
              <Label>Media Type</Label>
              <Input
                type="text"
                placeholder="Enter media type (image/video)"
                name="type"
                value={media.type}
                onChange={(e) => handleMediaChange(index, e)}
              />
              <Label>Media URL</Label>
              <Input
                type="text"
                placeholder="Enter media URL"
                name="url"
                value={media.url}
                onChange={(e) => handleMediaChange(index, e)}
              />
            </div>
          ))}
          <Button onClick={handleAddMedia}>Add More Media</Button>
        </div>

        <div>
          <p>Timeline</p>
          {form.timeline.map((item, index) => (
            <div key={index}>
              <Label>Phase Title</Label>
              <Input
                type="text"
                placeholder="Enter phase title"
                name="title"
                value={item.title}
                onChange={(e) => handleTimelineChange(index, e)}
              />
              <Label>Description</Label>
              <Input
                type="text"
                placeholder="Enter description"
                name="description"
                value={item.description}
                onChange={(e) => handleTimelineChange(index, e)}
              />
              <Label>Date</Label>
              <Input
                type="date"
                name="date"
                value={item.date}
                onChange={(e) => handleTimelineChange(index, e)}
              />
            </div>
          ))}
          <Button onClick={handleAddTimeline}>Add More Timeline</Button>
        </div>

        <div>
          <Label>Tools</Label>
          <Input
            type="text"
            placeholder="Enter tools"
            name="tools"
            value={form.tools.join(", ")}
            onChange={(e) =>
              setForm({ ...form, tools: e.target.value.split(",") })
            }
          />
        </div>

        <div>
          <Label>Outcomes</Label>
          <Input
            type="text"
            placeholder="Enter metrics"
            name="metrics"
            value={form.outcomes.metrics}
            onChange={(e) =>
              setForm({
                ...form,
                outcomes: { ...form.outcomes, metrics: e.target.value },
              })
            }
          />
          {form.outcomes.testimonials.map((item, index) => (
            <div key={index}>
              <Label>Client Name</Label>
              <Input
                type="text"
                placeholder="Enter client name"
                name="name"
                value={item.name}
                onChange={(e) => handleOutcomeChange(index, e)}
              />
              <Label>Testimonial Content</Label>
              <Input
                type="text"
                placeholder="Enter testimonial content"
                name="content"
                value={item.content}
                onChange={(e) => handleOutcomeChange(index, e)}
              />
            </div>
          ))}
          <Button onClick={handleAddTestimonial}>Add More Testimonials</Button>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={() =>
                setForm({ ...form, isPublished: !form.isPublished })
              }
            />
            Published
          </label>
        </div>
        <div>
  <Label>Case Study Theme</Label>
  <Select
    name="theme"
    value={form.theme}
    onChange={(e) => setForm({ ...form, theme: parseInt(e.target.value) })}
  >
    <Option value={1}>Minimalist (Clean & Simple)</Option>
    <Option value={2}>Detailed (Rich & Comprehensive)</Option>
    <Option value={3}>Interactive (Engaging & Dynamic)</Option>
  </Select>
  <Text>Choose a visual style for your case study presentation</Text>
</div>
        {error && error.length > 0 && (
          <div style={{ color: "red", marginBottom: "1rem" }}>
            {error.map((err, idx) => (
              <div key={idx}>{err}</div>
            ))}
          </div>
        )}
        <Button onClick={handleSubmit}>Submit</Button>
      </FormBox>
    </Wrapper>
  );
};

export default CreateCaseStudy;
