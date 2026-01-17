import React, { useState } from "react";
import { 
  Search, 
  HelpCircle, 
  Download, 
  Wallet, 
  Upload, 
  AlertTriangle, 
  Info, 
  ChevronDown,
  CreditCard
} from "lucide-react";

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState("Transactions");

  const transactions = Array(5).fill({
    id: "MTX17655453837497310",
    date: "12 Dec, 2025 6:46 pm",
    account: "8793a9-Shardainfotech-in",
    orderId: "-",
    awb: "DL343059135CN",
    weight: "500 gm",
    description: "Shipment Not Picked",
    credit: "+₹2,407.44",
    debit: "-"
  });

  return (
    <div className="min-h-screen font-sans text-[#1a2b4b]">
      {/* Top Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Wallet</h1>
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm cursor-pointer">
            Learn More <HelpCircle className="w-5 h-5 text-[#4c6ef5] fill-[#4c6ef5]/10" />
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white font-bold text-sm text-[#1a2b4b] hover:bg-gray-50">
            <Download className="w-4 h-4" /> Download Ledger
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1d6ff2] text-white rounded-lg font-bold text-sm hover:bg-blue-700 shadow-sm">
            <Wallet className="w-4 h-4" /> Recharge Wallet
          </button>
        </div>
      </div>

      {/* Balance Summary Cards */}
      <div className="bg-[#1318420D] rounded-xl p-5 mb-4 inline-flex items-center gap-8 border border-gray-100">
        <div className="flex items-center gap-4 pr-8 border-r border-gray-300">
          <div className="p-2 bg-white rounded-md border border-gray-200">
            <CreditCard className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">Current Balance</p>
            <p className="text-lg font-black text-red-600 leading-tight">-₹48,234.84</p>
          </div>
        </div>

        <div className="flex items-center gap-4 pr-8 border-r border-gray-300">
          <div className="p-2 bg-white rounded-md border border-gray-200">
            <Upload className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">Total Credit</p>
            <p className="text-lg font-black text-[#1a2b4b] leading-tight">₹67,753.00</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-md border border-gray-200">
            <Upload className="w-5 h-5 text-gray-700 transform rotate-180" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">Total Debit</p>
            <p className="text-lg font-black text-[#1a2b4b] leading-tight">₹94,885.01</p>
          </div>
        </div>
      </div>

      {/* Negative Balance Warning */}
      <div className="mb-6 flex items-center gap-2 text-red-600 text-[13px] font-bold">
        <AlertTriangle className="w-4 h-4" />
        Shipments on hold due to negative balance
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-10 border-b border-gray-200 mb-6">
        {["Transactions", "Recharges"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold transition-all ${
              activeTab === tab 
              ? "border-b-4 border-blue-600 text-blue-600" 
              : "text-gray-500 hover:text-[#1a2b4b]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex border border-gray-300 rounded-lg overflow-hidden bg-white">
          <button className="flex items-center gap-1 px-3 py-2 border-r border-gray-300 text-xs font-bold text-[#1a2b4b]">
            AWB <ChevronDown className="w-3 h-3" />
          </button>
          <div className="relative flex items-center min-w-[280px]">
            <input 
              className="w-full px-4 py-2 text-sm focus:outline-none placeholder:text-gray-400" 
              placeholder="Search multiple AWBs" 
            />
            <Info className="absolute right-3 w-4 h-4 text-gray-400" />
          </div>
        </div>

        <button className="flex items-center justify-between px-4 py-2 bg-[#1a2b4b] text-white rounded-lg text-xs font-bold min-w-[240px]">
          Pickup Date : 9 Nov 2025 to 23 Nov 2025
        </button>

        <button className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-[#f1f4f9] min-w-[140px]">
          Transaction Type <ChevronDown className="w-3 h-3" />
        </button>

        <button className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-[#f1f4f9] min-w-[140px]">
          Account Name <ChevronDown className="w-3 h-3" />
        </button>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#e9ecef] text-[11px] uppercase text-gray-700 font-extrabold border-b border-gray-200">
            <tr>
              <th className="px-4 py-3">Transaction Details</th>
              <th className="px-4 py-3">Accounts Details</th>
              <th className="px-4 py-3 text-center">Order Id</th>
              <th className="px-4 py-3">AWB / LRN</th>
              <th className="px-4 py-3">Weight & Zone</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Credit</th>
              <th className="px-4 py-3">Debit</th>
            </tr>
          </thead>
          <tbody className="text-[12px]">
            {transactions.map((txn, i) => (
              <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-4">
                  <p className="text-blue-600 font-bold mb-0.5">{txn.id}</p>
                  <p className="text-gray-600 font-bold">{txn.date}</p>
                </td>
                <td className="px-4 py-4 text-gray-700 font-bold leading-tight">
                  {txn.account}
                  <div className="h-px w-4 bg-gray-400 mt-1" />
                </td>
                <td className="px-4 py-4 text-center font-bold text-gray-700">{txn.orderId}</td>
                <td className="px-4 py-4 font-black text-[#1a2b4b]">{txn.awb}</td>
                <td className="px-4 py-4 text-gray-700 font-bold">
                  <p>{txn.weight}</p>
                  <p className="text-gray-400">-</p>
                </td>
                <td className="px-4 py-4 font-bold text-gray-700">{txn.description}</td>
                <td className="px-4 py-4 font-black text-red-600">{txn.credit}</td>
                <td className="px-4 py-4 text-red-600 font-black">{txn.debit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WalletPage;