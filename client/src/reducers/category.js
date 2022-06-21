import { GET_ALL_CATEGORIES, SET_CURRENT_CATEGORY } from "../constants/actionTypes";

const initialState= {
    allCategories : [],
    currentCategory : null,
}

const categoryReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_CATEGORIES:
            return {...state, allCategories : action.payload };
        case SET_CURRENT_CATEGORY:
            return {...state, currentCategory : action.payload };
        default:
            return state;
    }
}

export default categoryReducer;