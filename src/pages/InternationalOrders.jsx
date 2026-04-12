import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudUpload, Plus, Search, Loader2, Package, Truck, CheckCircle, Clock, AlertCircle, Eye, FileDown } from 'lucide-react';
import orderService from '../services/order.service';

const InternationalOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        status: '',
        deliveryPartner: '',
        search: '',
        limit: 50
    });
    const [nimbusBusy, setNimbusBusy] = useState({ orderId: null, action: null });
    const [actionMessage, setActionMessage] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, [filters]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const queryParams = {
                orderType: 'international', // Explicitly fetch international orders
                ...filters
            };

            const response = await orderService.getOrders(queryParams);
            
            if (response.success) {
                setOrders(response.data.orders || []);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrder = () => {
        navigate('/create-order');
    };

    const handleViewOrder = (orderId) => {
        navigate(`/order-details?id=${orderId}`);
    };

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
            case 'cancelled':
            case 'rto':
                return <AlertCircle className="w-4 h-4 text-red-600" />;
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
            year: 'numeric'
        });
    };

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2
        }).format(amount || 0);
    };

    // Empty State
    if (!loading && orders.length === 0 && !filters.search && !filters.status) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-50 min-h-[calc(100vh-96px)]">
                <div className="text-center">
                    <img src="/images/icon/box-icon.png" alt="box-icon" className='m-auto h-24 w-24 opacity-50'/>
                    <h2 className="mt-9 text-xl font-bold text-gray-800">
                        No International Orders Yet
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 max-w-md mx-auto">
                        Track and manage all your international shipments from this dashboard.
                    </p>
                    <div className="mt-7 flex justify-center">
                        <button
                            onClick={handleCreateOrder}
                            className="flex items-center px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200">
                            <Plus className="w-4 h-4 mr-2" />
                            Create International Order
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Orders List View
    return (
        <div className="min-h-screen font-sans text-[#1a2b4b]">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">International Orders</h1>
                <div className="flex gap-3">
                    <button
                        onClick={handleCreateOrder}
                        className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Order
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="relative flex items-center min-w-[320px] border border-gray-300 rounded-lg bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                    <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by ID, AWB or customer..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 text-sm focus:outline-none rounded-lg"
                    />
                </div>

                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition min-w-[150px]">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="picked_up">Picked Up</option>
                    <option value="in_transit">In Transit</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>

                <select
                    value={filters.deliveryPartner}
                    onChange={(e) => setFilters({ ...filters, deliveryPartner: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition min-w-[150px]">
                    <option value="">All Partners</option>
                    <option value="overseas_logistic">Overseas Logistic</option>
                    <option value="fedex">FedEx</option>
                    <option value="dhl">DHL</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                {loading ? (
                    <div className="flex flex-col justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-2" />
                        <p className="text-gray-500 text-sm">Loading international orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-20">
                        <Package className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500 font-medium">No orders found matching your criteria</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50 text-[11px] uppercase text-gray-500 font-bold border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4">ID / AWB</th>
                                    <th className="px-6 py-4">Customer</th>
                                    <th className="px-6 py-4">Destination</th>
                                    <th className="px-6 py-4">Partner</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-[13px] divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-blue-600">{order.orderNumber}</div>
                                            <div className="text-xs text-gray-400 mt-0.5">{order.awb || 'Label Pending'}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-800">{order.deliveryDetails?.name}</div>
                                            <div className="text-xs text-gray-500">{order.deliveryDetails?.email || order.deliveryDetails?.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-800">{order.deliveryDetails?.country}</div>
                                            <div className="text-xs text-gray-500">{order.deliveryDetails?.city}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                                                <span className="capitalize font-medium text-gray-700">{order.deliveryPartner?.replace(/_/g, ' ')}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-800">
                                            {formatAmount(order.pricing?.totalAmount)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                {order.status.replace(/_/g, ' ').toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleViewOrder(order._id)}
                                                className="inline-flex items-center gap-1 text-xs font-bold text-white bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-700 transition shadow-sm">
                                                <Eye className="w-3.5 h-3.5" />
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination / Info */}
            {!loading && orders.length > 0 && (
                <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div className="text-xs text-gray-500 font-medium font-sans">
                        Showing <span className="text-gray-900 font-bold">{orders.length}</span> international shipments
                    </div>
                    <div className="text-[11px] text-blue-500 font-bold uppercase tracking-wider">
                        Real-time backend data
                    </div>
                </div>
            )}
        </div>
    );
};

export default InternationalOrders;