import { GET_CATEGORIES_LEVEL2_FAILURE, GET_CATEGORIES_LEVEL2_REQUEST, GET_CATEGORIES_LEVEL2_SUCCESS, GET_CATEGORIES_LEVEL_FAILURE, GET_CATEGORIES_LEVEL_REQUEST, GET_CATEGORIES_LEVEL_SUCCESS } from "./ActionType"

const initialState = {
    category: null,
    isLoading: false,
    error: null,
    category2: null
}

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORIES_LEVEL2_REQUEST:
        case GET_CATEGORIES_LEVEL_REQUEST:
            return { ...state, isLoading: true, error: null }
        case GET_CATEGORIES_LEVEL_SUCCESS:
            return { ...state, isLoading: false, category: action.payload }
        case GET_CATEGORIES_LEVEL2_SUCCESS:
            return { ...state, isLoading: false, category2: action.payload }
        case GET_CATEGORIES_LEVEL2_FAILURE:
        case GET_CATEGORIES_LEVEL_FAILURE:

            return { ...state, isLoading: false, error: action.payload }
        default:
            return state
    }
}