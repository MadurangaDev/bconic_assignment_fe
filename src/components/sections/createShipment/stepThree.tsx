import { CheckCircle } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { ISenderSchema } from "./stepOne";
import { IShipmentSchema } from "./stepTwo";
import { CustomButton } from "@components/atoms";
import { useAppDispatch } from "@hooks";
import { calculateShippingFeeAction } from "@redux/actions";
import { useSnackbarContext } from "@providers";

interface ICreateShipmentStepThreeProps {
  formData: {
    senderForm: ISenderSchema;
    shipmentForm: IShipmentSchema;
  };
  onSubmit: () => void;
  onPrevious: () => void;
}

export const CreateShipmentStepThree: FC<ICreateShipmentStepThreeProps> = ({
  formData,
  onSubmit,
  onPrevious,
}) => {
  const dispatch = useAppDispatch();
  const snackbar = useSnackbarContext();
  const [shippingFee, setShippingFee] = useState<number | null>(null);

  const fetchFee = async () => {
    try {
      const res = await dispatch(
        calculateShippingFeeAction({
          weight: formData.shipmentForm.weight,
          dimensions: formData.shipmentForm.dimensions,
        })
      ).unwrap();
      if (!res) {
        throw new Error("Failed to fetch shipping fee");
      }
      setShippingFee(res.deliveryFee);
    } catch (error: string | any) {
      snackbar.showSnackbar(error || "Calculate failed", "error");
    }
  };

  useEffect(() => {
    fetchFee();
  }, [formData.shipmentForm.dimensions, formData.shipmentForm.weight]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <CheckCircle className="h-6 w-6 mr-2 text-blue-600" />
        Review & Confirm
      </h2>

      <div className="space-y-6">
        {/* Sender Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">From (Sender)</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Name:</strong> {formData.senderForm?.senderName}
            </p>
            <p>
              <strong>Phone:</strong> {formData.senderForm?.senderPhone}
            </p>
            <p>
              <strong>Address:</strong> {formData.senderForm?.senderAddress},
              {formData.senderForm?.senderCity}{" "}
              {formData.senderForm?.senderPostalCode}
            </p>
          </div>
        </div>

        {/* Recipient Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">To (Recipient)</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Name:</strong> {formData.senderForm?.recipientName}
            </p>
            <p>
              <strong>Email:</strong> {formData.senderForm?.recipientEmail}
            </p>
            <p>
              <strong>Phone:</strong> {formData.senderForm?.recipientPhone}
            </p>
            <p>
              <strong>Address:</strong> {formData.senderForm?.recipientAddress},
              {formData.senderForm?.recipientCity}{" "}
              {formData.senderForm?.recipientPostalCode}
            </p>
          </div>
        </div>

        {/* Shipment Details */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Shipment Details</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <strong>Description:</strong>{" "}
              {formData.shipmentForm?.packageDescription}
            </p>
            <p>
              <strong>Weight:</strong>{" "}
              {formData.shipmentForm?.weight.toFixed(2)} kg
            </p>
            <p>
              <strong>Dimensions:</strong> {formData.shipmentForm?.dimensions}{" "}
              cm
            </p>
            {formData.shipmentForm?.specialInstructions && (
              <p>
                <strong>Special Instructions:</strong>{" "}
                {formData.shipmentForm?.specialInstructions}
              </p>
            )}
          </div>
        </div>

        {/* Cost Summary */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Cost Summary</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span>{shippingFee?.toFixed(2)} LKR</span>
            </div>
            <div className="border-t border-gray-300 pt-2 flex justify-between font-medium text-gray-900">
              <span>Total:</span>
              <span>{shippingFee?.toFixed(2)} LKR</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <CustomButton
          variant="outlined"
          type="button"
          onClick={onPrevious}
          className="!border-gray-300 !text-gray-700"
        >
          Previous
        </CustomButton>
        <CustomButton type="button" onClick={onSubmit}>
          Confirm & Create Shipment
        </CustomButton>
      </div>
    </div>
  );
};
