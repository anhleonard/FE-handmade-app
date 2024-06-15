import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type StoreStateRedux = {
  name: string;
};

const initialState: StoreStateRedux = {
  name: "",
};

export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    removeStore: (state) => {
      state.name = "";
    },
    addStore: (state, action: PayloadAction<StoreStateRedux>) => {
      state.name = action.payload.name;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeStore, addStore } = storeSlice.actions;

export default storeSlice.reducer;
