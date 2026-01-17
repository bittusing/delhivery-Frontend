import React, { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Truck, ChevronDown } from 'lucide-react';



// Custom Tooltip component for Recharts (defined globally for simplicity)
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
        <p className="text-xs font-semibold text-gray-700">{label}</p>
        <p className="text-sm text-blue-600">
          Picked: <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// --- YourPerformanceCard Component (The reusable chart card) ---
const YourPerformanceCard = ({ data, title = "Your Performance" }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 14 Days');

  // Configuration for the Y-Axis
  const yAxisDomain = useMemo(() => [0, 250], []);
  const yAxisTicks = useMemo(() => [0, 50, 100, 150, 200, 250], []);

  const ChartContent = () => (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        // Adjust margin to give space for rotated X-axis labels and Y-axis title
        margin={{ top: 20, right: 30, left: 10, bottom: 40 }} 
      >
        {/* Dashed Grid Lines */}
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />

        {/* X-Axis (Dates) */}
        <XAxis
          dataKey="name"
          tick={{ fontSize: 10, fill: '#6B7280' }}
          angle={-30}
          textAnchor="end"
          height={40}
          interval="preserveStartEnd"
        />

        {/* Y-Axis (Shipments) */}
        <YAxis
          domain={yAxisDomain}
          ticks={yAxisTicks}
          tick={{ fontSize: 10, fill: '#6B7280' }}
          axisLine={false}
          tickLine={false}
          width={30}
        />

        <Tooltip content={<CustomTooltip />} />

        <Line
          type="monotone"
          dataKey="shipments"
          stroke="#2563EB"
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6, fill: '#93C5FD', stroke: '#2563EB', strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full">
      <div className="p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {/* Icon */}
            <div className="bg-blue-50 p-2 rounded-lg mr-3 flex items-center justify-center text-blue-600">
              <Truck className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>

          {/* Dropdown for time period */}
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="block appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer transition duration-150"
            >
              <option>Last 14 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>All Time</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Performance Trend Label */}
        <p className="text-gray-600 font-medium mb-3 border-b pb-2">Performance Trend</p>
      </div>

      {/* Chart Area */}
      <div className="relative h-80 px-4 pb-4">
        <ChartContent />

        {/* Y-axis Title - Manually placed and rotated */}
        <div
          className="absolute left-[-20px] top-1/2 -translate-y-1/2 -rotate-90 origin-center text-sm font-semibold text-gray-600"
        >
          PICKED SHIPMENTS
        </div>
      </div>
    </div>
  );
};



export default YourPerformanceCard;