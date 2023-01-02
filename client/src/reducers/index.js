import { combineReducers } from "redux";
import authReducer from "./authReducer.js";
import postReducer from "./postReducer.js";
import chatReducer from "./chatReducer.js";

export const reducers = combineReducers({ authReducer, postReducer, chatReducer });