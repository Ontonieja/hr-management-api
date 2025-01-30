import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import uiReducer from "./uiSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
