import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: "MostPoints",
}
export const sortingSlice = createSlice({
    name: 'sorting', initialState, reducers: {
        setSorting: (state,sort) => {
            state.value = sort.payload;
        },
    },
})

export const {setSorting} = sortingSlice.actions;

export default sortingSlice.reducer