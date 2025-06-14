export interface ICalcualteFeeRequest {
  weight: number;
  dimensions: string;
}

export interface ICreateShipmentRequest {
  recipientName: string;
  recipientPhone: string;
  recipientEmail?: string;
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
  specialInstructions?: string;
}
