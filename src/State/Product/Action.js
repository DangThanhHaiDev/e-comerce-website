import axios from "axios"
import { api } from "../../config/apiConfig"
import { CREATE_PRODUCT_FAILURE, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, DELTE_PRODUCT_FAILURE, DELTE_PRODUCT_REQUEST, DELTE_PRODUCT_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCT_FAILURE, FIND_PRODUCT_REQUEST, FIND_PRODUCT_SUCCESS } from "./ActionType"

const findProductRequest = () => ({ type: FIND_PRODUCT_BY_ID_REQUEST })
const findProductSuccess = (product) => ({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: product })
const findProductFailure = (err) => ({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: err })

const findProudctsSuccess = (products) => ({ type: FIND_PRODUCT_SUCCESS, payload: products })
const findProudctsFailure = (err) => ({ type: FIND_PRODUCT_FAILURE, payload: err })
const findProudctsRequest = (products) => ({ type: FIND_PRODUCT_REQUEST, payload: products })

const createProductRequest = () => ({ type: CREATE_PRODUCT_REQUEST })
const createProductSuccess = (data) => ({ type: CREATE_PRODUCT_SUCCESS, payload: data })
const createProductFailure = (err) => ({ type: CREATE_PRODUCT_FAILURE, payload: err })

const deleteProductRequest = () => ({ type: DELTE_PRODUCT_REQUEST })
const deleteProductSuccess = (data) => ({ type: DELTE_PRODUCT_SUCCESS, payload: data })
const deleteProductFailure = (err) => ({ type: DELTE_PRODUCT_FAILURE, payload: err })

const token = localStorage.getItem("token")




export const findProducts = (reqData) => async (dispatch) => {
    dispatch(findProudctsRequest())
    const { color, sizes, minPrice, maxPrice, minDiscount, category, stock, sort, pageNumber, pageSize, title } = reqData
    try {

        const response = await api.get(`/api/products?pageNumber=${pageNumber - 1}&pageSize=6&category=${category}&color=${color}&size=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}&title=${title}`)
        const { data } = response

        dispatch(findProudctsSuccess(data))

    } catch (error) {
        dispatch(findProudctsFailure(error.message))
    }
}

export const findProduct = (reqData) => async (dispatch) => {

    dispatch(findProductRequest())
    const { productId } = reqData

    try {
        const response = await api.get(`/api/products/id/${productId}`)
        const product = response.data

        dispatch(findProductSuccess(product))
    } catch (error) {
        dispatch(findProductFailure(error.message))
    }
}

export const createProduct = (reqData) => async (dispatch) => {
    dispatch(createProductRequest())
    try {
   
        
        const response = await api.post("http://localhost:2207/api/admin/products/", reqData);
        const { data } = response

        dispatch(createProductSuccess(data))

    } catch (error) {
        dispatch(createProductFailure(error.message))
    }
    


        // Dispatch success action

    
}


export const deleteProduct = (id) => async (dispatch) => {
    dispatch(deleteProductRequest())
    try {
        const response = await api.put(`/api/admin/products/${id}/delete`)
        const { data } = response
        console.log(data);
        
        dispatch(deleteProductSuccess(data))
    } catch (error) {
        dispatch(deleteProductFailure())
    }
}