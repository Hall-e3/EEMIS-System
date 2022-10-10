import { configureStore } from "@reduxjs/toolkit";
import workerReducer from "./features/workers/workerSlice";
import authReducer from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    worker: workerReducer,
  },
});
