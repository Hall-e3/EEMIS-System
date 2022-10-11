import { createAsyncThunk } from "@reduxjs/toolkit";
import { eemisApi, TokenConfig } from "../../Api";

export const get = createAsyncThunk(
  "worker/get",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { data } = await eemisApi.get("/workers/", TokenConfig(getState));
      return data.results[0];
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const update = createAsyncThunk(
  "worker/update",
  async (workerData, { getState, rejectWithValue, dispatch }) => {
    const { id } = {...workerData};
    try {
      const { data } = await eemisApi.patch(
        `/workers/${id}/`,
        workerData,
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
