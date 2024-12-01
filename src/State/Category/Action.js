import { api } from "../../config/apiConfig";
import { GET_CATEGORIES_LEVEL2_FAILURE, GET_CATEGORIES_LEVEL2_REQUEST, GET_CATEGORIES_LEVEL2_SUCCESS, GET_CATEGORIES_LEVEL_FAILURE, GET_CATEGORIES_LEVEL_REQUEST, GET_CATEGORIES_LEVEL_SUCCESS } from "./ActionType";

const getCategoriesLevelRequest = ()=>({type: GET_CATEGORIES_LEVEL_REQUEST})
const getCategoriesLevelSuccess = (data)=>({type: GET_CATEGORIES_LEVEL_SUCCESS, payload: data})
const getCategoriesLevelFailure = (err)=>({type: GET_CATEGORIES_LEVEL_FAILURE, payload: err})

const getCategoriesLevel2Request = ()=>({type: GET_CATEGORIES_LEVEL2_REQUEST})
const getCategoriesLevel2Success = (data)=>({type: GET_CATEGORIES_LEVEL2_SUCCESS, payload: data})
const getCategoriesLevel2Failure = (err)=>({type: GET_CATEGORIES_LEVEL2_FAILURE, payload: err})

export const getCategoriesByLevel = (level)=>async(dispatch)=>{
    dispatch(getCategoriesLevelRequest())
    try {
        const response = await api.get(`api/admin/categories/${level}`)
        const {data} = response        
        dispatch(getCategoriesLevelSuccess(data))
    } catch (error) {
        dispatch(getCategoriesLevelFailure(error.messagae))
    }
}

export const getCategoriesByLevel2 = (parentCategoryId)=>async(dispatch)=>{
    dispatch(getCategoriesLevel2Request())
    try {
        const response = await api.get(`api/admin/categories/parent/${parentCategoryId}`)
        const {data} = response   
        console.log(data);
        dispatch(getCategoriesLevel2Success(data))
    } catch (error) {
        dispatch(getCategoriesLevel2Failure(error.messagae))
    }
}
