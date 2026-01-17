import React, { useState } from 'react';
import {   
  Truck, Copy, ChevronDown, 
  Package, HelpCircle 
} from 'lucide-react';

const AllShipments = () => {
  

  const rows = Array(4).fill(null);

  return (
    <div className="w-full min-h-screen font-sans">
      {/* Top Header Section */}
      

      {/* Filters Row - Matches Image 1 */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <FilterDropdown label="AWB" isFirst />
        
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search multiple AWBs" 
            className="pl-3 pr-10 py-2 border border-gray-300 rounded-lg text-sm w-72 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-[#f9fafb]"
          />
          <HelpCircle size={16} className="absolute right-3 top-2.5 text-gray-400" />
        </div>

        <FilterDropdown label="Returned Data" />
        <FilterDropdown label="Pickup Location" />
        <FilterDropdown label="Transport Mode" />
        <FilterDropdown label="Payment Mode" />
      </div>

      {/* Table Section */}
       <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-gray-200">
              <th className="py-4 px-4 w-10">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer" />
              </th>
              <th className="py-4 px-2 text-[12px] font-bold text-[#334155] uppercase tracking-tight">Order ID and AWB</th>
              <th className="py-4 px-2 text-[12px] font-bold text-[#334155] uppercase tracking-tight">Manifested Date</th>
              <th className="py-4 px-2 text-[12px] font-bold text-[#334155] uppercase tracking-tight">
                <div className="flex items-center gap-1">
                   <div className="flex flex-col -space-y-1 scale-75">
                      <ChevronDown size={14} className="rotate-180" />
                      <ChevronDown size={14} />
                   </div>
                   Status
                </div>
              </th>
              <th className="py-4 px-2 text-[12px] font-bold text-[#334155] uppercase tracking-tight">Pickup and Delivery Address</th>
              <th className="py-4 px-2 text-[12px] font-bold text-[#334155] uppercase tracking-tight">Transport Mode and Zone</th>
              <th className="py-4 px-2 text-[12px] font-bold text-[#334155] uppercase tracking-tight">Last Update</th>
              <th className="py-4 px-2 text-[12px] font-bold text-[#334155] uppercase tracking-tight"></th>
              <th className="py-4 px-2 text-[12px] font-bold text-[#334155] uppercase tracking-tight text-right pr-6">Payment Mode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((_, i) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors align-top">
                <td className="py-5 px-4">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600 cursor-pointer" />
                </td>
                
                {/* Order ID & AWB */}
                <td className="py-5 px-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#E2E8F0] p-2.5 rounded-lg text-slate-600">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="text-blue-600 font-bold text-[13px] hover:underline cursor-pointer">41BC4C4A8</div>
                      <div className="text-slate-700 text-[13px] font-medium mt-1">3701331000232</div>
                    </div>
                  </div>
                </td>

                {/* Manifested Date */}
                <td className="py-5 px-2">
                   <div className="text-[13px] font-bold text-slate-800">1 Dec, 2025</div>
                   <div className="text-[13px] font-bold text-slate-800">02:07 Pm</div>
                </td>

                {/* Status */}
                <td className="py-5 px-2">
                  <span className="text-[#22c55e] font-bold text-[13px]">Delivered</span>
                </td>

                {/* Pickup & Delivery */}
                <td className="py-5 px-2">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center mt-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      <div className="w-[1px] h-10 border-l border-dashed border-slate-400 my-1"></div>
                      <div className="w-2.5 h-2.5 bg-slate-400 rounded-sm"></div>
                    </div>
                    <div className="text-[13px] leading-relaxed">
                      <div className="mb-4 text-slate-600">
                        <span className="font-bold text-slate-700">NIMI</span> (Faridabad - 110044)
                      </div>
                      <div className="text-slate-600">
                        <span className="font-bold text-slate-700">AJAY</span> (Durg - 491001)
                      </div>
                    </div>
                  </div>
                </td>

                {/* Transport Mode */}
                <td className="py-5 px-2">
                  <div className="flex items-center gap-3">
                    <Truck size={22} className="text-[#f97316]" />
                    <div>
                      <div className="text-[11px] text-slate-500 font-bold">Zone S4</div>
                      <div className="text-[13px] font-bold text-slate-800 uppercase">Surface</div>
                    </div>
                  </div>
                </td>

                {/* Last Update */}
                <td className="py-5 px-2 max-w-[200px]">
                   <div className="text-[13px] font-bold text-slate-800 mb-1">5 Dec, 2025</div>
                   <div className="text-[12px] text-slate-600 leading-snug">
                     Delivery to consignee at Durg_Central_D (Chhattisgarh)
                   </div>
                </td>

                {/* Clone Order */}
                <td className="py-5 px-2">
                   <button className="flex items-center gap-2 text-blue-600 text-[13px] font-bold hover:text-blue-800">
                      <Copy size={16} /> 
                      <span className="leading-tight text-left">Clone<br/>Order</span>
                   </button>
                </td>

                {/* Payment Mode */}
                <td className="py-5 px-2 text-right pr-6">
                  <span className="text-[13px] font-medium text-slate-700">Prepaid</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};



const FilterDropdown = ({ label, isFirst }) => (
  <button className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-[13px] font-medium transition-colors ${isFirst ? 'bg-[#f1f5f9] border-slate-300 text-slate-800' : 'bg-[#f9fafb] border-gray-200 text-slate-600 hover:border-gray-400'}`}>
    {label} <ChevronDown size={14} className="text-gray-400" />
  </button>
);

export default AllShipments;