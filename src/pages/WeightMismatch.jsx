import React from 'react';
import { 
  Search, 
  Download, 
  Plus, 
  Info, 
  Package, 
  Eye, 
  AlertCircle, 
  ChevronDown,
  HelpCircle
} from 'lucide-react';

const WeightMismatchPage = () => {
  const data = Array(5).fill({
    awb: '37013310000615',
    raisedOn: '1 Dec, 2025',
    time: '08:43 PM',
    status: 'Delivered',
    manifestedWeight: '500 g',
    chargedWeight: '1583.6 g',
    excessWeight: '+ 1083.60 g',
    costDiff: '+ ₹136.58',
  });

  return (
    <div className="pt-5 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-[#1e293b]">Weight Mismatch</h1>
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 h-10 rounded-lg text-sm font-medium shadow-sm cursor-pointer hover:bg-gray-50">
            Learn More <HelpCircle className="w-5 h-5 text-[#4c6ef5] fill-[#4c6ef5]/10" />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-4.5 h-10 border border-slate-300 rounded text-sm font-semibold bg-white text-slate-700">
            <Download size={16} /> Download CSV
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 h-10 bg-[#2563eb] text-white rounded text-sm font-semibold hover:bg-blue-700 transition">
            <Plus size={16} /> New Claim
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative bg-[#e9ecef]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by AWB" 
            className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-md bg-[#f1f5f9] text-sm w-64 focus:outline-none"
          />
        </div>
        <button className="bg-[#0f172a] text-white px-4 py-1.5 rounded-md text-sm font-medium">
          Update On : 9 Nov 2025 to 23 Nov 2025
        </button>
        <button className="text-blue-600 text-sm font-medium">Reset</button>
      </div>

      {/* Info Message */}
      <div className="flex items-center gap-2 text-[#2563eb] text-sm mb-4">
        <Info size={16} />
        <span>Weight mismatches for RTO/DTO shipments will be available soon</span>
      </div>

      {/* Table Section */}
      <div className="bg-white min-h-[500px] rounded border border-slate-200 overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#e9ecef] border-b border-slate-200 text-[11px] uppercase font-bold text-slate-600">
              <th className="px-4 py-3 whitespace-nowrap">AWB</th>
              <th className="px-4 py-3 whitespace-nowrap">Raised On</th>
              <th className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-1 cursor-pointer">Status <ChevronDown size={14}/></div>
              </th>
              <th className="px-4 py-3 whitespace-nowrap">Manifested Weight</th>
              <th className="px-4 py-3 whitespace-nowrap">Charges Weight</th>
              <th className="px-4 py-3 whitespace-nowrap">Cost Diff.</th>
              <th className="px-4 py-3 whitespace-nowrap">Sorter Images</th>
              <th className="px-4 py-3 whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                {/* AWB */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-[#f1f5f9] rounded border border-slate-200">
                      <Package size={16} className="text-slate-600" />
                    </div>
                    <span className="text-[#2563eb] font-bold text-sm cursor-pointer hover:underline">{item.awb}</span>
                  </div>
                </td>
                {/* Raised On */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="text-sm font-bold text-slate-700">{item.raisedOn}</div>
                  <div className="text-[11px] text-slate-400 font-medium">{item.time}</div>
                </td>
                {/* Status */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="px-2.5 py-1 bg-[#ccfbf1] text-[#0d9488] text-[10px] font-bold rounded uppercase">
                    {item.status}
                  </span>
                </td>
                {/* Manifested Weight */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-700">{item.manifestedWeight}</span>
                    <Info size={14} className="text-[#3b82f6] cursor-help" />
                  </div>
                </td>
                {/* Charges Weight */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-slate-700">{item.chargedWeight}</span>
                    <Info size={14} className="text-[#3b82f6] cursor-help" />
                  </div>
                  <div className="text-[11px] text-slate-300 font-bold">{item.excessWeight}</div>
                </td>
                {/* Cost Diff */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-[#ef4444] font-bold text-sm">{item.costDiff}</span>
                </td>
                {/* Sorter Images */}
                <td className="px-4 py-3 whitespace-nowrap">
                  <button className="flex items-center gap-2 text-[#2563eb] text-sm font-semibold">
                    <Eye size={16} /> View Image
                  </button>
                </td>
                {/* Actions */}
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  <button className="flex items-center gap-1.5 text-[#2563eb] text-sm font-semibold">
                    <AlertCircle size={16} /> Raise Claim
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeightMismatchPage;