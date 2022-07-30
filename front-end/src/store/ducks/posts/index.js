import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE = [];

const posts = createSlice({
    name: 'posts',
    initialState: INITIAL_STATE,
    reducers: {
        fetchPosts(state, { payload }) {
            return [...payload];
        }
    }
});

export const { fetchPosts } = posts.actions;

export default posts.reducer;