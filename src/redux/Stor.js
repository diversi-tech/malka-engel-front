import { combineReducers, createStore } from "redux";
import { DataReducer_FAQ } from "./DateReducer/dataReducer.FAQ";
import { DataReducer_Reviews } from "./DateReducer/dataReducer.Reviews";
import { DataReducer_Products } from "./DateReducer/dataReducer.Products";
import { DataReducer_Users } from "./DateReducer/dataReducer.Users";

const reducers = combineReducers(
    { 
    DataReducer_FAQ: DataReducer_FAQ,
    DataReducer_Reviews: DataReducer_Reviews,
    DataReducer_Products: DataReducer_Products,
    DataReducer_Users: DataReducer_Users   
}
)
export const Store = createStore(reducers)