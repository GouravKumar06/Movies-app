import axios from "axios";
import { server } from "../../server";


export const loadUser = () => async(dispatch) =>{
    try{
        dispatch({
            type:"LoadUserRequest"
        });
        const {data} = await axios.get(`${server}/user/get-current-user`,{withCredentials:true});
        dispatch({
            type:"LoadUserSuccess",
            payload: data.user,
        })

    }catch(error){
        dispatch({
            type:"LoadUserFailure",
            payload:error.response
        })
    }
}


//get all users
export const loadAllUser = () => async(dispatch) =>{
    try{
        dispatch({
            type:"LoadUsersRequest"
        });
        const {data} = await axios.get(`${server}/user/get-users`,{withCredentials:true});
        dispatch({
            type:"LoadUsersSuccess",
            payload: data.users,
        })

    }catch(error){
        dispatch({
            type:"LoadUsersFailure",
            payload:error.response
        })
    }
}