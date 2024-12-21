import { api } from "../../../config/apiConfig"
import { CANCEL_ORDER_FAILURE, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, COMFIRM_ORDER_FAOLURE, COMFIRM_ORDER_REQUEST, COMFIRM_ORDER_SUCCESS, DELETE_ORDER_FAILURE, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_REQUEST, DELIVERED_ORDER_SUCCESS, GET_ORDER_BY_DATE_FAILURE, GET_ORDER_BY_DATE_REQUEST, GET_ORDER_BY_DATE_SUCCESS, GET_ORDER_FAILURE, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, SHIP_ORDER_SUCCESS } from "./ActionType"

export const getAllOrders = ()=>async(dispatch)=>{
    dispatch({type: GET_ORDER_REQUEST})
    try {
        const response = await api.get("/api/admin/orders/")
        const {data} = response
        dispatch({type: GET_ORDER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: GET_ORDER_FAILURE, payload: error.message})
    }
}

export const confirmOrder = (orderId) => async(dispatch)=>{
    dispatch({type: COMFIRM_ORDER_REQUEST})
    try {
        const response = await api.put(`/api/admin/orders/${orderId}/confirmed`)
        const {data} = response
        dispatch({type: COMFIRM_ORDER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: COMFIRM_ORDER_FAOLURE, payload: error.message})
    }
}

export const deliveredOrder = (orderId) => async(dispatch)=>{
    dispatch({type: DELIVERED_ORDER_REQUEST})
    try {
        const response = await api.put(`/api/admin/orders/${orderId}/deliver`)
        const {data} = response
        dispatch({type: DELIVERED_ORDER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: DELIVERED_ORDER_FAILURE, payload: error.message})
    }
}

export const deleteOrder = (orderId)=>async(dispatch)=>{
    dispatch({type:DELETE_ORDER_REQUEST})
    try {
        const response = await api.delete(`/api/admin/orders/${orderId}/delete`)
        const {data} = response
        dispatch({type: DELETE_ORDER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: DELETE_ORDER_FAILURE, payload: error.message})
    }
}

export const shipOrder = (orderId)=> async(dispatch)=>{
    dispatch({type: SHIP_ORDER_REQUEST})
    try {
        const response = await api.put(`/api/admin/orders/${orderId}/ship`)
        const {data} = response
        dispatch({type: SHIP_ORDER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: SHIP_ORDER_FAILURE, payload: error.message})
    }
}

export const cancelOrder = (orderId)=>async(dispatch)=>{
    dispatch({type: CANCEL_ORDER_REQUEST})
    try {
        const response = await api.put(`/api/admin/orders/${orderId}/cancel`)
        const {data} = response
        dispatch({type: CANCEL_ORDER_SUCCESS, payload: data})
    } catch (error) {
        dispatch({type: CANCEL_ORDER_FAILURE, payload: error.message})
    }
}

export const getOrdersByDate = (reqData)=>async(dispatch)=>{
    dispatch({type: GET_ORDER_BY_DATE_REQUEST})
    try {
        const response = await api.get(`/api/admin/orders/all?startDate=${reqData.startDate}&endDate=${reqData.endDate}`)
        const {data} = response
        dispatch({type: GET_ORDER_BY_DATE_SUCCESS, payload: data})
        
    } catch (error) {
        dispatch({type: GET_ORDER_BY_DATE_FAILURE, payload: error.message})
    }
}