import { useState, useEffect } from "react";
import { Truck, ChevronDown, Loader2 } from 'lucide-react';
import { useDashboard } from '../../hooks/useDashboard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function PerformanceGraph() {
  const [selectedPeriod, setSelectedPeriod] = useState('14');
  const { performanceData, loading, error, fetchPerformanceData } = useDashboard();

  useEffect(() => {
    const days = selectedPeriod === 'All Time' ? 365 : parseInt(selectedPeriod);
    fetchPerformanceData(days);
  }, [selectedPeriod, fetchPerformanceData]);

  // Calculate max value for Y axis
  const maxValue = performanceData.length > 0 
    ? Math.max(...performanceData.map(d => d.value), 50) 
    : 250;
  const yAxisMax = Math.ceil(maxValue / 50) * 50; // Round to nearest 50

  const yAxis = [];
  for (let i = 0; i <= yAxisMax; i += yAxisMax / 5) {
    yAxis.push(Math.floor(i));
  }

  return (
    <div className="space-y-3 bg-white rounded-xl p-6 w-full my-3">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {/* Icon */}
            <div className="bg-blue-50 p-2 rounded-lg mr-3 flex items-center justify-center text-blue-600">
              <Truck className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your Performance</h2>
          </div>

          {/* Dropdown for time period */}
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="block appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer transition duration-150"
            >
              <option value="14">Last 14 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">All Time</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Performance Trend Label */}
        <p className="text-gray-600 font-medium mb-3 pb-2">Performance Trend</p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Graph Area */}
      <div className="relative h-[300px] w-full">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : performanceData && performanceData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{ top: 5, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                tick={{ fontSize: 10, fill: '#6B7280' }}
              />
              <YAxis
                domain={[0, yAxisMax]}
                ticks={yAxis}
                tick={{ fontSize: 10, fill: '#6B7280' }}
                label={{ value: 'PICKED SHIPMENTS', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#6B7280' } }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4D66FB"
                strokeWidth={2}
                dot={{ fill: '#4D66FB', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <div className="font-semibold">No Data</div>
            <div className="text-sm">
              Start shipping your order to see the trend
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
