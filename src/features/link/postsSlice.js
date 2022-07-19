import {createSlice} from '@reduxjs/toolkit'

let obj = function (id, title, points) {
    this.id = id;
    this.title = title;
    this.points = points;
}
let obj1 = new obj(1, "Loading...", "0");
let obj2 = new obj(2, "Loading...", "0");
let obj3 = new obj(3, "Loading...", "0");

const initialState = {
    value: [obj1, obj2, obj3],
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
            state.value = state.value.unshift(post);
        },
        sortPosts: (state, func) => {
            state.value.sort(func.payload);
        },



    },
})

export const {setAllPosts, setAPost, unshiftPosts, sortPosts} = postsSlice.actions;

export default postsSlice.reducer