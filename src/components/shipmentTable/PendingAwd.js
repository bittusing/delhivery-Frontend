import React, { useState } from 'react';
import { ChevronDown, Info, Filter, Calendar, MapPin } from 'lucide-react';

const PendingAwd = () => {  

  return (
    <div className="w-full min-h-screen font-sans">
      

      {/* 2. Filter Bar - Exact Match to New Image */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Order ID Selector */}
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm">
          Order ID <ChevronDown size={16} className="text-gray-400" />
        </button>

        {/* Search Input */}
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search upto 150 Orders" 
            className="pl-3 pr-10 py-2 border border-gray-200 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-400 bg-[#EEF2F6] placeholder:text-slate-500"
          />
          <Info size={16} className="absolute right-3 top-2.5 text-slate-400" />
        </div>

        {/* Filter Buttons */}
        <FilterButton icon={<Calendar size={16} />} label="Date Range" />
        <FilterButton icon={<MapPin size={16} />} label="Pickup Location" />
        <FilterButton icon={<Filter size={16} />} label="All Filter" />
      </div>

      {/* 3. Table Section with "No Records Found" */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm min-h-[500px] flex flex-col">
        {/* Table Header - Matching the grey tint and text alignment */}
        <div className="grid grid-cols-[60px_1.5fr_1.5fr_1.5fr_1.5fr_1.5fr] bg-[#F1F3F9] border-b border-gray-200">
          <div className="py-4 px-4 flex justify-center">
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
          </div>
          <div className="py-4 px-2 text-[13px] font-bold text-[#334155] uppercase tracking-tight flex items-center gap-1">
            Order Details
          </div>
          <div className="py-4 px-2 text-[13px] font-bold text-[#334155] uppercase tracking-tight flex items-center gap-2">
            <div className="flex flex-col gap-0.5">
               <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-slate-400"></div>
               <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-400"></div>
            </div>
            Customer Details
          </div>
          <div className="py-4 px-2 text-[13px] font-bold text-[#334155] uppercase tracking-tight">
            Product Details
          </div>
          <div className="py-4 px-2 text-[13px] font-bold text-[#334155] uppercase tracking-tight">
            Packaging Details
          </div>
          <div className="py-4 px-2 text-[13px] font-bold text-[#334155] uppercase tracking-tight">
            Freight & Delivery
          </div>
        </div>

        {/* Empty State Body */}
        <div className="flex-1 flex flex-col items-center justify-center py-20">
          <h3 className="text-2xl font-bold text-[#1E293B]">No Records Found</h3>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Filter Buttons
const FilterButton = ({ label }) => (
  <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-gray-50 transition shadow-sm">
    {label} <ChevronDown size={16} className="text-gray-400" />
  </button>
);

export default PendingAwd;