import { createAsyncThunk } from "@reduxjs/toolkit";
import { eemisApi, TokenConfig } from "../../Api";
// import { createMessage } from "./authSlice";

export const login = createAsyncThunk(
  "auth/login",
  async (loginDetails, { getState, rejectWithValue }) => {
    try {
      const { data } = await eemisApi.post(
        "/login/",
        loginDetails,
        TokenConfig(getState)
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await eemisApi.get("/users/me/", TokenConfig(getState));
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const register = createAsyncThunk(
  "auth/signup",
  async (registerDetails, { getState, rejectWithValue }) => {
    try {
      const { data } = await eemisApi.post(
        "/signup/",
        registerDetails,
        TokenConfig(getState)
      );
      console.log(data);
      //   return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const update_user = createAsyncThunk(
  "auth/update",
  async ({ id, profile }, { getState, rejectWithValue, dispatch }) => { 
    try {
      const { data } = await eemisApi.patch(
        `/users/${id}/`,
        profile,
        TokenConfig(getState)
      );
      return data;
      // if (data) {
      //   dispatch(
      //     createMessage("Successfully updated the profile", "profile_update")
      //   );
      // }
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);
