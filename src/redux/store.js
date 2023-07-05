import { configureStore } from "@reduxjs/toolkit";

//Slices Reducers  Import
import authReducer from "./features/auth/authSlice";
import profileReducer from "./features/profile/profileSlice";
import ticketReducer from "./features/tickets/ticketSlice";
import eventsReducer from "./features/events/eventSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    ticket: ticketReducer,
    events: eventsReducer,
  },
});
