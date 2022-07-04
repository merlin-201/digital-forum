import { GET_TOPIC } from "../constants/actionTypes";

const initialState = {};

const topicReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_TOPIC:
            return action.payload;
        default:
            return state;
    }
}

export default topicReducer;