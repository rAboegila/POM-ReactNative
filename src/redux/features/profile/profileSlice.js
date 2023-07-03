import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { apiToken } from "../../../lib/api";
import axios from "axios";
import { Announcements } from "../../../lib/types";
import { GOVERNMENTS, INTERESTS } from "../../../lib/enums";

const initialState = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  profilePic: "",
  phoneNumber: "",
  dob: "",
  city: "",
  role: "",
  interests: "",
  announcements: [],
  isSuspended: false,
  forgotPasswordToken: null,
  forgotPasswordTokenExpires: null,
  isDirty: false,
};

//helpers

function setProfile(state, profile) {
  state.firstName = profile.firstName;
  state.lastName = profile.lastName;
  state.username = profile.username;
  state.email = profile.email;
  state.profilePic = profile.profilePic;
  state.phoneNumber = profile.phoneNumber;
  state.dob = profile.dob;
  state.city = profile.city;
  state.role = profile.role;
  state.interests = profile.interests;
  state.announcements = profile.announcements;
  state.isSuspended = profile.isSuspended;
}

//Thunk Reducers
export const fetchProfile = createAsyncThunk(
  //action type string
  "profile/fetchProfile",
  // callback function
  (thunkAPI) => {
    return axios
      .get("http://192.168.1.108:5000/pom/auth/me", {
        headers: { Authorization: "Bearer " + store.getState().auth.token },
      })
      .then((res) => res.data);
  }
);

export const updateProfile = createAsyncThunk(
  //action type string
  "profile/updateProfile",
  // callback function
  (data) => {
    return apiToken(thunkAPI.getState)
      .put("auth/update", data)
      .then((res) => res.data);
  }
);

//Slice Reducers
const setIsDirty = (state, action) => {
  state.isDirty = action.payload;
};
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileUpdated: setIsDirty,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isDirty = false;
      setProfile(state, action.payload);
      console.log("fetch", state);
      state.error = "";
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isDirty = true;
      state.error = "";
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

//Slice Actions
export const { profileUpdated } = profileSlice.actions;
//Slice Getters
export const getUserInfo = (state) => {
  // console.log("get user info\n", state);
  return state.profile;
  // firstName: state.profile.firstName,
  // lastName: state.profile.lastName,
  // username: state.profile.username,
  // email: state.profile.email,
  // profilePic: state.profile.profilePic,
  // phoneNumber: state.profile.phoneNumber,
  // dob: state.profile.dob,
  // city: state.profile.city,
  // role: state.profile.role,
  // interests: state.profile.interests,
  // announcements: state.profile.announcements,
  // isSuspended: state.profile.isSuspended,
};

export default profileSlice.reducer;
