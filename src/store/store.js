import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./slices/movies-slice";
import { userSlice } from "./slices/user-slice";

export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        user: userSlice.reducer,
    },
});
