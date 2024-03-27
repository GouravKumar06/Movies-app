import {configureStore} from '@reduxjs/toolkit';
import { userReducer } from './reducers/user';
import { genreReducer } from './reducers/genre';
import { movieReducer } from './reducers/movies';


const Store = configureStore({
    reducer:{
        user : userReducer,
        genre : genreReducer,
        movie : movieReducer
    }
})


export default Store;