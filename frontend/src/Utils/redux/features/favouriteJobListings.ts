import { createSlice } from '@reduxjs/toolkit'

//JOBLISTINGS SLICE
const favouriteJobListings = createSlice({
    name: "favouriteJobListings",

    initialState: {
        favouriteJobListings: undefined
    },
    reducers: {
        updateFavouriteJobListings: (state, action) => {
            state.favouriteJobListings = action.payload
        },
    }
})

export const { updateFavouriteJobListings } = favouriteJobListings.actions;

export const selectFavouriteJobListings = (state) => state.favouriteJobListings.favouriteJobListings;

export default favouriteJobListings.reducer;