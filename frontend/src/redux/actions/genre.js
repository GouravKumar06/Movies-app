import axios from "axios"
import { server } from "../../server"



export const loadGenres = () => async(dispatch) =>{
    try{
        dispatch({
            type:"LoadGenresRequest"
        })
        const {data} = await axios.get(`${server}/genre/get-all-genres`,{withCredentials:true})
        dispatch({
            type:"LoadGenresSuccess",
            payload: data.genres
        })
    }catch(error){
        dispatch({
            type:"LoadGenresFailure",
            payload: error.response.data.message
        })
    }
}