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


const initState = {
    loading : false,
    error : "",
    data : {
        message : "",
        token : "",
        refreshToken : ""
    } 
}

export const authReducer =  (state = initState, {type, payload}) => {
    switch(type) {
        case AUTH_SIGNUP_LOADING : 
            return {
                ...state,
                loading : true,
                error : "",
            }
        case AUTH_SIGNUP_ERROR : 
            return {
                ...state,
                loading : false,
                error : payload
            }
        case AUTH_SIGNUP_SUCCESS : 
            return {
                ...state,
                loading : false,
                error : "",
                data : {
                    message : payload.message,
                }
            }
        case AUTH_LOGIN_LOADING : 
            return {
                ...state,
                loading : true,
                error : "",
            }
        case AUTH_LOGIN_ERROR : 
            return {
                ...state,
                loading : false,
                error : payload
            }
        case AUTH_LOGIN_SUCCESS : 
            return {
                ...state,
                loading : false,
                error : "",
                data : {
                    message : payload.message,
                    token : payload.token,
                    refreshToken : payload.refreshToken
                }
            }
        case AUTH_VERIFY_LOADING : 
            return {
                ...state,
                loading : true,
                error : "",
            }
        case AUTH_VERIFY_ERROR :{
            return {
                ...state,
                loading : false,
                error : payload
            }
        }

        case AUTH_VERIFY_SUCCESS :
            return {
                ...state,
                loading: false,
                error: "",
                data : {
                    message : payload.message,
                    token : payload.token,
                    refreshToken : payload.refreshToken
                }
            }

        case AUTH_LOGOUT :
            return {
                ...state,
                loading : false,
                error: "",
                data : {
                    message : "",
                    token : "",
                    refreshToken : ""
                }
            }
        default : 
            return state;
    }
}