import { configureStore } from "@reduxjs/toolkit";
import regisReducer from "./slices/regisSlice";
import mangaReducer from "./slices/mangaSlice";
import genresReducer from "./slices/genresSlice";

export const store = configureStore({
    reducer: {
        auth: regisReducer,
        manga: mangaReducer,
        genres: genresReducer
    }
})