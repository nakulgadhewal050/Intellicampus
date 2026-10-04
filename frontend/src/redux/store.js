import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import ticketSlice from "./ticketSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    ticket: ticketSlice,
  },
});

export default store;
