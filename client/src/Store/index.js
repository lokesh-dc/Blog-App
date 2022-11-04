import { legacy_createStore, combineReducers,compose, applyMiddleware} from "redux"

import thunk from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { blogsReducer } from "./blogs/blogs.reducer";
import { bookmarksReducer } from "./bookmarks/bookmarks.reducer";

const rootReducer = combineReducers({
    auth : authReducer,
    blogs : blogsReducer,
    bookmarks : bookmarksReducer
})

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(
    rootReducer,
    createComposer(applyMiddleware(thunk))
);