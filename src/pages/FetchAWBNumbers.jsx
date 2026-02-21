import React, { useState } from 'react';
import { Download, Package, FileDown, FilePlus, Upload, MoveRight, Loader2 } from 'lucide-react';
import awbService from '../services/awb.service';

const FetchAWBNumbersPage = () => {
  const [awbCount, setAwbCount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFetchAWB = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const count = parseInt(awbCount);
      
      if (!count || count < 1 || count > 50) {
        setError('Please enter a valid number between 1 and 50');
        return;
      }

      // Download CSV directly
      await awbService.downloadAWBCSV(count);
      
      setSuccess(`Successfully downloaded ${count} AWB numbers!`);
      setAwbCount('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch AWB numbers');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && awbCount && !loading) {
      handleFetchAWB();
    }
  };
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
      <h1 className="text-xl font-bold text-[#1a2b4b] mb-6">Fetch AWB Numbers</h1>

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Input Card */}
        <div className="bg-white px-4 py-6 rounded-xl shadow-sm border border-gray-100 w-full lg:w-1/4 h-fit">
          <h2 className="font-bold text-slate-800 mb-4">How many AWBs you want ?</h2>
          <input
            type="number"
            min="1"
            max="50"
            value={awbCount}
            onChange={(e) => setAwbCount(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter the number of AWBs"
            disabled={loading}
            className="w-full p-3 bg-slate-100 rounded-lg border-transparent focus:bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400 mb-2 disabled:opacity-50"
          />
          <p className="text-xs text-slate-400 mb-6">You can request maximum of 50 AWBs</p>
          
          <div className="flex justify-end">
            <button 
              onClick={handleFetchAWB}
              disabled={!awbCount || loading}
              className={`px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                awbCount && !loading
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Fetching...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Fetch AWBs
                </>
              )}
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