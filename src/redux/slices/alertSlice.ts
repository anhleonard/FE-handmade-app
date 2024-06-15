import { AlertStatus } from "@/enum/constants";
import { AlertState } from "@/enum/defined-type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: AlertState = {
  isOpen: false,
  title: "Error",
  message: "This is an error",
  type: "error",
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    closeAlert: (state) => {
      state.isOpen = false;
      state.type = AlertStatus?.ERROR;
      state.title = "";
      state.message = "";
    },
    openAlert: (state, action: PayloadAction<AlertState>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openAlert, closeAlert } = alertSlice.actions;

export default alertSlice.reducer;
