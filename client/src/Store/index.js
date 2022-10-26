import { legacy_createStore, combineReducers,compose, applyMiddleware} from "redux"

import thunk from "redux-thunk";
import { authReducer } from "./auth/auth.reducer";
import { blogsReducer } from "./blogs/blogs.reducer";

const rootReducer = combineReducers({
    auth : authReducer,
    blogs : blogsReducer,
    
})

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(
    rootReducer,
    createComposer(applyMiddleware(thunk))
);