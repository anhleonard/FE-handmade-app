import { ModalState } from "@/enum/defined-type";
import { SCREEN } from "@/enum/setting";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalState = {
  isOpen: false,
  title: "Modal title",
  content: "",
  screen: SCREEN.BASE,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isOpen = false;
      state.title = "";
      state.content = "";
      state.screen = SCREEN.BASE;
    },
    openModal: (state, action: PayloadAction<ModalState>) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.screen = action.payload.screen
        ? action.payload.screen
        : SCREEN.BASE;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
