import { configureStore } from "@reduxjs/toolkit";

//Slices Import
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
