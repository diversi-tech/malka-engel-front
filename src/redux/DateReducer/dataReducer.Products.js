import { produce } from "immer"

export const InitialState_Products = {
    Prodlist:[],
    ProdlistByCategory:[]
}

export const DataReducer_Products = produce((state, action) => {
    switch (action.type) {
        case "SET_PRODUCT_LIST": {
            state.Prodlist = action.payload
            break
        }
        case "SET_PRODUCT_LIST_BY_CATEGORY":{
            state.ProdlistByCategory = action.payload
            break
        }
        default:
            break;
    }
}, InitialState_Products)