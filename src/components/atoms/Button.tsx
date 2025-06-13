import { Button } from "@mui/material";
import { FC, ReactNode } from "react";

interface ICustomButtonProps {
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: ReactNode;
  variant?: "text" | "outlined" | "contained";
}

export const CustomButton: FC<ICustomButtonProps> = ({
  className = "",
  onClick,
  type = "button",
  disabled = false,
  children,
  variant = "contained",
}) => {
  return (
    <Button
      variant={variant}
      type={type}
      className={`flex justify-center py-3 px-4 border border-${
        variant === "outlined" ? "blue-300" : "transparent"
      } !rounded-[8px] shadow-sm text-sm font-medium text-${
        variant === "contained" ? "white" : "blue-600"
      } bg-blue-600 hover:bg-${
        variant === "contained" ? "blue-700" : "blue-50"
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors !normal-case !py-[10px] ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
