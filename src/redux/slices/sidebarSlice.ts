import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: true,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSideBar: (state) => {
      state.isOpen = true;
    },
    closeSideBar: (state) => {
      state.isOpen = false;
    },
  },
});
// Action creators are generated for each case reducer function
export const { openSideBar, closeSideBar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
