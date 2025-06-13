import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, MapPin, IdCard } from "lucide-react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

import { Layout } from "@layouts";
import { CustomButton, CustomTextField } from "@atoms";
import { cityPostalCodeMap, validCityNames, validPostalCodes } from "@data";
import { Autocomplete, CircularProgress } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@hooks";
import { useSnackbarContext } from "@providers";
import { registerAction } from "@redux-actions";
import { UserRole } from "@enums";

import Logo from "@images/halfLifeLogo.png";

const registerFormSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .max(60, "First name must be maximum 60 characters long"),
  lastName: yup
    .string()
    .required("Last name is required")
    .max(70, "Last name must be maximum 70 characters long"),
  email: yup
    .string()
    .email("Invalid email format")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^0[0-9]{9}$/, "Phone must start with 0 and be 10 digits long"),
  address: yup
    .string()
    .required("Address is required")
    .max(512, "Address must be maximum 512 characters long"),
  city: yup
    .string()
    .required("City is required")
    .oneOf(validCityNames, "Invalid city name"),
  postalCode: yup
    .string()
    .required("Postal code is required")
    .oneOf(validPostalCodes, "Invalid postal code"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(24, "Password must be maximum 24 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  NIC: yup
    .string()
    .required("NIC is required")
    .matches(
      /^(([5-9]{1})([0-9]{1})([0-3,5-8]{1})([0-9]{6})([vVxX]))|(([1-2]{1})([0,9]{1})([0-9]{2})([0-3,5-8]{1})([0-9]{7}))/,
      "Invalid NIC format"
    ),
});
type IRegisterFormData = yup.InferType<typeof registerFormSchema>;

export const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const snackbar = useSnackbarContext();
  const { registerLoading } = useAppSelector((state) => state.auth);

  const { control, handleSubmit, setValue, trigger } =
    useForm<IRegisterFormData>({
      resolver: yupResolver(registerFormSchema),
    });

  const handleOnSubmit = async (formData: IRegisterFormData) => {
    try {
      const regRes = await dispatch(registerAction(formData)).unwrap();
      if (regRes) {
        if (regRes.role === UserRole.ADMIN) {
          navigate("/admin/dashboard");
        } else if (regRes.role === UserRole.USER) {
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
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join Half Life Courier Service today
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(handleOnSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="mt-1 relative">
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomTextField
                        {...field}
                        id="firstName"
                        placeholder="John"
                        fieldState={fieldState}
                        StartIcon={User}
                      />
                    )}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="mt-1 relative">
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomTextField
                        {...field}
                        id="lastName"
                        placeholder="Doe"
                        fieldState={fieldState}
                        StartIcon={User}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="NIC"
                className="block text-sm font-medium text-gray-700"
              >
                NIC Number
              </label>
              <div className="mt-1 relative">
                <Controller
                  name="NIC"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomTextField
                      {...field}
                      id="NIC"
                      type="text"
                      placeholder="123456789V"
                      fieldState={fieldState}
                      StartIcon={IdCard}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative">
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomTextField
                      {...field}
                      id="email"
                      type="email"
                      placeholder="sample@sample.com"
                      fieldState={fieldState}
                      StartIcon={Mail}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1 relative">
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomTextField
                      {...field}
                      id="phone"
                      type="tel"
                      placeholder="0712345678"
                      fieldState={fieldState}
                      StartIcon={Phone}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <div className="mt-1 relative">
                <Controller
                  name="address"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomTextField
                      {...field}
                      id="address"
                      placeholder="123 Main St, City"
                      fieldState={fieldState}
                      StartIcon={MapPin}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      options={validCityNames}
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          id="city"
                          placeholder="Select your city"
                          fieldState={fieldState}
                          StartIcon={MapPin}
                        />
                      )}
                      onChange={(event, value) => {
                        field.onChange(value);
                        if (value && cityPostalCodeMap[value]) {
                          setValue("postalCode", cityPostalCodeMap[value]);
                        } else {
                          setValue("postalCode", "");
                        }
                        trigger("postalCode");
                      }}
                      value={field.value || ""}
                      className="mt-1"
                    />
                  )}
                />
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Autocomplete
                      options={validPostalCodes}
                      disabled
                      renderInput={(params) => (
                        <CustomTextField
                          {...params}
                          id="postalCode"
                          placeholder="Select postal code"
                          fieldState={fieldState}
                          StartIcon={MapPin}
                        />
                      )}
                      onChange={(event, value) => {
                        field.onChange(value);
                      }}
                      value={field.value || ""}
                      className="mt-1"
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
                      type="password"
                      placeholder="●●●●●●●●"
                      fieldState={fieldState}
                      StartIcon={Lock}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field, fieldState }) => (
                    <CustomTextField
                      {...field}
                      id="confirmPassword"
                      type="password"
                      placeholder="●●●●●●●●"
                      fieldState={fieldState}
                      StartIcon={Lock}
                    />
                  )}
                />
              </div>
            </div>

            <div>
              <CustomButton
                type="submit"
                className="w-full"
                disabled={registerLoading}
              >
                {registerLoading ? (
                  <CircularProgress size={20} className="!text-white" />
                ) : (
                  "Create Account"
                )}
              </CustomButton>
            </div>

            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Sign in here
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
