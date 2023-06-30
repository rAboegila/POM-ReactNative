import { configureStore } from "@reduxjs/toolkit";

//Slices Reducers  Import
import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/profile/profileSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});
