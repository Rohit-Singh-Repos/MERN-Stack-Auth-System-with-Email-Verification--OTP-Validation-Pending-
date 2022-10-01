import { createSlice } from '@reduxjs/toolkit';

const userTokenSlice = createSlice({
    name:"userTokenSlice",
    initialState:{
        userTokenDataState:[]
    },
    reducers:{
        userTokenDataStateAction:(state,action) => {
            state.userTokenDataState = action.payload
        },
        resetUserTokenDataStateAction:(state) => {
            state.userTokenDataState = []
        }
    }
})

export const { userTokenDataStateAction, resetUserTokenDataStateAction } = userTokenSlice.actions;
export default userTokenSlice.reducer;