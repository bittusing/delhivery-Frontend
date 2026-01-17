import React from 'react';
import { Download } from 'lucide-react';

const PincodeServiceabilityPage = () => {
  return (
    <div className="min-h-screen font-sans text-slate-900">
      
      {/* Pincode Serviceability Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Pincode Serviceability</h2>
          <button className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition">
            <Download size={16} /> Export serviceability file
          </button>
        </div>
        <p className="text-slate-400 text-sm mb-4">Check last-mile serviceability by entering a pincode</p>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Enter a six digit Pincode" 
            className="bg-slate-200/50 border-none rounded-lg px-4 py-2.5 w-64 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-[#1a1f3d] text-white px-6 py-2.5 rounded-lg text-sm font-bold">
            Check Serviceability
          </button>
        </div>
      </section>

    </div>
  );
};

export default PincodeServiceabilityPage;