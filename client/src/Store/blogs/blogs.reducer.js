import {
    BLOG_COMMENT,
    BLOG_CREATE,
    BLOG_DELETE,
    BLOG_FETCH_ERROR,
    BLOG_FETCH_LOADING,
    BLOG_FETCH_SUCCESS,
    BLOG_UPDATE,
    BLOG_LIKE
} from "./blogs.type"


const initState = {
    loading : false,
    error : "",
    data : []
}


export const blogsReducer = (state = initState, {type, payload}) =>{

    switch(type){

        case BLOG_FETCH_LOADING : 
            return {
                ...state,
                loading : true,
                error : ""
            }
        case BLOG_FETCH_ERROR : 
            return {
                ...state,
                loading : false,
                error : payload.message
            }
        case BLOG_FETCH_SUCCESS : 
            return {
                ...state,
                loading : false,
                error : "",
                data : payload
            }
        case BLOG_CREATE : 
            return {
                ...state,
                loading : false,
                error : ""
            }
        case BLOG_UPDATE : 
            return {
                ...state,
                loading : false,
                error : ""
            }
        case BLOG_DELETE : 
            return {
                ...state,
                loading : false,
                error : ""
            }
        case BLOG_COMMENT : 
            return {
                ...state,
                loading : false,
                error : ""
            }
        case BLOG_LIKE : 
            return {
                ...state,
                loading : false,
                error : ""
            }
        default :
            return state;
    }

}