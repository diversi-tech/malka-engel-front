import { combineReducers, createStore } from "redux";
import { DataReducer_FAQ } from "./DateReducer/dataReducer.FAQ";
import { DataReducer_Reviews } from "./DateReducer/dataReducer.Reviews";
import { DataReducer_Products } from "./DateReducer/dataReducer.Products";
import { DataReducer_UHistory } from "./DateReducer/dataReducer.UHistory";
import { DataReducer_Users } from "./DateReducer/dataReducer.Users";
import { DataReducer_Orders } from "./DateReducer/dataReducer.Order";


const reducers = combineReducers(
    {
        DataReducer_FAQ: DataReducer_FAQ,
        DataReducer_Reviews: DataReducer_Reviews,
        DataReducer_Products: DataReducer_Products,
        DataReducer_UHistory: DataReducer_UHistory,
        DataReducer_Users: DataReducer_Users,
        DataReducer_Orders: DataReducer_Orders
    }
)
export const Store = createStore(reducers)