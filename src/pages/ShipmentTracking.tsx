import { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Search,
  Package,
  MapPin,
  CheckCircle,
  Truck,
  AlertCircle,
  Calendar,
  User,
  Receipt,
} from "lucide-react";
import { CircularProgress } from "@mui/material";

import { useSnackbarContext } from "@providers";
import { useAppDispatch, useAppSelector } from "@hooks";
import { getShipmentHistoryAction } from "@redux-actions";
import { IHistoryRecord, IShipmentHistoryResponse } from "@responses";
import { TrackingStatus } from "@enums";
import { getOverallStatusColor, getStatusIcon } from "@utils";

export const ShipmentTracking: FC = () => {
  const [shipmentId, setShipmentId] = useState("");
  const [trackingData, setTrackingData] =
    useState<IShipmentHistoryResponse | null>(null);

  const { shipmentId: idProp } = useParams();
  const snackbar = useSnackbarContext();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { trackingLoading } = useAppSelector((state) => state.shipment);

  const handleSearch = async (id: string) => {
    const searchingId = id || shipmentId;

    if (!searchingId.trim()) {
      snackbar.showSnackbar("Please enter a valid tracking number.", "error");
      return;
    }
    if (!/^\d{6}$/.test(searchingId)) {
      snackbar.showSnackbar(
        "Invalid tracking number format. Please use the format 001234.",
        "error"
      );
      return;
    }
    try {
      const res = await dispatch(
        getShipmentHistoryAction(Number(searchingId))
      ).unwrap();
      setTrackingData(res);
    } catch (error: string | any) {
      setTrackingData(null);
      snackbar.showSnackbar(error || "Failed to fetch shipment data.", "error");
    }
  };

  const loadShipmentPage = () => {
    if (!shipmentId.trim()) {
      snackbar.showSnackbar("Please enter a valid tracking number.", "error");
      return;
    }
    if (!/^\d{6}$/.test(shipmentId)) {
      snackbar.showSnackbar(
        "Invalid tracking number format. Please use the format 001234.",
        "error"
      );
      return;
    }
    navigate(`/shipment/track/${shipmentId}`);
  };

  useEffect(() => {
    if (idProp && idProp.trim() !== "") {
      setShipmentId(idProp);
      handleSearch(idProp);
    }
  }, [idProp]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Track Your Shipment
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your tracking number to see the latest status
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={shipmentId}
                  onChange={(e) => setShipmentId(e.target.value)}
                  placeholder="Enter tracking number (e.g., HL001234)"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === "Enter" && loadShipmentPage()}
                />
              </div>
            </div>
            <button
              onClick={loadShipmentPage}
              disabled={trackingLoading || !shipmentId.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {trackingLoading ? (
                <CircularProgress size={20} className="text-white" />
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Track Package
                </>
              )}
            </button>
          </div>

          {/* <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-1">
              Try these demo tracking numbers:
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTrackingId("HL001234")}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                HL001234 (Delivered)
              </button>
              <button
                onClick={() => setTrackingId("HL001235")}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                HL001235 (In Transit)
              </button>
            </div>
          </div> */}
        </div>

        {/* Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Tracking #{trackingData.id.toString().padStart(6, "0")}
                  </h2>
                  <p className="text-gray-600">
                    {trackingData.packageDescription}
                  </p>
                </div>
                <div
                  className={`inline-flex px-4 py-2 rounded-full text-sm font-medium border mt-4 sm:mt-0 ${getOverallStatusColor(
                    trackingData.currentStatus
                  )}`}
                >
                  {trackingData.currentStatus === TrackingStatus.DELIVERED
                    ? "Delivered"
                    : trackingData.currentStatus === TrackingStatus.IN_TRANSIT
                    ? "In Transit"
                    : "Processing"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Placed on</p>
                    <p className="font-medium text-gray-900">
                      {new Date(
                        trackingData.trackingHistory[
                          trackingData.trackingHistory.length - 1
                        ].createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Receipt className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Order Type</p>
                    <p className="font-medium text-gray-900">
                      {trackingData.paymentStatus ? "Paid" : "Cash on Delivery"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Destination</p>
                    <p className="font-medium text-gray-900 truncate">
                      {trackingData.recipientAddress}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sender & Recipient Info */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Shipment Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      From (Sender)
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1 ml-6">
                      <p>
                        <strong>Name:</strong> {trackingData.senderName}
                      </p>
                      <p>
                        <strong>Phone:</strong> {trackingData.senderPhone}
                      </p>
                      <p>
                        <strong>Address:</strong> {trackingData.senderAddress}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      To (Recipient)
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1 ml-6">
                      <p>
                        <strong>Name:</strong> {trackingData.recipientName}
                      </p>
                      <p>
                        <strong>Phone:</strong> {trackingData.recipientPhone}
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        {trackingData.recipientEmail ?? "N/A"}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        {trackingData.recipientAddress}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Weight</p>
                        <p className="font-medium text-gray-900">
                          {trackingData.weight} KG
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cost</p>
                        <p className="font-medium text-gray-900">
                          {trackingData.deliveryCharge.toFixed(2)} LKR
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Tracking Timeline
                </h3>

                <div className="space-y-4">
                  {trackingData.trackingHistory.map(
                    (event: IHistoryRecord, index: number) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {getStatusIcon(event.status, true)}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <h4
                              className={`text-sm font-medium ${
                                // event.completed?
                                "text-gray-900"
                                // : "text-gray-500"
                              }`}
                            >
                              {event.status}
                            </h4>
                            <span
                              className={`text-xs ${
                                // event.completed?
                                "text-gray-600"
                                // : "text-gray-400"
                              }`}
                            >
                              {new Date(event.createdAt).toLocaleString()}
                            </span>
                          </div>
                          {/* <p
                            className={`text-sm mt-1 ${
                              // event.completed ?
                              "text-gray-600"
                              //  : "text-gray-400"
                            }`}
                          >
                            {event.status}
                          </p> */}
                          {/* <p
                            className={`text-xs mt-1 ${
                              // event.completed ?
                              "text-gray-500"
                              //  : "text-gray-400"
                            }`}
                          >
                            📍 sample
                          </p> */}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {!trackingData && !trackingLoading && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {idProp
                ? `Shipment Not Found for ID: ${idProp}`
                : "Search for a shipment"}
            </h3>
            <p className="text-gray-600 mb-4">
              {idProp
                ? `We couldn't find a shipment with tracking number "${idProp}".`
                : "Please enter a valid tracking number to search."}
            </p>
            <p className="text-sm text-gray-500">
              {idProp
                ? "Please check the tracking number and try again."
                : "Enter a valid tracking number to see the status of your shipment."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
