// axiosInstance.ts
import { BASE_URL } from "@configs";
import { ILoginResponse } from "@responses";
import axios, { InternalAxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const loggedUserStr = localStorage.getItem("user");
    const loggedUser = loggedUserStr
      ? (JSON.parse(loggedUserStr) as ILoginResponse)
      : null;
    const token = loggedUser?.token;
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance };
