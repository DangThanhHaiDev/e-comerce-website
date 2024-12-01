import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELTE_PRODUCT_FAILURE, DELTE_PRODUCT_REQUEST, DELTE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_FAILURE, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS } from "./ActionType"

const initialState = {
    isLoading: false,
    error: null,
    product: null,
    products: null,
    isDelete: false
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
        case DELTE_PRODUCT_REQUEST:
        case FIND_PRODUCT_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case FIND_PRODUCT_SUCCESS:
            return {
                ...state,
                products: action.payload,
                product: null,
                isLoading: false
            }
        case CREATE_PRODUCT_SUCCESS:
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {
                ...state,
                isLoading: false,
                product: action.payload,
                products: null
            }
        case FIND_PRODUCT_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
        case CREATE_PRODUCT_FAILURE:
        case DELTE_PRODUCT_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case DELTE_PRODUCT_SUCCESS:
            return { ...state, isLoading: false, isDelete: !state.isDelete }
        default: return state;
    }
}