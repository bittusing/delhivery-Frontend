import React, { useState } from "react";

const DirectIntracityOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({
    searchId: "",
    dateRange: "",
    city: "",
    status: ""
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const tableColumns = [
    { key: "orderId", label: "ORDER ID (UPDATED ON)", sortable: true },
    { key: "placedBy", label: "PLACED BY", sortable: true },
    { key: "pickupDelivery", label: "PICKUP & DELIVERY ADDRESS" },
    { key: "vehicleType", label: "VEHICLE TYPE" },
    { key: "city", label: "CITY" },
    { key: "shippingCharges", label: "SHIPPING CHARGES", sortable: true },
    { key: "status", label: "STATUS" }
  ];

  return (
    <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Direct Intracity Orders</h1>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Pickup ID */}
          <div>
            <input
              type="text"
              placeholder="Search pickup ID"
              value={filters.searchId}
              onChange={(e) => handleFilterChange("searchId", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date Range */}
          <div>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">Date Range</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* City */}
          <div>
            <select
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">City</option>
              <option value="delhi">Delhi</option>
              <option value="mumbai">Mumbai</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="">Status</option>
              <option value="pending">Pending</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 border-b">
                {tableColumns.map((col) => (
                  <th
                    key={col.key}
                    className="px-4 py-4 text-left font-semibold text-gray-800 whitespace-nowrap"
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      {col.sortable && <span className="text-xs">⇅</span>}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={tableColumns.length}
                    className="px-4 py-16 text-center text-gray-500 font-semibold"
                  >
                    No Records Found
                  </td>
                </tr>
              ) : (
                orders.map((order, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-900">{order.orderId}</td>
                    <td className="px-4 py-3 text-gray-900">{order.placedBy}</td>
                    <td className="px-4 py-3 text-gray-900">{order.pickupDelivery}</td>
                    <td className="px-4 py-3 text-gray-900">{order.vehicleType}</td>
                    <td className="px-4 py-3 text-gray-900">{order.city}</td>
                    <td className="px-4 py-3 text-gray-900">{order.shippingCharges}</td>
                    <td className="px-4 py-3">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DirectIntracityOrdersPage;
