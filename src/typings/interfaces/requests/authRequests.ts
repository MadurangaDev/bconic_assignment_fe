export interface ILoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  email: string;
  phone: string;
  NIC: string;
  password: string;
}
