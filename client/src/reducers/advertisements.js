import { FETCH_ADS } from "../constants/actionTypes";

const initialState = [];

const advertisementsReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_ADS:
            return action.payload;
        default:
            return state;
    }
}

export default advertisementsReducer;