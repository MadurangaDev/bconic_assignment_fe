import { TrackingStatus } from "@enums";
import { CheckCircle, Package, Truck } from "lucide-react";

export const getStatusIcon = (status: TrackingStatus, completed: boolean) => {
  if (!completed) {
    return <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />;
  }

  switch (status) {
    case TrackingStatus.PENDING_PICKUP:
      return <Package className="h-4 w-4 text-yellow-600" />;
    case TrackingStatus.PICKED_UP:
      return <Truck className="h-4 w-4 text-yellow-600" />;
    case TrackingStatus.DELIVERED:
      return <CheckCircle className="h-4 w-4 text-green-600" />;
    case TrackingStatus.OUT_FOR_DELIVERY:
      return <Truck className="h-4 w-4 text-blue-600" />;
    case TrackingStatus.IN_TRANSIT:
      return <Package className="h-4 w-4 text-blue-600" />;
    default:
      return <CheckCircle className="h-4 w-4 text-green-600" />;
  }
};

export const getOverallStatusColor = (status: TrackingStatus) => {
  switch (status) {
    case TrackingStatus.DELIVERED:
      return "bg-green-100 text-green-800 border-green-200";
    case TrackingStatus.IN_TRANSIT:
      return "bg-blue-100 text-blue-800 border-blue-200";
    case TrackingStatus.PENDING_PICKUP:
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
