import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { authSlice, shipmentSlice } from "@redux-slices";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    shipment: shipmentSlice,
  },
});

export type IAppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IRootState,
  unknown,
  Action<string>
>;
