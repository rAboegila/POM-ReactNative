import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};

const setLoggedInReducer = (state, action) => {
  state.loggedIn = action.payload;
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedInUpdated: setLoggedInReducer,
  },
});

//Slice Actions
export const { loggedInUpdated } = authSlice.actions;

//Slice Getters
export const getLoggedIn = (state) => state.auth.loggedIn;

export default authSlice.reducer;
