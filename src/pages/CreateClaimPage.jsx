import React from 'react';
import { 
  Package, 
  Truck, 
  Copy, 
  ChevronLeft, 
  Search, 
  LayoutList, 
  WalletCards, 
  Box,
  ChevronDown
} from 'lucide-react';

const CreateClaimPage = () => {
  const rows = Array(5).fill(null); // Adjust count based on selection

  return (
    <div className="min-h-screen font-sans text-slate-900">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
          <ChevronLeft size={20} className="text-slate-600" />
        </button>
        <h1 className="text-xl font-bold text-[#0F172A]">Create New Claim</h1>
      </div>

      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Main Content Area */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Claim Details Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <WalletCards size={20} />
              </div>
              <h2 className="text-[16px] font-bold">Claim Details</h2>
            </div>

            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-700">AWB Number</label>
              <div className="relative max-w-2xl">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Select search" 
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F1F5F9] border-none rounded-lg text-[14px] focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <p className="text-[12px] text-slate-400 mt-2">
                Want to upload as a CSV (Sample) file ? <span className="text-blue-600 cursor-pointer font-medium">Upload File</span>
              </p>
            </div>
          </div>

          {/* List of Shipments Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 flex items-center gap-3 border-b border-slate-100">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <Box size={20} />
              </div>
              <h2 className="text-[16px] font-bold">List of Shipments</h2>
            </div>

            <div className="overflow-auto max-h-[300px] ">
              {rows.length > 0 ? (
                <table className="w-full text-left border-collapse min-w-[800px]">
                  <thead className='sticky top-0'>
                    <tr className="bg-[#F8FAFC] border-b border-slate-200">
                      <th className="py-4 px-4 w-10"><input type="checkbox" className="w-4 h-4 rounded accent-blue-600" /></th>
                      <th className="py-4 px-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Order ID and AWB</th>
                      <th className="py-4 px-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="py-4 px-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Pickup/Delivery</th>
                      <th className="py-4 px-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Transport</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rows.map((_, i) => (
                      <tr key={i} className="align-top">
                        <td className="py-5 px-4"><input type="checkbox" checked className="w-4 h-4 rounded accent-blue-600" /></td>
                        <td className="py-5 px-2">
                          <div className="flex gap-3">
                            <div className="bg-slate-100 p-2 rounded-lg text-slate-500 h-fit"><Package size={18}/></div>
                            <div>
                              <div className="text-blue-600 font-bold text-[13px]">41BC4C4A8</div>
                              <div className="text-slate-500 text-[12px]">3701331000232</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-2 text-[#22C55E] font-bold text-[13px]">Delivered</td>
                        <td className="py-5 px-2 text-[12px]">
                          <div className="font-bold text-slate-700 leading-tight">NIMI (110044)</div>
                          <div className="text-slate-400 my-1">To</div>
                          <div className="font-bold text-slate-700 leading-tight">AJAY (491001)</div>
                        </td>
                        <td className="py-5 px-2">
                          <div className="flex items-center gap-2">
                            <Truck size={18} className="text-orange-500" />
                            <span className="text-[12px] font-bold uppercase text-slate-700">Surface</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                   <Box size={60} className="mb-4 opacity-20" />
                   <p className="text-[14px]">Selected orders will appear here for claim</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Summary Area */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-6">
            <div className="p-4 bg-[#F8FAFC] border-b border-slate-200 flex items-center gap-3">
              <LayoutList size={18} className="text-slate-600" />
              <h2 className="text-[15px] font-bold">Summary</h2>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-slate-600 font-medium">Weight Mismatch</span>
                <span className="font-bold">0</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-slate-600 font-medium">Zone Mismatch</span>
                <span className="font-bold">0</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-[14px]">
                <span className="text-slate-900 font-bold">Total No. of Claims</span>
                <span className="font-bold text-blue-600">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 flex justify-end gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
        <button className="px-6 py-2 text-[14px] font-bold text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
          Cancel
        </button>
        <button className="px-6 py-2 text-[14px] font-bold text-white bg-[#2563EB] hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
          Create Claim
        </button>
      </div>
    </div>
  );
};

export default CreateClaimPage;