import { IDCardState } from "@/enum/defined-type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: IDCardState = {
  sellerId: -9999,
  frontCard: "",
  backCard: "",
};

export const idCardSlice = createSlice({
  name: "idCards",
  initialState,
  reducers: {
    addSellerId: (state, action: PayloadAction<IDCardState>) => {
      state.sellerId = action.payload.sellerId;
    },
    addFrontCard: (state, action: PayloadAction<IDCardState>) => {
      state.frontCard = action.payload.frontCard;
    },
    addBackCard: (state, action: PayloadAction<IDCardState>) => {
      state.backCard = action.payload.backCard;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSellerId, addFrontCard, addBackCard } = idCardSlice.actions;

export default idCardSlice.reducer;
