import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  ALL_SHIPMENTS_ENDPOINT,
  TRACK_ENDPOINT,
  UPDATE_SHIPMENT_ENDPOINT,
} from "@configs";
import {
  baseResponse,
  baseResponseArray,
  IShipmentHistoryResponse,
  IShipmentResponse,
} from "@responses";
import { axiosInstance } from "@utils";
import { TrackingStatus } from "@enums";

export const getShipmentHistoryAction = createAsyncThunk(
  "shipment/getHistory",
  async (shipmentId: number, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<
        baseResponse<IShipmentHistoryResponse>
      >(TRACK_ENDPOINT(shipmentId));
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

export const getAllShipmentsAction = createAsyncThunk(
  "shipment/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<
        baseResponseArray<IShipmentResponse>
      >(ALL_SHIPMENTS_ENDPOINT);
      if (response.data.body) {
        return response.data.body;
      } else {
        return rejectWithValue("No shipments data returned");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error while fetching all shipments"
      );
    }
  }
);

export const updateShipmentAction = createAsyncThunk(
  "shipment/update",
  async (
    data: {
      shipmentId: number;
      paymentStatus: boolean;
      currentStatus: TrackingStatus;
    },
    { rejectWithValue }
  ) => {
    try {
      const { shipmentId, ...newData } = data;
      const res = await axiosInstance.patch<baseResponse<IShipmentResponse>>(
        UPDATE_SHIPMENT_ENDPOINT(shipmentId),
        newData
      );
      if (res.data.body) {
        return res.data.body;
      } else {
        return rejectWithValue("Failed to update shipment, no data returned");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error while fetching all shipments"
      );
    }
  }
);
