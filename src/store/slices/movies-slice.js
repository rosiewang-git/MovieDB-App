import { createSlice } from "@reduxjs/toolkit";

export const initialMoviesState = {
    moviesList: [],
    info: {},
    favList: {},
    ratedList: {},
};

export const moviesSlice = createSlice({
    name: "moviesSliceDetails",
    initialState: initialMoviesState,
    reducers: {
        setMoviesList: (state, action) => {
            state.moviesList = action.payload;
        },
        setInfo: (state, action) => {
            state.info = action.payload;
        },
        setFavList: (state, action) => {
            state.favList = action.payload;
        },
        setRatedList: (state, action) => {
            state.ratedList = action.payload;
        },
    },
});

export const { setMoviesList, setInfo, setFavList, setRatedList } =
    moviesSlice.actions;

export default moviesSlice.reducers;
