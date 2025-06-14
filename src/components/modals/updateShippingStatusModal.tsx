import { FC, useState } from "react";

import { useAppDispatch } from "@hooks";
import { useSnackbarContext } from "@providers";
import { TrackingStatus } from "@enums";
import { getOverallStatusColor, getStatusIcon } from "@utils";
import { Receipt } from "lucide-react";
import { getAllShipmentsAction, updateShipmentAction } from "@redux/actions";

interface IUpdateTrackingStatusModalProps {
  isOpen: boolean;
  shipmentId: number;
  currentStatus: TrackingStatus;
  currentPaymentStatus: boolean;
  onClose: () => void;
}

export const UpdateTrackingStatusModal: FC<IUpdateTrackingStatusModalProps> = ({
  isOpen,
  shipmentId,
  currentStatus,
  currentPaymentStatus,
  onClose,
}) => {
  const [targetStatus, setTargetStatus] =
    useState<TrackingStatus>(currentStatus);
  const [targetPaidStatus, setTargetPaidStatus] =
    useState<boolean>(currentPaymentStatus);

  const dispatch = useAppDispatch();
  const snackbar = useSnackbarContext();

  const handleStatusUpdate = async () => {
    if (
      currentPaymentStatus === targetPaidStatus &&
      currentStatus === targetStatus
    ) {
      snackbar.showSnackbar("No changes detected", "warning");
      return;
    }
    try {
      const res = await dispatch(
        updateShipmentAction({
          shipmentId,
          paymentStatus: targetPaidStatus,
          currentStatus: targetStatus,
        })
      ).unwrap();
      if (!res) {
        snackbar.showSnackbar(
          "Failed to update status. response is empty",
          "error"
        );
        return;
      }
      snackbar.showSnackbar("Status update successful", "success");
      onClose();
      dispatch(getAllShipmentsAction());
    } catch (error: string | any) {
      snackbar.showSnackbar(error || "Failed to update status.", "error");
    }
  };

  return isOpen && shipmentId ? (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Update Status - #{shipmentId.toString().padStart(6, "0")}
        </h3>

        <div className="flex flex-row justify-between items-center">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Current Status:</p>
            <div className="flex items-center">
              {getStatusIcon(currentStatus, true)}
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${getOverallStatusColor(
                  currentStatus
                )}`}
              >
                {currentStatus.replace("_", " ").charAt(0).toUpperCase() +
                  currentStatus.replace("_", " ").slice(1)}
              </span>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Payment Status:</p>
            <div className="flex items-center">
              <Receipt
                className={`h-4 w-4 ${
                  currentPaymentStatus ? "text-green-600" : "text-red-600"
                }`}
              />
              <span
                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${
                  currentPaymentStatus
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-red-100 text-red-800 border-red-200"
                }`}
              >
                {currentPaymentStatus ? "Paid" : "Pending Payment"}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Update status to:
          </label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={targetStatus}
            onChange={(e) => setTargetStatus(e.target.value as TrackingStatus)}
          >
            <option value={TrackingStatus.PENDING_PICKUP}>
              Pending pickup
            </option>
            <option value={TrackingStatus.PICKED_UP}>Picked up</option>
            <option value={TrackingStatus.IN_TRANSIT}>In Transit</option>
            <option value={TrackingStatus.OUT_FOR_DELIVERY}>
              Out for Delivery
            </option>
            <option value={TrackingStatus.DELIVERED}>Delivered</option>
            <option value={TrackingStatus.CANCELLED}>Cancelled</option>
            <option value={TrackingStatus.RETURNED}>Returned</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Update payment to:
          </label>
          <select
            className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={targetPaidStatus ? "1" : "0"}
            onChange={(e) => setTargetPaidStatus(e.target.value === "1")}
          >
            <option value="0">Pending Payment</option>
            <option value="1">Paid</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleStatusUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
