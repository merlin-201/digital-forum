import { SIGN_UP, RESET_SIGN_UP, VERIFY_TOTP, LOGIN, LOGOUT } from "../constants/actionTypes";

const initialState = {
    qr : null,
    tempSecret : null,
    totpVerified : false,
    user : JSON.parse( localStorage.getItem('user') || null )
}

const authReducer = (state = initialState, action) => {
    switch(action.type){
        case SIGN_UP:
            return { ...state, qr : action.payload.qr, tempSecret : action.payload.tempSecret };
        case VERIFY_TOTP:
            return { ...state, tempSecret : null, qr : null, totpVerified : (action.payload.verified || false )};
        case LOGIN:
            return { ...state, user : action.payload }
        case LOGOUT:
            return { ...state, user : null, totpVerified : false }
        case RESET_SIGN_UP:
            return initialState;
        default:
            return state;
    }
}

export default authReducer;