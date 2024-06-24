
export const InitialState_Reviews = [
    ReviewsList = [
        {
            ReviewI: 1,
            ProductID: 2,
            UserID: 3,
            Rating: 5,
            Comment: "a buetefully review",
            CreatedAt: "2015-09-90"
        },
        {
            ReviewI: 2,
            ProductID: 4,
            UserID: 3,
            Rating: 5,
            Comment: "a wanderfull review",
            CreatedAt: "2020-09-90"
        }
    ]
]
export const dataReducer_Reviews = produce((state, action) => {
    switch (action.type) {
        case "SET_REVIEWS": {
            state.reviews = action.payload;
            break;
        }
        default:
            break;
    }
},)