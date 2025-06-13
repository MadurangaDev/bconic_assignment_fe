import { createSlice } from "@reduxjs/toolkit";

import {
  getAllShipmentsAction,
  getShipmentHistoryAction,
} from "@redux-actions";
import { IShipmentHistoryResponse, IShipmentResponse } from "@responses";

interface IShipmentSlice {
  trackingResponse: IShipmentHistoryResponse | null;
  trackingError: string | null;
  trackingLoading: boolean;

  allShipmentsResponse: IShipmentResponse[] | null;
  allShipmentsError: string | null;
  allShipmentsLoading: boolean;
}

const initialState: IShipmentSlice = {
  trackingResponse: null,
  trackingError: null,
  trackingLoading: false,

  allShipmentsResponse: null,
  allShipmentsError: null,
  allShipmentsLoading: false,
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

    builder
      .addCase(getAllShipmentsAction.pending, (state) => {
        state.allShipmentsResponse = null;
        state.allShipmentsError = null;
        state.allShipmentsLoading = true;
      })
      .addCase(getAllShipmentsAction.fulfilled, (state, action) => {
        state.allShipmentsResponse = action.payload;
        state.allShipmentsError = null;
        state.allShipmentsLoading = false;
      })
      .addCase(getAllShipmentsAction.rejected, (state, action) => {
        state.allShipmentsResponse = null;
        state.allShipmentsError =
          action.error.message || "Error while fetching all shipments";
        state.allShipmentsLoading = false;
      });
  },
});

export const shipmentSlice = slice.reducer;
export const shipmentActions = slice.actions;
