import { CLEAR_POSTS, CREATE_POST, DOWNVOTE_POST, GET_POSTS, UN_DOWNVOTE_POST, UN_UPVOTE_POST, UPVOTE_POST, UPVOTE_POST_FAILED } from "../constants/actionTypes";


const postsReducer = (posts = [], action) => {
    switch(action.type){
        case GET_POSTS:
            return action.payload;
        case CREATE_POST:
            return [action.payload, ...posts]
        case UPVOTE_POST:
            return posts.map( (post) => post.id === action.payload
                                        ? {
                                            ...post,
                                            upvote_count : post.upvote_count + 1,
                                            downvote_count : (post.user_vote === -1) ? post.downvote_count - 1 : post.downvote_count,
                                            user_vote : 1
                                        }
                                        : post);
        case UN_UPVOTE_POST:
            return posts.map( (post) => post.id === action.payload
                                            ? {
                                                ...post,
                                                upvote_count : post.upvote_count - 1,
                                                user_vote : 0
                                            }
                                            : post);
        case DOWNVOTE_POST:
            return posts.map( (post) => post.id === action.payload
                                        ? {
                                            ...post,
                                            downvote_count : post.downvote_count + 1,
                                            upvote_count : (post.user_vote === 1) ? post.upvote_count - 1 : post.upvote_count,
                                            user_vote : -1
                                        }
                                        : post);
        case UN_DOWNVOTE_POST:
            return posts.map( (post) => post.id === action.payload
                                            ? {
                                                ...post,
                                                downvote_count : post.downvote_count - 1,
                                                user_vote : 0
                                            }
                                            : post);
        case CLEAR_POSTS:
            return []
        default:
            return posts;
    }
}

export default postsReducer;