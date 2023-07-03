import { createSlice } from "@reduxjs/toolkit";
import { saveToken } from "../../../lib/secureStorage";
const initialState = {
  loggedIn: false,
  token: null,
  loading: true,
};

const setTokenReducer = (state, action) => {
  state.token = action.payload;
  saveToken(action.payload);
};
const setLoggedInReducer = (state, action) => {
  state.loggedIn = action.payload;
};
const loggedInReducer = (state, action) => {
  state.loggedIn = true;
  state.token = action.payload;
};
const loggedOutReducer = (state) => {
  state.loggedIn = false;
  state.token = null;
};
const setLoadingReducer = (state, action) => {
  state.loading = action.payload;
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedInUpdated: setLoggedInReducer,
    setToken: setTokenReducer,
    loggedOut: loggedOutReducer,
    loggedIn: loggedInReducer,
    setAppLoading: setLoadingReducer,
  },
});

//Slice Actions
export const { loggedInUpdated, setAppLoading, setToken, loggedOut, loggedIn } =
  authSlice.actions;

//Slice Getters
export const getLoggedIn = (state) => state.auth.loggedIn;
export const getToken = (state) => state.auth.token;

export const isAppLoading = (state) => state.auth.loading;

export default authSlice.reducer;
