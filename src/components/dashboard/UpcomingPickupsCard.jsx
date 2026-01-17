import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Truck, ChevronDown, PrinterCheck, Loader2 } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';

const UpcomingPickupsCard = () => {
  const navigate = useNavigate();
  const { upcomingPickups, loading, error, fetchUpcomingPickups } = useDashboard();

  useEffect(() => {
    fetchUpcomingPickups(10);
  }, [fetchUpcomingPickups]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'picked_up':
        return 'text-green-600';
      case 'confirmed':
        return 'text-blue-600';
      default:
        return 'text-yellow-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md px-3 pt-3 pb-6 w-full mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="bg-gray-100 p-2 rounded-md mr-3 flex items-center justify-center">
            <img alt="mynaui_truck" src="/images/icon/mynaui_truck.png"></img>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Upcoming Pickups
          </h2>
        </div>
        <button 
          onClick={() => navigate('/create-pickup-request')}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-md transition duration-150 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Create New Pickup
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 px-2">
                <input type="checkbox" />
              </th>
              <th className="py-2 px-2 whitespace-nowrap">AWB AND ORDER ID</th>
              <th className="py-2 px-2 whitespace-nowrap">MANIFESTED DATE AND TIME</th>
              <th className="py-2 px-2 whitespace-nowrap">PICKUP DATE</th>
              <th className="py-2 px-2 whitespace-nowrap">PICKUP AND DELIVERY ADDRESS</th>
              <th className="py-2 px-2 whitespace-nowrap">STATUS</th>
              <th className="py-2 px-2"></th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-8 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
                </td>
              </tr>
            ) : upcomingPickups && upcomingPickups.length > 0 ? (
              upcomingPickups.map((pickup, idx) => (
                <tr key={idx} className="border-b">
                  <td className="py-3 px-2">
                    <input type="checkbox" />
                  </td>

                  {/* AWB */}
                  <td className="py-3 px-2">
                    <div 
                      className="text-blue-600 font-medium cursor-pointer text-xs hover:underline"
                      onClick={() => navigate(`/order-details?id=${pickup.orderNumber}`)}
                    >
                      {pickup.awb || 'Not generated'}
                    </div>
                    <div className="text-gray-500 text-xs">{pickup.orderNumber}</div>
                  </td>

                  {/* Manifested Date */}
                  <td className="py-3 px-2 whitespace-nowrap">
                    <div className="font-medium text-xs">{formatDate(pickup.date)}</div>
                    <div className="text-gray-500 text-xs">{formatTime(pickup.date)}</div>
                  </td>

                  {/* Pickup Date */}
                  <td className="py-3 px-2 whitespace-nowrap font-medium text-xs">
                    {formatDate(pickup.date)}
                  </td>

                  {/* Address */}
                  <td className="py-3 px-2">
                    <div className="flex gap-2">
                      <img src="/images/icon/pickup-icon.png" className="w-2 h-12" alt="pickup icon" />
                      <div className="flex justify-between flex-col gap-4">
                        <span className="text-xs">
                          {pickup.pickup.address} ({pickup.pickup.pincode})
                        </span>
                        <span className="text-xs">
                          {pickup.delivery.address} ({pickup.delivery.pincode})
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-2 whitespace-nowrap">
                    <div className={`flex items-center gap-2 text-xs font-medium ${getStatusColor(pickup.status)}`}>
                      <Truck className="w-4" /> 
                      {pickup.status?.replace('_', ' ').toUpperCase() || 'PENDING'}
                    </div>
                  </td>

                  {/* Print */}
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-2 text-xs text-blue-600 cursor-pointer">
                      <PrinterCheck className="w-4" /> Print <ChevronDown className="w-4"/>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-gray-500 text-sm">
                  No upcoming pickups found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingPickupsCard;
