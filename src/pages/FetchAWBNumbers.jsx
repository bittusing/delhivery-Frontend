import React from 'react';
import { Download, Package, FileDown, FilePlus, Upload, MoveRight } from 'lucide-react';

const FetchAWBNumbersPage = () => {
  const steps = [
    {
      icon: <Download className="w-5 h-5 text-slate-600" />,
      text: "Fetch & Download AWBs as a CSV"
    },
    {
      icon: <Package className="w-5 h-5 text-slate-600" />,
      text: "Go to Forward/ Reverse orders"
    },
    {
      icon: <FileDown className="w-5 h-5 text-slate-600" />,
      text: "Download Bulk Upload CSV Template"
    },
    {
      icon: <FilePlus className="w-5 h-5 text-slate-600" />,
      text: "Add AWB along with order/ shipment detail"
    },
    {
      icon: <Upload className="w-5 h-5 text-slate-600" />,
      text: "Upload the CSV to create order/shipment"
    }
  ];

  return (
    <div className="in-h-screen font-sans">
      <h1 className="text-xl font-bold text-[#1a2b4b] mb-6">Fetch AWD Numbers</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Input Card */}
        <div className="bg-white px-4 py-6 rounded-xl shadow-sm border border-gray-100 w-full lg:w-1/4 h-fit">
          <h2 className="font-bold text-slate-800 mb-4">How many AWBs you want ?</h2>
          <input
            type="text"
            placeholder="Enter the number of AWDS"
            className="w-full p-3 bg-slate-100 rounded-lg border-transparent focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 mb-2"
          />
          <p className="text-xs text-slate-400 mb-6">You can request maximum of 50 AWBs</p>
          
          <div className="flex justify-end">
            <button className="bg-slate-100 text-slate-400 px-6 py-2 rounded-lg font-semibold cursor-not-allowed">
              Fetch AWDs
            </button>
          </div>
        </div>

        {/* Right Side: Instructions Flow */}
        <div className="bg-[#ebedf2] p-5 rounded-xl flex-1 border border-slate-200">
          <h2 className="font-bold text-[#1a2b4b] mb-8 text-lg">Instructions to use</h2>
          
          <div className="flex items-start justify-between relative">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Step Item */}
                <div className="flex flex-col gap-4 max-w-[140px] z-10">
                  <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center border border-slate-200">
                    {step.icon}
                  </div>
                  <p className="text-xs font-semibold text-[#1a2b4b] leading-relaxed">
                    {step.text}
                  </p>
                </div>

                {/* Vertical Divider & Arrow */}
                {idx !== steps.length - 1 && (
                  <div className="flex items-center flex-1 justify-center pt-5">
                    <div className="h-16 w-[1.5px] bg-slate-400 mr-1"></div>
                    <MoveRight className="w-5 h-5 text-slate-400 -ml-1" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchAWBNumbersPage;