import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";

import { routers } from "@configs";
import { IAppDispatch, store } from "@redux/store";
import { initializeAuthTokens } from "@services";
import { SnackbarProvider } from "@providers";

import "@assets/css/index.css";

const App = () => {
  const dispatch = useDispatch<IAppDispatch>();

  useEffect(() => {
    initializeAuthTokens(dispatch);
  }, [dispatch]);
  return <RouterProvider router={routers} />;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </Provider>
  </StrictMode>
);
