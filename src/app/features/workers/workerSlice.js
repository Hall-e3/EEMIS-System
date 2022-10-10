import { createSlice } from "@reduxjs/toolkit";
import { get, update } from "./workerActions";
const initialState = {
  workerInfo: null,
  update_loading: false,
  get_success: false,
  error: null,
};

const workerReducer = createSlice({
  name: "worker",
  initialState,
  reducers: {},
  extraReducers: {
    //get
    [get.pending]: (state) => {
      state.get_loading = true;
      state.error = null;
    },
    [get.fulfilled]: (state, { payload }) => {
      state.workerInfo = payload;
      state.get_loading = false;
    },
    [get.rejected]: (state, { payload }) => {
      state.error = payload;
      state.get_loading = false;
    },

    //update
    [update.pending]: (state) => {
      state.update_loading = true;
      state.error = null;
    },
    [update.fulfilled]: (state, { payload }) => {
      state.workerInfo = payload;
      state.update_loading = false;
    },
    [update.rejected]: (state, { payload }) => {
      state.error = payload;
      state.update_loading = false;
    },
  },
});

export default workerReducer.reducer;
