import { configureStore } from "@reduxjs/toolkit";
import regisReducer from "./slices/regisSlice";

export const store = configureStore({
    reducer: {
        auth: regisReducer
    }
})