// import dotenv from "dotenv"
import axios from "axios";
import {
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCESS,
  SIGNUP_FAILED,
  SIGNUP_REQUEST,
  SIGNUP_SUCESS,
} from "./Auth.Action.Types";

// dotenv.config()

// let url = process.env.REACT_APP_IN_USE_URL;
let url = import.meta.env.VITE_IN_USE_URL;

export const login = (info) => async (dispatch) => {
  // console.log(info,"info");
  try {
    dispatch({ type: LOGIN_REQUEST });
    let data = await axios.post(`${url}/auth/login`, info);
    console.log(data);
    dispatch({ type: LOGIN_SUCESS, payload: data.data.token });
    localStorage.setItem("token", data.data.token);
    alert(data?.data?.message);
  } catch (e) {
    // console.log(e)
    alert(e?.response?.data?.message);
    dispatch({ type: LOGIN_FAILED });
  }
};

export const signup = (info) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_REQUEST });
    let data = await axios.post(`${url}/auth/signup`, info);
    dispatch({ type: SIGNUP_SUCESS });
    alert(data?.data?.message);
  } catch (e) {
    dispatch({ type: SIGNUP_FAILED });
    alert(e?.response?.data?.message || "Server Error");
    //     console.log(e);
  }
};
