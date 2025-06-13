import {
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField";
import { LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import { ControllerFieldState } from "react-hook-form";

type ICustomTextFieldProps = TextFieldProps & {
  fieldState: ControllerFieldState;
  StartIcon?: LucideIcon;
  EndIcon?: LucideIcon;
  slotProps?: {
    endIcon?: {
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      className?: string;
    };
  };
};

// 👇 forwardRef required for MUI autocomplete to manage focus
export const CustomTextField = forwardRef<
  HTMLInputElement,
  ICustomTextFieldProps
>(
  (
    {
      id,
      placeholder,
      type = "text",
      className = "",
      fieldState,
      StartIcon,
      EndIcon,
      slotProps,
      InputProps,
      ...otherProps
    },
    ref
  ) => {
    return (
      <>
        <TextField
          id={id}
          type={type}
          className={`appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${className}`}
          placeholder={placeholder}
          variant="outlined"
          size="medium"
          error={fieldState.invalid}
          // 👇 Correctly merge adornments with Autocomplete props
          InputProps={{
            ...InputProps,
            inputRef: ref, // 👈 critical for Autocomplete
            startAdornment: StartIcon ? (
              <InputAdornment position="start">
                <StartIcon className="h-5 w-5 text-gray-400" />
              </InputAdornment>
            ) : (
              InputProps?.startAdornment
            ),
            endAdornment: EndIcon ? (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={slotProps?.endIcon?.onClick}
                  className="group"
                >
                  <EndIcon
                    className={`h-5 w-5 text-gray-400 group-hover:text-gray-600 ${
                      slotProps?.endIcon?.className ?? ""
                    }`}
                  />
                </IconButton>
              </InputAdornment>
            ) : (
              InputProps?.endAdornment
            ),
          }}
          {...otherProps}
        />

        <FormHelperText error={fieldState.invalid}>
          {fieldState.error?.message}
        </FormHelperText>
      </>
    );
  }
);

CustomTextField.displayName = "CustomTextField";
