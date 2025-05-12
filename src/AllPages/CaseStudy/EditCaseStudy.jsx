import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleCaseStudy,
  updateCaseStudy,
} from "../../Redux/CaseStudyRedux/CaseStudy.Action";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

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
};

// Styled components
const Wrapper = styled.div`
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  margin-top: 4%;
`;

const FormBox = styled.div`
  background-color: #fff;
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 2.4rem;
  font-weight: bold;
  color: #884ebe;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    border-color: #884ebe;
  }
`;

const Button = styled.button`
  width: auto;
  padding: 10px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: #ccc;
  }

  ${(props) =>
    props.primary &&
    `
        background-color: #884ebe;
        color: white;
    `}

  ${(props) =>
    props.secondary &&
    `
        background-color: #4caf50;
        color: white;
    `}

  ${(props) =>
    props.danger &&
    `
        background-color: #f44336;
        color: white;
    `}
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-start;
`;

const EditCaseStudy = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(obj);

  const { caseStudy, loading, error } = useSelector(
    (store) => store.caseStudyReducer
  );

  useEffect(() => {
    dispatch(getSingleCaseStudy(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (caseStudy) {
      const formattedTimeline = caseStudy.timeline.map((item) => ({
        ...item,
        date: new Date(item.date).toISOString().split("T")[0],
      }));
      setForm({ ...caseStudy, timeline: formattedTimeline });
    }
  }, [caseStudy]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleArrayChange = (e, fieldName, index) => {
    const { name, value } = e.target;
    const fieldParts = fieldName.split(".");

    if (fieldParts.length === 2) {
      const [parent, child] = fieldParts;
      const updatedArray = [...form[parent][child]];
      updatedArray[index][name] = value;
      setForm({
        ...form,
        [parent]: {
          ...form[parent],
          [child]: updatedArray,
        },
      });
    } else {
      const updatedArray = [...form[fieldName]];
      updatedArray[index][name] = value;
      setForm({ ...form, [fieldName]: updatedArray });
    }
  };

  const handleAddArrayItem = (fieldName) => {
    const fieldParts = fieldName.split(".");

    if (fieldParts.length === 2) {
      const [parent, child] = fieldParts;
      const updatedArray = [...form[parent][child], { name: "", content: "" }];
      setForm({
        ...form,
        [parent]: {
          ...form[parent],
          [child]: updatedArray,
        },
      });
    } else {
      const newItem =
        fieldName === "media"
          ? { type: "", url: "" }
          : fieldName === "timeline"
          ? { title: "", description: "", date: "" }
          : "";
      setForm({
        ...form,
        [fieldName]: [...form[fieldName], newItem],
      });
    }
  };

  const handleRemoveArrayItem = (fieldName, index) => {
    const fieldParts = fieldName.split(".");

    if (fieldParts.length === 2) {
      const [parent, child] = fieldParts;
      const updatedArray = form[parent][child].filter((_, i) => i !== index);
      setForm({
        ...form,
        [parent]: {
          ...form[parent],
          [child]: updatedArray,
        },
      });
    } else {
      const updatedArray = form[fieldName].filter((_, i) => i !== index);
      setForm({ ...form, [fieldName]: updatedArray });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCaseStudy(id, form));
    navigate("/list-casestudy");
  };

  return (
    <Wrapper>
      <FormBox>
        <Title>Edit <span style={{ color: "#884ebe" }}>CASE STUDY</span></Title>

        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        <div>
          <Label>Title</Label>
          <Input type="text" name="title" value={form.title} onChange={handleChange} />

          <Label>Slug</Label>
          <Input type="text" name="slug" value={form.slug} onChange={handleChange} />

          <Label>Overview</Label>
          <Input type="text" name="overview" value={form.overview} onChange={handleChange} />

          <Label>Metrics</Label>
          <Input
            type="text"
            name="metrics"
            value={form.outcomes.metrics}
            onChange={(e) => setForm({ ...form, outcomes: { ...form.outcomes, metrics: e.target.value } })}
          />

          <Label>Testimonials</Label>
          {form.outcomes.testimonials.map((testimonial, index) => (
            <div key={index}>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={testimonial.name}
                onChange={(e) => handleArrayChange(e, "outcomes.testimonials", index)}
              />
              <Input
                type="text"
                name="content"
                placeholder="Content"
                value={testimonial.content}
                onChange={(e) => handleArrayChange(e, "outcomes.testimonials", index)}
              />
              <ButtonContainer>
                <Button type="button" danger onClick={() => handleRemoveArrayItem("outcomes.testimonials", index)}>
                  Remove
                </Button>
                {index === form.outcomes.testimonials.length - 1 && (
                  <Button type="button" secondary onClick={() => handleAddArrayItem("outcomes.testimonials")}>Add Testimonial</Button>
                )}
              </ButtonContainer>
            </div>
          ))}

          <Label>Media</Label>
          {form.media.map((mediaItem, index) => (
            <div key={index}>
              <Input
                type="text"
                name="type"
                placeholder="Type"
                value={mediaItem.type}
                onChange={(e) => handleArrayChange(e, "media", index)}
              />
              <Input
                type="text"
                name="url"
                placeholder="URL"
                value={mediaItem.url}
                onChange={(e) => handleArrayChange(e, "media", index)}
              />
              <ButtonContainer>
                <Button type="button" danger onClick={() => handleRemoveArrayItem("media", index)}>Remove</Button>
                {index === form.media.length - 1 && (
                  <Button type="button" secondary onClick={() => handleAddArrayItem("media")}>Add Media</Button>
                )}
              </ButtonContainer>
            </div>
          ))}

          <Label>Timeline</Label>
          {form.timeline.map((event, index) => (
            <div key={index}>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={event.title}
                onChange={(e) => handleArrayChange(e, "timeline", index)}
              />
              <Input
                type="text"
                name="description"
                placeholder="Description"
                value={event.description}
                onChange={(e) => handleArrayChange(e, "timeline", index)}
              />
              <Input
                type="date"
                name="date"
                value={event.date}
                onChange={(e) => handleArrayChange(e, "timeline", index)}
              />
              <ButtonContainer>
                <Button type="button" danger onClick={() => handleRemoveArrayItem("timeline", index)}>Remove</Button>
                {index === form.timeline.length - 1 && (
                  <Button type="button" secondary onClick={() => handleAddArrayItem("timeline")}>Add Timeline</Button>
                )}
              </ButtonContainer>
            </div>
          ))}
        </div>

        <Button primary onClick={handleSubmit}>Update Case Study</Button>
      </FormBox>
    </Wrapper>
  );
};

export default EditCaseStudy;