import { createSlice } from '@reduxjs/toolkit'

//JOBLISTINGS SLICE
const jobApplications = createSlice({
    name: "jobApplications",

    initialState: {
        jobApplications: undefined
    },
    reducers: {
        updateUserJobApplications: (state, action) => {
            state.jobApplications = action.payload
        },
    }
})

export const { updateUserJobApplications } = jobApplications.actions;

export const selectUserJobApplications = (state) => state.jobApplications.jobApplications;

export default jobApplications.reducer;