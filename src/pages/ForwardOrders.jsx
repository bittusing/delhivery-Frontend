import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CloudUpload, Plus, Search, Filter, Loader2, Package, Truck, CheckCircle, Clock, AlertCircle, Eye, Download } from 'lucide-react';
import orderService from '../services/order.service';

const ForwardOrders = () => {
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

    useEffect(() => {
        fetchOrders();
    }, [filters]);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const queryParams = {
                type: 'domestic', // Forward orders are domestic
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

    const handleCreateBulkOrders = () => {
        // TODO: Implement bulk order creation
        console.log("Create Bulk Orders clicked");
        // Navigate to bulk upload page when ready
        // navigate('/bulk-upload');
    };

    const handleCreateOrder = () => {
        navigate('/create-order');
    };

    const handleViewOrder = (orderNumber) => {
        navigate(`/order-details?id=${orderNumber}`);
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
                    <img src="/images/icon/box-icon.png" alt="box-icon" className='m-auto'/>
                    <h2 className="mt-9 text-xl font-bold text-gray-800">
                        Seems like you haven't created a domestic order yet
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        A Domestic Order is an order request your customer places for the products you sell
                    </p>
                    <div className="mt-5 flex justify-center space-x-4">
                        <button
                            onClick={handleCreateBulkOrders}
                            className="flex items-center px-4 py-2 text-sm font-semibold text-[#131842] bg-white border-[2px] border-[#131842] rounded-md shadow-sm hover:bg-gray-100 transition">
                            <CloudUpload className="w-4 h-4 mr-2" />
                            Create Bulk Orders
                        </button>
                        <button
                            onClick={handleCreateOrder}
                            className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 transition">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Order
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
                <h1 className="text-2xl font-bold">Forward Orders (Domestic)</h1>
                <div className="flex gap-3">
                    <button
                        onClick={handleCreateBulkOrders}
                        className="flex items-center px-4 py-2 text-sm font-semibold text-[#131842] bg-white border-2 border-[#131842] rounded-lg hover:bg-gray-50 transition">
                        <CloudUpload className="w-4 h-4 mr-2" />
                        Bulk Upload
                    </button>
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
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="relative flex items-center min-w-[280px] border border-gray-300 rounded-lg bg-white">
                    <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by order number or AWB"
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 text-sm focus:outline-none rounded-lg"
                    />
                </div>

                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-[#f1f4f9] min-w-[140px]">
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="picked_up">Picked Up</option>
                    <option value="in_transit">In Transit</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="rto">RTO</option>
                </select>

                <select
                    value={filters.deliveryPartner}
                    onChange={(e) => setFilters({ ...filters, deliveryPartner: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-[#f1f4f9] min-w-[160px]">
                    <option value="">All Partners</option>
                    <option value="nimbuspost">Nimbuspost</option>
                    <option value="delhivery">Delhivery</option>
                    <option value="bluedart">Blue Dart</option>
                </select>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 text-sm">No orders found</p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#e9ecef] text-[11px] uppercase text-gray-700 font-extrabold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Order Number</th>
                                <th className="px-6 py-4">AWB</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Destination</th>
                                <th className="px-6 py-4">Partner</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-[13px]">
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-blue-600">
                                        {order.orderNumber}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">
                                        {order.awb || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-800">{order.deliveryDetails?.name}</div>
                                        <div className="text-xs text-gray-500">{order.deliveryDetails?.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-800">{order.deliveryDetails?.city}</div>
                                        <div className="text-xs text-gray-500">{order.deliveryDetails?.pincode}</div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700 capitalize">
                                        {order.deliveryPartner}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                                            {getStatusIcon(order.status)}
                                            {order.status.replace(/_/g, ' ').toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-800">
                                        {formatAmount(order.pricing?.totalAmount)}
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {formatDate(order.createdAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleViewOrder(order.orderNumber)}
                                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 transition">
                                            <Eye className="w-4 h-4" />
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Orders Count */}
            {!loading && orders.length > 0 && (
                <div className="mt-4 text-sm text-gray-600">
                    Showing {orders.length} order{orders.length !== 1 ? 's' : ''}
                </div>
            )}
        </div>
    );
};

export default ForwardOrders;