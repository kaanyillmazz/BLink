import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: [],
}
export const postsSlice = createSlice({
    name: 'posts', initialState, reducers: {
        setAllPosts: (state, posts) => {
            state.value = posts.payload;
        },
        setAPost: (state,postAndIndex) => {
            let postTemp = postAndIndex.payload.post;
            let indexTemp = postAndIndex.payload.index;
            state.value[indexTemp]= postTemp;
        },
        unshiftPosts: (state, post) => {
            state.value.unshift(post.payload);
        },
        sortPosts: (state, func) => {
            state.value.sort(func.payload);
        },
    },
})
export const {setAllPosts, setAPost, unshiftPosts, sortPosts} = postsSlice.actions;

export default postsSlice.reducer