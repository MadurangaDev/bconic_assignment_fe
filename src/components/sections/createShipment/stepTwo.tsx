import { CustomButton, CustomTextField } from "@components/atoms";
import { yupResolver } from "@hookform/resolvers/yup";
import { Autocomplete } from "@mui/material";
import { Package, Weight } from "lucide-react";
import { FC, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface ICreateShipmentStepTwoProps {
  onNext: (data: IShipmentSchema) => void;
  onPrevious: () => void;
  populateData: IShipmentSchema | null;
  onSave: (data: IShipmentSchema) => void;
}

const shipmentSchema = yup.object().shape({
  packageDescription: yup.string().required("Package description is required"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .positive("Weight must be a positive number")
    .required("Weight is required"),
  dimensions: yup
    .string()
    .matches(
      /^\d+x\d+x\d+$/,
      "Dimensions must be in the format WxHxD (e.g., 10x20x30)"
    )
    .required(),
  specialInstructions: yup
    .string()
    .max(500, "Special instructions must be less than 500 characters")
    .optional()
    .default(""),
});
export type IShipmentSchema = yup.InferType<typeof shipmentSchema>;

export const CreateShipmentStepTwo: FC<ICreateShipmentStepTwoProps> = ({
  onNext,
  onPrevious,
  populateData,
  onSave,
}) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, touchedFields },
  } = useForm<IShipmentSchema>({
    resolver: yupResolver(shipmentSchema),
    defaultValues: populateData || undefined,
  });
  const formRef = useRef<HTMLFormElement>(null);

  const handleOnNext = (data: IShipmentSchema) => {
    onNext(data);
  };
  const handlePrevious = () => {
    if (Object.keys(touchedFields).length > 0 && isDirty) {
      if (isValid) {
        handleSubmit(onSave)();
      } else {
        const conf = confirm(
          "Are you sure you want to go back? Your current progress will be lost."
        );
        if (!conf) return;
      }
    }
    onPrevious();
  };

  return (
    <form className="p-6" onSubmit={handleSubmit(handleOnNext)} ref={formRef}>
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Package className="h-6 w-6 mr-2 text-blue-600" />
        Shipment Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Package Description *
          </label>
          {/* <textarea
                      name="packageDescription"
                      required
                      value={formData.packageDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe the contents of your package"
                    /> */}
          <Controller
            control={control}
            name="packageDescription"
            render={({ field, fieldState }) => (
              <CustomTextField
                {...field}
                type="text"
                placeholder="Describe the contents of your package"
                fieldState={fieldState}
                StartIcon={Package}
                multiline
                rows={3}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weight (kg) *
          </label>
          {/* <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Weight className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        step="0.1"
                        name="weight"
                        required
                        value={formData.weight}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.0"
                      />
                    </div> */}
          <Controller
            control={control}
            name="weight"
            render={({ field, fieldState }) => (
              <CustomTextField
                {...field}
                type="number"
                inputProps={{
                  step: 0.1,
                }}
                placeholder="0.0"
                fieldState={fieldState}
                StartIcon={Weight}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Dimensions (L x W x H cm) *
          </label>
          {/* <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 30 x 20 x 15"
                    /> */}
          <Controller
            control={control}
            name="dimensions"
            render={({ field, fieldState }) => (
              <Autocomplete
                options={[
                  "30x20x15",
                  "40x30x20",
                  "50x40x30",
                  "60x50x40",
                  "70x60x50",
                  "80x70x60",
                  "90x80x70",
                  "100x90x80",
                  "110x100x90",
                  "120x110x100",
                  "130x120x110",
                  "150x150x150",
                ]}
                renderInput={(params) => (
                  <CustomTextField
                    {...params}
                    id="dimensions"
                    placeholder="e.g., 30 x 20 x 15"
                    fieldState={fieldState}
                    StartIcon={Package}
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

        {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Type *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Truck className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="deliveryType"
                        required
                        value={formData.deliveryType}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="standard">
                          Standard (3-5 days) - $15
                        </option>
                        <option value="express">
                          Express (1-2 days) - $25
                        </option>
                        <option value="overnight">Overnight - $45</option>
                      </select>
                    </div>
                  </div> */}

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Instructions
          </label>
          {/* <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any special handling instructions or delivery notes"
                    /> */}
          <Controller
            control={control}
            name="specialInstructions"
            render={({ field, fieldState }) => (
              <CustomTextField
                {...field}
                type="text"
                placeholder="Any special handling instructions or delivery notes"
                fieldState={fieldState}
                StartIcon={Package}
                multiline
                rows={3}
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <CustomButton
          variant="outlined"
          type="button"
          onClick={handlePrevious}
          className="!border-gray-300 !text-gray-700"
        >
          Previous
        </CustomButton>
        <CustomButton type="submit">Review Order</CustomButton>
      </div>
    </form>
  );
};
