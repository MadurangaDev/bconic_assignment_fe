import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { Layout } from "@layouts";
import { CustomButton, CustomTextField } from "@atoms";
import Logo from "@images/halfLifeLogo.png";
import { useAppDispatch, useAppSelector } from "@hooks";
import { loginAction } from "@redux-actions";
import { CircularProgress } from "@mui/material";
import { useSnackbarContext } from "@providers";
import { UserRole } from "@typings/enums";

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  rememberMe: yup.boolean().default(true).required(),
});
type ILoginFormData = yup.InferType<typeof loginFormSchema>;

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snackbar = useSnackbarContext();
  const { loginLoading } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const { control, handleSubmit } = useForm<ILoginFormData>({
    resolver: yupResolver(loginFormSchema),
  });

  const handleOnSubmit = async (formData: ILoginFormData) => {
    try {
      const loginRes = await dispatch(loginAction(formData)).unwrap();
      if (loginRes) {
        if (loginRes.role === UserRole.ADMIN) {
          navigate("/admin/dashboard");
        } else if (loginRes.role === UserRole.USER) {
          navigate("/user/dashboard");
        }
      }
    } catch (error: string | any) {
      snackbar.showSnackbar(error || "Login failed", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col justify-center py-12 pb-24 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src={Logo} className="h-12" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to your Half Life Courier account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-xl sm:px-10 border border-gray-200">
          <form className="space-y-6" onSubmit={handleSubmit(handleOnSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomTextField
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Sample@sample.com"
                      fieldState={fieldState}
                      StartIcon={Mail}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomTextField
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="●●●●●●●●"
                      fieldState={fieldState}
                      StartIcon={Lock}
                      EndIcon={showPassword ? EyeOff : Eye}
                      slotProps={{
                        endIcon: {
                          onClick: () => setShowPassword(!showPassword),
                        },
                      }}
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Controller
                  name="rememberMe"
                  control={control}
                  render={({ field }) => (
                    <input
                      onChange={field.onChange}
                      checked={field.value}
                      defaultChecked
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  )}
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <CustomButton
                type="submit"
                className="w-full"
                disabled={loginLoading}
              >
                {loginLoading ? (
                  <CircularProgress size={20} className="!text-white" />
                ) : (
                  "Sign In"
                )}
              </CustomButton>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    New to Half Life Courier?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link to="/auth/register">
                  <CustomButton
                    variant="outlined"
                    className="w-full"
                    disabled={loginLoading}
                  >
                    {loginLoading ? (
                      <CircularProgress size={20} />
                    ) : (
                      "Create Account"
                    )}
                  </CustomButton>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
