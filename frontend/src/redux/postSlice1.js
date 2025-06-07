import { createSlice } from "@reduxjs/toolkit";
const postSlice1 = createSlice({
    name:'post1',
    initialState:{
        posts:[],
        selectedPost:null,
    },
    reducers:{
        //actions
        setPosts:(state,action) => {
            state.posts = action.payload;
        },
        setSelectedPost:(state,action) => {
            state.selectedPost = action.payload;

        }
    }
});
export const {setPosts, setSelectedPost} = postSlice1.actions;
export default postSlice1.reducer;