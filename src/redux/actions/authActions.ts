import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "@configs";
import { ILoginRequest, IRegisterRequest } from "@requests";
import { baseResponse, ILoginResponse, IRegisterResponse } from "@responses";
import { axiosInstance } from "@utils";

export const loginAction = createAsyncThunk(
  "auth/login",
  async (loginData: ILoginRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<baseResponse<ILoginResponse>>(
        LOGIN_ENDPOINT,
        loginData
      );
      if (response.data.body) {
        if (loginData.rememberMe) {
          localStorage.setItem("user", JSON.stringify(response.data.body));
        }
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.body.token}`;

        return response.data.body;
      } else {
        return rejectWithValue("Login failed, no user data returned");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error while logging in"
      );
    }
  }
);

export const registerAction = createAsyncThunk(
  "auth/register",
  async (registerData: IRegisterRequest, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post<
        baseResponse<IRegisterResponse>
      >(REGISTER_ENDPOINT, registerData);
      if (response.data.body) {
        localStorage.setItem("user", JSON.stringify(response.data.body));
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.body.token}`;
        return response.data.body;
      } else {
        return rejectWithValue("Registration failed, no user data returned");
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Error while registering"
      );
    }
  }
);
