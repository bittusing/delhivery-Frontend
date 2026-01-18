import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Loader2, Check, Info } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { useWallet } from '../hooks/useWallet';
import RechargeModal from '../components/Wallet/RechargeModal';

// InputField component moved outside to prevent recreation on every render
const InputField = React.memo(({ label, value, onChange, error, placeholder, type = 'text', required = false, maxLength = null, min = null, step = null }) => {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => {
          let inputValue = e.target.value;
          // Handle phone and pincode length restrictions
          if (type === 'tel' && inputValue.length > 10) {
            inputValue = inputValue.slice(0, 10);
          } else if (label.toLowerCase().includes('pincode') && inputValue.length > 6) {
            inputValue = inputValue.slice(0, 6);
          }
          onChange(inputValue);
        }}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        step={step}
        className={`w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:border-blue-500 ${
          error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
        }`}
        style={{ pointerEvents: 'auto', zIndex: 1 }}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}, (prevProps, nextProps) => {
  // Only re-render if value, error, or label changes (ignore onChange reference)
  return (
    prevProps.value === nextProps.value &&
    prevProps.error === nextProps.error &&
    prevProps.label === nextProps.label &&
    prevProps.placeholder === nextProps.placeholder &&
    prevProps.type === nextProps.type
  );
});
InputField.displayName = 'InputField';

const CreateOrder = () => {
  const navigate = useNavigate();
  const { calculateRate, createOrder, loading, error } = useOrders();
  const { balance, fetchBalance } = useWallet();
  
  const [formData, setFormData] = useState({
    pickupDetails: {
      name: '',
      phone: '',
      address: '',
      pincode: '',
      city: '',
      state: ''
    },
    deliveryDetails: {
      name: '',
      phone: '',
      address: '',
      pincode: '',
      city: '',
      state: ''
    },
    packageDetails: {
      weight: '',
      dimensions: {
        length: '',
        width: '',
        height: ''
      },
      description: '',
      declaredValue: ''
    },
    deliveryPartner: 'fedex'
  });

  const [rate, setRate] = useState(null);
  const [calculatingRate, setCalculatingRate] = useState(false);
  const [rateError, setRateError] = useState('');
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const deliveryPartners = [
    { value: 'fedex', label: 'FedEx' },
    { value: 'blue_dart', label: 'Blue Dart' },
    { value: 'bluedart', label: 'BlueDart' },
    { value: 'delhivery', label: 'Delhivery' },
  ];

  const handleChange = useCallback((section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
    setFormErrors(prev => ({
      ...prev,
      [`${section}.${field}`]: ''
    }));
  }, []);

  const handlePackageChange = useCallback((field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        packageDetails: {
          ...prev.packageDetails,
          [parent]: {
            ...prev.packageDetails[parent],
            [child]: value
          }
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        packageDetails: {
          ...prev.packageDetails,
          [field]: value
        }
      }));
    }
    setFormErrors(prev => ({
      ...prev,
      [`packageDetails.${field}`]: ''
    }));
  }, []);

  const validateForm = () => {
    const errors = {};

    // Validate pickup details
    if (!formData.pickupDetails.name.trim()) errors['pickupDetails.name'] = 'Name is required';
    if (!formData.pickupDetails.phone.match(/^[0-9]{10}$/)) errors['pickupDetails.phone'] = 'Valid 10-digit phone required';
    if (!formData.pickupDetails.address.trim() || formData.pickupDetails.address.length < 10) errors['pickupDetails.address'] = 'Address must be at least 10 characters';
    if (!formData.pickupDetails.pincode.match(/^[0-9]{6}$/)) errors['pickupDetails.pincode'] = 'Valid 6-digit pincode required';
    if (!formData.pickupDetails.city.trim()) errors['pickupDetails.city'] = 'City is required';
    if (!formData.pickupDetails.state.trim()) errors['pickupDetails.state'] = 'State is required';

    // Validate delivery details
    if (!formData.deliveryDetails.name.trim()) errors['deliveryDetails.name'] = 'Name is required';
    if (!formData.deliveryDetails.phone.match(/^[0-9]{10}$/)) errors['deliveryDetails.phone'] = 'Valid 10-digit phone required';
    if (!formData.deliveryDetails.address.trim() || formData.deliveryDetails.address.length < 10) errors['deliveryDetails.address'] = 'Address must be at least 10 characters';
    if (!formData.deliveryDetails.pincode.match(/^[0-9]{6}$/)) errors['deliveryDetails.pincode'] = 'Valid 6-digit pincode required';
    if (!formData.deliveryDetails.city.trim()) errors['deliveryDetails.city'] = 'City is required';
    if (!formData.deliveryDetails.state.trim()) errors['deliveryDetails.state'] = 'State is required';

    // Validate package details
    const weight = parseFloat(formData.packageDetails.weight);
    if (!weight || weight < 0.1) errors['packageDetails.weight'] = 'Weight must be at least 0.1 kg';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCalculateRate = useCallback(async () => {
    // Validate essential fields
    if (
      !formData.pickupDetails.pincode.match(/^[0-9]{6}$/) ||
      !formData.deliveryDetails.pincode.match(/^[0-9]{6}$/) ||
      !formData.packageDetails.weight ||
      parseFloat(formData.packageDetails.weight) < 0.1
    ) {
      return;
    }

    setCalculatingRate(true);
    setRateError('');

    try {
      const rateData = {
        pickupPincode: formData.pickupDetails.pincode,
        deliveryPincode: formData.deliveryDetails.pincode,
        weight: parseFloat(formData.packageDetails.weight),
        length: parseFloat(formData.packageDetails.dimensions.length) || 0,
        width: parseFloat(formData.packageDetails.dimensions.width) || 0,
        height: parseFloat(formData.packageDetails.dimensions.height) || 0,
        deliveryPartner: formData.deliveryPartner
      };

      const result = await calculateRate(rateData);
      setRate(result);
    } catch (err) {
      setRateError(err.message || 'Failed to calculate rate');
    } finally {
      setCalculatingRate(false);
    }
  }, [formData.pickupDetails.pincode, formData.deliveryDetails.pincode, formData.packageDetails.weight, formData.packageDetails.dimensions, formData.deliveryPartner, calculateRate]);

  const handleCreateOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (!rate) {
      setRateError('Please calculate rate first');
      return;
    }

    // Check wallet balance
    if (balance < rate.totalAmount) {
      setShowRechargeModal(true);
      return;
    }

    try {
      const orderData = {
        pickupDetails: formData.pickupDetails,
        deliveryDetails: formData.deliveryDetails,
        packageDetails: {
          weight: parseFloat(formData.packageDetails.weight),
          dimensions: {
            length: parseFloat(formData.packageDetails.dimensions.length) || 0,
            width: parseFloat(formData.packageDetails.dimensions.width) || 0,
            height: parseFloat(formData.packageDetails.dimensions.height) || 0
          },
          description: formData.packageDetails.description || '',
          declaredValue: parseFloat(formData.packageDetails.declaredValue) || 0
        },
        deliveryPartner: formData.deliveryPartner
      };

      const result = await createOrder(orderData);
      
      // Success - redirect to order details
      navigate(`/order-details?id=${result.order.id}`);
    } catch (err) {
      console.error('Order creation error:', err);
    }
  };

  useEffect(() => {
    // Auto-calculate rate when essential fields change
    if (
      formData.pickupDetails.pincode.match(/^[0-9]{6}$/) &&
      formData.deliveryDetails.pincode.match(/^[0-9]{6}$/) &&
      formData.packageDetails.weight &&
      parseFloat(formData.packageDetails.weight) >= 0.1
    ) {
      const timer = setTimeout(() => {
        handleCalculateRate();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [
    formData.pickupDetails.pincode,
    formData.deliveryDetails.pincode,
    formData.packageDetails.weight,
    formData.deliveryPartner,
    handleCalculateRate
  ]);

  return (
    <div className="min-h-screen mb-24" style={{ pointerEvents: 'auto' }}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-[#131842]">Create Order</h1>
      </div>

      {/* Error Message */}
      {(error || rateError) && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{error || rateError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Pickup Details */}
          <div className="bg-white border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-sm">
              <span>📍</span> Pickup Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Name"
                value={formData.pickupDetails.name}
                onChange={(val) => handleChange('pickupDetails', 'name', val)}
                error={formErrors['pickupDetails.name']}
                placeholder="Enter pickup name"
                required
              />
              <InputField
                label="Phone"
                type="tel"
                value={formData.pickupDetails.phone}
                onChange={(val) => handleChange('pickupDetails', 'phone', val.replace(/\D/g, ''))}
                error={formErrors['pickupDetails.phone']}
                placeholder="10-digit mobile number"
                required
                maxLength={10}
              />
            </div>
            
            <InputField
              label="Address"
              value={formData.pickupDetails.address}
              onChange={(val) => handleChange('pickupDetails', 'address', val)}
              error={formErrors['pickupDetails.address']}
              placeholder="Enter complete address"
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Pincode"
                type="text"
                value={formData.pickupDetails.pincode}
                onChange={(val) => handleChange('pickupDetails', 'pincode', val.replace(/\D/g, ''))}
                error={formErrors['pickupDetails.pincode']}
                placeholder="6-digit pincode"
                required
                maxLength={6}
              />
              <InputField
                label="City"
                value={formData.pickupDetails.city}
                onChange={(val) => handleChange('pickupDetails', 'city', val)}
                error={formErrors['pickupDetails.city']}
                placeholder="Enter city"
                required
              />
              <InputField
                label="State"
                value={formData.pickupDetails.state}
                onChange={(val) => handleChange('pickupDetails', 'state', val)}
                error={formErrors['pickupDetails.state']}
                placeholder="Enter state"
                required
              />
            </div>
          </div>

          {/* Delivery Details */}
          <div className="bg-white border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-sm">
              <span>🚚</span> Delivery Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Name"
                value={formData.deliveryDetails.name}
                onChange={(val) => handleChange('deliveryDetails', 'name', val)}
                error={formErrors['deliveryDetails.name']}
                placeholder="Enter delivery name"
                required
              />
              <InputField
                label="Phone"
                type="tel"
                value={formData.deliveryDetails.phone}
                onChange={(val) => handleChange('deliveryDetails', 'phone', val.replace(/\D/g, ''))}
                error={formErrors['deliveryDetails.phone']}
                placeholder="10-digit mobile number"
                required
                maxLength={10}
              />
            </div>
            
            <InputField
              label="Address"
              value={formData.deliveryDetails.address}
              onChange={(val) => handleChange('deliveryDetails', 'address', val)}
              error={formErrors['deliveryDetails.address']}
              placeholder="Enter complete address"
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Pincode"
                type="text"
                value={formData.deliveryDetails.pincode}
                onChange={(val) => handleChange('deliveryDetails', 'pincode', val.replace(/\D/g, ''))}
                error={formErrors['deliveryDetails.pincode']}
                placeholder="6-digit pincode"
                required
                maxLength={6}
              />
              <InputField
                label="City"
                value={formData.deliveryDetails.city}
                onChange={(val) => handleChange('deliveryDetails', 'city', val)}
                error={formErrors['deliveryDetails.city']}
                placeholder="Enter city"
                required
              />
              <InputField
                label="State"
                value={formData.deliveryDetails.state}
                onChange={(val) => handleChange('deliveryDetails', 'state', val)}
                error={formErrors['deliveryDetails.state']}
                placeholder="Enter state"
                required
              />
            </div>
          </div>

          {/* Delivery Partner */}
          <div className="bg-white border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-sm">
              <span>🚛</span> Delivery Partner
            </h3>
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">Select Delivery Partner</label>
              <select
                value={formData.deliveryPartner}
                onChange={(e) => setFormData(prev => ({ ...prev, deliveryPartner: e.target.value }))}
                className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              >
                {deliveryPartners.map(partner => (
                  <option key={partner.value} value={partner.value}>{partner.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Package Details */}
          <div className="bg-white border rounded-lg p-4 space-y-4">
            <h3 className="font-semibold flex items-center gap-2 text-sm">
              <span>📦</span> Package Details
            </h3>
            
            <InputField
              label="Weight (kg)"
              type="number"
              value={formData.packageDetails.weight}
              onChange={(val) => handlePackageChange('weight', val)}
              error={formErrors['packageDetails.weight']}
              placeholder="0.1"
              required
              min="0.1"
              step="0.1"
            />
            
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-700">Dimensions (cm) - Optional</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={formData.packageDetails.dimensions.length || ''}
                  onChange={(e) => handlePackageChange('dimensions.length', e.target.value)}
                  placeholder="L"
                  min="0"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  style={{ pointerEvents: 'auto', zIndex: 1 }}
                />
                <input
                  type="number"
                  value={formData.packageDetails.dimensions.width || ''}
                  onChange={(e) => handlePackageChange('dimensions.width', e.target.value)}
                  placeholder="W"
                  min="0"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  style={{ pointerEvents: 'auto', zIndex: 1 }}
                />
                <input
                  type="number"
                  value={formData.packageDetails.dimensions.height || ''}
                  onChange={(e) => handlePackageChange('dimensions.height', e.target.value)}
                  placeholder="H"
                  min="0"
                  step="0.1"
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                  style={{ pointerEvents: 'auto', zIndex: 1 }}
                />
              </div>
            </div>
            
            <InputField
              label="Description (Optional)"
              value={formData.packageDetails.description}
              onChange={(val) => handlePackageChange('description', val)}
              placeholder="Package description"
            />
            
            <InputField
              label="Declared Value (₹) - Optional"
              type="number"
              value={formData.packageDetails.declaredValue}
              onChange={(val) => handlePackageChange('declaredValue', val.replace(/[^0-9.]/g, ''))}
              placeholder="0"
              min="0"
              step="0.01"
            />
          </div>

          {/* Rate Calculation & Summary */}
          {rate && (
            <div className="bg-white border rounded-lg p-4 space-y-4">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <span>💰</span> Shipping Rate
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Rate</span>
                  <span className="font-semibold">₹{rate.baseRate?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Additional Charges</span>
                  <span className="font-semibold">₹{rate.additionalCharges?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-bold text-lg text-blue-600">₹{rate.totalAmount?.toFixed(2) || '0.00'}</span>
                </div>
                {rate.estimatedDelivery && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <Info size={14} />
                    <span>Estimated Delivery: {rate.estimatedDelivery}</span>
                  </div>
                )}
                {rate.note && (
                  <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                    {rate.note}
                  </div>
                )}
              </div>
            </div>
          )}

          {calculatingRate && (
            <div className="bg-white border rounded-lg p-4 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
              <p className="text-sm text-gray-600 mt-2">Calculating rate...</p>
            </div>
          )}

          {/* Wallet Balance Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Wallet Balance</span>
              <span className="font-bold text-lg text-blue-600">₹{balance?.toFixed(2) || '0.00'}</span>
            </div>
            {rate && balance < rate.totalAmount && (
              <div className="flex items-center gap-2 text-xs text-red-600 mt-2">
                <AlertCircle size={14} />
                <span>Insufficient balance. Please recharge.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg flex justify-end gap-4 z-40">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleCreateOrder}
          disabled={loading || !rate || calculatingRate}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating Order...
            </>
          ) : (
            <>
              <Check size={20} />
              Create Order
            </>
          )}
        </button>
      </div>

      {/* Recharge Modal */}
      <RechargeModal
        isOpen={showRechargeModal}
        onClose={() => setShowRechargeModal(false)}
        onSuccess={() => {
          fetchBalance();
          setShowRechargeModal(false);
        }}
      />
    </div>
  );
};

export default CreateOrder;
