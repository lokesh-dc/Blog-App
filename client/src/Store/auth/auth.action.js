import axios from "axios";
import { baseLink } from "../source";
import {
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_LOADING,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    AUTH_SIGNUP_ERROR,
    AUTH_SIGNUP_LOADING,
    AUTH_SIGNUP_SUCCESS,
    AUTH_VERIFY_ERROR,
    AUTH_VERIFY_LOADING,
    AUTH_VERIFY_SUCCESS
} from "./auth.type"    


export const Login = ({email, password}) => async (dispatch) =>{
    dispatch({type:AUTH_LOGIN_LOADING});
    try{
        let response = await axios.post(`${baseLink}/users/login`,{email, password})
        console.log(response.data)
        dispatch({type: AUTH_LOGIN_SUCCESS, payload: response.data});
        return response.data;
    }catch(e){
        dispatch({type: AUTH_LOGIN_ERROR, payload: e.response.data})
    }
}

export const signup = ({email, password}) => async (dispatch) => {
    dispatch({type:AUTH_SIGNUP_LOADING});
    try{
        let response = await axios.post(`${baseLink}/users/signup`, {email,password});
        dispatch({type:AUTH_SIGNUP_SUCCESS, payload : response.data});
        return response.data;
    } catch (e) {
        dispatch({type:AUTH_SIGNUP_ERROR, payload:e.response.data});
    }
}


export const verifyUser = ({email, otp}) => async (dispatch) => {
    console.log(email, otp)
    dispatch({ type: AUTH_VERIFY_LOADING });
    try{
        let response = await axios.post(`${baseLink}/users/signup/verify`, {email,otp});
        dispatch({type: AUTH_VERIFY_SUCCESS, payload: response.data});
    }catch(e){
        dispatch({type: AUTH_VERIFY_ERROR, payload: e.response.data})
    }
}