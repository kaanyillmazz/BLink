import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: false,
}
export const showSlice = createSlice({
    name: 'show', initialState, reducers: {
        setShow: (state) => {
            state.value = !(state.value)
        },
    },
})

export const {setShow} = showSlice.actions;

export default showSlice.reducer