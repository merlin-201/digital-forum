// authModalReducer => transform state variables related to the authModal Component
// like : Show the modal, hide the modal, display auth error message

import { SHOW_MODAL, HIDE_MODAL, SHOW_ERROR, HIDE_ERROR } from "../constants/actionTypes"

const initialState = {
    show : false,
    body : null,
    errorMessage : null
}

const authModalReducer = ( state = initialState, action) => {
    switch(action.type){
        case SHOW_MODAL:
            return {...state, show : true, body : action.payload, errorMessage : null };
        case HIDE_MODAL:
            return {...state, show : false, body : null};
        case SHOW_ERROR:
            return {...state, errorMessage : action.payload}
        case HIDE_ERROR:
            return {...state, errorMessage : null}
        default:
            return state;
    }
}

export default authModalReducer;