import { configureStore } from "@reduxjs/toolkit";
import likedMoviesReducer from "./likedMoviesReducer";

export const store = configureStore({
    reducer: {
        likedMovies: likedMoviesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
