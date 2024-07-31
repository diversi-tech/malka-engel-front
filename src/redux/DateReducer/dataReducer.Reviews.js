
import { produce } from "immer"

export const InitialState_Reviews = {
    ReviewsList: [],
}
export const DataReducer_Reviews = produce((state, action) => {
    switch (action.type) {
        case 'FILL_REVIEWS_LIST': {
            state.ReviewsList = action.payload;
            break;
        }
        case 'FILL_REVIEWS_FOR_PRODUCT': {
            state.ReviewsProduct = action.payload;
            break;
        }
        default:
            break;
    }
}, InitialState_Reviews);


