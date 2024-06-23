import {produce} from "immer"
export const InitialState_FQA = {

    FQAlist:
        [
            {
                id: 1,
                question: "What is the best way to get started?1",
                answer: "ua. Ufhghfhrtthttht",
                Rating: 5
            },
            {
                id: 2,
                question: "What is the best way to get started?2",
                answer: "ua. Ufhghfhrtthttht",
                Rating: 4
            },
            {
                id: 6,
                question: "What is the best way to get started?8",
                answer: "ua. Ufhghfhrtthttht",
                Rating: 1
            },
            {
                id: 4,
                question: "What is the best way to get started?4",
                answer: "ua. Ufhghfhrtthttht",
                Rating: 0
            }          
        ]
}
export const DataReducer_FQA = produce((state, action)=>{
    switch(action.type)
    {
        default:
            break;
    }
}, InitialState_FQA)
