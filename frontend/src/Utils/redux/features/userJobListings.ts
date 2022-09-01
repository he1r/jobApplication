import { createSlice } from '@reduxjs/toolkit'

//USER SLICE
const userJobListings = createSlice({
    name: "userJobListings",

    initialState: {
        userJobListings: undefined
    },
    reducers: {
        updateUserJobListings: (state, action) => {
            state.userJobListings = action.payload
        },
    }
})

export const { updateUserJobListings } = userJobListings.actions;

export const selectUserJobListings = (state) => state.userJobListings.userJobListings;

export default userJobListings.reducer;