export const setUserList=(list)=>{
    return {type:"SET_USER_LIST",payload: list};
}
export const setCurrentUser=(user)=>{
    return {type:"SET_CURRENT_USER",payload: user};
}
export const connect=()=>{
    return {type:"SET_CURRENT",payload: null};
}
