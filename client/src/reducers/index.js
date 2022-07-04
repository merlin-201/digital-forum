import { combineReducers  } from "redux";

import authModalReducer from "./authModal"
import authReducer from "./auth";
import categoryReducer from "./category";
import topicReducer from "./topic";
import postsReducer from "./posts";
import postInputPopupReducer from "./postInputPopup";


const allReducers = combineReducers({
    authModal : authModalReducer,
    auth : authReducer,
    category : categoryReducer,
    topic : topicReducer,
    posts : postsReducer,
    postInputPopup : postInputPopupReducer
})

export default allReducers;