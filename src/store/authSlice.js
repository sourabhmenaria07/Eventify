import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "loading", // 'loading' | 'loggedIn' | 'loggedOut',
  userData: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = "loggedIn";
      state.userData = action.payload.userData;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    logout: (state) => {
      state.status = "loggedOut";
      state.userData = null;
    },
  },
});

export const { login, setStatus, logout } = authSlice.actions;

export default authSlice.reducer;
