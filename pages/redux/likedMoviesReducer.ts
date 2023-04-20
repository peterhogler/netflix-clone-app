import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { Movie } from "@/typings";

interface likedMoviesState {
    movies: Movie[];
}

const initialState: likedMoviesState = {
    movies: [],
};

export const likedMoviesSlice = createSlice({
    name: "likedMovies",
    initialState,
    reducers: {
        addMovie: (state, action: PayloadAction<Movie>) => {
            const movieExistInArray = state.movies.find((movie) => movie.id === action.payload.id);
            if (movieExistInArray) {
                state.movies = state.movies.filter((movie) => movie.id !== action.payload.id);
            } else {
                state.movies.push(action.payload);
            }
        },
    },
});

export const { addMovie } = likedMoviesSlice.actions;

export const likedMoviesFromReducer = (state: RootState) => state.likedMovies.movies;

export default likedMoviesSlice.reducer;
