import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./slices/movies-slice";

export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
    },
});
