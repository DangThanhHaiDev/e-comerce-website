import { AuthReducer } from "./Auth/Reducer";
import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
    auth: AuthReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
