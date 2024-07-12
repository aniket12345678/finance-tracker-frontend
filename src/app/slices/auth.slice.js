import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { frontEndUrl } from "../config/Api";

export const auth_signup = createAsyncThunk('',
    async (data) => {
        try {
            const response = await frontEndUrl.post('/user/signup', data);
            return response.data;
        } catch (error) {

        }
    }
)

export const auth_signin = createAsyncThunk('',
    async (data) => {
        try {
            const response = await frontEndUrl.post('/user/signin', data);
            return response.data;
        } catch (error) {

        }
    }
)

const initialState = {};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(auth_signin.fulfilled, (state, action) => {
            console.log('auth_signin:- ', action);
        });
        builder.addCase(auth_signup.fulfilled, (state, action) => {
            console.log('auth_signup:- ', action);
        })
    }
});