import React, { useState } from "react";
import { 
  HelpCircle, 
  Plus, 
  Search, 
  ChevronDown, 
  Info, 
  X, 
  Mail, 
  RotateCcw, 
  AlertCircle,
  ArrowUpDown
} from "lucide-react";

const SupportPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Open");

  const shipmentIssues = [
    "Reattempt or Delay in delivery / consignee pickup / return",
    "Firstmile / Seller Pickup related issues",
    "Shipment not delivered (need POD) / Fake remark",
    "Self collect / drop",
    "Damage / Missing / Mismatch",
    "Updated shipment details",
    "Cancel delivery / pickup",
    "Claims / Finance (disputes, remittance, bank details, etc.)",
    "Protect VAS",
    "Channel Integration",
    "Behaviour complaint against staff"
  ];

  const otherIssues = ["Tech Support", "Account"];

  return (
    <div className="min-h-screen font-sans text-[#1a2b4b]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Support</h1>
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 h-10 rounded-lg text-sm font-medium shadow-sm cursor-pointer hover:bg-gray-50">
            Learn More <HelpCircle className="w-5 h-5 text-[#4c6ef5] fill-[#4c6ef5]/10" />
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#1d6ff2] text-white rounded-lg font-bold text-sm hover:bg-blue-700 shadow-sm transition-all"
        >
          <Plus className="w-5 h-5 stroke-[3]" /> Raise a ticket
        </button>
      </div>

      {/* Primary Tab Navigation */}
      <div className="flex gap-10 border-b border-gray-200 mb-4">
        {["Open", "Resolved", "Closed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === tab ? "text-blue-600" : "text-gray-500 hover:text-[#1a2b4b]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Review Notice */}
      <div className="flex items-center gap-2 text-gray-400 text-[13px] font-medium mb-4">
        <AlertCircle className="w-4 h-4" />
        Below tickets are currently being reviewed by our client support agents.
      </div>

      {/* Filters */}
      <div className="flex items-center  mb-4">
        <div className="flex items-center h-[-webkit-fill-available] gap-2 px-4 py-2 rounded-tl rounded-bl bg-[#fff] text-xs font-bold cursor-pointer text-[#1a2b4b]">
          Ticket Id <ChevronDown className="w-4 h-4" />
        </div>
        <div className="relative rounded-tr rounded-br flex items-center bg-[#1318420D] border border-transparent focus-within:border-gray-300 transition-all">
          <input 
            className="bg-transparent pl-4 pr-10 py-2.5 text-sm w-64 focus:outline-none placeholder:text-gray-500 font-medium" 
            placeholder="Search by ticket id" 
          />
          <Info className="absolute right-3 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Table Structure */}
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#e9ecef] text-[11px] uppercase text-gray-700 font-black border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Ticket Id & AWB</th>
              <th className="px-6 py-4">Raised By</th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3 h-3 text-gray-400" /> Category - Sub Category
                </div>
              </th>
              <th className="px-6 py-4">Ticket Created</th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-3 h-3 text-gray-400" /> Last Updated
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="5" className="h-[400px]"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* RAISE A TICKET POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
          <div className="bg-white w-full max-w-[720px] rounded-2xl shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <h2 className="text-[22px] font-black text-[#1a2b4b]">Raise a ticket</h2>
                <div className="flex items-center gap-2 bg-[#f8f9fc] border border-gray-200 px-4 py-1.5 rounded-lg text-sm font-bold text-blue-600 cursor-pointer">
                  Learn More <HelpCircle className="w-4 h-4" />
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-8 max-h-[75vh] overflow-y-auto">
              <h3 className="text-lg font-extrabold text-[#1a2b4b] mb-1">Help us understand your issue</h3>
              
              <div className="mt-4">
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3">Shipment issue</p>
                <div className="flex flex-wrap gap-2.5">
                  {shipmentIssues.map((issue, idx) => (
                    <button key={idx} className="px-4 py-2.5 bg-[#f8f9fc] hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-xl text-[13px] font-bold text-gray-700 transition-all text-left">
                      {issue}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-3">Other issue</p>
                <div className="flex flex-wrap gap-2.5">
                  {otherIssues.map((issue, idx) => (
                    <button key={idx} className="px-4 py-2.5 bg-[#f8f9fc] hover:bg-gray-100 border border-transparent hover:border-gray-200 rounded-xl text-[13px] font-bold text-gray-700 transition-all">
                      {issue}
                    </button>
                  ))}
                </div>
              </div>
              
              <p className="text-[12px] text-gray-400 mt-8 font-bold">15 Dec 2025, 12:38 am</p>
            </div>

            {/* Modal Sticky Footer */}
            <div className="px-8 py-6 border-t border-gray-100 bg-white flex items-center justify-between">
              <div className="flex items-center gap-8">
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 rounded cursor-pointer" />
                  </div>
                  <span className="text-[13px] font-bold text-gray-800">Email notifications</span>
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </label>
                <button className="flex items-center gap-2 text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
                  <Mail className="w-4 h-4" /> Add more CC emails
                </button>
              </div>
              <button className="flex items-center gap-2 text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors">
                <RotateCcw className="w-4 h-4" /> Reset Categories
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportPage;