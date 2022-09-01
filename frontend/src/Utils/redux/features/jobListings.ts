import { createSlice } from '@reduxjs/toolkit'

//JOBLISTINGS SLICE
const jobsSlice = createSlice({
    name: "jobListings",

    initialState: {
        jobListings: undefined
    },
    reducers: {
        updatejobListings: (state, action) => {
            state.jobListings = action.payload
        },
    }
})

export const { updatejobListings } = jobsSlice.actions;

export const selectJobListings = (state) => state.jobListings.jobListings;

export default jobsSlice.reducer;