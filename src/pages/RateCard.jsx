import React from 'react';
import { Truck, Info, Calculator } from 'lucide-react';

const RateCardPage = () => {
  const zones = ['Zone A', 'Zone B', 'Zone C', 'Zone D', 'Zone E', 'Zone F'];

  // Data structure representing all sections in the image
  const tableData = [
    { title: "Surface - 500g to 1.5 kg Rates" },
    { title: "Surface - Upto 2 kg and above - Discounted Slab" },
    { title: "Surface - Upto 5 kg and above - Discounted Slab" },
    { title: "Surface - Upto 10 kg and above - Discounted Slab" },
    { title: "Surface - Reverse (DOT) - 500 g" },
    { title: "Surface - Reverse (DOT) - Upto 2 kg and above - Discounted Slab" },
    { title: "Surface - Reverse (DOT) - Upto 5 kg and above - Discounted Slab" },
    { title: "Surface - Reverse (DOT) - Upto 10 kg and above - Discounted Slab" },
  ];

  const prices = [30.00, 33.00, 44.00, 52.00, 64.00, 75.00];
  const additionalPrices = [29.00, 32.00, 42.00, 49.00, 61.00, 72.00];

  return (
    <div className="min-h-screen font-sans text-slate-900">
      {/* Top Navigation Tabs */}
      <div className="mb-4 flex gap-8 border-b border-slate-200 text-sm font-bold">
        <button className="border-b-2 border-blue-600 pb-2 text-blue-600">Surface</button>
        <button className="pb-2 text-slate-400">Express</button>
      </div>

      <div>
        {/* Header Section */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-black text-slate-800">Surface Rates</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-5 w-10 rounded-full bg-slate-200 p-1">
                <div className="h-3 w-3 rounded-full bg-white shadow-sm"></div>
              </div>
              <span className="text-xs font-bold text-slate-600">Show Rates Inclusive of GST</span>
            </div>
            <button className="flex items-center gap-2 rounded bg-[#1e293b] px-4 py-2 text-xs font-bold text-white transition hover:bg-slate-800">
              <Calculator size={14} /> Try our Rate Calculator
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            
            <tbody>
              {tableData.map((section, idx) => (
                <>
                  {/* Category Header Row */}
                  <tr className="bg-slate-50 text-[11px] font-bold text-slate-800">
                    <td className="flex items-center gap-2 py-3 px-3 uppercase tracking-tight">
                      <Truck size={14} className="text-slate-600" /> {section.title}
                    </td>
                    {zones.map(z => <td key={z} className="py-3 text-center">{z}</td>)}
                  </tr>
                  {/* Data Rows */}
                  <tr className="border-b border-slate-50 text-[11px] text-slate-600">
                    <td className="py-2.5 px-6">Base Fare (upto 500 g)</td>
                    {prices.map((p, i) => <td key={i} className="text-center font-medium">₹ {p.toFixed(2)}</td>)}
                  </tr>
                  <tr className="border-b border-slate-100 text-[11px] text-slate-600">
                    <td className="py-2.5 px-6">Every Additional 500 g (upto 1.5 kg)</td>
                    {additionalPrices.map((p, i) => <td key={i} className="text-center font-medium">₹ {p.toFixed(2)}</td>)}
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>

        {/* COD Banner */}
        <div className="mt-8 flex items-center gap-3 rounded bg-[#c5cad6] p-3 text-[11px] font-bold text-slate-800 uppercase">
          <div className="bg-slate-500 p-1 rounded-sm text-white"><Info size={12}/></div>
          CASH ON DELIVERY RATES (COD) - ₹ 40.00 or 2% of product bill value whichever is higher
        </div>

        {/* GST/DPH Disclaimer */}
        <div className="mt-4 flex items-center gap-6 border-b border-slate-100 pb-4 text-[11px] font-bold text-slate-700">
          <div className="flex items-center gap-2">
            <Info size={16} className="text-slate-500" />
            These rate are exclusive of GST
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1 w-1 rounded-full bg-slate-400"></span>
            Digital price hick (DPH) charges as per Industry standards
          </div>
        </div>

        {/* Additional Information Footer */}
        <div className="mt-6">
          <h3 className="mb-4 text-sm font-black text-slate-800 uppercase">Additional Information</h3>
          <div className="grid grid-cols-2 gap-20 text-[11px] text-slate-700">
            <div>
              <p className="font-bold text-slate-800">Maximum Liability - Forward</p>
              <p className="mt-1">Lower of 44% of product value or ₹ 2000</p>
            </div>
            <div className="text-right md:text-left">
              <p className="font-bold text-slate-800">Maximum Liability - Reverse</p>
              <p className="mt-1">Lower of 50% of product value or ₹ 2000</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 flex flex-col items-center gap-6 rounded-xl bg-white p-12 shadow-sm">
        <h2 className="text-sm font-bold text-slate-800">Want to calculate the charges between two cities?</h2>
        <button className="flex items-center gap-3 rounded-lg bg-[#111827] px-8 py-4 font-bold text-white transition hover:bg-slate-800">
          <Calculator size={18} /> Try our Rate Calculator
        </button>
      </div>
    </div>
  );
};

export default RateCardPage;