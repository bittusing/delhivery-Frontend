import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  HelpCircle, 
  Search, 
  Info, 
  Calendar, 
  Truck, 
  Download, 
  ChevronDown,
  Loader2
} from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import invoiceService from "../services/invoice.service";

const InvoicesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Invoice List");
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Filters
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  endDate.setDate(endDate.getDate() + 14);
  
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchInvoices();
  }, [startDate, endDate, searchQuery]);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        search: searchQuery || undefined
      };

      const response = await invoiceService.getInvoices(filters);
      if (response.success) {
        setInvoices(response.data.invoices || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch invoices');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  const handleDownload = async (invoiceId) => {
    try {
      const blob = await invoiceService.downloadInvoice(invoiceId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${invoiceId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
      // Fallback: Open invoice page
      navigate(`/invoice/${invoiceId}`);
    }
  };

  const dateRange = `${formatDate(startDate)} to ${formatDate(endDate)}`;

  const CustomDateInput = React.forwardRef(({ onClick }, ref) => (
    <button
      onClick={onClick}
      ref={ref}
      className="flex items-center gap-2 px-4 py-2.5 bg-[#1a2b4b] text-white rounded-lg text-xs font-bold hover:bg-[#253a61] transition-colors"
    >
      Date Range : {dateRange}
    </button>
  ));

  return (
    <div className="min-h-screen font-sans text-[#1a2b4b]">
      {/* Header Section */}
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-1.5 rounded-lg text-sm font-medium shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
          Learn More <HelpCircle className="w-5 h-5 text-[#4c6ef5] fill-[#4c6ef5]/10" />
        </div>
      </div>

      {/* Primary Tab Navigation */}
      <div className="flex gap-10 border-b border-gray-200 mb-6">
        {["Invoice List", "Credit Notes", "Debit Notes"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold transition-all relative ${
              activeTab === tab 
              ? "text-blue-600" 
              : "text-gray-500 hover:text-[#1a2b4b]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Filter Row */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {/* Search Input */}
        <div className="relative flex items-center bg-[#e9ecef] rounded-lg border border-transparent focus-within:border-gray-300 transition-all">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent pl-4 pr-10 py-2.5 text-sm w-64 focus:outline-none placeholder:text-gray-500" 
            placeholder="Search by invoice Id" 
          />
          <div className="absolute right-3 flex items-center gap-1">
             <Info className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        {/* Date Range Picker */}
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            setStartDate(update[0] || new Date());
            setEndDate(update[1] || new Date());
          }}
          customInput={<CustomDateInput />}
        />
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-[#e9ecef] text-[11px] uppercase text-gray-700 font-extrabold border-b border-gray-200">
            <tr>
              <th className="px-6 py-4">Invoices Id</th>
              <th className="px-6 py-4">Invoices Date</th>
              <th className="px-6 py-4">
                <div className="flex items-center gap-1">
                   <ChevronDown className="w-3 h-3 text-gray-400 rotate-180" />
                   <ChevronDown className="w-3 h-3 text-gray-400 -mt-1" />
                   GST Number
                </div>
              </th>
              <th className="px-6 py-4">Service Type</th>
              <th className="px-6 py-4">Invoice Amount</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
                </td>
              </tr>
            ) : invoices && invoices.length > 0 ? (
              invoices.map((invoice, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td 
                    className="px-6 py-4 font-bold text-blue-600 hover:underline cursor-pointer"
                    onClick={() => navigate(`/invoice/${invoice.invoiceId}`)}
                  >
                    {invoice.invoiceId}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">
                    {formatDate(invoice.invoiceDate)}
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-700">
                    {invoice.gstNumber}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 font-bold text-gray-700">
                      <Truck className="w-4 h-4 text-green-500" />
                      {invoice.serviceType}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-black text-[#1a2b4b]">
                    {formatCurrency(invoice.invoiceAmount)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDownload(invoice.invoiceId)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-[#1a2b4b] hover:text-blue-600 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download Invoice
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-gray-500 text-sm">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoicesPage;
