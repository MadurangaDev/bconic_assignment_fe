const BASE_URL = "http://localhost:3000";

export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`;
export const REGISTER_ENDPOINT = `${BASE_URL}/auth/register`;
export const TRACK_ENDPOINT = (shipmentId: number) =>
  `${BASE_URL}/shipments/${shipmentId}/history`;
