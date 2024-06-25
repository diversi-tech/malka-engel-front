import { combineReducers, createStore } from "redux";
import { DataReducer_FQA } from "./DateReducer/dataReducer.FQA";
import { DataReducer_Product } from "./DateReducer/DataReducer.product";

const reducers = combineReducers(
    {
        DataReducer_FQA: DataReducer_FQA
    },
    {
        DataReducer_Product: DataReducer_Product
    }
)
export const Store = createStore(reducers)