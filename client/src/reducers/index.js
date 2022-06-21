import { combineReducers  } from "redux";

import authModalReducer from "./authModal"
import authReducer from "./auth";
import categoryReducer from "./category";


const allReducers = combineReducers({
    authModal : authModalReducer,
    auth : authReducer,
    category : categoryReducer
})

export default allReducers;