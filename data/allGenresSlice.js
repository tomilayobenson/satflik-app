import { CreateSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./baseUrl";

export const fetchAllGenres = createAsyncThunk(
    'allGenres/fetchAllGenres',
    async () => {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=3341385410c37095575e1b97197378ce");
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();
        console.log(data.genres);
        return data;
    }
)

const allGenresSlice = CreateSlice({
    name:'allGenres',
    initialState:{isLoading: true, errMsg: null, popularMoviesArray:[]},
    reducers: {},
    extraReducers: {
        [fetchAllGenres.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAllGenres.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.errMsg = null;
            state.popularMoviesArray = action.payload.genres
        },
        [fetchAllGenres.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }

})
export const allGenresReducers = allGenresSlice.reducer;