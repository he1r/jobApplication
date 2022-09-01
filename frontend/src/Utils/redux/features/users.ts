import { createSlice } from '@reduxjs/toolkit'

//USERS SLICE
const usersSlice = createSlice({
    name: "users",

    initialState: {
        users: undefined
    },
    reducers: {
        updateUsers: (state, action) => {
            state.users = action.payload
        },
    }
})

export const { updateUsers } = usersSlice.actions;

export const selectAllUsers = (state) => state.users.users;

export default usersSlice.reducer;