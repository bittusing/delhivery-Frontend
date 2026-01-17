import { useState } from "react";
import { Truck, ChevronDown } from 'lucide-react';
export default function PerformanceGraph() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 14 Days');
  const yAxis = [250, 200, 150, 100, 50, 0];
  const xAxis = [
    "2 Nov","3 Nov","4 Nov","5 Nov","6 Nov",
    "7 Nov","8 Nov","9 Nov","10 Nov","11 Nov","12 Nov"
  ];

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
        <p className="text-gray-600 font-medium mb-3  pb-2">Performance Trend</p>
      </div>



      {/* Graph Area */}
      <div className="relative h-[300px] w-full border-t">
        {/* Y Axis */}
        <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-gray-400">
          {yAxis.map((val) => (
            <div key={val} className="flex items-center gap-2">
              <span className="w-6 text-right">{val}</span>
              <div className="w-full border-t border-dashed border-gray-300"></div>
            </div>
          ))}
        </div>

        {/* Empty state text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
          <div className="font-semibold">No Data</div>
          <div className="text-sm">
            Start shipping your order to see the trend
          </div>
        </div>

        {/* X Axis */}
        <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-gray-400">
          {xAxis.map((val) => (
            <div key={val} className="-rotate-45 origin-top-left">
              {val}
            </div>
          ))}
        </div>
      </div>

      {/* Y Axis Label */}
      <div className="absolute left-0 top-1/2 -rotate-90 text-xs text-gray-500">
        PICKED SHIPMENTS
      </div>
    </div>
   
  );
}
