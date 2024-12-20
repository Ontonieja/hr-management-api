import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface User {
  id: number;
  firstName: string;
  email: string;
}
interface AuthState {
  user?: User | null;
  accessToken?: string | null;
  isAuthenticating: boolean;
}
const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem("accessToken") || null,
  isAuthenticating: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticating: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticating = action.payload;
    },
    setCredentials: (
      state,
      action: PayloadAction<{ user?: User; accessToken?: string }>
    ) => {
      const { user, accessToken } = action.payload;
      console.log(`user: ${user}, accessToken: ${accessToken}`);
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        state.accessToken = accessToken;
      }
      if (user) state.user = user;
      state.isAuthenticating = false;
    },
    logOut: (state) => {
      localStorage.removeItem("accessToken");
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logOut, setAuthenticating } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentToken = (state: RootState) => state.auth.accessToken;
export const isAuthenticating = (state: RootState) =>
  state.auth.isAuthenticating;
