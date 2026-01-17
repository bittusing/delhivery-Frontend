import { useState, useEffect, useCallback } from 'react';
import walletService from '../services/wallet.service';

/**
 * Custom hook for wallet operations
 */
export const useWallet = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch wallet balance
   */
  const fetchBalance = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await walletService.getBalance();
      if (response.success) {
        setBalance(response.data.balance || 0);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch wallet transactions
   */
  const fetchTransactions = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await walletService.getTransactions(filters);
      if (response.success) {
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch transactions');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create recharge order
   */
  const createRechargeOrder = useCallback(async (amount) => {
    try {
      setLoading(true);
      setError(null);
      const response = await walletService.createRechargeOrder(amount);
      if (response.success) {
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create recharge order');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Verify payment
   */
  const verifyPayment = useCallback(async (paymentData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await walletService.verifyPayment(paymentData);
      if (response.success) {
        // Update balance after successful payment
        await fetchBalance();
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment verification failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchBalance]);

  // Fetch balance on mount
  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  return {
    balance,
    loading,
    error,
    fetchBalance,
    fetchTransactions,
    createRechargeOrder,
    verifyPayment
  };
};
