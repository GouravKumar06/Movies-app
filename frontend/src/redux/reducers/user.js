import { createReducer } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
    loading:false,
}


export const userReducer = createReducer(initialState, (builder) => {
    builder
    .addCase("LoadUserRequest", (state) => {
        state.loading = true
    })
    .addCase("LoadUserSuccess", (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
    })

    .addCase("LoadUserFailure", (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload
    })

    .addCase("LoadUsersRequest", (state) => {
        state.loading = true
    })

    .addCase("LoadUsersSuccess", (state, action) => {
        state.loading = false;
        state.users = action.payload;
    })

    .addCase("LoadUsersFailure", (state, action) => {
        state.loading = false;
        state.error = action.payload
    })

    .addCase("clearError", (state) => {
        state.error = null
    })
    
})


