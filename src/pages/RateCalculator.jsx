import React from 'react';
import { Info, Plane, Truck, ChevronDown } from 'lucide-react';

const RateCalculatorPage = () => {
  return (
    <div className="min-h-screen font-sans text-slate-800">
      <h1 className="mb-6 text-xl font-bold text-[#1e293b]">Rate Calculator</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Left Side: Input Form */}
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm overflow-hidden px-5">
          <div className="border-b-2 border-blue-600 px-6 py-4 text-center text-blue-600 font-bold">
            Domestic
          </div>
          
          <div className="py-6 space-y-6">
            {/* Pincode Section */}
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Pickup and delivery pincode
              </label>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="font-semibold">110044</span>
                    </div>
                    <span className="text-xs font-bold text-green-600">DL</span>
                  </div>
                  <p className="mt-1 text-right text-[10px] text-slate-400">Delhi, Delhi</p>
                </div>
                
                <div className="flex-none px-2 text-slate-300">-----</div>

                <div className="flex-1">
                  <div className="flex items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-red-500"></div>
                      <span className="font-semibold">110044</span>
                    </div>
                    <span className="text-xs font-bold text-red-600">DL</span>
                  </div>
                  <p className="mt-1 text-right text-[10px] text-slate-400">Delhi, Delhi</p>
                </div>
              </div>
            </div>

            {/* Package Type and Weight */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">Package Type</label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-lg bg-slate-100 px-4 py-3 text-sm outline-none">
                    <option>Plastic cover/Flyer</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3.5 text-slate-400" size={16} />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">Package Type</label>
                <div className="flex rounded-lg bg-slate-100 overflow-hidden">
                  <input type="text" value="500" className="w-full bg-transparent px-4 py-3 text-sm outline-none" readOnly />
                  <span className="bg-slate-200 px-3 py-3 text-sm font-bold text-slate-500">gm</span>
                </div>
                <p className="mt-2 text-[10px] leading-tight text-slate-400">
                  Package weight : sum of item's weight and weight of packaging (e.g. box)
                </p>
              </div>
            </div>

            {/* Volumetric Dimensions */}
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-700">Recipients Email IDs</label>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex rounded-lg border border-slate-200 overflow-hidden">
                    <input type="text" value="1" className="w-8 text-center text-sm outline-none" readOnly />
                    <span className="bg-slate-50 px-2 py-2 text-[10px] font-bold text-slate-500 border-l border-slate-200">CM</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="rounded-lg bg-slate-50 p-4 text-[11px] text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Info size={14} className="text-slate-500" />
                Volumetric weight calculator
              </div>
              <div className="flex items-start gap-2 pl-5">
                <Plane size={12} className="mt-0.5" />
                <span>Express: L*B*H / Volumetric Divisor (1x1x1/5000=0.20 grams)</span>
              </div>
              <div className="flex items-start gap-2 pl-5">
                <Truck size={12} className="mt-0.5" />
                <span>Surface: L*B*H / Volumetric Divisor (1x1x1/5000=0.20 grams)</span>
              </div>
            </div>

            {/* Payment Mode */}
            <div>
              <label className="mb-3 block text-xs font-bold text-slate-700">Payment Mode</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="payment" checked className="h-4 w-4 accent-blue-600" />
                  Prepaid
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" name="payment" className="h-4 w-4 accent-blue-600" />
                  Cash on Delivery (COD)
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Results */}
        <div className="rounded-xl border border-slate-100 bg-white shadow-sm flex flex-col px-5">
          {/* Tabs */}
          <div className="flex border-b border-slate-100 font-bold text-sm">
            <button className="flex-1 py-4 text-slate-800">Forward</button>
            <button className="flex-1 border-b-2 border-blue-500 py-4 text-blue-600">RTO</button>
            <button className="flex-1 py-4 text-slate-800">Reverse</button>
          </div>

          <div className="py-6 space-y-4 flex-grow">
            {/* Rate Card 1 */}
            {[1, 2].map((card) => (
              <div key={card} className="rounded-xl bg-slate-50 p-5 relative">
                <div className="mb-1 text-[11px] font-bold text-slate-800">Express</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-black">₹35.50</span>
                  <span className="text-xs font-medium text-slate-600">/Delivery in 1 days</span>
                </div>
                
                <div className="absolute top-4 right-5 text-slate-800 opacity-80">
                  {card === 1 ? <Plane size={32} strokeWidth={1.5} /> : <Truck size={32} strokeWidth={1.5} />}
                </div>

                <div className="mt-4 flex items-start gap-2 border-t border-slate-200 pt-3 text-[10px] leading-relaxed text-slate-600">
                  <Info size={14} className="mt-0.5 flex-none text-slate-400" />
                  <p>
                    Shipping cost: ₹30.00 + Destination city surcharge: ₹2.50 + GST charge: ₹5.94 
                    + Diesel Price Hike (DPH) charge: ₹0.46
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 pt-0">
            <button className="w-full rounded-lg bg-[#111827] py-4 font-bold text-white transition hover:bg-slate-800">
              View Detailed Rate Card
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RateCalculatorPage;