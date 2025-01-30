import { createSlice } from "@reduxjs/toolkit";

interface UIState {
  isCollapsed: boolean;
}

const initialState: UIState = {
  isCollapsed: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
  },
});

export const { toggleSidebar } = uiSlice.actions;
export const selectIsCollapsed = (state: { ui: UIState }) =>
  state.ui.isCollapsed;
export default uiSlice.reducer;
