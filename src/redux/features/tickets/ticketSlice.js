import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import api from "../../../lib/api";
import { getSavedToken } from "../../../lib/secureStorage";

const initialState = {
  tickets: null,
  isDirty: false,
};

//Slice Reducers
const setIsDirty = (state, action) => {
  state.isDirty = action.payload;
};

//Thunk Reducers
export const fetchTickets = createAsyncThunk(
  "ticket/fetchTickets",
  async (userID) => {
    const token = await getSavedToken();

    const res = await api
      .get("Ticket/tickets/user/" + userID, {
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

export const createTicket = createAsyncThunk(
  "ticket/createTicket",
  async (args) => {
    const token = await getSavedToken();

    const res = await api
      .put("Ticket/ticket", args, {
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
// export const fetchTicketEvent = createAsyncThunk(
//     "ticket/fetchTickets",
//     async (userID) => {
//       const token = await getSavedToken();

//       const res = await api
//         .get("Ticket/tickets/user/" + userID, {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         })
//         .then((res) => {
//           return res.data;
//         })
//         .catch((err) => {
//           console.log(err.request.data);
//         });
//       return res;
//     }
//   );
export const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    ticketsUpdated: setIsDirty,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTickets.pending, (state) => {
      console.log("fetch tickets pending");
      state.loading = true;
    });
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      console.log("fetch tickets fulfilled", action.payload);
      state.loading = false;
      state.tickets = action.payload.data;
      state.error = "";
    });
    builder.addCase(fetchTickets.rejected, (state, action) => {
      console.log("fetch tickets rejected > ", action.error.message);

      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createTicket.pending, (state) => {
      console.log("createTicket pending");
      state.loading = true;
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      console.log("createTicket fulfilled", action.payload);
      state.loading = false;
      state.tickets.push(action.payload.data);
      state.error = "";
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      console.log("createTicket rejected > ", action.error.message);
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const getTickets = (state) => state.ticket.tickets;
export default ticketSlice.reducer;
