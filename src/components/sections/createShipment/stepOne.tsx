import { CustomButton, CustomTextField } from "@components/atoms";
import { cityPostalCodeMap, validCityNames, validPostalCodes } from "@data";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppSelector } from "@hooks";
import { Autocomplete } from "@mui/material";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface ICreateShipmentStepOneProps {
  onNext: (data: ISenderSchema) => void;
  populateData: ISenderSchema | null;
}

const senderSchema = yup.object().shape({
  senderName: yup.string().required("Sender name is required"),
  senderPhone: yup
    .string()
    .matches(/^0[0-9]{9}$/, "Phone must start with 0 and be 10 digits long")
    .required(),
  senderCity: yup
    .string()
    .required("City is required")
    .oneOf(validCityNames, "Invalid city name"),
  senderAddress: yup.string().required("Address is required"),
  senderPostalCode: yup
    .string()
    .oneOf(validPostalCodes, "Invalid city name")
    .required(),

  recipientName: yup.string().required("Recipient name is required"),
  recipientPhone: yup
    .string()
    .matches(/^0[0-9]{9}$/, "Phone must start with 0 and be 10 digits long")
    .required(),
  recipientEmail: yup
    .string()
    .email("Invalid email format")
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email")
    .required("Email is required"),
  recipientCity: yup
    .string()
    .required("City is required")
    .oneOf(validCityNames, "Invalid city name"),
  recipientAddress: yup.string().required("Address is required"),
  recipientPostalCode: yup
    .string()
    .oneOf(validPostalCodes, "Invalid city name")
    .required("Postal code is required"),
});
export type ISenderSchema = yup.InferType<typeof senderSchema>;

export const CreateShipmentStepOne: FC<ICreateShipmentStepOneProps> = ({
  onNext,
  populateData,
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const { control, handleSubmit, setValue, trigger } = useForm<ISenderSchema>({
    resolver: yupResolver(senderSchema),
    defaultValues: populateData || {
      ...(user
        ? {
            senderName: `${user.firstName} ${user.lastName}`,
            senderPhone: user.phone,
            senderCity: user.city,
            senderAddress: user.address,
            senderPostalCode: user.postalCode,
          }
        : {
            senderName: "",
            senderPhone: "",
            senderCity: "",
            senderAddress: "",
            senderPostalCode: "",
          }),

      recipientName: "",
      recipientPhone: "",
      recipientEmail: "",
      recipientCity: "",
      recipientAddress: "",
      recipientPostalCode: "",
    },
  });

  const handleOnNext = (data: ISenderSchema) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(handleOnNext)}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <User className="h-6 w-6 mr-2 text-blue-600" />
          Sender Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <Controller
              control={control}
              name="senderName"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  type="text"
                  placeholder="John Doe"
                  fieldState={fieldState}
                  StartIcon={User}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <Controller
              control={control}
              name="senderPhone"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  type="tel"
                  placeholder="0XXXXXXXXX"
                  fieldState={fieldState}
                  StartIcon={Phone}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <Controller
              name="senderCity"
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
                      setValue("senderPostalCode", cityPostalCodeMap[value]);
                    } else {
                      setValue("senderPostalCode", "");
                    }
                    trigger("senderPostalCode");
                  }}
                  value={field.value || ""}
                  className="mt-1"
                />
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code *
            </label>
            <Controller
              name="senderPostalCode"
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Address *
            </label>
            <Controller
              name="senderAddress"
              control={control}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  type="text"
                  placeholder="Enter full delivery address"
                  fieldState={fieldState}
                  StartIcon={MapPin}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <User className="h-6 w-6 mr-2 text-blue-600" />
          Recipient Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <Controller
              control={control}
              name="recipientName"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  type="text"
                  placeholder="Jane Doe"
                  fieldState={fieldState}
                  StartIcon={User}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <Controller
              control={control}
              name="recipientEmail"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  type="email"
                  placeholder="Sample@sample.com"
                  fieldState={fieldState}
                  StartIcon={Mail}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number *
            </label>
            <Controller
              control={control}
              name="recipientPhone"
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  type="tel"
                  placeholder="0XXXXXXXXX"
                  fieldState={fieldState}
                  StartIcon={Phone}
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City *
            </label>
            <Controller
              name="recipientCity"
              control={control}
              render={({ field, fieldState }) => (
                <Autocomplete
                  options={validCityNames}
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      id="city"
                      placeholder="Select recipient's city"
                      fieldState={fieldState}
                      StartIcon={MapPin}
                    />
                  )}
                  onChange={(event, value) => {
                    field.onChange(value);
                    if (value && cityPostalCodeMap[value]) {
                      setValue("recipientPostalCode", cityPostalCodeMap[value]);
                    } else {
                      setValue("recipientPostalCode", "");
                    }
                    trigger("recipientPostalCode");
                  }}
                  value={field.value || ""}
                  className="mt-1"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Postal Code *
            </label>
            <Controller
              name="recipientPostalCode"
              control={control}
              render={({ field, fieldState }) => (
                <Autocomplete
                  options={validPostalCodes}
                  disabled
                  renderInput={(params) => (
                    <CustomTextField
                      {...params}
                      id="postalCode"
                      placeholder="Select recipient's postal code"
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

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Address *
            </label>

            <Controller
              name="recipientAddress"
              control={control}
              render={({ field, fieldState }) => (
                <CustomTextField
                  {...field}
                  type="text"
                  placeholder="Enter full delivery address"
                  fieldState={fieldState}
                  StartIcon={MapPin}
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <CustomButton type="submit">Next Step</CustomButton>
        </div>
      </div>
    </form>
  );
};
