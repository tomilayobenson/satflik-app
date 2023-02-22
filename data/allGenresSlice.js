import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

const allGenresSlice = createSlice({
    name:'allGenres',
    initialState:{isLoading: true, errMsg: null, allGenresArray:[], selectedGenresArray:[]},
    reducers: {
        addCategory: (state, action) => {
            state.selectedGenresArray = [...state.selectedGenresArray, action.payload]
        },
        removeCategory: (state,action) => {
            state.selectedGenresArray = state.selectedGenresArray.filter(genre => genre !== action.payload)
        }
    },
    extraReducers: {
        [fetchAllGenres.pending]: (state) => {
            state.isLoading = true;
        },
        [fetchAllGenres.fulfilled]: (state,action) => {
            state.isLoading = false;
            state.errMsg = null;
            state.allGenresArray = action.payload.genres
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
export const {addCategory, removeCategory} = allGenresSlice.actions;