import React from 'react';
import { Mail, FileText, Clock, Info, ChevronDown, X } from 'lucide-react';

const ScheduledReportForm = () => {
  return (
    <div className="min-h-screen font-sans text-slate-800 pb-10">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button className="rounded-lg border border-slate-200 bg-white p-2 hover:bg-slate-50">
          <ChevronDown className="rotate-90" size={20} />
        </button>
        <h1 className="text-xl font-bold text-[#1e293b]">Scheduled Reports</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Left Section: Details and Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Report Details Card */}
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-slate-50 p-2"><Mail size={20} className="text-slate-600"/></div>
              <h2 className="text-lg font-semibold">Report Details</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Please select a report type</label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Order Report</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-4 text-slate-400" size={18} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Report Name</label>
                <input type="text" placeholder="Enter Report Name" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Recipients Email IDs</label>
                <input type="email" placeholder="Enter Recipients email IDs separated by commas" className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none" />
                <p className="mt-1 text-xs text-slate-400">Reports would be sent to the recipients' email</p>
              </div>
            </div>
          </div>

          {/* Report Content Card */}
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-slate-50 p-2"><FileText size={20} className="text-slate-600"/></div>
              <h2 className="text-lg font-semibold">Report Content</h2>
            </div>
            
            <div className="space-y-4 text-slate-700">
              {['Order Type', 'Order Status', 'Order Sub-status'].map((label) => (
                <div key={label}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 outline-none">
                      <option>Select {label}</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-4 text-slate-400" size={18} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section: Frequency Details */}
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-lg bg-slate-50 p-2"><Clock size={20} className="text-slate-600"/></div>
              <h2 className="text-lg font-semibold">Frequency Details</h2>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm font-bold mb-3">Send Reports</p>
                <div className="flex flex-wrap gap-2">
                  <button className="flex items-center gap-2 rounded-lg border-2 border-blue-600 px-4 py-2 text-sm font-medium text-blue-600">
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-blue-600 text-[10px] text-white">✓</span> Every Month
                  </button>
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-500">
                    <span className="h-4 w-4 rounded border border-slate-300"></span> Every Week
                  </button>
                  <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-500">
                    <span className="h-4 w-4 rounded border border-slate-300"></span> Every Day
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold mb-2">Select Dates for sending reports</p>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                  <span className="text-sm text-slate-600">Select Dates</span>
                  <div className="flex items-center gap-1 rounded bg-slate-200 px-2 py-1 text-xs">
                    21 <X size={12} className="cursor-pointer" />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold mb-2">Select Time</p>
                <input type="text" value="05:31 pm" readOnly className="w-full rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none" />
              </div>

              <div>
                <p className="text-sm font-bold mb-2">Get date for the last</p>
                <div className="grid grid-cols-2 gap-2">
                   <div className="relative">
                      <select className="w-full appearance-none rounded-lg border border-slate-200 px-4 py-3 text-sm">
                        <option>1</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 text-slate-400" size={16} />
                   </div>
                   <div className="relative">
                      <select className="w-full appearance-none rounded-lg border border-slate-200 px-4 py-3 text-sm">
                        <option>Days</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3.5 text-slate-400" size={16} />
                   </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-600">
                <Info size={18} />
                <span>It can take up to 24 hrs in sending first report</span>
              </div>

              <div className="rounded-lg bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
                We'll send reports on your email every month on <strong className="text-slate-900">21th</strong> with the last <strong className="text-slate-900">1 day data</strong> with the selected report content.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="mt-8 flex justify-end gap-4">
        <button className="px-6 py-2 font-bold text-slate-700 hover:text-slate-900">Cancel</button>
        <button className="rounded-lg bg-blue-600 px-8 py-3 font-bold text-white shadow-lg hover:bg-blue-700">
          Schedule Report
        </button>
      </div>
    </div>
  );
};

export default ScheduledReportForm;