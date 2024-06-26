
export const setReviewslist = (Reviewslist)=>{
    return {type:"SET_REVIEWS",payload: Reviewslist};
}

export const fillReviewsList=(value)=>{
    debugger
    return {type:'FILL_REVIEWS_LIST',payload:value}
}   