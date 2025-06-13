import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { loginAction, registerAction } from "@redux-actions";
import { ILoginResponse, IRegisterResponse } from "@responses";

interface IAuthSlice {
  token: string | null;
  user: ILoginResponse | null;

  loginResponse: ILoginResponse | null;
  loginLoading: boolean;
  loginError: string | null;

  registerResponse: IRegisterResponse | null;
  registerLoading: boolean;
  registerError: string | null;
}

const initialState: IAuthSlice = {
  token: null,
  user: null,

  loginResponse: null,
  loginLoading: false,
  loginError: null,

  registerResponse: null,
  registerLoading: false,
  registerError: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<ILoginResponse>) => {
      state.user = action.payload;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loginResponse = null;
      state.registerResponse = null;

      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginAction.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
        state.loginResponse = null;
      })
      .addCase(
        loginAction.fulfilled,
        (state, action: PayloadAction<ILoginResponse>) => {
          state.loginLoading = false;
          state.loginError = null;
          state.token = action.payload.token;
          state.user = action.payload;
          state.loginResponse = action.payload;
        }
      )
      .addCase(loginAction.rejected, (state, action) => {
        state.loginLoading = false;
        state.loginError = action.error.message || "Login failed";
        state.loginResponse = null;
      });
    builder
      .addCase(registerAction.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
        state.registerResponse = null;
      })
      .addCase(
        registerAction.fulfilled,
        (state, action: PayloadAction<IRegisterResponse>) => {
          state.registerLoading = false;
          state.registerError = null;
          state.token = action.payload.token;
          state.user = action.payload;
          state.registerResponse = action.payload;
        }
      )
      .addCase(registerAction.rejected, (state, action) => {
        state.registerLoading = false;
        state.registerError = action.error.message || "Registration failed";
        state.registerResponse = null;
      });
  },
});

export const authSlice = slice.reducer;
export const authActions = slice.actions;
