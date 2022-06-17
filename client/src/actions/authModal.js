import { SHOW_MODAL, HIDE_MODAL } from "../constants/actionTypes"

export const showModal = (modalBody) => {
    return {
        type : SHOW_MODAL,
        payload : modalBody
    }
}

export const hideModal = () => {
    return {
        type : HIDE_MODAL
    }
}