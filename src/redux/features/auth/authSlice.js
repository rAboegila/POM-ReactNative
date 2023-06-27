import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  token:null,
};

const setTokenReducer = (state,action)=>{
  console.log(action.payload,"hi");
  state.token = action.payload;
}
const setLoggedInReducer = (state, action) => {
  state.loggedIn = action.payload;
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loggedInUpdated: setLoggedInReducer,
    setToken: setTokenReducer,
  },
});

//Slice Actions
export const { loggedInUpdated,setToken } = authSlice.actions;

//Slice Getters
export const getLoggedIn = (state) => state.auth.loggedIn;
export const getToken = (state) => state.auth.token;

export default authSlice.reducer;
