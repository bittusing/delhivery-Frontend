import React, { useState } from "react";
import { 
  AlertTriangle, 
  Download, 
  Eye, 
  MessageSquareWarning, 
  ChevronRight 
} from "lucide-react";

const ExceptionsNDRPage = () => {
  const [orders] = useState({
    unsuccessful: {
      total: 0,
      categories: [
        { name: "Customer Address Issues", count: 0, actionable: true },
        { name: "Payment Issues", count: 0, actionable: true },
        { name: "Other Actionable Orders", count: 0, actionable: true, hasDownload: true },
        { name: "Non-Actionable Orders", count: 0, actionable: false }
      ]
    },
    onHold: [
      { name: "E-way bills required", count: 0 },
      { name: "Damages", count: 0 },
      { name: "Seller & Warehouse Returns", count: 0 },
      { name: "Additional Charges", count: 0 }
    ]
  });

  const gridBg = {
    backgroundImage: `radial-gradient(#e5e7eb 1px, transparent 1px)`,
    backgroundSize: '20px 20px',
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Section (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-orange-600 w-6 h-6" />
            <h2 className="text-[22px] font-bold text-[#1a2b4b]">
              Orders With Unsuccessful Deliveries & Pickups
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Main Total Card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[#1a2b4b] font-bold text-lg mb-4">All Unsuccessful Deliveries & Pickups</h3>
                  <span className="text-[84px] font-bold text-[#1a2b4b] leading-none">
                    {orders.unsuccessful.total}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button className="p-3 bg-[#f1f4f9] hover:bg-gray-200 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-[#1a2b4b]" />
                  </button>
                  <button className="flex items-center gap-2 px-5 py-3 bg-[#1a2b4b] text-white rounded-lg hover:bg-[#253a61] transition-colors font-semibold">
                    <Eye className="w-5 h-5" />
                    View Orders
                  </button>
                </div>
              </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 gap-4">
              {orders.unsuccessful.categories.map((cat, i) => (
                <div key={i} className="bg-[#F7F7F5] rounded-xl border border-[#B8BACC] shadow-sm flex flex-col overflow-hidden" style={gridBg}>
                  <div className="px-4 pt-3 pb-2 flex-grow">
                    <div className="flex justify-between items-start">
                      <h4 className="text-[#1a2b4b] font-bold text-base">{cat.name}</h4>
                      {cat.hasDownload && (
                         <button className="p-2 bg-[#f1f4f9] rounded-lg">
                           <Download className="w-4 h-4 text-[#1a2b4b]" />
                         </button>
                      )}
                    </div>
                    <div className="text-[64px] leading-tight font-bold text-[#1a2b4b] mt-2">
                      {cat.count}
                    </div>
                  </div>
                  
                  {cat.actionable && (
                    <div className="px-4 pb-4">
                      <button className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-gray-100 rounded-lg shadow-sm hover:bg-gray-50 text-[#1a2b4b] font-bold text-sm">
                        <MessageSquareWarning className="w-4 h-4" />
                        Take action
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <AlertTriangle className="text-[#1a2b4b] w-6 h-6" />
            <h2 className="text-[22px] font-bold text-[#1a2b4b]">Orders On Hold</h2>
          </div>

          <div className="space-y-4">
            {orders.onHold.map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-[#1a2b4b] font-bold text-lg mb-1">{item.name}</h3>
                    <span className="text-[54px] font-bold text-[#1a2b4b] leading-none">
                      {item.count}
                    </span>
                  </div>
                  <button className="flex items-center gap-1 px-6 py-2.5 bg-[#1d6ff2] text-white rounded-lg hover:bg-[#1656c2] transition-colors font-bold text-sm">
                    Take Action
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ExceptionsNDRPage;