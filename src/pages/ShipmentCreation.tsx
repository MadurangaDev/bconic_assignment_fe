import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, User, ArrowRight, CheckCircle } from "lucide-react";

import {
  CreateShipmentStepTwo,
  IShipmentSchema,
  CreateShipmentStepOne,
  ISenderSchema,
  CreateShipmentStepThree,
} from "@components";
import { useSnackbarContext } from "@providers";
import { useAppDispatch } from "@hooks";
import { createShipmentAction } from "@redux/actions";

export const ShipmentCreation: FC = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbarContext();
  const dispatch = useAppDispatch();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{
    senderForm: ISenderSchema | null;
    shipmentForm: IShipmentSchema | null;
  }>({
    senderForm: null,
    shipmentForm: null,
  });

  function isSenderSchema(
    data: ISenderSchema | IShipmentSchema
  ): data is ISenderSchema {
    return (data as ISenderSchema).senderName !== undefined;
  }

  const handleSave = (data: ISenderSchema | IShipmentSchema) => {
    if (isSenderSchema(data)) {
      setFormData((prev) => ({
        ...prev,
        senderForm: data,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        shipmentForm: data,
      }));
    }
  };

  const handleNext = (data: ISenderSchema | IShipmentSchema) => {
    handleSave(data);
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOnSubmit = async () => {
    if (formData.senderForm && formData.shipmentForm) {
      try {
        const res = await dispatch(
          createShipmentAction({
            ...formData.senderForm,
            ...formData.shipmentForm,
          })
        ).unwrap();
        if (res) {
          snackbar.showSnackbar("Shipment created successfully", "success");
          navigate(`/user/dashboard`);
        } else {
          snackbar.showSnackbar(
            "No data returned from shipment creation",
            "error"
          );
        }
      } catch (error: string | any) {
        snackbar.showSnackbar(error || "Create shipping failed", "error");
      }
    } else {
      snackbar.showSnackbar("Data incomplete", "error");
    }
  };

  const steps = [
    { number: 1, title: "Recipient Info", icon: <User className="h-5 w-5" /> },
    {
      number: 2,
      title: "Shipment Details",
      icon: <Package className="h-5 w-5" />,
    },
    {
      number: 3,
      title: "Review & Confirm",
      icon: <CheckCircle className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create New Shipment
          </h1>
          <p className="text-gray-600 mt-2">
            Fill in the details to create a new shipment
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= step.number
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.number ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.number
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    Step {step.number}
                  </p>
                  <p
                    className={`text-xs ${
                      currentStep >= step.number
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <ArrowRight className="h-5 w-5 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200">
          {/* Step 1: Recipient Information */}
          {currentStep === 1 && (
            <CreateShipmentStepOne
              onNext={handleNext}
              populateData={formData.senderForm}
            />
          )}

          {/* Step 2: Shipment Details */}
          {currentStep === 2 && (
            <CreateShipmentStepTwo
              onNext={handleNext}
              onPrevious={handlePrevious}
              populateData={formData.shipmentForm}
              onSave={handleSave}
            />
          )}

          {/* Step 3: Review & Confirm */}
          {currentStep === 3 && (
            <CreateShipmentStepThree
              formData={{
                senderForm: formData.senderForm!,
                shipmentForm: formData.shipmentForm!,
              }}
              onSubmit={handleOnSubmit}
              onPrevious={handlePrevious}
            />
          )}
        </div>
      </div>
    </div>
  );
};
