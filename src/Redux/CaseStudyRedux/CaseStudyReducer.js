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
  
  const initialState = {
    loading: false,
    error: null,
    caseStudies: [],
    caseStudy: null,
    totalPages: 0,
    currentPage: 1,
    totalItems: 0,
    success: false,
  };
  
  export const caseStudyReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_CASESTUDY_REQUEST:
      case GET_CASESTUDIES_REQUEST:
      case GET_SINGLE_CASESTUDY_REQUEST:
      case UPDATE_CASESTUDY_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
          success: false,
        };
  
      case CREATE_CASESTUDY_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          caseStudies: [...state.caseStudies, action.payload],
        };
  
        case GET_CASESTUDIES_SUCCESS:
            return {
              ...state,
              loading: false,
              caseStudies: action.payload.data,
              totalPages: action.payload.totalPages,
              currentPage: action.payload.currentPage,
              totalItems: action.payload.totalItems,
              success: false,
            };
  
      case GET_SINGLE_CASESTUDY_SUCCESS:
        return {
          ...state,
          loading: false,
          caseStudy: action.payload,
          success: true,
        };
  
      case UPDATE_CASESTUDY_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          caseStudies: state.caseStudies.map((study) =>
            study._id === action.payload._id ? action.payload : study
          ),
          caseStudy: action.payload,
        };
        case CREATE_CASESTUDY_FAIL:
          return {
            ...state,
            loading: false,
            error: Array.isArray(action.payload) ? action.payload : [action.payload],
            success: false,
          };
      case GET_CASESTUDIES_FAIL:
      case GET_SINGLE_CASESTUDY_FAIL:
      case UPDATE_CASESTUDY_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
          success: false,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
  