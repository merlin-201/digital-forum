import * as api from "../api";
import { GET_ALL_CATEGORIES, SET_CURRENT_CATEGORY } from "../constants/actionTypes";

export const getAllCategories = () => async (dispatch) => {
    try {
        let { data } = await api.getAllCategories();
        let allCategories = data.data;
        dispatch( { type : GET_ALL_CATEGORIES, payload : allCategories } );

        let currentCategory = allCategories[0];

        let { data : currentCategoryTopics } = await api.getCategoryTopics(currentCategory.id);
        currentCategory = {...currentCategory, topics : currentCategoryTopics.data};
        console.log("dispatched current category");
        dispatch( { type : SET_CURRENT_CATEGORY, payload : currentCategory } );

    } catch (error) {
        console.log(error);
    }
}

export const setCurrentCategory = (category) => async (dispatch) => {
    try {
        // fetching the topics in the category :
        let {data} = await api.getCategoryTopics(category.id);
        console.log("recieved data as : ", data.data);

        let action = {type : SET_CURRENT_CATEGORY, payload : {...category, topics : data.data} };

        dispatch( action );
    } catch (error) {
        console.log(error);
    }
}