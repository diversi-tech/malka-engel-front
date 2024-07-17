import { useDispatch } from "react-redux";
import { GetUserDetails } from "../../axios/UsersAxios"
import {connect, setCurrentUser } from "../../redux/DataActions/DataAction.Users";
import { useNavigate } from "react-router-dom";




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
    dispatch(connect(false))
   dispatch(setCurrentUser(null))
}
return {
    ConnectMe,
    Logout
}
    

}
