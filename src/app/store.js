import {configureStore} from '@reduxjs/toolkit'
import counterSlice from '../features/counter/counterSlice'
import showSlice from '../features/link/showSlice'
import postsSlice from "../features/link/postsSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice,
        show: showSlice,
        posts: postsSlice
    },
})