
export const setProductList=(value)=>{
    debugger
    return {type:'SET_PRODUCT_LIST',payload:value}
} 

export const setProductListByCategory=(value)=>{
    return {type:'SET_PRODUCT_LIST_BY_CATEGORY',payload:value}
}