import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiToken } from "../../../lib/api";
import { Announcements } from "../../../lib/types";
import { GOVERNMENTS, INTERESTS } from "../../../lib/enums";

const initialState = {
  firstName: "",
  lastName: "",
  dob: "",
  phoneNumber: "",
  email: "",
  city: "",
  role: "",
  resetTokenString: " ",
  resetTokenDate: "",
  interests: "",
  announcements: [],
  isDirty: false,
};

//helpers
function setProfile(state, profile) {
  state.firstName = profile.firstName;
  state.lastName = profile.lastName;
  state.dob = profile.dob;
  state.phoneNumber = profile.phoneNumber;
  state.email = profile.email;
  state.city = profile.city;
  state.role = profile.role;
  state.resetTokenString = profile.resetTokenString;
  state.resetTokenDate = profile.resetTokenDate;
  state.interests = profile.interests;
  state.announcements = profile.announcements;
}

//Thunk Reducers
const fetchProfile = createAsyncThunk(
  //action type string
  "profile/fetchProfile",
  // callback function
  (thunkAPI) => {
    return apiToken(thunkAPI.getState)
      .get("auth/me")
      .then((res) => res.data);
  }
);

const updateProfile = createAsyncThunk(
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
  if (state.auth.loggedIn) {
    return {
      firstName: state.profile.firstName,
      lastName: state.profile.lastName,
      dob: state.profile.dob,
      phoneNumber: state.profile.phoneNumber,
      email: state.profile.email,
      city: state.profile.city,
      interests: state.profile.interests,
    };
  }
};

export default profileSlice.reducer;
