import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { TRACK_ENDPOINT } from "@configs";
import { baseResponse, IShipmentHistoryResponse } from "@responses";

export const getShipmentHistoryAction = createAsyncThunk(
  "shipment/getHistory",
  async (shipmentId: number, { rejectWithValue }) => {
    try {
      const response = await axios.get<baseResponse<IShipmentHistoryResponse>>(
        TRACK_ENDPOINT(shipmentId)
      );
      if (response.data.body) {
        return response.data.body;
      } else {
        return rejectWithValue("No shipment history data returned");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error while fetching shipment history"
      );
    }
  }
);
