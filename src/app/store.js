import {configureStore} from '@reduxjs/toolkit'
import showSlice from '../features/link/showSlice'
import postsSlice from "../features/link/postsSlice";
import sortingSlice from "../features/link/sortingSlice";

export const store = configureStore({
    reducer: {
        show: showSlice,
        posts: postsSlice,
        sorting: sortingSlice
    },
})