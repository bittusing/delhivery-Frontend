import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Package, MapPin, Truck, CheckCircle, Clock, AlertCircle, Copy } from 'lucide-react';
import { useOrders } from '../../hooks/useOrders';

function OrderDetailsPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderId = searchParams.get('id');
  
  const { getOrderById, trackOrder, loading, error } = useOrders();
  const [order, setOrder] = useState(null);
  const [tracking, setTracking] = useState(null);
  const [loadingTracking, setLoadingTracking] = useState(false);

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const orderData = await getOrderById(orderId);
      setOrder(orderData);
    } catch (err) {
      console.error('Error loading order:', err);
    }
  };

  const handleTrackOrder = async () => {
    if (!orderId) return;
    
    setLoadingTracking(true);
    try {
      const trackingData = await trackOrder(orderId);
      setTracking(trackingData);
    } catch (err) {
      console.error('Error tracking order:', err);
    } finally {
      setLoadingTracking(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'picked_up':
      case 'in_transit':
      case 'out_for_delivery':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'pending':
      case 'confirmed':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'picked_up':
      case 'in_transit':
      case 'out_for_delivery':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
      case 'confirmed':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
      case 'rto':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">{error || 'Order not found'}</p>
          <button
            onClick={() => navigate('/orders')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(-1)} className="cursor-pointer">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-[#131842]">Order Details</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-6">
        {/* LEFT COLUMN */}
        <div className="space-y-4">
          {/* Order Information */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#1a2b4b]">Order Information</h2>
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                {order.status?.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Order Number</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-blue-600">{order.orderNumber}</p>
                  <button
                    onClick={() => copyToClipboard(order.orderNumber)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">AWB Number</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#1a2b4b]">{order.awb || 'Not generated yet'}</p>
                  {order.awb && (
                    <button
                      onClick={() => copyToClipboard(order.awb)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Delivery Partner</p>
                <p className="text-sm font-bold text-gray-700 capitalize">{order.deliveryPartner?.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Order Date</p>
                <p className="text-sm font-bold text-gray-700">{formatDate(order.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Pickup Details */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1a2b4b] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-500" />
              Pickup Details
            </h3>
            {order.pickupDetails && (
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-bold text-gray-700">{order.pickupDetails.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-bold text-gray-700">{order.pickupDetails.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-bold text-gray-700">{order.pickupDetails.address}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Pincode</p>
                    <p className="text-sm font-bold text-gray-700">{order.pickupDetails.pincode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">City</p>
                    <p className="text-sm font-bold text-gray-700">{order.pickupDetails.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">State</p>
                    <p className="text-sm font-bold text-gray-700">{order.pickupDetails.state}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Delivery Details */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1a2b4b] flex items-center gap-2">
              <Truck className="w-5 h-5 text-green-500" />
              Delivery Details
            </h3>
            {order.deliveryDetails && (
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-sm font-bold text-gray-700">{order.deliveryDetails.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm font-bold text-gray-700">{order.deliveryDetails.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-sm font-bold text-gray-700">{order.deliveryDetails.address}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Pincode</p>
                    <p className="text-sm font-bold text-gray-700">{order.deliveryDetails.pincode}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">City</p>
                    <p className="text-sm font-bold text-gray-700">{order.deliveryDetails.city}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">State</p>
                    <p className="text-sm font-bold text-gray-700">{order.deliveryDetails.state}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          {/* Package Details */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1a2b4b] flex items-center gap-2">
              <Package className="w-5 h-5" />
              Package Details
            </h3>
            {order.packageDetails && (
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Weight</p>
                  <p className="text-sm font-bold text-gray-700">{order.packageDetails.weight} kg</p>
                </div>
                {order.packageDetails.dimensions && (
                  <div>
                    <p className="text-xs text-gray-500">Dimensions</p>
                    <p className="text-sm font-bold text-gray-700">
                      {order.packageDetails.dimensions.length} × {order.packageDetails.dimensions.width} × {order.packageDetails.dimensions.height} cm
                    </p>
                  </div>
                )}
                {order.packageDetails.description && (
                  <div>
                    <p className="text-xs text-gray-500">Description</p>
                    <p className="text-sm font-bold text-gray-700">{order.packageDetails.description}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1a2b4b]">Pricing</h3>
            {order.pricing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Base Rate</span>
                  <span className="font-semibold">{formatAmount(order.pricing.baseRate)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Additional Charges</span>
                  <span className="font-semibold">{formatAmount(order.pricing.additionalCharges)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Total Amount</span>
                  <span className="font-bold text-lg text-blue-600">{formatAmount(order.pricing.totalAmount)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Payment Status */}
          <div className="bg-white border rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1a2b4b]">Payment</h3>
            {order.payment && (
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p className={`text-sm font-bold inline-block px-2 py-1 rounded ${
                    order.payment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.payment.status?.toUpperCase()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Method</p>
                  <p className="text-sm font-bold text-gray-700 capitalize">{order.payment.method || 'Wallet'}</p>
                </div>
                {order.payment.paidAt && (
                  <div>
                    <p className="text-xs text-gray-500">Paid At</p>
                    <p className="text-sm font-bold text-gray-700">{formatDate(order.payment.paidAt)}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Tracking */}
          {order.awb && (
            <div className="bg-white border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#1a2b4b]">Tracking</h3>
                <button
                  onClick={handleTrackOrder}
                  disabled={loadingTracking}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {loadingTracking ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Refresh'}
                </button>
              </div>
              {tracking && tracking.tracking && (
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-500">Current Status</p>
                    <p className="text-sm font-bold text-gray-700">{tracking.tracking.status || order.status}</p>
                  </div>
                  {tracking.trackingUrl && (
                    <a
                      href={tracking.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Track on Partner Website →
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
