import { combineReducers, createStore } from "redux";
import { DataReducer_FAQ } from "./DateReducer/dataReducer.FAQ";


const reducers = combineReducers(
    { 
    DataReducer_FAQ: DataReducer_FAQ
}
)
export const Store = createStore(reducers)  
