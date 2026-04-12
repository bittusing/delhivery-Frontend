import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, HelpCircle, ChevronsUpDown,  } from 'lucide-react';

const ClaimsPage = () => {
  const [activeTab, setActiveTab] = useState('Open');

  return (
    <div className="min-h-screen font-sans text-slate-900">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Claims</h1>
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 h-10 rounded-lg text-sm font-medium shadow-sm cursor-pointer hover:bg-gray-50">
            Learn More <HelpCircle className="w-5 h-5 text-[#4c6ef5] fill-[#4c6ef5]/10" />
          </div>
        </div>
        <Link to="/createclaimpage">
            <button className="flex items-center gap-2 px-4 py-2 h-10 bg-[#2563eb] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-all">
              <Plus size={18} strokeWidth={3} /> New Claim
            </button>
        </Link>             
      </div>

      {/* Tabs Section */}
      <div className="flex border-b border-slate-200 mb-4">
        {['Open', 'Closed'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-2.5 text-sm font-bold transition-all border-b-2 -mb-[2px] ${
              activeTab === tab
                ? 'border-[#2563eb] text-[#2563eb]'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative max-w-xs bg-[#1318420D]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by claim ID"
            className="w-full pl-10 pr-4 py-2 bg-[#1318420D] border-none rounded-lg text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1318420D] border-b border-slate-200">
              <th className="px-6 py-3 text-left text-sm font-bold text-[#475569] whitespace-nowrap">
                Claim Id
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-[#475569] whitespace-nowrap">
                Raised On
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-[#475569] whitespace-nowrap">
                <div className="flex items-center gap-1 cursor-pointer">
                  <ChevronsUpDown size={14} className="text-slate-400" />
                  Status
                </div>
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-[#475569] whitespace-nowrap">
                Number of shipments
              </th>
            </tr>
          </thead>
          <tbody className='h-[400px]'>
            <tr>
              <td colSpan="4" className="text-center">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-xl font-bold text-slate-900">No Records Found</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimsPage;