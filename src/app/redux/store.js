import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { financeSlice } from "../slices/financeRecord.slice";
import { authSlice } from "../slices/auth.slice";

const rootReducer = combineReducers({
    financeSlice: financeSlice.reducer,
    authSlice: authSlice.reducer
});

const store = configureStore({
    reducer: rootReducer,
    devTools: true
});

export default store;