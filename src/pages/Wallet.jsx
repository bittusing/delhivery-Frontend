import React, { useState, useEffect } from "react";
import { 
  Search, 
  HelpCircle, 
  Download, 
  Wallet, 
  Upload, 
  AlertTriangle, 
  Info, 
  ChevronDown,
  CreditCard,
  Loader2
} from "lucide-react";
import { useWallet } from "../hooks/useWallet";
import RechargeModal from "../components/Wallet/RechargeModal";

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState("Transactions");
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    page: 1,
    limit: 20
  });

  const { 
    balance, 
    loading, 
    error, 
    fetchBalance, 
    fetchTransactions 
  } = useWallet();

  const [transactionsData, setTransactionsData] = useState({
    transactions: [],
    wallet: { balance: 0, totalCredit: 0, totalDebit: 0 },
    pagination: { page: 1, limit: 20, total: 0, pages: 1 }
  });
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  // Fetch transactions
  useEffect(() => {
    const loadTransactions = async () => {
      setTransactionsLoading(true);
      try {
        const data = await fetchTransactions(filters);
        if (data) {
          setTransactionsData(data);
        }
      } catch (err) {
        console.error('Error loading transactions:', err);
      } finally {
        setTransactionsLoading(false);
      }
    };

    loadTransactions();
  }, [filters, fetchTransactions]);

  const handleRechargeSuccess = () => {
    fetchBalance();
    // Reload transactions
    const loadTransactions = async () => {
      const data = await fetchTransactions(filters);
      if (data) {
        setTransactionsData(data);
      }
    };
    loadTransactions();
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

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
          <button 
            onClick={() => setIsRechargeModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#1d6ff2] text-white rounded-lg font-bold text-sm hover:bg-blue-700 shadow-sm"
          >
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
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-gray-400 mt-1" />
            ) : (
              <p className={`text-lg font-black leading-tight ${balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
                {formatAmount(balance)}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 pr-8 border-r border-gray-300">
          <div className="p-2 bg-white rounded-md border border-gray-200">
            <Upload className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">Total Credit</p>
            <p className="text-lg font-black text-[#1a2b4b] leading-tight">
              {formatAmount(transactionsData.wallet?.totalCredit || 0)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-2 bg-white rounded-md border border-gray-200">
            <Upload className="w-5 h-5 text-gray-700 transform rotate-180" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">Total Debit</p>
            <p className="text-lg font-black text-[#1a2b4b] leading-tight">
              {formatAmount(transactionsData.wallet?.totalDebit || 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Negative Balance Warning */}
      {balance < 0 && (
        <div className="mb-6 flex items-center gap-2 text-red-600 text-[13px] font-bold">
          <AlertTriangle className="w-4 h-4" />
          Shipments on hold due to negative balance
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

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

        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value, page: 1 })}
          className="flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 bg-[#f1f4f9] min-w-[140px] cursor-pointer"
        >
          <option value="">All Types</option>
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>

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
            {transactionsLoading ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto" />
                </td>
              </tr>
            ) : transactionsData.transactions && transactionsData.transactions.length > 0 ? (
              transactionsData.transactions.map((txn, i) => (
                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="px-4 py-4">
                    <p className="text-blue-600 font-bold mb-0.5">
                      {txn._id?.toString().substring(0, 8) || 'N/A'}
                    </p>
                    <p className="text-gray-600 font-bold">
                      {formatDate(txn.createdAt || txn._id?.getTimestamp?.())}
                    </p>
                  </td>
                  <td className="px-4 py-4 text-gray-700 font-bold leading-tight">
                    Wallet Transaction
                    <div className="h-px w-4 bg-gray-400 mt-1" />
                  </td>
                  <td className="px-4 py-4 text-center font-bold text-gray-700">
                    {txn.orderId ? txn.orderId.toString().substring(0, 8) : '-'}
                  </td>
                  <td className="px-4 py-4 font-black text-[#1a2b4b]">
                    {txn.awb || '-'}
                  </td>
                  <td className="px-4 py-4 text-gray-700 font-bold">
                    <p>-</p>
                    <p className="text-gray-400">-</p>
                  </td>
                  <td className="px-4 py-4 font-bold text-gray-700">{txn.description}</td>
                  <td className="px-4 py-4 font-black text-green-600">
                    {txn.type === 'credit' ? `+${formatAmount(txn.amount)}` : '-'}
                  </td>
                  <td className="px-4 py-4 text-red-600 font-black">
                    {txn.type === 'debit' ? `-${formatAmount(txn.amount)}` : '-'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {transactionsData.pagination && transactionsData.pagination.pages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            disabled={filters.page === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm font-bold">
            Page {filters.page} of {transactionsData.pagination.pages}
          </span>
          <button
            onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            disabled={filters.page >= transactionsData.pagination.pages}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* Recharge Modal */}
      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        onSuccess={handleRechargeSuccess}
      />
    </div>
  );
};

export default WalletPage;