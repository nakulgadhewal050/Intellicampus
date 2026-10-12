import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice.js";
import ticketSlice from "./ticketSlice.js";
import allUserSlice from "./allUserSlice.js";

const store = configureStore({
  reducer: {
    user: userSlice,
    ticket: ticketSlice,
    allUser: allUserSlice,
  },
});

export default store;
