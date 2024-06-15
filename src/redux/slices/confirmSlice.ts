import { ConfirmState } from "@/enum/defined-type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ConfirmState = {
  isOpen: false,
  title: "",
  message: "",
  feature: "",
  onConfirm: () => {},
};

export const confirmSlice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    closeConfirm: (state) => {
      state.isOpen = false;
      state.title = "";
      state.message = "";
      state.feature = "";
      state.onConfirm = () => {};
    },
    openConfirm: (state, action: PayloadAction<ConfirmState>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.message = action.payload.message;
      state.feature = action.payload.feature;
      state.onConfirm = action.payload.onConfirm;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openConfirm, closeConfirm } = confirmSlice.actions;

export default confirmSlice.reducer;
