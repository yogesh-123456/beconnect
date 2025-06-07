import { createSlice } from "@reduxjs/toolkit";

const chatSlice1 = createSlice({
    name:"chat1",
    initialState:{
        onlineUsers:[],
        messages:[],
    },
    reducers:{
        //actions
        setOnlineUsers:(state,action) => {
            state.onlineUsers = action.payload;
        },
        setMessages:(state,action) => {
            state.messages = action.payload;
        }
    }
})
export const {setOnlineUsers, setMessages} = chatSlice1.actions;
export default chatSlice1.reducer;