import { configureStore } from "@reduxjs/toolkit";
import { moviesSlice } from "./slices/movies-slice";
import { userSlice } from "./slices/user-slice";

export const store = configureStore({
    reducer: {
        movies: moviesSlice.reducer,
        user: userSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
