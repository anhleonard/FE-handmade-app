import { ModalState } from "@/enum/defined-type";
import { SCREEN } from "@/enum/setting";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: ModalState = {
  isOpen: false,
  title: "Second modal title",
  content: "",
  screen: SCREEN.BASE,
};

export const secondModalSlice = createSlice({
  name: "secondModal",
  initialState,
  reducers: {
    closeSecondModal: (state) => {
      state.isOpen = false;
      state.title = "";
      state.content = "";
      state.screen = SCREEN.BASE;
    },
    openSecondModal: (state, action: PayloadAction<ModalState>) => {
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
export const { openSecondModal, closeSecondModal } = secondModalSlice.actions;

export default secondModalSlice.reducer;
