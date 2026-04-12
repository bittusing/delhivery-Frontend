import React, { useState } from 'react';
import { X, Wallet, AlertCircle } from 'lucide-react';
import { initializeRazorpayPayment } from '../../utils/razorpay';
import { useWallet } from '../../hooks/useWallet';

const RechargeModal = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { createRechargeOrder, verifyPayment } = useWallet();

  const presetAmounts = [100, 500, 1000, 2000, 5000];

  const handleAmountSelect = (presetAmount) => {
    setAmount(presetAmount.toString());
    setError('');
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
      setError('');
    }
  };

  const handleRecharge = async () => {
    const rechargeAmount = parseFloat(amount);

    // Validation
    if (!amount || isNaN(rechargeAmount) || rechargeAmount < 1) {
      setError('Please enter a valid amount (minimum ₹1)');
      return;
    }

    if (rechargeAmount > 100000) {
      setError('Maximum recharge amount is ₹1,00,000');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Create Razorpay order
      const orderData = await createRechargeOrder(rechargeAmount);

      // Initialize Razorpay payment
      await initializeRazorpayPayment(
        orderData,
        async (paymentResponse) => {
          try {
            // Verify payment
            await verifyPayment({
              paymentId: orderData.paymentId,
              ...paymentResponse
            });

            // Success
            if (onSuccess) {
              onSuccess();
            }
            onClose();
          } catch (verifyError) {
            setError(verifyError.message || 'Payment verification failed');
          } finally {
            setLoading(false);
          }
        },
        (paymentError) => {
          setError(paymentError.message || 'Payment failed');
          setLoading(false);
        }
      );
    } catch (err) {
      setError(err.message || 'Failed to initiate payment');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#1a2b4b]">Recharge Wallet</h2>
          </div>
          <p className="text-gray-600 text-sm">Add money to your wallet using Razorpay</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Amount Input */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-[#1a2b4b] mb-2">
            Enter Amount (₹)
          </label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className="w-full bg-slate-100 border-none rounded-xl p-4 text-lg font-semibold focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          
          {/* Preset Amounts */}
          <div className="mt-3 flex flex-wrap gap-2">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => handleAmountSelect(preset)}
                className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${
                  amount === preset.toString()
                    ? 'bg-[#1a2b4b] text-white'
                    : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                }`}
              >
                ₹{preset}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="mb-6 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
          <p>• Minimum recharge: ₹1</p>
          <p>• Maximum recharge: ₹1,00,000</p>
          <p>• Payment is secure and encrypted</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleRecharge}
            disabled={loading || !amount}
            className="flex-1 px-4 py-3 bg-[#1a2b4b] text-white rounded-xl font-bold hover:bg-[#253a63] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 'Recharge Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RechargeModal;
