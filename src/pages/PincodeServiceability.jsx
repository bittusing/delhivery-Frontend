import React, { useState } from 'react';
import { Download, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const PincodeServiceabilityPage = () => {
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleCheckServiceability = async () => {
    if (!pincode || pincode.length !== 6) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.post(`${API_URL}/pincode/check`, { pincode });
      setResult(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to check serviceability');
    } finally {
      setLoading(false);
    }
  };

  const handleExportFile = async () => {
    setDownloading(true);
    try {
      const response = await axios.get(`${API_URL}/pincode/export`, {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'pincodes.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to export file');
    } finally {
      setDownloading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCheckServiceability();
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-900">
      
      {/* Pincode Serviceability Section */}
      <section className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Pincode Serviceability</h2>
          <button 
            onClick={handleExportFile}
            disabled={downloading}
            className="flex items-center gap-2 border border-slate-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {downloading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            Export serviceable file
          </button>
        </div>
        <p className="text-slate-400 text-sm mb-4">Check last-mile serviceability by entering a pincode</p>
        <div className="flex gap-3 mb-6">
          <input 
            type="text" 
            placeholder="Enter a six digit Pincode" 
            value={pincode}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '').slice(0, 6);
              setPincode(value);
              setError('');
              setResult(null);
            }}
            onKeyPress={handleKeyPress}
            className="bg-slate-200/50 border-none rounded-lg px-4 py-2.5 w-64 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleCheckServiceability}
            disabled={loading}
            className="bg-[#1a1f3d] text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-[#252b4d] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Check Serviceability
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div className={`border rounded-lg p-6 ${result.serviceable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-start gap-3">
              {result.serviceable ? (
                <CheckCircle className="text-green-600 mt-1" size={24} />
              ) : (
                <XCircle className="text-red-600 mt-1" size={24} />
              )}
              <div className="flex-1">
                <h3 className={`text-lg font-bold mb-2 ${result.serviceable ? 'text-green-800' : 'text-red-800'}`}>
                  {result.message}
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-semibold">Pincode:</span> {result.pincode}
                  </div>
                  {result.city && (
                    <div>
                      <span className="font-semibold">City:</span> {result.city}
                    </div>
                  )}
                  {result.state && (
                    <div>
                      <span className="font-semibold">State:</span> {result.state}
                    </div>
                  )}
                  {result.zone && (
                    <div>
                      <span className="font-semibold">Zone:</span> {result.zone}
                    </div>
                  )}
                </div>
                {result.serviceable && (
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <h4 className="font-semibold mb-2 text-green-800">Available Services:</h4>
                    <div className="flex gap-4 text-sm">
                      <div className={`px-3 py-1 rounded ${result.cod ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                        COD: {result.cod ? 'Yes' : 'No'}
                      </div>
                      <div className={`px-3 py-1 rounded ${result.prepaid ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                        Prepaid: {result.prepaid ? 'Yes' : 'No'}
                      </div>
                      <div className={`px-3 py-1 rounded ${result.pickup ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-600'}`}>
                        Pickup: {result.pickup ? 'Yes' : 'No'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

export default PincodeServiceabilityPage;