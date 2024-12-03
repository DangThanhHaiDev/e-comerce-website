import { CANCEL_ORDER_FAILURE, CANCEL_ORDER_SUCCESS, COMFIRM_ORDER_FAOLURE, COMFIRM_ORDER_REQUEST, COMFIRM_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, PLACED_ORDER_FAILURE, PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"

const initState = {
    isLoading: false,
    orders: [],
    order: null,
    error: null,
    isDelete: false
}

export const adminOrderReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
        case COMFIRM_ORDER_REQUEST:
        case PLACED_ORDER_REQUEST:
        case DELIVERED_ORDER_REQUEST:
        case SHIP_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return { ...state, isLoading: true, error: null }
        case GET_ORDER_SUCCESS:
            return { ...state, orders: action.payload, isLoading: false }
        case COMFIRM_ORDER_SUCCESS:
        case PLACED_ORDER_SUCCESS:
        case DELIVERED_ORDER_SUCCESS:
        case SHIP_ORDER_SUCCESS:
        case CANCEL_ORDER_SUCCESS:
            return { ...state, isLoading: false, order: action.payload }
        case DELETE_ORDER_SUCCESS:
            return { ...state, isLoading: false, isDelete: !state.isDelete }
        case COMFIRM_ORDER_FAOLURE:
        case PLACED_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case DELETE_ORDER_FAILURE:
        case SHIP_ORDER_FAILURE:
        case CANCEL_ORDER_FAILURE:
        case GET_ORDER_FAILURE:
            return { ...state, isLoading: false, error: action.payload }
        default: return state
    }
}