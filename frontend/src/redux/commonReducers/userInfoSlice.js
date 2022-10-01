import { createSlice } from '@reduxjs/toolkit';

const userInfoSlice = createSlice({
    name:"userInfoSlice",
    initialState:{
        userInfoDataState:[]
    },
    reducers:{
        userInfoDataStateAction:(state,action) => {
            state.userInfoDataState = action.payload
        },
        resetUserInfoStateAction:(state) => {
            state.userInfoDataState = []
        }
    }
})

export const { userInfoDataStateAction, resetUserInfoStateAction } = userInfoSlice.actions;
export default userInfoSlice.reducer;