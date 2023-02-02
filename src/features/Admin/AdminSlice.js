import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    userData: {},
}
export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addUserData: (state, action) => {
            state.userData = action.payload
        },
    },
})

export const { addUserData } = adminSlice.actions

export const selectUserData = (state) => state.admin.userData

export default adminSlice.reducer