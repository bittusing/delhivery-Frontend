import React, { useState } from 'react';
import { 
  Download, Edit, Plus, Search, 
  Truck, Copy, X, ChevronDown, 
  Package, Info, HelpCircle 
} from 'lucide-react';

const InTransit = () => {
  

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

        <FilterDropdown label="Shipment Status" />
        <FilterDropdown label="Estimated Delivery Date" />
        <FilterDropdown label="Pickup Location" />
        <FilterDropdown label="Transport Mode" />
        <FilterDropdown label="Payment Mode" />
      </div>

      {/* Table Section */}
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead className="bg-[#F7F7F5] border-b border-gray-200">
              <tr className="text-[#64748b]">
                <th className="py-3 px-2 w-12"><input type="checkbox" className="w-4 h-4 rounded accent-blue-600" /></th>
                <th className="py-3 px-2 text-[11px] font-bold uppercase tracking-wider">Order ID and AWB</th>
                <th className="py-3 px-2 text-[11px] font-bold uppercase tracking-wider">Pickup and delivery address</th>
                <th className="py-3 px-2 text-[11px] font-bold uppercase tracking-wider w-20">Status</th>
                <th className="py-3 px-2 text-[11px] font-bold uppercase tracking-wider">Promised Delivery Date</th>
                <th className="py-3 px-2 text-[11px] font-bold uppercase tracking-wider">Estimated Delivery</th>
                <th className="py-3 px-2 text-[11px] font-bold uppercase tracking-wider">Last Update</th>
                <th className="py-3 px-2 text-[11px] font-bold uppercase tracking-wider">Transport Mode and Zone</th>
                <th className="py-3 px-2 text-[11px] font-bold uppercase tracking-wider">Payment Mode</th>
                <th className="py-3 px-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {rows.map((_, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors align-top">
                  <td className="py-3 px-2"><input type="checkbox" className="w-4 h-4 rounded accent-blue-600" /></td>
                  <td className="py-3 px-2">
                    <div className="flex items-start gap-3">
                        <div className="bg-[#f1f5f9] p-2 rounded-lg text-slate-500"><Package size={18}/></div>
                        <div>
                            <div className="text-blue-600 font-bold text-[13px] leading-tight">NS-4</div>
                            <div className="text-slate-500 text-[12px] font-medium mt-1">3701331000232</div>
                        </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-[12px] leading-relaxed">
                    <div className="flex gap-3">
                        <div className="flex flex-col items-center mt-1.5">
                            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                            <div className="w-[1px] h-8 border-l border-dashed border-slate-300 my-1"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-sm"></div>
                        </div>
                        <div className="text-slate-600">
                            <div className="mb-3"><span className="font-bold text-slate-800">NIMI</span> (Faridabad - 110044)</div>
                            <div><span className="font-bold text-slate-800">MAHBOOB</span> (Udakishanganj - 852115)</div>
                        </div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <span className="text-blue-600 font-bold text-[13px]">In-Transit</span>
                  </td>
                  <td className="py-3 px-2 text-[12px] font-medium text-slate-700">1 Dec, 2025</td>
                  <td className="py-3 px-2 text-[12px] font-medium text-slate-700">1 Dec, 2025</td>
                  <td className="py-3 px-2 max-w-[240px]">
                    <div className="text-[12px] font-bold text-slate-800 mb-1">26 Nov, Today</div>
                    <div className="text-[11px] text-slate-500 leading-normal">
                      Vehicle Departed at Noida_Bairangpur_GW (Uttar Pradesh)
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3">
                      <Truck size={20} className="text-orange-500" />
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Zone S4</div>
                        <div className="text-[12px] font-bold text-slate-700 uppercase tracking-tight">Surface</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-[12px] font-bold text-slate-800">Prepaid</td>
                  <td className="py-3 px-2">
                    <div className="flex flex-col gap-3">
                        <button className="flex items-center gap-1.5 text-blue-600 text-[12px] font-bold hover:text-blue-800 transition">
                            <Copy size={14} /> Clone Order
                        </button>
                        <button className="flex items-center gap-1.5 text-red-500 text-[12px] font-bold hover:text-red-700 transition">
                            <X size={14} /> Cancel Shipment
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

export default InTransit;