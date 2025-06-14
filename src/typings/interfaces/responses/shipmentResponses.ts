import { TrackingStatus } from "@typings/enums";

export interface IShipmentResponse {
  id: number;
  clientId: number;
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  recipientCity: string;
  recipientPostalCode: string;
  recipientAddress: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  senderCity: string;
  senderPostalCode: string;
  packageDescription: string;
  weight: number;
  dimensions: string;
  specialInstructions: string;
  currentStatus: TrackingStatus;
  createdAt: string;
  updatedAt: string;
  deliveryCharge: number;
  paymentStatus: boolean;
}

export interface IHistoryRecord {
  id: number;
  shipmentId: number;
  status: TrackingStatus;
  createdAt: string;
  updatedAt: string;
}

export interface IShipmentHistoryResponse extends IShipmentResponse {
  trackingHistory: IHistoryRecord[];
}

export interface ICalculateFeeResponse {
  deliveryFee: number;
}
