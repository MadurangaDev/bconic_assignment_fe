import React, { useState } from 'react';
import { Search, Filter, Edit, Eye, Package, Users, TrendingUp, AlertTriangle, CheckCircle, Clock, Truck } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedShipment, setSelectedShipment] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock admin data
  const mockShipments = [
    {
      id: 'HL001234',
      sender: 'John Doe',
      senderEmail: 'john.doe@email.com',
      recipient: 'Alice Johnson',
      recipientEmail: 'alice.johnson@email.com',
      address: '123 Main St, New York, NY',
      status: 'delivered',
      createdAt: '2024-01-15',
      estimatedDelivery: '2024-01-17',
      actualDelivery: '2024-01-17',
      weight: '2.5 kg',
      type: 'Standard',
      cost: '$20.00',
      description: 'Electronics - Laptop accessories'
    },
    {
      id: 'HL001235',
      sender: 'John Doe',
      senderEmail: 'john.doe@email.com',
      recipient: 'Bob Smith',
      recipientEmail: 'bob.smith@email.com',
      address: '456 Oak Ave, Los Angeles, CA',
      status: 'in_transit',
      createdAt: '2024-01-16',
      estimatedDelivery: '2024-01-18',
      weight: '1.2 kg',
      type: 'Express',
      cost: '$30.00',
      description: 'Documents - Legal papers'
    },
    {
      id: 'HL001236',
      sender: 'Jane Smith',
      senderEmail: 'jane.smith@email.com',
      recipient: 'Carol Wilson',
      recipientEmail: 'carol.wilson@email.com',
      address: '789 Pine St, Chicago, IL',
      status: 'pending',
      createdAt: '2024-01-17',
      estimatedDelivery: '2024-01-19',
      weight: '3.1 kg',
      type: 'Standard',
      cost: '$20.00',
      description: 'Books and documents'
    },
    {
      id: 'HL001237',
      sender: 'Mike Johnson',
      senderEmail: 'mike.johnson@email.com',
      recipient: 'David Brown',
      recipientEmail: 'david.brown@email.com',
      address: '321 Elm St, Houston, TX',
      status: 'processing',
      createdAt: '2024-01-17',
      estimatedDelivery: '2024-01-20',
      weight: '0.8 kg',
      type: 'Express',
      cost: '$30.00',
      description: 'Medical supplies'
    },
    {
      id: 'HL001238',
      sender: 'Sarah Davis',
      senderEmail: 'sarah.davis@email.com',
      recipient: 'Emily Wilson',
      recipientEmail: 'emily.wilson@email.com',
      address: '555 Maple Ave, Phoenix, AZ',
      status: 'delayed',
      createdAt: '2024-01-16',
      estimatedDelivery: '2024-01-18',
      weight: '4.2 kg',
      type: 'Standard',
      cost: '$20.00',
      description: 'Clothing and accessories'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_transit':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'delayed':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusUpdate = (shipmentId: string, newStatus: string) => {
    // Mock status update - in real app, this would make an API call
    console.log(`Updating shipment ${shipmentId} to status: ${newStatus}`);
    setIsModalOpen(false);
  };

  const filteredShipments = mockShipments.filter(shipment => {
    const matchesSearch = shipment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || shipment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalShipments: mockShipments.length,
    delivered: mockShipments.filter(s => s.status === 'delivered').length,
    inTransit: mockShipments.filter(s => s.status === 'in_transit').length,
    delayed: mockShipments.filter(s => s.status === 'delayed').length,
    totalRevenue: mockShipments.reduce((sum, s) => sum + parseFloat(s.cost.replace('$', '')), 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage all shipments and monitor system performance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Shipments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalShipments}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.inTransit}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.delayed}</p>
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
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="text-xl font-semibold text-gray-900">All Shipments</h2>
              
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
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="delayed">Delayed</option>
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
                      <div className="text-sm font-medium text-gray-900">{shipment.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shipment.sender}</div>
                      <div className="text-sm text-gray-500">{shipment.senderEmail}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shipment.recipient}</div>
                      <div className="text-sm text-gray-500">{shipment.recipientEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{shipment.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(shipment.status)}
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${getStatusColor(shipment.status)}`}>
                          {shipment.status.replace('_', ' ').charAt(0).toUpperCase() + shipment.status.replace('_', ' ').slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shipment.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shipment.cost}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{shipment.createdAt}</div>
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
                          onClick={() => window.open(`/track?id=${shipment.id}`, '_blank')}
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

          {filteredShipments.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No shipments found</p>
            </div>
          )}
        </div>

        {/* Status Update Modal */}
        {isModalOpen && selectedShipment && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Update Status - {selectedShipment.id}
              </h3>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current Status:</p>
                <div className="flex items-center">
                  {getStatusIcon(selectedShipment.status)}
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ml-2 ${getStatusColor(selectedShipment.status)}`}>
                    {selectedShipment.status.replace('_', ' ').charAt(0).toUpperCase() + selectedShipment.status.replace('_', ' ').slice(1)}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update to:
                </label>
                <select className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="in_transit">In Transit</option>
                  <option value="delivered">Delivered</option>
                  <option value="delayed">Delayed</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedShipment.id, 'processing')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;