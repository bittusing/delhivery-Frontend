import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Loader2, Check, Info, Warehouse } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import warehouseService from '../services/warehouse.service';
import { useWallet } from '../hooks/useWallet';
import { useShippingMode } from '../context/ShippingModeContext';
import RechargeModal from '../components/Wallet/RechargeModal';
import KYCGuard from '../components/KYCGuard';

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
          } else if (label.toLowerCase().includes('pincode') && inputValue.length > 6 && !label.toLowerCase().includes('country')) {
            inputValue = inputValue.slice(0, 6);
          }
          onChange(inputValue);
        }}
        placeholder={placeholder}
        maxLength={maxLength}
        min={min}
        step={step}
        className={`w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:border-blue-500 ${error ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
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
  const { shippingMode, getDeliveryPartners, isInternational, isDomestic } = useShippingMode();

  const [formData, setFormData] = useState({
    pickupDetails: {
      name: '',
      phone: '',
      address: '',
      pincode: '',
      city: '',
      state: '',
      country: 'India'
    },
    deliveryDetails: {
      name: '',
      phone: '',
      address: '',
      pincode: '',
      city: '',
      state: '',
      country: isInternational ? '' : 'India'
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
    deliveryPartner: '',
    products: [{
      description: '',
      hsnCode: '',
      qty: 1,
      unitRate: '',
      pieceWt: ''
    }]
  });

  const [paymentType, setPaymentType] = useState('prepaid');
  const [selectedNimbusCourierId, setSelectedNimbusCourierId] = useState(null);
  const [rate, setRate] = useState(null);
  const [calculatingRate, setCalculatingRate] = useState(false);
  const [rateError, setRateError] = useState('');
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [warehouses, setWarehouses] = useState([]);
  const [selectedWarehouseId, setSelectedWarehouseId] = useState('');

  const deliveryPartners = getDeliveryPartners();

  // Keep delivery partner valid when switching domestic / international
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await warehouseService.getWarehouses();
        if (response.success) {
          setWarehouses(response.data.warehouses);
          // If there's a default warehouse, auto-select it
          const defaultWh = response.data.warehouses.find(w => w.isDefault);
          if (defaultWh) {
            handleWarehouseSelect(defaultWh);
            setSelectedWarehouseId(defaultWh._id);
          }
        }
      } catch (err) {
        console.error('Failed to fetch warehouses', err);
      }
    };
    fetchWarehouses();
  }, []);

  const handleWarehouseSelect = (wh) => {
    setFormData(prev => ({
      ...prev,
      pickupDetails: {
        ...prev.pickupDetails,
        name: wh.name,
        contactPerson: wh.contactPerson,
        phone: wh.phone,
        email: wh.email || prev.pickupDetails.email,
        address: wh.addressLine1 + (wh.addressLine2 ? ', ' + wh.addressLine2 : ''),
        pincode: wh.pincode,
        city: wh.city,
        state: wh.state,
        country: 'India'
      }
    }));
    // Clear any pickup errors
    setFormErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith('pickupDetails.')) delete newErrors[key];
      });
      return newErrors;
    });
  };

  useEffect(() => {
    if (deliveryPartners.length === 0) return;
    setFormData(prev => {
      const valid = deliveryPartners.some(p => p.value === prev.deliveryPartner);
      if (!valid) {
        return { ...prev, deliveryPartner: deliveryPartners[0].value };
      }
      return prev;
    });
  }, [deliveryPartners]);

  useEffect(() => {
    if (isDomestic) {
      setFormData(prev =>
        prev.deliveryPartner === 'nimbuspost'
          ? prev
          : { ...prev, deliveryPartner: 'nimbuspost' }
      );
    } else if (isInternational) {
      setFormData(prev =>
        prev.deliveryPartner === 'overseas_logistic'
          ? prev
          : { ...prev, deliveryPartner: 'overseas_logistic' }
      );
    }
  }, [isDomestic, isInternational]);

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
  
  const handleProductChange = useCallback((index, field, value) => {
    setFormData(prev => {
      const newProducts = [...prev.products];
      newProducts[index] = { ...newProducts[index], [field]: value };
      return { ...prev, products: newProducts };
    });
  }, []);

  const addProduct = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, {
        description: '',
        hsnCode: '',
        qty: 1,
        unitRate: '',
        pieceWt: ''
      }]
    }));
  }, []);

  const removeProduct = useCallback((index) => {
    setFormData(prev => {
      if (prev.products.length <= 1) return prev;
      const newProducts = prev.products.filter((_, i) => i !== index);
      return { ...prev, products: newProducts };
    });
  }, []);

  const validateForm = () => {
    const errors = {};

    // Validate pickup details
    if (!formData.pickupDetails.name.trim()) errors['pickupDetails.name'] = 'Name is required';
    if (!isInternational && !formData.pickupDetails.phone.match(/^[0-9]{10}$/)) {
      errors['pickupDetails.phone'] = 'Valid 10-digit phone required';
    } else if (!formData.pickupDetails.phone.trim()) {
      errors['pickupDetails.phone'] = 'Phone is required';
    }
    if (!formData.pickupDetails.address.trim() || formData.pickupDetails.address.length < 10) errors['pickupDetails.address'] = 'Address must be at least 10 characters';
    if (!isInternational && !formData.pickupDetails.pincode.match(/^[0-9]{6}$/)) errors['pickupDetails.pincode'] = 'Valid 6-digit pincode required';
    if (!formData.pickupDetails.city.trim()) errors['pickupDetails.city'] = 'City is required';
    if (!formData.pickupDetails.state.trim()) errors['pickupDetails.state'] = 'State is required';
    if (!formData.pickupDetails.country.trim()) errors['pickupDetails.country'] = 'Country is required';

    // Validate delivery details
    if (!formData.deliveryDetails.name.trim()) errors['deliveryDetails.name'] = 'Name is required';
    if (!isInternational && !formData.deliveryDetails.phone.match(/^[0-9]{10}$/)) {
      errors['deliveryDetails.phone'] = 'Valid 10-digit phone required';
    } else if (!formData.deliveryDetails.phone.trim()) {
      errors['deliveryDetails.phone'] = 'Phone is required';
    }
    if (!formData.deliveryDetails.address.trim() || formData.deliveryDetails.address.length < 10) errors['deliveryDetails.address'] = 'Address must be at least 10 characters';
    if (!isInternational && !formData.deliveryDetails.pincode.match(/^[0-9]{6}$/)) errors['deliveryDetails.pincode'] = 'Valid 6-digit pincode required';
    if (!formData.deliveryDetails.city.trim()) errors['deliveryDetails.city'] = 'City is required';
    if (!formData.deliveryDetails.state.trim()) errors['deliveryDetails.state'] = 'State is required';
    if (!formData.deliveryDetails.country.trim()) errors['deliveryDetails.country'] = 'Country is required';
    if (isInternational && !formData.deliveryDetails.email?.trim()) errors['deliveryDetails.email'] = 'Email is required for international';

    // Validate package details
    const weight = parseFloat(formData.packageDetails.weight);
    if (!weight || weight < 0.1) errors['packageDetails.weight'] = 'Weight must be at least 0.1 kg';

    if (isInternational) {
      formData.products.forEach((product, index) => {
        if (!product.description.trim()) errors[`products.${index}.description`] = 'Required';
        if (!product.qty || product.qty < 1) errors[`products.${index}.qty`] = 'Min 1';
        if (!product.unitRate || parseFloat(product.unitRate) <= 0) errors[`products.${index}.unitRate`] = 'Required';
        if (!product.pieceWt || parseFloat(product.pieceWt) <= 0) errors[`products.${index}.pieceWt`] = 'Required';
      });
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCalculateRate = useCallback(async () => {
    // Validate essential fields
    const hasPincode = isInternational
      ? (formData.pickupDetails.pincode.trim() && formData.deliveryDetails.pincode.trim())
      : (formData.pickupDetails.pincode.match(/^[0-9]{6}$/) && formData.deliveryDetails.pincode.match(/^[0-9]{6}$/));

    if (
      !hasPincode ||
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
        pickupCountry: formData.pickupDetails.country,
        deliveryCountry: formData.deliveryDetails.country,
        weight: parseFloat(formData.packageDetails.weight),
        length: parseFloat(formData.packageDetails.dimensions.length) || 0,
        width: parseFloat(formData.packageDetails.dimensions.width) || 0,
        height: parseFloat(formData.packageDetails.dimensions.height) || 0,
        declaredValue: parseFloat(formData.packageDetails.declaredValue) || 0,
        deliveryPartner: formData.deliveryPartner,
        orderType: shippingMode,
        paymentType
      };

      const result = await calculateRate(rateData);
      setRate(result);
    } catch (err) {
      const apiMsg =
        err.response?.data?.message ||
        err.message ||
        'Unable to load shipping rates. Please try again.';
      setRateError(apiMsg);
      setRate(null);
    } finally {
      setCalculatingRate(false);
    }
  }, [
    formData.pickupDetails.pincode,
    formData.deliveryDetails.pincode,
    formData.pickupDetails.country,
    formData.deliveryDetails.country,
    formData.packageDetails.weight,
    formData.packageDetails.dimensions,
    formData.packageDetails.declaredValue,
    formData.deliveryPartner,
    calculateRate,
    shippingMode,
    isInternational,
    paymentType
  ]);

  const selectedNimbusCourier = useMemo(() => {
    if (!isDomestic || !rate?.courierOptions?.length || !selectedNimbusCourierId) {
      return null;
    }
    return rate.courierOptions.find(
      c => String(c.id) === String(selectedNimbusCourierId)
    );
  }, [isDomestic, rate, selectedNimbusCourierId]);

  const effectiveOrderTotal = useMemo(() => {
    if (selectedNimbusCourier) {
      return selectedNimbusCourier.totalCharges;
    }
    return rate?.totalAmount ?? 0;
  }, [selectedNimbusCourier, rate]);

  useEffect(() => {
    if (!isDomestic || !rate?.courierOptions?.length) {
      setSelectedNimbusCourierId(null);
      return;
    }
    setSelectedNimbusCourierId(prev => {
      const opts = rate.courierOptions;
      if (prev && opts.some(c => String(c.id) === String(prev))) {
        return prev;
      }
      return String(opts[0].id);
    });
  }, [isDomestic, rate]);

  const handleCreateOrder = async () => {
    if (!validateForm()) {
      return;
    }

    if (!rate) {
      setRateError('Please calculate rate first');
      return;
    }

    if (
      isDomestic &&
      formData.deliveryPartner === 'nimbuspost'
    ) {
      if (!rate.courierOptions?.length) {
        setRateError('No courier options from Nimbus. Check pincodes and try again.');
        return;
      }
      if (!selectedNimbusCourierId) {
        setRateError('Please select a courier option');
        return;
      }
    }

    if (balance < effectiveOrderTotal) {
      setShowRechargeModal(true);
      return;
    }

    try {
      const orderData = {
        orderType: shippingMode,
        pickupDetails: formData.pickupDetails,
        deliveryDetails: formData.deliveryDetails,
        packageDetails: {
          weight: parseFloat(formData.packageDetails.weight),
          dimensions: {
            length: parseFloat(formData.packageDetails.dimensions.length) || 0,
            width: parseFloat(formData.packageDetails.dimensions.width) || 0,
            height: parseFloat(formData.packageDetails.dimensions.height) || 0
          },
          declaredValue: parseFloat(formData.packageDetails.declaredValue) || 0
        },
        products: isInternational ? formData.products.map(p => ({
          ...p,
          unitRate: parseFloat(p.unitRate),
          pieceWt: parseFloat(p.pieceWt),
          qty: parseInt(p.qty)
        })) : [],
        deliveryPartner: formData.deliveryPartner,
        paymentType
      };

      if (isDomestic && formData.deliveryPartner === 'nimbuspost' && selectedNimbusCourierId) {
        orderData.nimbusCourierId = String(selectedNimbusCourierId);
      }

      const result = await createOrder(orderData);

      // Success - redirect to order details
      navigate(`/order-details?id=${result.order.id}`);
    } catch (err) {
      console.error('Order creation error:', err);
    }
  };

  useEffect(() => {
    // Auto-calculate rate when essential fields change
    const hasPincode = isInternational
      ? (formData.pickupDetails.pincode.trim() && formData.deliveryDetails.pincode.trim())
      : (formData.pickupDetails.pincode.match(/^[0-9]{6}$/) && formData.deliveryDetails.pincode.match(/^[0-9]{6}$/));

    const hasCountry = formData.pickupDetails.country?.trim() && formData.deliveryDetails.country?.trim();

    if (
      hasPincode &&
      hasCountry &&
      formData.packageDetails.weight &&
      parseFloat(formData.packageDetails.weight) >= 0.1 &&
      formData.deliveryPartner
    ) {
      const timer = setTimeout(() => {
        handleCalculateRate();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [
    formData.pickupDetails.pincode,
    formData.deliveryDetails.pincode,
    formData.pickupDetails.country,
    formData.deliveryDetails.country,
    formData.packageDetails.weight,
    formData.packageDetails.declaredValue,
    formData.deliveryPartner,
    shippingMode,
    isInternational,
    paymentType,
    handleCalculateRate
  ]);

  return (
    <KYCGuard message="Complete KYC verification to create orders and start shipping with us.">
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
            <h3 className="font-semibold flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span>📍</span> Pickup Details
              </div>
              {warehouses.length > 0 && (
                <div className="flex items-center gap-2">
                  <Warehouse className="w-3.5 h-3.5 text-gray-400" />
                  <select 
                    value={selectedWarehouseId}
                    onChange={(e) => {
                      const id = e.target.value;
                      setSelectedWarehouseId(id);
                      const wh = warehouses.find(w => w._id === id);
                      if (wh) handleWarehouseSelect(wh);
                    }}
                    className="text-[10px] bg-gray-50 border border-gray-200 rounded px-2 py-1 font-bold text-gray-700 outline-none focus:border-blue-500"
                  >
                    <option value="">Select Warehouse</option>
                    {warehouses.map(w => (
                      <option key={w._id} value={w._id}>{w.name}</option>
                    ))}
                  </select>
                </div>
              )}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Country"
                value={formData.pickupDetails.country}
                onChange={(val) => handleChange('pickupDetails', 'country', val)}
                error={formErrors['pickupDetails.country']}
                placeholder="India"
                required
              />
              <InputField
                label="Company Name (Optional)"
                value={formData.pickupDetails.companyName}
                onChange={(val) => handleChange('pickupDetails', 'companyName', val)}
                error={formErrors['pickupDetails.companyName']}
                placeholder="Enter company name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Email"
                type="email"
                value={formData.pickupDetails.email}
                onChange={(val) => handleChange('pickupDetails', 'email', val)}
                error={formErrors['pickupDetails.email']}
                placeholder="Enter email address"
                required={isInternational}
              />
              <InputField
                label="Pincode"
                type="text"
                value={formData.pickupDetails.pincode}
                onChange={(val) => handleChange('pickupDetails', 'pincode', val.replace(/\D/g, ''))}
                error={formErrors['pickupDetails.pincode']}
                placeholder="Pincode"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                placeholder="Mobile number"
                required
                maxLength={15}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Country"
                value={formData.deliveryDetails.country}
                onChange={(val) => handleChange('deliveryDetails', 'country', val)}
                error={formErrors['deliveryDetails.country']}
                placeholder="e.g. USA, UK"
                required
              />
              <InputField
                label="Company Name (Optional)"
                value={formData.deliveryDetails.companyName}
                onChange={(val) => handleChange('deliveryDetails', 'companyName', val)}
                error={formErrors['deliveryDetails.companyName']}
                placeholder="Enter company name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Email"
                type="email"
                value={formData.deliveryDetails.email}
                onChange={(val) => handleChange('deliveryDetails', 'email', val)}
                error={formErrors['deliveryDetails.email']}
                placeholder="Enter email address"
                required={isInternational}
              />
              <InputField
                label="Pincode"
                type="text"
                value={formData.deliveryDetails.pincode}
                onChange={(val) => handleChange('deliveryDetails', 'pincode', val)}
                error={formErrors['deliveryDetails.pincode']}
                placeholder="Pincode"
                required
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          {/* Delivery Partner — hidden for domestic (always NimbusPost) */}
          {!isDomestic && (
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
          )}

          {/* Product Details - International Only */}
          {isInternational && (
            <div className="bg-white border rounded-lg p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold flex items-center gap-2 text-sm">
                  <span>🛍️</span> Product Details
                </h3>
                <button
                  onClick={addProduct}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  + Add Product
                </button>
              </div>

              <div className="space-y-6">
                {formData.products.map((product, index) => (
                  <div key={index} className="p-3 border border-gray-100 rounded-lg bg-gray-50 relative space-y-3">
                    {formData.products.length > 1 && (
                      <button
                        onClick={() => removeProduct(index)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-1"
                      >
                        <AlertCircle size={14} />
                      </button>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <InputField
                        label="Description"
                        value={product.description}
                        onChange={(val) => handleProductChange(index, 'description', val)}
                        error={formErrors[`products.${index}.description`]}
                        placeholder="What's in the box?"
                        required
                      />
                      <InputField
                        label="HSN Code"
                        value={product.hsnCode}
                        onChange={(val) => handleProductChange(index, 'hsnCode', val)}
                        placeholder="8-digit HSN"
                      />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <InputField
                        label="Qty"
                        type="number"
                        value={product.qty}
                        onChange={(val) => handleProductChange(index, 'qty', val)}
                        error={formErrors[`products.${index}.qty`]}
                        min="1"
                        required
                      />
                      <InputField
                        label="Unit Price (₹)"
                        type="number"
                        value={product.unitRate}
                        onChange={(val) => handleProductChange(index, 'unitRate', val)}
                        error={formErrors[`products.${index}.unitRate`]}
                        placeholder="0.00"
                        required
                      />
                      <InputField
                        label="Weight (kg)"
                        type="number"
                        value={product.pieceWt}
                        onChange={(val) => handleProductChange(index, 'pieceWt', val)}
                        error={formErrors[`products.${index}.pieceWt`]}
                        placeholder="0.1"
                        required
                        step="0.1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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

              {isDomestic && formData.deliveryPartner === 'nimbuspost' && (
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">Payment type</label>
                  <select
                    value={paymentType}
                    onChange={e => setPaymentType(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="prepaid">Prepaid</option>
                    <option value="cod">COD</option>
                  </select>
                </div>
              )}

              {isDomestic &&
                formData.deliveryPartner === 'nimbuspost' &&
                rate.courierOptions?.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700">Select courier</p>
                    <div className="space-y-2 max-h-56 overflow-y-auto">
                      {rate.courierOptions.map(opt => (
                        <label
                          key={String(opt.id)}
                          className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer text-sm ${
                            String(selectedNimbusCourierId) === String(opt.id)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="nimbusCourier"
                            className="mt-1"
                            checked={String(selectedNimbusCourierId) === String(opt.id)}
                            onChange={() => setSelectedNimbusCourierId(String(opt.id))}
                          />
                          <span className="flex-1">
                            <span className="font-medium text-gray-900 block">{opt.name}</span>
                            <span className="text-xs text-gray-500">
                              Freight ₹{Number(opt.freightCharges).toFixed(2)}
                              {(opt.codCharges || 0) > 0 && (
                                <> · COD ₹{Number(opt.codCharges || 0).toFixed(2)}</>
                              )}
                            </span>
                          </span>
                          <span className="font-semibold text-blue-600 whitespace-nowrap">
                            ₹{Number(opt.totalCharges).toFixed(2)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Rate</span>
                  <span className="font-semibold">
                    ₹
                    {(selectedNimbusCourier
                      ? selectedNimbusCourier.freightCharges
                      : rate.baseRate
                    )?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Additional Charges</span>
                  <span className="font-semibold">
                    ₹
                    {(selectedNimbusCourier
                      ? selectedNimbusCourier.codCharges
                      : rate.additionalCharges
                    )?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-bold text-lg text-blue-600">
                    ₹{effectiveOrderTotal.toFixed(2)}
                  </span>
                </div>
                {rate.estimatedDelivery && (
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                    <Info size={14} />
                    <span>Estimated Delivery: {rate.estimatedDelivery}</span>
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
            {rate && balance < effectiveOrderTotal && (
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
          disabled={
            loading ||
            !rate ||
            calculatingRate ||
            (isDomestic &&
              formData.deliveryPartner === 'nimbuspost' &&
              (!rate.courierOptions?.length || !selectedNimbusCourierId))
          }
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
    </KYCGuard>
  );
};

export default CreateOrder;
