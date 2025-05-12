import axios from "axios";
import {
  CREATE_CASESTUDY_REQUEST,
  CREATE_CASESTUDY_SUCCESS,
  CREATE_CASESTUDY_FAIL,
  GET_CASESTUDIES_REQUEST,
  GET_CASESTUDIES_SUCCESS,
  GET_CASESTUDIES_FAIL,
  GET_SINGLE_CASESTUDY_REQUEST,
  GET_SINGLE_CASESTUDY_SUCCESS,
  GET_SINGLE_CASESTUDY_FAIL,
  UPDATE_CASESTUDY_REQUEST,
  UPDATE_CASESTUDY_SUCCESS,
  UPDATE_CASESTUDY_FAIL,
  CLEAR_ERRORS,
} from "./CaseStudy.Action.Types";

// Get token from localStorage
const token = localStorage.getItem("token") || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjIxMGEyN2IwZjAzMGVhM2MzMzc1NSIsInVzZXJuYW1lIjoiZ2F1cmF2IiwiaWF0IjoxNzQ3MDYyOTU1LCJleHAiOjE3NDcwNjY1NTV9.ML3An3YIsEPup9dya9dkIEUHwqB_vyTYc7Ev84RqsbA";
let url = import.meta.env.VITE_IN_USE_URL;

// Set the Authorization header with the Bearer token
const config = {
  headers: {
    "Content-Type": "application/json",
    authorization: token ? `Bearer ${token}` : "",
  },
};

// Create a new case study
export const createCaseStudy = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CASESTUDY_REQUEST });

    const response = await axios.post(`${url}/creator`, data, config);

    dispatch({
      type: CREATE_CASESTUDY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error.response?.data?.error)
    dispatch({
      type: CREATE_CASESTUDY_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Get all case studies
export const getAllCaseStudies = (page = 1, limit = 10) => async (dispatch) => {
  try {
    dispatch({ type: GET_CASESTUDIES_REQUEST });

    const response = await axios.get(`${url}/creator?page=${page}&limit=${limit}`, config);
   console.log(response,"f")
    dispatch({
      type: GET_CASESTUDIES_SUCCESS,
      payload: {
        data: response?.data?.data?.caseStudies,
        totalPages: response?.data?.data?.totalPages,
        currentPage: response?.data?.data?.page,
        totalItems: response?.data?.data?.totalCount,
      },

    });
  } catch (error) {
    dispatch({
      type: GET_CASESTUDIES_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Get single case study
export const getSingleCaseStudy = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_CASESTUDY_REQUEST });

    const response = await axios.get(`${url}/creator/${id}`, config);

    dispatch({
      type: GET_SINGLE_CASESTUDY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_CASESTUDY_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Update a case study
export const updateCaseStudy = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CASESTUDY_REQUEST });

    const response = await axios.put(`${url}/creator/${id}`, data, config);

    dispatch({
      type: UPDATE_CASESTUDY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CASESTUDY_FAIL,
      payload: error.response?.data?.error || error.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
