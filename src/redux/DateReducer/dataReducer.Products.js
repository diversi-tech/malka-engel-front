import { produce } from "immer"

export const InitialState_Products = {
    Prodlist:[]
}

export const DataReducer_Products = produce((state, action) => {
    switch (action.type) {
        case "SET_PRODUCT_LIST": {
            state.Prodlist = action.payload
            break
        }
        default:
            break;
    }
}, InitialState_Products)