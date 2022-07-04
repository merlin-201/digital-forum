import { HIDE_POST_INPUT, SHOW_POST_INPUT, START_POST_INPUT_LOADING, STOP_POST_INPUT_LOADING, TAG_USER_IN_POST_INPUT } from "../constants/actionTypes"

export const showPostInputPopup = () => {
    return { type : SHOW_POST_INPUT}
}

export const hidePostInputPopup = () => {
    return { type : HIDE_POST_INPUT}
}

export const startPostInputLoading = () => {
    return { type : START_POST_INPUT_LOADING}
}

export const stopPostInputLoading = () => {
    return { type : STOP_POST_INPUT_LOADING}
}

export const tagUserInPostInput = (id, username) => {
    return { type : TAG_USER_IN_POST_INPUT, payload : { userId : id, userUsername : username }};
}