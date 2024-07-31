import { useDispatch } from "react-redux";
import { GetUserDetails } from "../../axios/UsersAxios"
import {connect, setCurrentUser } from "../../redux/DataActions/DataAction.Users";




export const useConnectUser = ()=>{

const dispatch = useDispatch()


const ConnectMe = async()=>{
    debugger
    const token = localStorage.getItem('token')   
    if (token){
        const result = await GetUserDetails()
        if(result && result.status === 200){
        dispatch(connect(true))
        dispatch(setCurrentUser(result.data));
    }
    }
}
const Logout = ()=>{
    debugger
    localStorage.removeItem('token')
    dispatch(setCurrentUser(null))
    dispatch(connect(false))
}
return {
    ConnectMe,
    Logout
}
    

}
