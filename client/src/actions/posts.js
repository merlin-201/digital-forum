import { GET_POSTS } from "../constants/actionTypes";
import * as api from "../api";

export const getPosts = (topicId) => async (dispatch) => {
    try {
        let { data } = await api.getPosts(topicId);

        dispatch( { type : GET_POSTS, payload : data.data} );
    } catch (error) {
        console.log(error);
    }
}