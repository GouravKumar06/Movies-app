import { createReducer } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    loading:false,
}


export const movieReducer = createReducer(initialState, (builder) => {
    builder
    .addCase("LoadMoviesRequest", (state) => {
        state.loading = true
    })
    .addCase("LoadMoviesSuccess", (state, action) => {
        state.loading = false;
        state.movies = action.payload;
    })

    .addCase("LoadMoviesFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload
    })

    // get top movies
    .addCase("LoadTopMovies", (state) => {
        state.loading = true
    })

    .addCase("LoadTopMoviesSuccess", (state, action) => {
        state.loading = false;
        state.topMovies = action.payload;
    })

    .addCase("LoadTopMoviesFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload
    })

    //get random movies
    .addCase("LoadRandomMovies", (state) => {
        state.loading = true
    })

    .addCase("LoadRandomMoviesSuccess", (state, action) => {
        state.loading = false;
        state.randomMovies = action.payload;
    })

    .addCase("LoadRandomMoviesFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload
    })

    //get new movies
    .addCase("getNewMovies", (state) => {
        state.loading = true
    })

    .addCase("getNewMoviesSuccess", (state, action) => {
        state.loading = false;
        state.newMovies = action.payload;
    })

    .addCase("getNewMoviesFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload
    })

    .addCase("clearError", (state) => {
        state.error = null
    })
    
})