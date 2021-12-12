import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: null,
      isFetching: false,
      error: false,
    },
    msg: "",
  },
  reducers: {
    getUsersStart: (state) => {
      state.users.isFetching = true;
    },
    getUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.error = false;
      state.users.allUsers = action.payload;
    },
    getUsersFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUsersStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUsersSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.error = false;
      state.msg = action.payload;
    },
    deleteUsersFailed: (state, action) => {
      state.users.isFetching = false;
      state.users.error = true;
      state.msg = action.payload;
    },
    clearUserList: (state) => {
      state.users.allUsers = null;
      state.users.isFetching = false;
      state.users.error = false;
      state.msg = null;
    },
  },
});

export const {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFailed,
  clearUserList,
} = userSlice.actions;
export default userSlice.reducer;
