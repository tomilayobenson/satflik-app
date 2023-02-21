import { CreateSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "./baseUrl";

export const fetchPopularMovies = createAsyncThunk(
    'popularMovies/fetchPopularMovies',
    async () => {
        const response = await fetch(baseUrl + "popular?api_key=3341385410c37095575e1b97197378ce");
        if (!response.ok) {
            return Promise.reject(
                'Unable to fetch, status: ' + response.status
            );
        }
        const data = await response.json();      
        console.log(data.results);
        return data;
    }
)

const popularMoviesSlice = CreateSlice({
    name:'popularMovies',
    initialState:{isLoading: true, errMsg: null, popularMoviesArray:[]},
    reducers: {},
    extraReducers: {
        [fetchPopularMovies.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchPopularMovies.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.errMsg = null;
            state.popularMoviesArray = action.payload.results
        },
        [fetchPopularMovies.rejected]: (state, action) => {
            state.isLoading = false;
            state.errMsg = action.error
                ? action.error.message
                : 'Fetch failed';
        }
    }

})
export const popularMoviesReducers = popularMoviesSlice.reducer;