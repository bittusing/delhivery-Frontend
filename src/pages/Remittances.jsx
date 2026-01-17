import React from "react";
import { Plus, Landmark } from "lucide-react";

const RemittancesPage = () => {
  return (
    <div className=" min-h-screen font-sans text-[#1a2b4b]">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold">Remittances</h1>
      </div>

      {/* Empty State / Setup Container */}
      <div className="flex flex-col items-center justify-center mt-20 max-w-2xl mx-auto text-center">
        
        {/* Decorative Icon (Simulating the ATM/Cash icon) */}
        <div className="mb-8 p-8 bg-gray-50 rounded-full border-2 border-dashed border-gray-200">
          <Landmark className="w-16 h-16 text-gray-300 stroke-[1.5]" />
        </div>

        {/* Content */}
        <h2 className="text-xl font-extrabold mb-3 tracking-tight">
          2-Day Remittances processed daily
        </h2>
        <p className="text-gray-500 text-sm font-medium mb-10 max-w-md leading-relaxed">
          Your bank account will be credited 2 days post our daily remittance
        </p>

        {/* Action Button */}
        <button className="flex items-center gap-2 px-8 py-3 bg-[#1d6ff2] text-white rounded-lg font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Plus className="w-5 h-5" />
          Set up Bank Account
        </button>
      </div>
    </div>
  );
};

export default RemittancesPage;