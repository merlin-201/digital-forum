import { combineReducers  } from "redux";

import authModalReducer from "./authModal"
import authReducer from "./auth";


const allReducers = combineReducers({
    authModal : authModalReducer,
    auth : authReducer
})

export default allReducers;