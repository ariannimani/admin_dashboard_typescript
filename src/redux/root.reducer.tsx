import { combineReducers } from "redux";
import dataReducer from "./data/data.reducer";

const rootReducer = combineReducers({ resultData: dataReducer });

export default rootReducer;
