import axios from "axios";
import { baseLink } from "../source"
import {
    BLOG_COMMENT,
    BLOG_CREATE,
    BLOG_DELETE,
    BLOG_FETCH_ERROR,
    BLOG_FETCH_LOADING,
    BLOG_FETCH_SUCCESS,
    BLOG_UPDATE
} from "./blogs.type"

export const BlogsFetch = () => async (dispatch) => {
    dispatch({type : BLOG_FETCH_LOADING});
    try{
        let response = await axios.get(`${baseLink}/blogs`);
        dispatch({type : BLOG_FETCH_SUCCESS, payload : response.data});
        return response.data;
    }catch(e){
        dispatch({ type : BLOG_FETCH_ERROR , payload : e.response.data});
    }
}
