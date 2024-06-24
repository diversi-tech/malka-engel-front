import { combineReducers, createStore } from "redux";
import { DataReducer_FQA } from "./DateReducer/dataReducer.FQA";


const reducers = combineReducers(
    { 
    DataReducer_FQA: DataReducer_FQA,
    
}
)
export const Store = createStore(reducers)