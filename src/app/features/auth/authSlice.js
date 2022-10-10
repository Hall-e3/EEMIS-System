import { createSlice } from "@reduxjs/toolkit";
import { loadUser, login, register, update_user } from "./authActions";
const initialState = {
  userInfo: null,
  login_loading: false,
  register_loading: false,
  register_success: false,
  update_loading: false,
  user_loading: false,
  error_loading: false,
  update_success: false,
  error: null,
  token:
    localStorage.getItem("auth_token") !== null &&
    localStorage.getItem("auth_token") !== undefined
      ? JSON.parse(localStorage.getItem("auth_token"))
      : null,
  active: false,
  isAuthenticated: false,
  isRegistered: false,
  message: null,
  reason: null,
  message_loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userInfo = null;
      state.isAuthenticated = false;
      state.active = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
      state.error_loading = false;
    },
    clearMessage: (state) => {
      state.message = null;
      state.reason = null;
      state.message_loading = false;
    },
    createMessage: (state, { payload }) => {
      state.message = payload.message;
      state.reason = payload.reason;
      state.message_loading = false;
    },
  },
  extraReducers: {
    // Login
    [login.pending]: (state) => {
      state.login_loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      localStorage.setItem("auth_token", JSON.stringify(payload.token));
      state.active = true;
      state.isAuthenticated = true;
      state.login_loading = false;
    },
    [login.rejected]: (state, { payload }) => {
      state.error = payload;
      state.login_loading = false;
    },

    //load user
    [loadUser.pending]: (state) => {
      state.user_loading = true;
      state.error = null;
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.user_loading = false;
    },
    [loadUser.rejected]: (state, { payload }) => {
      state.error = payload;
      state.user_loading = false;
    },

    // Registration
    [register.pending]: (state) => {
      state.register_loading = true;
      state.error = null;
    },
    [register.fulfilled]: (state) => {
      state.register_success = true;
      state.isRegistered = true;
      state.register_loading = false;
    },
    [register.rejected]: (state, { payload }) => {
      state.error = payload;
      state.register_loading = false;
      state.register_success = false;
    },

    // Profile
    [update_user.pending]: (state) => {
      state.update_loading = true;
      state.error = null;
    },
    [update_user.fulfilled]: (state, { payload }) => {
      state.userInfo = payload;
      state.update_success = true;
      state.update_loading = false;
    },
    [update_user.rejected]: (state, { payload }) => {
      state.error = payload;
      state.update_success = false;
      state.update_loading = false;
    },
  },
});

export const { logout, clearError, clearMessage, createMessage } =
  authSlice.actions;
export default authSlice.reducer;
