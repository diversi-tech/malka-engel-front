import {produce} from "immer"
export const InitialState_FQA = {
//משתנים גלובלים
    FQAlist:
        [
            {
                id: 1,
                question: "aaaa",
                answer: "ua. Ufhghfhrtthttht",
                Rating: 5
            },
            {
                id: 2,
                question: "aaaab",
                answer: "ua. Ufhghfhrtthttht",
                Rating: 4
            },
            {
                id: 6,
                question: "aaaabcc",
                answer: "ua. Ufhghfhrtthttht",
                Rating: 1
            },
            {
                id: 4,
                question: "aaaabnnn",
                answer: "ua. Ufhghfhrtthttht",
                Rating: 0
            }             
        ]
}
export const DataReducer_FQA = produce((state, action)=>{
    switch(action.type)
    {
        case "SET_FQALIST":{
            state.FQAlist=action.payload
            break
        }

        default:
            break;
    }
}, InitialState_FQA)


