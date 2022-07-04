import { HIDE_POST_INPUT, SHOW_POST_INPUT, START_POST_INPUT_LOADING, STOP_POST_INPUT_LOADING, TAG_USER_IN_POST_INPUT } from "../constants/actionTypes";

const initialState = {
    show : false,
    loading : false,
    taggedUser : null
}

const postInputPopupReducer = (state = initialState, action) => {
    switch(action.type){
        case SHOW_POST_INPUT:
            return {...state, show : true};
        case HIDE_POST_INPUT:
            return initialState;
        case START_POST_INPUT_LOADING:
            return {...state, loading : true};
        case STOP_POST_INPUT_LOADING:
            return {...state, loading : false};
        case TAG_USER_IN_POST_INPUT:
            return {...state, taggedUser : { id : action.payload.userId, username : action.payload.userUsername }}
        default:
            return state;
    }
}

export default postInputPopupReducer;