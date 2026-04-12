import React from 'react';

const RtoInTransit = () => {
  return (
    <div className="w-full  font-sans  text-[#1a1c21]">
      {/* 1. Filter and Search Bar Section */}
      <div className="flex flex-wrap items-center gap-2 ">
        
        {/* Search Group */}
        <div className="flex items-center bg-[#fff] rounded-md h-9 border border-transparent focus-within:border-gray-300 transition-all">
          <button className="flex items-center gap-2 px-3 text-[13px] font-semibold text-[#4a5568] border-r border-gray-300 h-full hover:bg-gray-200 transition-colors">
            AWB
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <input 
            type="text" 
            placeholder="Search upto 100 AWBs" 
            className="bg-transparent px-3 text-[13px] outline-none w-56 placeholder-gray-500"
          />
          <div className="pr-3 text-gray-400 cursor-help">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Dropdown Buttons */}
        <FilterButton label="Returned Data" />
        <FilterButton label="Pickup Location" />
        <FilterButton label="Transport Mode" />
        <FilterButton label="Payment Mode" />
        {/* <FilterButton label="All Filters" /> */}
      </div>

      {/* 2. Table Section */}
      <div className="mt-4 border border-gray-100 rounded-lg overflow-hidden shadow-sm">
        
        {/* Table Header */}
        <div className="flex items-center bg-[#1318420D] px-4 py-3 border-b border-gray-100">
          <div>
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-indigo-600" />
          </div>
          
          <div className='flex items-center justify-around w-full'>
            <HeaderItem label="Order ID and AWB" />
            <HeaderItem label="Returned On" />
            <HeaderItem label="State" hasSort />
            <HeaderItem label="Pickup and Delivery Address" hasSort flex={1.5} />
            <HeaderItem label="Transport mode and zone" />
            <HeaderItem label="Payment Mode" />
          </div>
        </div>

        {/* 3. Empty State Content */}
        <div className="flex flex-col items-center justify-center min-h-[450px] bg-white">
          <h2 className="text-[22px] font-bold text-[#1a1c21] tracking-tight">
            No Records Found
          </h2>
        </div>
      </div>
    </div>
  );
};

// Sub-component for Filter Buttons
const FilterButton = ({ label }) => (
  <button className="flex items-center gap-2 px-3 h-9 bg-[#1318420D] rounded-md text-[13px] font-semibold text-[#4a5568] hover:bg-gray-200 transition-colors">
    {label}
    <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
);

// Sub-component for Table Headers
const HeaderItem = ({ label, hasSort = false}) => (
  <div className="flex items-center gap-2 text-[13px] font-bold text-[#4c5a7d]">
    {hasSort && (
      <svg className="w-3.5 h-3.5 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" />
      </svg>
    )}
    {label}
  </div>
);

export default RtoInTransit;