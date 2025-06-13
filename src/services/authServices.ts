import { authActions } from "@redux-slices";
import { IAppDispatch } from "@redux/store";
import { ILoginResponse } from "@typings/interfaces/responses";

export const initializeAuthTokens = (dispatch: IAppDispatch) => {
  const user = localStorage.getItem("user")
    ? (JSON.parse(localStorage.getItem("user") as string) as ILoginResponse)
    : null;
  if (user) {
    dispatch(authActions.setUser(user));
  }
};
