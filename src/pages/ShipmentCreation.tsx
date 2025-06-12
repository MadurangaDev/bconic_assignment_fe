import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, User, MapPin, Phone, Mail, Weight, Truck, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

const ShipmentCreation: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Recipient details
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientAddress: '',
    recipientCity: '',
    recipientPostalCode: '',
    
    // Shipment details
    packageDescription: '',
    weight: '',
    dimensions: '',
    deliveryType: 'standard',
    specialInstructions: '',
    
    // Sender details (pre-filled from user data)
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    senderAddress: ''
  });

  const userData = JSON.parse(localStorage.getItem('userData') || '{}');

  React.useEffect(() => {
    setFormData(prev => ({
      ...prev,
      senderName: `${userData.firstName} ${userData.lastName}`,
      senderEmail: userData.email,
      senderPhone: userData.phone || '',
      senderAddress: userData.address || ''
    }));
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - generate tracking ID
    const trackingId = 'HL' + Math.random().toString(36).substr(2, 6).toUpperCase();
    localStorage.setItem('lastTrackingId', trackingId);
    navigate('/dashboard');
  };

  const steps = [
    { number: 1, title: 'Recipient Info', icon: <User className="h-5 w-5" /> },
    { number: 2, title: 'Shipment Details', icon: <Package className="h-5 w-5" /> },
    { number: 3, title: 'Review & Confirm', icon: <CheckCircle className="h-5 w-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Shipment</h1>
          <p className="text-gray-600 mt-2">Fill in the details to create a new shipment</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.number ? <CheckCircle className="h-5 w-5" /> : step.icon}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    Step {step.number}
                  </p>
                  <p className={`text-xs ${
                    currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                  }`}>
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
          <form onSubmit={handleSubmit}>
            {/* Step 1: Recipient Information */}
            {currentStep === 1 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <User className="h-6 w-6 mr-2 text-blue-600" />
                  Recipient Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="recipientName"
                      required
                      value={formData.recipientName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter recipient's full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="recipientEmail"
                        required
                        value={formData.recipientEmail}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter recipient's email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="recipientPhone"
                        required
                        value={formData.recipientPhone}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter recipient's phone"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="recipientCity"
                      required
                      value={formData.recipientCity}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter city"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="recipientAddress"
                        required
                        value={formData.recipientAddress}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter full delivery address"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="recipientPostalCode"
                      required
                      value={formData.recipientPostalCode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter postal code"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipment Details */}
            {currentStep === 2 && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Package className="h-6 w-6 mr-2 text-blue-600" />
                  Shipment Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Package Description *
                    </label>
                    <textarea
                      name="packageDescription"
                      required
                      value={formData.packageDescription}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Describe the contents of your package"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (kg) *
                    </label>
                    <div className="relative">
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
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dimensions (L x W x H cm)
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 30 x 20 x 15"
                    />
                  </div>

                  <div>
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
                        <option value="standard">Standard (3-5 days) - $15</option>
                        <option value="express">Express (1-2 days) - $25</option>
                        <option value="overnight">Overnight - $45</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      name="specialInstructions"
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Any special handling instructions or delivery notes"
                    />
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Confirm */}
            {currentStep === 3 && (
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
                      <p><strong>Name:</strong> {formData.senderName}</p>
                      <p><strong>Email:</strong> {formData.senderEmail}</p>
                      <p><strong>Phone:</strong> {formData.senderPhone}</p>
                      <p><strong>Address:</strong> {formData.senderAddress}</p>
                    </div>
                  </div>

                  {/* Recipient Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">To (Recipient)</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Name:</strong> {formData.recipientName}</p>
                      <p><strong>Email:</strong> {formData.recipientEmail}</p>
                      <p><strong>Phone:</strong> {formData.recipientPhone}</p>
                      <p><strong>Address:</strong> {formData.recipientAddress}, {formData.recipientCity} {formData.recipientPostalCode}</p>
                    </div>
                  </div>

                  {/* Shipment Details */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Shipment Details</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><strong>Description:</strong> {formData.packageDescription}</p>
                      <p><strong>Weight:</strong> {formData.weight} kg</p>
                      {formData.dimensions && <p><strong>Dimensions:</strong> {formData.dimensions} cm</p>}
                      <p><strong>Delivery Type:</strong> {formData.deliveryType.charAt(0).toUpperCase() + formData.deliveryType.slice(1)}</p>
                      {formData.specialInstructions && <p><strong>Special Instructions:</strong> {formData.specialInstructions}</p>}
                    </div>
                  </div>

                  {/* Cost Summary */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Cost Summary</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span>
                          {formData.deliveryType === 'standard' && '$15.00'}
                          {formData.deliveryType === 'express' && '$25.00'}
                          {formData.deliveryType === 'overnight' && '$45.00'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Insurance:</span>
                        <span>$5.00</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2 flex justify-between font-medium text-gray-900">
                        <span>Total:</span>
                        <span>
                          {formData.deliveryType === 'standard' && '$20.00'}
                          {formData.deliveryType === 'express' && '$30.00'}
                          {formData.deliveryType === 'overnight' && '$50.00'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  >
                    Confirm & Create Shipment
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShipmentCreation;