import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    selectedTicket: null,
    loading: false,
    error: null,
    success: null,
    filters: {
      status: "",
      category: "",
      priority: "",
      search: "",
    },
  },

  reducers: {
    setUserTickets: (state, action) => {
      state.tickets = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addTicket: (state, action) => {
      state.tickets.unshift(action.payload);
    },
    updateTicket: (state, action) => {
      const i = state.tickets.findIndex((t) => t._id === action.payload._id);
      if (i !== -1) state.tickets[i] = action.payload;
      if (state.selectedTicket?._id === action.payload._id) {
        state.selectedTicket = action.payload;
      }
    },
    removeTicket: (state, action) => {
      state.tickets = state.tickets.filter((t) => t._id !== action.payload);
    },
    setSelectedTicket: (state, action) => {
      state.selectedTicket = action.payload;
    },
    setTicketLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTicketError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { status: "", category: "", priority: "", search: "" };
    },
  },
});

export const {
  setUserTickets,
  addTicket,
  updateTicket,
  removeTicket,
  setSelectedTicket,
  setTicketLoading,
  setTicketError,
  setFilters,
  clearFilters
} = ticketSlice.actions;

export default ticketSlice.reducer;
