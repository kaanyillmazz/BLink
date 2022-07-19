import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: "Default",
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