import { combineReducers, createStore } from "redux";
import { DataReducer_FAQ } from "./DateReducer/dataReducer.FAQ";
import { DataReducer_Reviews } from "./DateReducer/dataReducer.Reviews";
import { DataReducer_Pro } from "./DateReducer/dataReducer.Products";

const reducers = combineReducers(
    { 
    DataReducer_FAQ: DataReducer_FAQ,
    DataReducer_Reviews: DataReducer_Reviews,
    DataReducer_Pro: DataReducer_Pro    
}
)
export const Store = createStore(reducers)