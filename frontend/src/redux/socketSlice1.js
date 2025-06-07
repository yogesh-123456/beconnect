import { createSlice } from "@reduxjs/toolkit";

const socketSlice1 = createSlice({
    name:"socketio1",
    initialState:{
        socket:null
    },
    reducers:{
        //actions
        setSocket:(state,action) => {
            state.socket = action.payload;
        }
    }
})
export const {setSocket} = socketSlice1.actions;
export default socketSlice1.reducer;