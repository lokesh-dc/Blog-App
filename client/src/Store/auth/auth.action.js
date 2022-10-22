import axios from "axios";
import { baseLink } from "../source";
import {
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_LOADING,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    AUTH_SIGNUP_ERROR,
    AUTH_SIGNUP_LOADING,
    AUTH_SIGNUP_SUCCESS
} from "./auth.type"    


export const Login = ({email, password}) => async (dispatch) =>{
    dispatch({type:AUTH_LOGIN_LOADING});
    try{
        let response = await axios.post(`${baseLink}/users/login`,{email, password})
        dispatch({type: AUTH_LOGIN_SUCCESS, payload: response.data});
        return response.data;
    }catch(e){
        dispatch({type: AUTH_LOGIN_ERROR, payload: e.response.data})
    }
}

export const signup = ({email, password}) => async (dispatch) => {
    dispatch({type:AUTH_SIGNUP_LOADING});
    try{
        let response = await axios.post(`${baseLink}/users/login`, {email,password});
        dispatch({type:AUTH_SIGNUP_SUCCESS, payload: response.data.token});
        return response.data;
    } catch (e) {
        dispatch({type:AUTH_SIGNUP_ERROR, payload:e.response.data});
    }
}