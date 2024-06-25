import { combineReducers, createStore } from "redux";
import { DataReducer_FQA } from "./DateReducer/dataReducer.FQA";
import { DataReducer_Reviews } from "./DateReducer/dataReducer.Reviews";


const reducers = combineReducers(
    { 
    DataReducer_FQA: DataReducer_FQA,
    DataReducer_Reviews: DataReducer_Reviews
    
}
)
export const Store = createStore(reducers)