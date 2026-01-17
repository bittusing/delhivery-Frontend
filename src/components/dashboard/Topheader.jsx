import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';

// Card component for individual metrics
const MetricCard = ({ title, value, percentage, subText, icon, code }) => (
  <div className="bg-white p-4 rounded-lg shadow-md min-w-[200px] flex-1">
    <div className='flex justify-between'>
      <div className={`flex flex-col border-l-4 pl-3`} style={{ borderColor: code }}>
        <span className="text-sm text-gray-500 font-medium mb-1">{title}</span>
        <p className="text-3xl font-bold text-gray-800">
          {value}
          {percentage && <span className="text-xl ml-2 font-semibold text-gray-500">({percentage}%)</span>}
        </p>
      </div>
      <div>
        <img src={`/images/icon/${icon}.png`} alt="know-more" />
      </div>
    </div>
    <p className="text-xs text-gray-400 mt-1">{subText}</p>
  </div>
);

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount || 0);
};

// Main dashboard component
const Topheader = () => {
  const { stats, loading, error, fetchStats } = useDashboard();
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    // Set date range for last 30 days
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30);
    
    const startStr = startDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    const endStr = endDate.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    setDateRange(`${startStr} - ${endStr}`);

    // Fetch stats
    fetchStats();
  }, [fetchStats]);

  return (
    <div className='mb-6'>
      {/* --- Header Section --- */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition duration-150">
            <span className="font-semibold text-gray-700">Rate Calculator</span>
            <div>
              <img src="/images/icon/calculate_icon.png" alt="calculate_icon" />
            </div>
          </button>
          <button className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition duration-150">
            <span className="font-semibold text-gray-700">Know More</span>
            <div>
              <img src="/images/icon/know-more.png" alt="know-more" />
            </div>
          </button>
        </div>
        
        <div className="flex items-center p-2 bg-white rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:border-indigo-400 transition duration-150 h-14">
          <span className="text-gray-700 font-medium mr-4">{dateRange}</span>
          <svg className="w-5 h-5 text-[#146BE6] hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* --- Metrics Cards Section --- */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : stats ? (
        <div className="flex flex-wrap gap-6">
          <MetricCard
            title="Total Shipments"
            value={stats.totalShipments || 0}
            subText="(Total forward shipments)"
            icon={"shipments-icon"}
            code="#4F58BC"
          />
          <MetricCard
            title="Delivered Shipments"
            value={stats.deliveredShipments || 0}
            percentage={stats.deliveredPercentage || 0}
            subText="(Total forward delivered orders)"
            icon={"delivered-icon"}
            code="#55B4A9"
          />
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(stats.totalRevenue)}
            subText="(Value of delivered orders)"
            icon={"revenue-icon"}
            code="#4D66FB"
          />
          <MetricCard
            title="Total RTO"
            value={stats.rtoOrders || 0}
            percentage={stats.rtoPercentage || 0}
            subText="(Orders returned to origin)"
            icon={"rto-icon"}
            code="#749DDF"
          />
        </div>
      ) : (
        <div className="flex flex-wrap gap-6">
          <MetricCard
            title="Total Shipments"
            value="0"
            subText="(Total forward shipments)"
            icon={"shipments-icon"}
            code="#4F58BC"
          />
          <MetricCard
            title="Delivered Shipments"
            value="0"
            percentage="0"
            subText="(Total forward delivered orders)"
            icon={"delivered-icon"}
            code="#55B4A9"
          />
          <MetricCard
            title="Total Revenue"
            value="₹0"
            subText="(Value of delivered orders)"
            icon={"revenue-icon"}
            code="#4D66FB"
          />
          <MetricCard
            title="Total RTO"
            value="0"
            percentage="0"
            subText="(Orders returned to origin)"
            icon={"rto-icon"}
            code="#749DDF"
          />
        </div>
      )}
    </div>
  );
};

export default Topheader;
