import { UserRole } from "@typings/enums";

export interface ILoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phone: string;
  NIC: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  token: string;
}

export type IRegisterResponse = ILoginResponse;
