import api from '../config/api';

/**
 * Wallet Service - Handles wallet-related API calls
 */
class WalletService {
  /**
   * Get wallet balance
   */
  async getBalance() {
    const response = await api.get('/wallet/balance');
    return response.data;
  }

  /**
   * Get wallet transactions
   */
  async getTransactions(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.type) params.append('type', filters.type);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);

    const response = await api.get(`/wallet/transactions?${params.toString()}`);
    return response.data;
  }

  /**
   * Create Razorpay order for wallet recharge
   */
  async createRechargeOrder(amount) {
    const response = await api.post('/wallet/recharge', { amount });
    return response.data;
  }

  /**
   * Verify Razorpay payment
   */
  async verifyPayment(paymentData) {
    const response = await api.post('/wallet/verify-payment', paymentData);
    return response.data;
  }
}

export default new WalletService();
