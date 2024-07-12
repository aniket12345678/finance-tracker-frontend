import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { frontEndUrl } from "../config/Api";

export const financeRecord_add = createAsyncThunk('',
    async (data) => {
        try {
            const response = await frontEndUrl.post('/finance/add', data);
            return response.data
        } catch (error) {

        }
    }
);

export const financeRecord_fetchAll = createAsyncThunk('',
    async (data) => {
        try {
            const response = await frontEndUrl.post('/finance/fetch/all', data);
            return response.data;
        } catch (error) {

        }
    }
);

export const financeRecord_record_delete = createAsyncThunk('',
    async (data) => {
        try {
            const response = await frontEndUrl.post('/finance/record/delete', data);
            return response.data
        } catch (error) {

        }
    }
);
const initialState = {
    findAll: []
}

export const financeSlice = createSlice({
    name: 'financeSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(financeRecord_fetchAll.fulfilled, (state, action) => {
            console.log('financeRecord_fetchAll:- ', action);
        });
        builder.addCase(financeRecord_record_delete.fulfilled, (state, action) => {
            console.log('financeRecord_record_delete:- ', action);
        })
    }
})