import {produce} from "immer";

export const InitialState_Product = {

    ProductList:
        [
            {
                id: 4,
                name: "gefen",
                kind: "poster",
                desciption: "hkhgkgk"
            },
            {
                id: 4,
                name: "gefen",
                kind: "poster",
                desciption: "hkhgkgk"
            }           
        ]
}
export const DataReducer_Product = produce((state, action)=>{
    switch(action.type)
    {
        default:
            break;
    }
}, InitialState_Product)
