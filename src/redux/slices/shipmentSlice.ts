import { getShipmentHistoryAction } from "@redux/actions";
import { createSlice } from "@reduxjs/toolkit";
import { IShipmentHistoryResponse } from "@typings/interfaces/responses";

interface IShipmentSlice {
  trackingResponse: IShipmentHistoryResponse | null;
  trackingError: string | null;
  trackingLoading: boolean;
}

const initialState: IShipmentSlice = {
  trackingResponse: null,
  trackingError: null,
  trackingLoading: false,
};

const slice = createSlice({
  name: "shipment",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getShipmentHistoryAction.pending, (state) => {
        state.trackingResponse = null;
        state.trackingError = null;
        state.trackingLoading = true;
      })
      .addCase(getShipmentHistoryAction.fulfilled, (state, action) => {
        state.trackingResponse = action.payload;
        state.trackingError = null;
        state.trackingLoading = false;
      })
      .addCase(getShipmentHistoryAction.rejected, (state, action) => {
        state.trackingResponse = null;
        state.trackingError =
          action.error.message || "Error while fetching shipment history";
        state.trackingLoading = false;
      });
  },
});

export const shipmentSlice = slice.reducer;
export const shipmentActions = slice.actions;
