import { configureStore } from "@reduxjs/toolkit";
import reducer from "./authSlice";
import appReducer from "./appSlice";

const store = configureStore({
  reducer: {
    auth: reducer,
    app: appReducer,
  },
});

export default store;
