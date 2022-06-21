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
            return {...state, currentCategory : {
                                            ...( state.allCategories.filter( (category) => category.id === action.payload.categoryId )[0] ),
                                            topics : action.payload.topics
            } };
        default:
            return state;
    }
}

export default categoryReducer;