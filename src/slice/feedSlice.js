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
  },
});

export const { feedData } = feedSlice.actions;  
export default feedSlice.reducer; 
