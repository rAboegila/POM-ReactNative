import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import api from "../../../lib/api";
import axios from "axios";
import { getSavedToken } from "../../../lib/secureStorage";
import { Announcements } from "../../../lib/types";
import { GOVERNMENTS, INTERESTS } from "../../../lib/enums";

const initialState = {
  id: "",
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
  // console.log("setProfile-----------------\n", profile);
  state.id = profile._id;
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
  state.isDirty = false;

  // console.log("setProfile-----------------\n", state);
}

//Thunk Reducers
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async () => {
    const token = await getSavedToken();

    const res = await api
      .get("auth/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.request.data);
      });
    return res;
  }
);
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (args) => {
    const token = await getSavedToken();

    const res = await api
      .put("auth/update", args, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err.request.data);
      });
    return res;
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
      console.log("profile pending");

      state.loading = true;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      console.log("profile fullfilled", action.payload);
      state.loading = false;
      setProfile(state, action.payload.data);
      state.error = "";
    });
    builder.addCase(fetchProfile.rejected, (state, action) => {
      console.log("profile rejected > ", action.error.message);

      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.isDirty = true;
      console.log("update profile pending");
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      console.log("update profile fullfilled", action.payload);
      state.loading = false;
      setProfile(state, action.payload.data);
      state.error = "";
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      console.log("update profile rejected > ", action.error.message);

      state.loading = false;
      state.error = action.error.message;
    });
  },
});

//Slice Actions
export const { profileUpdated } = profileSlice.actions;
//Slice Getters
export const getFirstName = (state) => state.profile.firstName;
export const getLastName = (state) => state.profile.lastName;
export const getUserName = (state) => state.profile.username;
export const getEmail = (state) => state.profile.email;
export const getProfilePicture = (state) => state.profile.profilePicture;
export const getPhoneNumber = (state) => state.profile.phoneNumber;
export const getDOB = (state) => state.profile.dob;
export const getCity = (state) => state.profile.city;
export const getRole = (state) => state.profile.role;
export const getInterests = (state) => state.profile.interests;
export const getAnnouncements = (state) => state.profile.announcements;
export const isSuspended = (state) => state.profile.isSuspended;
export const getID = (state) => state.profile.id;

const getUserInfo = (state) => state.profile;
export const getMemoizedProfile = createSelector(getUserInfo, (profile) => {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    username: profile.username,
    email: profile.email,
    profilePic: profile.profilePic,
    phoneNumber: profile.phoneNumber,
    dob: profile.dob,
    city: profile.city,
    role: profile.role,
    interests: profile.interests,
    announcements: profile.announcements,
    isSuspended: profile.isSuspended,
  };
});

export default profileSlice.reducer;
