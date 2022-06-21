import { CLEAR_POSTS, DOWNVOTE_POST, GET_POSTS, UN_DOWNVOTE_POST, UN_UPVOTE_POST, UPVOTE_POST, UPVOTE_POST_FAILED } from "../constants/actionTypes";
import * as api from "../api";

export const getPosts = (topicId) => async (dispatch) => {
    try {
        let { data } = await api.getPosts(topicId);

        dispatch( { type : GET_POSTS, payload : data.data} );
    } catch (error) {
        console.log(error);
    }
}

export const upvotePost = (postId) => async (dispatch) => {
    try {
        // to show quick state change on the UI we change the store even before sending the request
        // What if the request does not go through ? : Then we jsut undo the changes in the catch block with UN_UPVOTE_POST action being dispatched
        dispatch( { type : UPVOTE_POST, payload : postId} );
        await api.upvotePost(postId);
        
    } catch (error) {
        dispatch( { type : UN_UPVOTE_POST, payload : postId} );
        console.log(error);
    }
}

export const unUpvotePost = (postId) => async (dispatch) => {
    try {
        // to show quick state change on the UI we change the store even before sending the request
        // What if the request does not go through ? : Then we jsut undo the changes in the catch block with UPVOTE_POST_FAILED action being dispatched
        dispatch( { type : UN_UPVOTE_POST, payload : postId} );
        await api.unUpvotePost(postId);
        
    } catch (error) {
        dispatch( { type : UPVOTE_POST, payload : postId} );
        console.log(error);
    }
}

export const downvotePost = (postId) => async (dispatch) => {
    try {
        // to show quick state change on the UI we change the store even before sending the request
        // What if the request does not go through ? : Then we jsut undo the changes in the catch block with UN_UPVOTE_POST action being dispatched
        dispatch( { type : DOWNVOTE_POST, payload : postId} );
        await api.downvotePost(postId);
        
    } catch (error) {
        dispatch( { type : UN_DOWNVOTE_POST, payload : postId} );
        console.log(error);
    }
}

export const unDownvotePost = (postId) => async (dispatch) => {
    try {
        // to show quick state change on the UI we change the store even before sending the request
        // What if the request does not go through ? : Then we jsut undo the changes in the catch block with UPVOTE_POST_FAILED action being dispatched
        dispatch( { type : UN_DOWNVOTE_POST, payload : postId} );
        await api.unDownvotePost(postId);
        
    } catch (error) {
        dispatch( { type : DOWNVOTE_POST, payload : postId} );
        console.log(error);
    }
}

export const clearPosts = () => {
    return { type : CLEAR_POSTS }
}
