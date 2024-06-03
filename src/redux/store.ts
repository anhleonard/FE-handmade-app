import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modalSlice";
import confirmSlice from "./slices/confirmSlice";
import loadingSlice from "./slices/loadingSlice";
import alertSlice from "./slices/alertSlice";
import refetchSlice from "./slices/refetchSlice";
import secondModalSlice from "./slices/secondModalSlice";
import idCardSlice from "./slices/idCardSlice";
import sidebarSlice from "./slices/sidebarSlice";

export const store = configureStore({
  reducer: {
    modal: modalSlice,
    secondModal: secondModalSlice,
    confirm: confirmSlice,
    loading: loadingSlice,
    alert: alertSlice,
    refetch: refetchSlice,
    idCards: idCardSlice,
    sidebar: sidebarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
