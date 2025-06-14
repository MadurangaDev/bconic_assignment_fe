export const BASE_URL = "http://localhost:3000";

// Auth Endpoints
export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;
export const REGISTER_ENDPOINT = `${BASE_URL}/auth/register`;

// Shipment Endpoints
export const TRACK_ENDPOINT = (shipmentId: number) =>
  `${BASE_URL}/shipments/${shipmentId}/history`;
export const ALL_SHIPMENTS_ENDPOINT = `${BASE_URL}/shipments`;
export const UPDATE_SHIPMENT_ENDPOINT = (shipmentId: number) =>
  `${BASE_URL}/shipments/${shipmentId}`;
