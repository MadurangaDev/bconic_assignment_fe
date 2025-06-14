import React, { FC, useEffect, useState } from "react";
import {
  Search,
  Edit,
  Eye,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
} from "lucide-react";

import { TrackingStatus } from "@enums";
import { useAppDispatch, useAppSelector } from "@hooks";
import { useSnackbarContext } from "@providers";
import { getAllShipmentsAction } from "@redux-actions";
import { getOverallStatusColor, getStatusIcon } from "@utils";
import { UpdateTrackingStatusModal } from "@components";

type IShipment = {
  id: number;
  sender: string;
  senderPhone: string;
  recipient: string;
  recipientEmail: string;
  address: string;
  status: TrackingStatus;
  createdAt: Date;
  weight: number;
  type: string;
  cost: number;
  description: string;
  updatedAt: Date;
};

export const AdminDashboard: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<TrackingStatus | "all">(
    "all"
  );
  const [selectedShipment, setSelectedShipment] = useState<IShipment | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [fetchedShipments, setFetchedShipments] = useState<IShipment[]>([]);

  const dispatch = useAppDispatch();
  const snackbar = useSnackbarContext();

  const { allShipmentsLoading, allShipmentsResponse } = useAppSelector(
    (state) => state.shipment
  );
  const { user, token } = useAppSelector((state) => state.auth);

  const fetchShipments = async () => {
    try {
      await dispatch(getAllShipmentsAction()).unwrap();
    } catch (error: string | any) {
      snackbar.showSnackbar(error || "Failed to fetch shipment data.", "error");
    }
  };

  useEffect(() => {
    if (allShipmentsResponse) {
      setFetchedShipments(
        allShipmentsResponse.map((shipment) => ({
          id: shipment.id,
          recipient: shipment.recipientName,
          address: shipment.recipientAddress,
          status: shipment.currentStatus,
          createdAt: new Date(shipment.createdAt),
          weight: shipment.weight,
          type: shipment.paymentStatus ? "Paid" : "Cash on Delivery",
          sender: shipment.senderName,
          senderPhone: shipment.senderPhone,
          recipientEmail: shipment.recipientEmail,
          cost: shipment.deliveryCharge,
          description: shipment.packageDescription || "No description provided",
          updatedAt: new Date(shipment.updatedAt),
        }))
      );
    }
  }, [allShipmentsResponse]);

  useEffect(() => {
    if (user && token) fetchShipments();
  }, [user, token]);

  const filteredShipments = fetchedShipments.filter((shipment) => {
    const matchesSearch =
      shipment.id
        .toString()
        .padStart(6, "0")
        .includes(searchTerm.toLowerCase()) ||
      shipment.recipient.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: fetchedShipments.length,
    delivered: fetchedShipments.filter(
      (s) => s.status === TrackingStatus.DELIVERED
    ).length,
    inTransit: fetchedShipments.filter(
      (s) =>
        s.status === TrackingStatus.IN_TRANSIT ||
        s.status === TrackingStatus.OUT_FOR_DELIVERY ||
        s.status === TrackingStatus.PICKED_UP
    ).length,
    delayed: fetchedShipments.filter(
      (s) =>
        (s.status == TrackingStatus.PENDING_PICKUP ||
          s.status == TrackingStatus.PICKED_UP ||
          s.status == TrackingStatus.IN_TRANSIT) &&
        s.updatedAt.getTime() - s.createdAt.getTime() > 3 * 24 * 60 * 60 * 1000
    ).length,
  };
  const totalRevenue = fetchedShipments.reduce(
    (acc, shipment) => acc + (shipment.type == "Paid" ? shipment.cost : 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage all shipments and monitor system performance
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Shipments
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Delivered</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.delivered}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">In Transit</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.inTransit}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Delayed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.delayed}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-900">
                All Shipments
              </h2>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search shipments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as TrackingStatus | "all")
                  }
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value={TrackingStatus.PENDING_PICKUP}>Pending</option>
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
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sender
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Destination
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cost
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {shipment.id.toString().padStart(6, "0")}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {shipment.sender}
                      </div>
                      <div className="text-sm text-gray-500">
                        {shipment.senderPhone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {shipment.recipient}
                      </div>
                      <div className="text-sm text-gray-500">
                        {shipment.recipientEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">
                        {shipment.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(shipment.status, true)}
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${getOverallStatusColor(
                            shipment.status
                          )}`}
                        >
                          {shipment.status
                            .replace("_", " ")
                            .charAt(0)
                            .toUpperCase() +
                            shipment.status.replace("_", " ").slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {shipment.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {shipment.cost} LKR
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {shipment.createdAt.toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedShipment(shipment);
                            setIsModalOpen(true);
                          }}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit Status"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() =>
                            window.open(
                              `/shipment/track/${shipment.id
                                .toString()
                                .padStart(6, "0")}`,
                              "_blank"
                            )
                          }
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!allShipmentsLoading && filteredShipments.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No shipments found</p>
            </div>
          )}

          {allShipmentsLoading && (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-spin" />
              <p className="text-gray-500">Loading shipments...</p>
            </div>
          )}
        </div>

        {/* Status Update Modal */}
        {selectedShipment && (
          <UpdateTrackingStatusModal
            isOpen={isModalOpen}
            shipmentId={selectedShipment.id}
            currentStatus={selectedShipment.status}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedShipment(null);
            }}
            currentPaymentStatus={selectedShipment.type == "Paid"}
          />
        )}
      </div>
    </div>
  );
};
