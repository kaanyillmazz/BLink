import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: "MostPoints",
    index: "0",
    page: "1"
}
export const sortingSlice = createSlice({
    name: 'sorting', initialState, reducers: {
        setSorting: (state,sort) => {
            state.value = sort.payload;
        },
        setIndex: (state,index) => {
            state.index = index.payload;
        },
        setPage: (state,page) => {
            state.page = page.payload;
        },
    },
})

export const {setSorting, setIndex, setPage} = sortingSlice.actions;

export default sortingSlice.reducer