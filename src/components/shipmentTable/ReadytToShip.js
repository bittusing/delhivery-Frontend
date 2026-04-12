import React from "react";

export default function ReadytToShip() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm min-h-[500px] flex flex-col">
      {/* Table Header - Matching the grey tint and text alignment */}
      <div className="grid grid-cols-[60px_1.5fr_1.5fr_1.5fr_1.5fr_1.5fr] bg-[#F1F3F9] border-b border-gray-200">
        <div className="py-4 px-4 flex justify-center">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-300 accent-blue-600"
          />
        </div>
        <div className="py-4 px-2 text-[13px] font-bold text-[#334155] uppercase tracking-tight flex items-center gap-1">
          Order ID and AWB
        </div>
        <div className="py-4 px-2 text-[13px] font-bold text-[#334155] uppercase tracking-tight flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-slate-400"></div>
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-400"></div>
          </div>
          Manifested Date
        </div>
        <div className="py-4 px-2 text-[13px] font-bold text-[#334155] uppercase tracking-tight flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[4px] border-b-slate-400"></div>
            <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-slate-400"></div>
          </div>
         Pickup and Delivery Address
        </div>
        <div className="py-4 px-2 text-[13px] font-bold text-[#334155] uppercase tracking-tight">
         Transport mode and zone
        </div>
        <div className="py-4 px-2 text-[13px] font-bold text-[#334155] uppercase tracking-tight">
          Payment Mode
        </div>
        
      </div>

      {/* Empty State Body */}
      <div className="flex-1 flex flex-col items-center justify-center py-20">
        <h3 className="text-2xl font-bold text-[#1E293B]">No Records Found</h3>
      </div>
    </div>
  );
}
