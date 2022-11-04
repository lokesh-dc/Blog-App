import {
    BOOKMARKS_FETCH_LOADING,
    BOOKMARKS_FETCH_ERROR,
    BOOKMARKS_FETCH_SUCCESS,
    BOOKMARKS_CREATE

} from "./bookmarks.type"


const initState = {
    loading : false,
    error : "",
    data : []
}


export const bookmarksReducer = (state = initState, {type, payload}) =>{

    switch(type){

        case BOOKMARKS_FETCH_LOADING : 
            return {
                ...state,
                loading : true,
                error : ""
            }
        case BOOKMARKS_FETCH_ERROR : 
            return {
                ...state,
                loading : false,
                error : payload
            }
        case BOOKMARKS_FETCH_SUCCESS : 
            return {
                ...state,
                loading : false,
                error : "",
                data : payload
            }
        case BOOKMARKS_CREATE : 
            return {
                ...state,
                loading : false,
                error : ""
            }
        default :
            return state
        
    }

}