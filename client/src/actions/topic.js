import { GET_TOPIC } from "../constants/actionTypes";
import * as api from "../api";

export const getTopic = (topicId) => async (dispatch) => {
    try {
        let { data : topic } = await api.getTopic(topicId);

        dispatch( { type : GET_TOPIC, payload : topic } );
    } catch (error) {
        console.log(error);
    }
}