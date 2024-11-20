import { AuthReducer } from "./Auth/Reducer";
import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import {thunk} from "redux-thunk";
import { productReducer } from "./Product/Reducer";
import { cartProducer } from "./Cart/Reducer";
import { orderReducer } from "./Order/Reducer";

const rootReducer = combineReducers({
    auth: AuthReducer,
    product: productReducer,
    cart: cartProducer,
    order:orderReducer
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
