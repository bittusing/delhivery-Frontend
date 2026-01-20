import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Loader2, Package, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { useShippingMode } from '../context/ShippingModeContext';

const OrderList = () => {
  const navigate = useNavigate();
  const { orders, loading, error, fetchOrders } = useOrders();
  const { shippingMode } = useShippingMode();
  const [filters, setFilters] = useState({
    status: '',
    deliveryPartner: '',
    limit: 50
  });

  useEffect(() => {
    fetchOrders({ ...filters, type: shippingMode });
  }, [filters, shippingMode, fetchOrders]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'picked_up':
      case 'in_transit':
      case 'out_for_delivery':
        return <Truck className="w-4 h-4 text-blue-600" />;
      case 'pending':
      case 'confirmed':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <Package className="w-4 h-4 text-gray-600" />;
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
    return date.toLocaleDateString('en-IN', {
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

  return (
    <div className="min-h-screen font-sans text-[#1a2b4b]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex items-center min-w-[280px] border border-gray-300 rounded-lg bg-white">
          <Search className="absolute left-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order number or AWB"
            className="w-full pl-10 pr-4 py-2 text-sm focus:outline-none"
          />
        </div>

        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-[#f1f4f9] min-w-[140px]"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="picked_up">Picked Up</option>
          <option value="in_transit">In Transit</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
        </select>

        <select
          value={filters.deliveryPartner}
          onChange={(e) => setFilters({ ...filters, deliveryPartner: e.target.value })}
          className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-[#f1f4f9] min-w-[140px]"
        >
          <option value="">All Partners</option>
          <option value="delhivery">Delhivery</option>
          <option value="fedex">FedEx</option>
          <option value="blue_dart">Blue Dart</option>
          <option value="bluedart">BlueDart</option>
          <option value="overseas_logistic">Overseas Logistic</option>
        </select>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Loading orders...</p>
          </div>
        ) : orders && orders.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#e9ecef] text-[11px] uppercase text-gray-700 font-extrabold border-b border-gray-200">
              <tr>
                <th className="px-4 py-3">Order Number</th>
                <th className="px-4 py-3">AWB</th>
                <th className="px-4 py-3">Pickup → Delivery</th>
                <th className="px-4 py-3">Partner</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-[12px]">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/order-details?id=${order._id}`)}
                >
                  <td className="px-4 py-4">
                    <p className="text-blue-600 font-bold">{order.orderNumber}</p>
                  </td>
                  <td className="px-4 py-4 font-black text-[#1a2b4b]">
                    {order.awb || '-'}
                  </td>
                  <td className="px-4 py-4 text-gray-700 font-bold">
                    <p className="truncate max-w-[200px]">{order.pickupDetails?.pincode || '-'}</p>
                    <p className="text-gray-400">→</p>
                    <p className="truncate max-w-[200px]">{order.deliveryDetails?.pincode || '-'}</p>
                  </td>
                  <td className="px-4 py-4 text-gray-700 font-bold capitalize">
                    {order.deliveryPartner?.replace('_', ' ')}
                  </td>
                  <td className="px-4 py-4 font-bold text-gray-700">
                    {formatAmount(order.pricing?.totalAmount)}
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status?.replace('_', ' ').toUpperCase() || 'PENDING'}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-gray-600 font-bold">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/order-details?id=${order._id}`);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-bold text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-semibold mb-2">No orders found</p>
            <p className="text-gray-500 text-sm">Create your first order to get started</p>
            <button
              onClick={() => navigate('/create-order')}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Create Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
