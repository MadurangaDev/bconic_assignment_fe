import { FC, createContext, useState, useContext, ReactNode } from "react";
import { Snackbar, SnackbarCloseReason, Alert } from "@mui/material";

interface SnackbarMessage {
  key: number;
  message: string;
  variant: "success" | "error" | "warning" | "info";
  position: number;
}

interface SnackbarContextType {
  showSnackbar: (message: string, variant: SnackbarMessage["variant"]) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

const SnackbarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);

  const showSnackbar = (
    message: string,
    variant: SnackbarMessage["variant"]
  ) => {
    const key = new Date().getTime() + Math.random();
    setSnackbars((prev) => [
      ...prev.map((snackbar) => ({
        ...snackbar,
        position: snackbar.position + 1,
      })),
      { key, message, variant, position: 0 },
    ]);
  };

  const handleClose =
    (key: number) =>
    (_event?: React.SyntheticEvent | Event, reason?: SnackbarCloseReason) => {
      if (reason === "clickaway") return;
      setSnackbars((prev) => prev.filter((snackbar) => snackbar.key !== key));
    };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbars.map(({ key, message, variant, position }) => (
        <Snackbar
          key={key}
          open
          autoHideDuration={6000}
          onClose={handleClose(key)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          style={{ top: `${24 + position * 56}px`, position: "fixed" }} // Adjust the top position based on the index
        >
          <Alert
            onClose={handleClose(key)}
            severity={variant}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ))}
    </SnackbarContext.Provider>
  );
};

const useSnackbarContext = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      "useSnackbarContext must be used within a SnackbarProvider"
    );
  }
  return context;
};

export { SnackbarProvider, useSnackbarContext };
