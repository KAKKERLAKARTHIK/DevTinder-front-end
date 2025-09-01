import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: {
    feed: null,  
  },
  reducers: {
    feedData: (state, action) => {
      state.feed = action.payload;
    },
    removeFeed: (state,action) => {
      const newFeed = state.feed.filter((data) => data._id !== action.payload);
      state.feed = newFeed
    },
  },
});

export const { feedData,removeFeed } = feedSlice.actions;  
export default feedSlice.reducer; 
