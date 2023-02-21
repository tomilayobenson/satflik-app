import { configureStore } from "@reduxjs/toolkit";
import { allGenresReducers } from "../data/allGenresSlice";
import { popularMoviesReducers } from "../data/popularMoviesSlice";

export const store = configureStore({
    reducer: {
        allGenres: allGenresReducers,
        popularMovies: popularMoviesReducers
    }
})