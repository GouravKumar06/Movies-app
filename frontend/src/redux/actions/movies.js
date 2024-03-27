import axios from "axios";
import { server } from "../../server";


export const loadAllMovies = () => async(dispatch) =>{
    try{
        dispatch({
            type:"LoadMoviesRequest"
        });
        const {data} = await axios.get(`${server}/movie/get-all-movies`);
        dispatch({
            type:"LoadMoviesSuccess",
            payload: data.movies,
        })

    }catch(error){
        dispatch({
            type:"LoadMoviesFailure",
            payload:error.response
        })
    }
}

// get Top Movies
export const loadTopMovies = () => async(dispatch) =>{
    try{
        dispatch({
            type:"LoadTopMovies"
        });
        const {data} = await axios.get(`${server}/movie/get-top-movies`);
        dispatch({
            type:"LoadTopMoviesSuccess",
            payload: data.topMovies,
        })

    }catch(error){
        dispatch({
            type:"LoadTopMoviesFailure",
            payload:error.response
        })
    }
}


//get Random Movies
export const loadRandomMovies = () => async(dispatch) =>{
    try{
        dispatch({
            type:"LoadRandomMovies"
        });
        const {data} = await axios.get(`${server}/movie/get-random-movies`);
        dispatch({
            type:"LoadRandomMoviesSuccess",
            payload: data.randomMovies,
        })

    }catch(error){
        dispatch({
            type:"LoadRandomMoviesFailure",
            payload:error.response
        })
    }
}


//get New Movies
export const loadNewMovies = () => async(dispatch) =>{
    try{
        dispatch({
            type:"getNewMovies"
        });
        const {data} = await axios.get(`${server}/movie/get-new-movies`);
        dispatch({
            type:"getNewMoviesSuccess",
            payload: data.newMovies,
        })

    }catch(error){
        dispatch({
            type:"getNewMoviesFailure",
            payload:error.response
        })
    }
}


