import { RESET_SIGN_UP, SHOW_ERROR, HIDE_ERROR, SIGN_UP, VERIFY_TOTP, SHOW_MODAL, LOGIN, HIDE_MODAL, LOGOUT } from "../constants/actionTypes";

import * as api from "../api";

export const signup = (formData) => async (dispatch) => {
    try{
        const { data } = await api.signup(formData);
    
        dispatch( { type : SIGN_UP, payload : data } );
        dispatch({ type : HIDE_ERROR })
    }
    catch(error){
        console.log(error);

        const { data } = error.response;

        const action = { type : SHOW_ERROR, payload : data.message }
        dispatch(action);
    }
}

export const verify = (formData) => async (dispatch) => {
    try {
        const { data } = await api.verify(formData);

        dispatch( { type : VERIFY_TOTP, payload : data } );
        dispatch( { type : SHOW_MODAL, payload : "login" });
    } catch (error) {
        console.log(error);

        const { data } = error.response;

        const action = { type : SHOW_ERROR, payload : data.message }
        dispatch(action);
    }
}

export const login = (formData) => async (dispatch) => {
    try {
        const { data } = await api.login(formData);
        
        let userData = data.user;

        localStorage.setItem("user", JSON.stringify(userData) );
        localStorage.setItem("token", data.token);
        
        dispatch( { type : LOGIN, payload : userData });
        dispatch( { type : HIDE_MODAL } );
    } catch (error) {
        console.log(error);
        const { data } = error.response;

        const action = { type : SHOW_ERROR, payload : data.message }
        dispatch(action);
    }
}

export const logout = () => {
    localStorage.clear();

    return { type : LOGOUT };
}

export const resetSignup = () => {
    return {
        type : RESET_SIGN_UP
    }
}