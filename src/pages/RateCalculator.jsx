import React, { useState, useEffect } from 'react';
import { Info, Plane, Truck, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';

const RateCalculatorPage = () => {
  const { calculateRate, loading, error } = useOrders();
  const [activeTab, setActiveTab] = useState('RTO');
  const [rateData, setRateData] = useState(null);
  const [calculating, setCalculating] = useState(false);

  // Form state
  const [pickupPincode, setPickupPincode] = useState('110044');
  const [deliveryPincode, setDeliveryPincode] = useState('110044');
  const [packageType, setPackageType] = useState('Plastic cover/Flyer');
  const [weight, setWeight] = useState(0.5); // in kg
  const [dimensions, setDimensions] = useState({ length: 1, width: 1, height: 1 });
  const [paymentMode, setPaymentMode] = useState('prepaid');
  const [deliveryPartner, setDeliveryPartner] = useState('blue_dart');

  // Calculate rate when inputs change
  useEffect(() => {
    if (
      pickupPincode.match(/^[0-9]{6}$/) &&
      deliveryPincode.match(/^[0-9]{6}$/) &&
      weight > 0
    ) {
      const timer = setTimeout(() => {
        handleCalculateRate();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [pickupPincode, deliveryPincode, weight, dimensions, deliveryPartner]);

  const handleCalculateRate = async () => {
    setCalculating(true);
    try {
      const rateResponse = await calculateRate({
        pickupPincode,
        deliveryPincode,
        weight,
        length: dimensions.length,
        width: dimensions.width,
        height: dimensions.height,
        deliveryPartner
      });

      setRateData(rateResponse);
    } catch (err) {
      console.error('Rate calculation error:', err);
      // Set mock data for development
      setRateData({
        baseRate: 30.00,
        additionalCharges: 2.50,
        gst: 5.94,
        dph: 0.46,
        totalAmount: 35.50,
        estimatedDelivery: '1 days'
      });
    } finally {
      setCalculating(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <h1 className="mb-6 text-xl font-bold text-[#1e293b]">Rate Calculator</h1>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Left Side: Input Form */}
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden px-5">
          <div className="border-b-2 border-blue-600 px-6 py-4 text-center text-blue-600 font-bold">
            Domestic
          </div>
          
          <div className="py-6 space-y-6">
            {/* Pincode Section */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Pickup and delivery pincode
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={pickupPincode}
                    onChange={(e) => setPickupPincode(e.target.value)}
                    placeholder="Pickup pincode"
                    maxLength={6}
                    className="w-full rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold outline-none border-2 border-transparent focus:border-blue-500"
                  />
                </div>
                
                <div className="flex-none px-2 text-slate-300">-----</div>

                <div className="flex-1">
                  <input
                    type="text"
                    value={deliveryPincode}
                    onChange={(e) => setDeliveryPincode(e.target.value)}
                    placeholder="Delivery pincode"
                    maxLength={6}
                    className="w-full rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold outline-none border-2 border-transparent focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Partner */}
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">Delivery Partner</label>
              <div className="relative">
                <select
                  value={deliveryPartner}
                  onChange={(e) => setDeliveryPartner(e.target.value)}
                  className="w-full appearance-none rounded-lg bg-slate-100 px-4 py-3 text-sm outline-none border-2 border-transparent focus:border-blue-500"
                >
                  <option value="blue_dart">Blue Dart</option>
                  <option value="fedex">FedEx</option>
                  <option value="bluedart">BlueDart</option>
                </select>
                <ChevronDown className="absolute right-3 top-3.5 text-slate-400" size={16} />
              </div>
            </div>

            {/* Package Type and Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">Package Type</label>
                <div className="relative">
                  <select 
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    className="w-full appearance-none rounded-lg bg-slate-100 px-4 py-3 text-sm outline-none"
                  >
                    <option>Plastic cover/Flyer</option>
                    <option>Box</option>
                    <option>Envelope</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 text-slate-400" size={16} />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">Weight</label>
                <div className="flex rounded-lg bg-slate-100 overflow-hidden">
                  <input 
                    type="number" 
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                    min="0.1"
                    step="0.1"
                    className="w-full bg-transparent px-4 py-3 text-sm outline-none" 
                  />
                  <span className="bg-slate-200 px-3 py-3 text-sm font-bold text-slate-500">kg</span>
                </div>
                <p className="mt-2 text-[10px] leading-tight text-slate-400">
                  Package weight : sum of item's weight and weight of packaging (e.g. box)
                </p>
              </div>
            </div>

            {/* Volumetric Dimensions */}
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">Dimensions (cm)</label>
              <div className="flex gap-2">
                {['length', 'width', 'height'].map((dim, idx) => (
                  <div key={idx} className="flex rounded-lg border border-slate-200 overflow-hidden">
                    <input 
                      type="number" 
                      value={dimensions[dim]}
                      onChange={(e) => setDimensions({...dimensions, [dim]: parseFloat(e.target.value) || 0})}
                      min="0"
                      className="w-16 text-center text-sm outline-none px-2 py-2" 
                      placeholder={dim.charAt(0).toUpperCase()}
                    />
                    <span className="bg-slate-50 px-2 py-2 text-[10px] font-bold text-slate-500 border-l border-slate-200">CM</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="rounded-lg bg-slate-50 p-4 text-[11px] text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Info size={14} className="text-slate-500" />
                Volumetric weight calculator
              </div>
              <div className="flex items-start gap-2 pl-5">
                <Plane size={12} className="mt-0.5" />
                <span>Express: L*B*H / Volumetric Divisor ({dimensions.length}×{dimensions.width}×{dimensions.height}/5000={(dimensions.length * dimensions.width * dimensions.height / 5000).toFixed(2)} kg)</span>
              </div>
              <div className="flex items-start gap-2 pl-5">
                <Truck size={12} className="mt-0.5" />
                <span>Surface: L*B*H / Volumetric Divisor ({dimensions.length}×{dimensions.width}×{dimensions.height}/5000={(dimensions.length * dimensions.width * dimensions.height / 5000).toFixed(2)} kg)</span>
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <label className="mb-3 block text-xs font-bold text-slate-700">Payment Mode</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={paymentMode === 'prepaid'}
                    onChange={() => setPaymentMode('prepaid')}
                    className="h-4 w-4 accent-blue-600" 
                  />
                  Prepaid
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input 
                    type="radio" 
                    name="payment"
                    checked={paymentMode === 'cod'}
                    onChange={() => setPaymentMode('cod')}
                    className="h-4 w-4 accent-blue-600" 
                  />
                  Cash on Delivery (COD)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col px-5">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 font-bold text-sm">
            <button 
              onClick={() => setActiveTab('Forward')}
              className={`flex-1 py-4 ${activeTab === 'Forward' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-slate-800'}`}
            >
              Forward
            </button>
            <button 
              onClick={() => setActiveTab('RTO')}
              className={`flex-1 py-4 ${activeTab === 'RTO' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-slate-800'}`}
            >
              RTO
            </button>
            <button 
              onClick={() => setActiveTab('Reverse')}
              className={`flex-1 py-4 ${activeTab === 'Reverse' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-slate-800'}`}
            >
              Reverse
            </button>
          </div>

          <div className="py-6 space-y-4 flex-grow">
            {calculating || loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
              </div>
            ) : rateData ? (
              // Rate Card 1 - Express
              <div className="rounded-xl bg-slate-50 p-5 relative">
                <div className="mb-1 text-[11px] font-bold text-slate-800">Express</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black">{formatCurrency(rateData.totalAmount || rateData.baseRate + rateData.additionalCharges)}</span>
                  <span className="text-xs font-medium text-slate-600">/Delivery in {rateData.estimatedDelivery || '1 days'}</span>
                </div>
                
                <div className="absolute top-4 right-5 text-slate-800 opacity-80">
                  <Plane size={32} strokeWidth={1.5} />
                </div>

                <div className="mt-4 flex items-start gap-2 border-t border-slate-200 pt-3 text-[10px] leading-relaxed text-slate-600">
                  <Info size={14} className="mt-0.5 flex-none text-slate-400" />
                  <div>
                    <p>Shipping cost: {formatCurrency(rateData.baseRate || 30.00)}</p>
                    {rateData.additionalCharges > 0 && (
                      <p>+ Destination city surcharge: {formatCurrency(rateData.additionalCharges)}</p>
                    )}
                    {rateData.gst && (
                      <p>+ GST charge: {formatCurrency(rateData.gst)}</p>
                    )}
                    {rateData.dph && (
                      <p>+ Diesel Price Hike (DPH) charge: {formatCurrency(rateData.dph)}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 text-sm">
                Enter pincode and weight to calculate rate
              </div>
            )}
          </div>

          <div className="p-6 pt-0">
            <button className="w-full rounded-lg bg-[#111827] py-4 font-bold text-white transition hover:bg-slate-800">
              View Detailed Rate Card
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RateCalculatorPage;
