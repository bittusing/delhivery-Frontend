import React, { useState } from 'react';
import { Search, Plus, HelpCircle, ChevronsUpDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('Open');

  return (
    <div className="min-h-screen font-sans text-slate-900">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Scheduled Reports</h1>
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 h-10 rounded-lg text-sm font-medium shadow-sm cursor-pointer hover:bg-gray-50">
            Learn More <HelpCircle className="w-5 h-5 text-[#4c6ef5] fill-[#4c6ef5]/10" />
          </div>
        </div>
        <Link to="/scheduledreportform">
            <button className="flex items-center gap-2 px-4 py-2 h-10 bg-[#2563eb] text-white rounded-lg text-sm font-bold shadow-sm hover:bg-blue-700 transition-all">
          <Plus size={18} strokeWidth={3} /> Schedule Report
        </button>
        </Link>
        
      </div>

      


      {/* Table Container */}
      <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#1318420D] border-b border-slate-200">
              <th className="px-6 py-3 text-left text-sm font-bold text-[#475569] whitespace-nowrap">
                Report Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-[#475569] whitespace-nowrap">
                Report Type
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-[#475569] whitespace-nowrap">                  
                  Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-[#475569] whitespace-nowrap">
                <div className="flex items-center gap-1 cursor-pointer">
                    <ChevronsUpDown size={14} className="text-slate-400" />
                    Recipients
                </div>                
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-[#475569] whitespace-nowrap">
               Report Recurrence
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-[#475569] whitespace-nowrap">
               Order Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-bold text-[#475569] whitespace-nowrap">
               
               <div className="flex items-center gap-1 cursor-pointer">
                    <ChevronsUpDown size={14} className="text-slate-400" />
                    Order Sub-Status
                </div>  
              </th>
            </tr>
          </thead>
          <tbody className='h-[400px]'>
            <tr>
              <td colSpan="7" className="text-center">
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

export default ReportsPage;