import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  events: [],
};
import { apiToken } from "../../../lib/api";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const tokenInstance = await apiToken();
  return tokenInstance
    .get("Event/events")
    .then((res) => res.data)
    .catch((res) => res.response?.error);
});

function setEvents(state, events) {
  state.events = events;
}
export const eventsSlice = createSlice({
  name: "events",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.pending, (state) => {
      console.log("events pending");
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      console.log("Events fulfilled");
      console.log(action.payload.data);
      setEvents(state, action.payload.data);
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      console.log("events rejected", action.payload);
    });
  },
});

export const getEvents = (state) => state.events.events;

export default eventsSlice.reducer;
