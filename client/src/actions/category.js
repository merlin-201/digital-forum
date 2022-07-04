import * as api from "../api";
import { GET_ALL_CATEGORIES, SET_CURRENT_CATEGORY } from "../constants/actionTypes";

export const getAllCategories = (selectedCategoryId) => async (dispatch) => {
    try {
        let { data } = await api.getAllCategories();
        let allCategories = data.data;
        dispatch( { type : GET_ALL_CATEGORIES, payload : allCategories } );

        let categoryToBeSelected = selectedCategoryId || allCategories[0].id;
        dispatch( setCurrentCategory(categoryToBeSelected) );
    } catch (error) {
        console.log(error);
    }
}

export const setCurrentCategory = (categoryId) => async (dispatch) => {
    try {
        // fetching the topics in the category :
        let { data : category } = await api.getCategory(categoryId);

        let action = {type : SET_CURRENT_CATEGORY, payload : category };

        dispatch( action );
    } catch (error) {
        console.log(error);
    }
}