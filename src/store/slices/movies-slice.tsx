import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import MovieModel from "../../models/MovieModel";

interface MoviesState {
    moviesList: MovieModel[];
    favList: any;
    ratedList: any;
    currentPage: number;
}
const initialMoviesState: MoviesState = {
    moviesList: [],
    favList: {},
    ratedList: {},
    currentPage: 1,
};

export const moviesSlice = createSlice({
    name: "moviesSliceDetails",
    initialState: initialMoviesState,
    reducers: {
        setMoviesList: (state, action: PayloadAction<MovieModel[]>) => {
            state.moviesList = action.payload;
        },
        setFavList: (state, action: PayloadAction<any>) => {
            state.favList = action.payload;
        },
        setRatedList: (state, action: PayloadAction<any>) => {
            state.ratedList = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<any>) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setMoviesList, setFavList, setRatedList, setCurrentPage } =
    moviesSlice.actions;

export default moviesSlice.reducer;
