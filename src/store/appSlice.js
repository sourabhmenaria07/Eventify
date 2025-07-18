import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  globalLoading: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setGlobalLoading(state, action) {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = appSlice.actions;
export default appSlice.reducer;
