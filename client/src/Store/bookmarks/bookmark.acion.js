import axios from "axios";
import { baseLink } from "../source";
import {
    BOOKMARKS_FETCH_LOADING,
    BOOKMARKS_FETCH_ERROR,
    BOOKMARKS_FETCH_SUCCESS,

} from "./bookmarks.type"


export const bookmarksFetch = ({token}) => async (dispatch) => {
    dispatch({type: BOOKMARKS_FETCH_LOADING});
    try{
        let response = await axios.get(`${baseLink}/saved`, {headers: {token}})
        dispatch({type: BOOKMARKS_FETCH_SUCCESS, payload: response.data});
        console.log(response.data);
        return response.data
    }catch(e){
        dispatch({type: BOOKMARKS_FETCH_ERROR, payload: e.response.data});
    }
}   