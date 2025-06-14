import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  ALL_SHIPMENTS_ENDPOINT,
  CALCULATE_SHIPPING_COST_ENDPOINT,
  CREATE_SHIPMENT_ENDPOINT,
  TRACK_ENDPOINT,
  UPDATE_SHIPMENT_ENDPOINT,
} from "@configs";
import {
  baseResponse,
  baseResponseArray,
  ICalculateFeeResponse,
  IShipmentHistoryResponse,
  IShipmentResponse,
} from "@responses";
import { axiosInstance } from "@utils";
import { TrackingStatus } from "@enums";
import {
  ICalcualteFeeRequest,
  ICreateShipmentRequest,
} from "@typings/interfaces/requests";

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
export const calculateShippingFeeAction = createAsyncThunk(
  "shipment/calculate-fee",
  async (data: ICalcualteFeeRequest, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<baseResponse<ICalculateFeeResponse>>(
        CALCULATE_SHIPPING_COST_ENDPOINT,
        data
      );
      if (res.data.body) {
        return res.data.body;
      }
      return rejectWithValue("No data returned from fee calculation");
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Error while calculating shipping fee"
      );
    }
  }
);
export const createShipmentAction = createAsyncThunk(
  "shipment/create",
  async (data: ICreateShipmentRequest, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post<baseResponse<IShipmentResponse>>(
        CREATE_SHIPMENT_ENDPOINT,
        data
      );
      if (res.data.body) {
        return res.data.body;
      }
      return rejectWithValue("No data returned from shipment creation");
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message ||
          err.message ||
          "Error while creating shipment"
      );
    }
  }
);
