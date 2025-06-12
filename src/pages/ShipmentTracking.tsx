import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, MapPin, Clock, CheckCircle, Truck, AlertCircle, Calendar, Phone, Mail, User } from 'lucide-react';

const ShipmentTracking: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [trackingId, setTrackingId] = useState(searchParams.get('id') || '');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mockTrackingData = {
    'HL001234': {
      id: 'HL001234',
      status: 'delivered',
      recipient: 'Alice Johnson',
      recipientPhone: '+1 (555) 123-4567',
      recipientEmail: 'alice.johnson@email.com',
      address: '123 Main St, New York, NY 10001',
      sender: 'John Doe',
      senderPhone: '+1 (555) 987-6543',
      estimatedDelivery: '2024-01-17',
      actualDelivery: '2024-01-17',
      weight: '2.5 kg',
      type: 'Standard',
      description: 'Electronics - Laptop accessories',
      cost: '$20.00',
      timeline: [
        {
          status: 'Package created',
          description: 'Shipment has been created and is being prepared for pickup',
          timestamp: '2024-01-15 09:00',
          location: 'Half Life Warehouse - NYC',
          completed: true
        },
        {
          status: 'Package picked up',
          description: 'Package has been picked up from sender location',
          timestamp: '2024-01-15 14:30',
          location: 'New York, NY',
          completed: true
        },
        {
          status: 'In transit',
          description: 'Package is on its way to the destination',
          timestamp: '2024-01-16 08:15',
          location: 'Distribution Center - NYC',
          completed: true
        },
        {
          status: 'Out for delivery',
          description: 'Package is out for delivery to recipient',
          timestamp: '2024-01-17 09:00',
          location: 'New York, NY',
          completed: true
        },
        {
          status: 'Delivered',
          description: 'Package has been successfully delivered',
          timestamp: '2024-01-17 15:30',
          location: '123 Main St, New York, NY',
          completed: true
        }
      ]
    },
    'HL001235': {
      id: 'HL001235',
      status: 'in_transit',
      recipient: 'Bob Smith',
      recipientPhone: '+1 (555) 234-5678',
      recipientEmail: 'bob.smith@email.com',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      sender: 'John Doe',
      senderPhone: '+1 (555) 987-6543',
      estimatedDelivery: '2024-01-18',
      weight: '1.2 kg',
      type: 'Express',
      description: 'Documents - Legal papers',
      cost: '$30.00',
      timeline: [
        {
          status: 'Package created',
          description: 'Shipment has been created and is being prepared for pickup',
          timestamp: '2024-01-16 10:00',
          location: 'Half Life Warehouse - NYC',
          completed: true
        },
        {
          status: 'Package picked up',
          description: 'Package has been picked up from sender location',
          timestamp: '2024-01-16 15:45',
          location: 'New York, NY',
          completed: true
        },
        {
          status: 'In transit',
          description: 'Package is currently being transported to Los Angeles',
          timestamp: '2024-01-17 06:30',
          location: 'Distribution Center - Chicago, IL',
          completed: true
        },
        {
          status: 'Out for delivery',
          description: 'Package will be out for delivery soon',
          timestamp: '2024-01-18 09:00',
          location: 'Los Angeles, CA',
          completed: false
        },
        {
          status: 'Delivered',
          description: 'Package will be delivered to recipient',
          timestamp: 'Expected: 2024-01-18',
          location: '456 Oak Ave, Los Angeles, CA',
          completed: false
        }
      ]
    }
  };

  const handleSearch = () => {
    if (!trackingId.trim()) return;
    
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const data = mockTrackingData[trackingId as keyof typeof mockTrackingData];
      setTrackingData(data || null);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (searchParams.get('id')) {
      handleSearch();
    }
  }, [searchParams]);

  const getStatusIcon = (status: string, completed: boolean) => {
    if (!completed) {
      return <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />;
    }
    
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'out for delivery':
        return <Truck className="h-4 w-4 text-blue-600" />;
      case 'in transit':
        return <Package className="h-4 w-4 text-blue-600" />;
      default:
        return <CheckCircle className="h-4 w-4 text-green-600" />;
    }
  };

  const getOverallStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Track Your Shipment</h1>
          <p className="text-gray-600 mt-2">Enter your tracking number to see the latest status</p>
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
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter tracking number (e.g., HL001234)"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading || !trackingId.trim()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="h-5 w-5 mr-2" />
                  Track Package
                </>
              )}
            </button>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-1">Try these demo tracking numbers:</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setTrackingId('HL001234')}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                HL001234 (Delivered)
              </button>
              <button
                onClick={() => setTrackingId('HL001235')}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
              >
                HL001235 (In Transit)
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {trackingData && (
          <div className="space-y-6">
            {/* Status Overview */}
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">Tracking #{trackingData.id}</h2>
                  <p className="text-gray-600">{trackingData.description}</p>
                </div>
                <div className={`inline-flex px-4 py-2 rounded-full text-sm font-medium border mt-4 sm:mt-0 ${getOverallStatusColor(trackingData.status)}`}>
                  {trackingData.status === 'delivered' ? 'Delivered' : 
                   trackingData.status === 'in_transit' ? 'In Transit' : 
                   'Processing'}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">
                      {trackingData.status === 'delivered' ? 'Delivered On' : 'Est. Delivery'}
                    </p>
                    <p className="font-medium text-gray-900">
                      {trackingData.actualDelivery || trackingData.estimatedDelivery}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Package className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Service Type</p>
                    <p className="font-medium text-gray-900">{trackingData.type}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-600">Destination</p>
                    <p className="font-medium text-gray-900 truncate">{trackingData.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipment Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Sender & Recipient Info */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipment Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      From (Sender)
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1 ml-6">
                      <p><strong>Name:</strong> {trackingData.sender}</p>
                      <p><strong>Phone:</strong> {trackingData.senderPhone}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      To (Recipient)
                    </h4>
                    <div className="text-sm text-gray-600 space-y-1 ml-6">
                      <p><strong>Name:</strong> {trackingData.recipient}</p>
                      <p><strong>Phone:</strong> {trackingData.recipientPhone}</p>
                      <p><strong>Email:</strong> {trackingData.recipientEmail}</p>
                      <p><strong>Address:</strong> {trackingData.address}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Weight</p>
                        <p className="font-medium text-gray-900">{trackingData.weight}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Cost</p>
                        <p className="font-medium text-gray-900">{trackingData.cost}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Timeline</h3>
                
                <div className="space-y-4">
                  {trackingData.timeline.map((event: any, index: number) => (
                    <div key={index} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {getStatusIcon(event.status, event.completed)}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`text-sm font-medium ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {event.status}
                          </h4>
                          <span className={`text-xs ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                            {event.timestamp}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {event.description}
                        </p>
                        <p className={`text-xs mt-1 ${event.completed ? 'text-gray-500' : 'text-gray-400'}`}>
                          📍 {event.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {trackingId && !trackingData && !isLoading && (
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Package Not Found</h3>
            <p className="text-gray-600 mb-4">
              We couldn't find a package with tracking number "{trackingId}".
            </p>
            <p className="text-sm text-gray-500">
              Please check your tracking number and try again. If you continue to have problems, 
              please contact our customer support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShipmentTracking;