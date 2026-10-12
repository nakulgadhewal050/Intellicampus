import { createSlice } from "@reduxjs/toolkit";

const allUserSlice = createSlice({
  name: "allUser",
  initialState: {
  allUsers: [],
  totalUsers: 0,
  loading: false,
  error: null,
},
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload.users ?? [];
      state.totalUsers = action.payload.totalUsers ?? state.allUsers.length;
      state.loading = false;
      state.error = null;
    },
    setAllUserLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAllUserError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUsers: (state) => {
      state.allUsers = [];
      state.totalUsers = 0;
      state.error = null;
    },
  },
});

export const {
  setAllUsers,
  setAllUserLoading,
  setAllUserError,
  clearUsers,
} = allUserSlice.actions;

export default allUserSlice.reducer;