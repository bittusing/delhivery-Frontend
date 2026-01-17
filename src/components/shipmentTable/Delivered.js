import React, { useState } from 'react';
import { 
  Download, Edit, Plus, Search, 
  Truck, Copy, X, ChevronDown, 
  Package, Info, Printer, HelpCircle 
} from 'lucide-react';

const Delivered = () => {
  

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
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-gray-200">
              <th className="py-4 px-4 w-10">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
              </th>
              <th className="py-4 px-2 text-[12px] font-bold text-slate-700 uppercase tracking-tight">Order ID and AWB</th>
              <th className="py-4 px-2 text-[12px] font-bold text-slate-700 uppercase tracking-tight">Delivered On</th>
              <th className="py-4 px-2 text-[12px] font-bold text-slate-700 uppercase tracking-tight">Pickup and Delivery Address</th>
              <th className="py-4 px-2 text-[12px] font-bold text-slate-700 uppercase tracking-tight">Transport Mode and Zone</th>
              <th className="py-4 px-2 text-[12px] font-bold text-slate-700 uppercase tracking-tight">Payment Mode</th>
              <th className="py-4 px-2 text-[12px] font-bold text-slate-700 uppercase tracking-tight">Delivered Weight</th>
              <th className="py-4 px-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((_, i) => (
              <tr key={i} className="hover:bg-slate-50 transition-colors align-top">
                <td className="py-5 px-4">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-blue-600" />
                </td>
                
                {/* Order ID & AWB */}
                <td className="py-5 px-2">
                  <div className="flex items-start gap-3">
                    <div className="bg-[#DEE5EF] p-2 rounded-lg text-slate-600">
                      <Package size={20} />
                    </div>
                    <div>
                      <div className="text-blue-600 font-bold text-[14px]">41BC4C4A8</div>
                      <div className="text-slate-700 text-[13px] font-medium mt-0.5">3701331000232</div>
                    </div>
                  </div>
                </td>

                {/* Delivered On */}
                <td className="py-5 px-2 text-[13px] font-bold text-slate-800">
                  1 Dec, 2025
                </td>

                {/* Pickup & Delivery */}
                <td className="py-5 px-2">
                  <div className="flex gap-3">
                    <div className="flex flex-col items-center mt-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                      <div className="w-[1.5px] h-6 border-l-2 border-dashed border-slate-300 my-1"></div>
                      <div className="w-2.5 h-2.5 bg-slate-400 rounded-sm"></div>
                    </div>
                    <div className="text-[13px] leading-[1.6]">
                      <div className="mb-2 text-slate-500">
                        <span className="font-bold text-slate-700">NIMI</span> (Faridabad - 110044)
                      </div>
                      <div className="text-slate-500">
                        <span className="font-bold text-slate-700">K</span> (Rayagada - 765001)
                      </div>
                    </div>
                  </div>
                </td>

                {/* Transport Mode */}
                <td className="py-5 px-2">
                  <div className="flex items-center gap-3">
                    <Truck size={22} className="text-orange-500" />
                    <div>
                      <div className="text-[11px] text-slate-500 font-bold uppercase">Zone S4</div>
                      <div className="text-[13px] font-bold text-slate-800 uppercase">Surface</div>
                    </div>
                  </div>
                </td>

                {/* Payment Mode */}
                <td className="py-5 px-2 text-[13px] text-slate-700">
                  Prepaid
                </td>

                {/* Delivered Weight */}
                <td className="py-5 px-2 text-[13px] text-slate-700">
                  500 gm
                </td>

                {/* Action Buttons */}
                <td className="py-5 px-4">
                  <div className="flex flex-row items-center gap-6">
                    <button className="flex items-center gap-2 text-blue-600 text-[13px] font-bold hover:underline">
                      <Printer size={16} />
                      <span className="leading-tight">Print<br/>POD</span>
                    </button>
                    <button className="flex items-center gap-2 text-blue-600 text-[13px] font-bold hover:underline">
                      <Copy size={16} />
                      <span className="leading-tight">Clone<br/>Order</span>
                    </button>
                    <button className="flex items-center gap-2 text-blue-600 text-[13px] font-bold hover:underline">
                      <X size={16} />
                      <span className="leading-tight">Initiate<br/>Return</span>
                    </button>
                  </div>
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

export default Delivered;