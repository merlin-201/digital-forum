import { GET_POSTS } from "../constants/actionTypes";

const initialState = [];

const postsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_POSTS:
            return [...state, ...action.payload];
        default:
            return state;
    }
}

export default postsReducer;