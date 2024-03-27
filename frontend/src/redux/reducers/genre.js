import {createReducer} from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    loading:false,
}

export const genreReducer = createReducer(initialState, (builder) => {
    builder
    .addCase("LoadGenresRequest", (state) => {
        state.loading = true
    })
    .addCase("LoadGenresSuccess", (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.genres = action.payload;
    })

    .addCase("LoadGenressFailure", (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload
    })

    .addCase("clearError", (state) => {
        state.error = null
    })
})