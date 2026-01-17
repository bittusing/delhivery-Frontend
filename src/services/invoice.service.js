import api from '../config/api';

/**
 * Invoice Service - Handles invoice-related API calls
 */
class InvoiceService {
  /**
   * Get user invoices
   */
  async getInvoices(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.search) params.append('search', filters.search);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.skip) params.append('skip', filters.skip);

    const response = await api.get(`/invoices?${params.toString()}`);
    return response.data;
  }

  /**
   * Get invoice by ID
   */
  async getInvoiceById(invoiceId) {
    const response = await api.get(`/invoices/${invoiceId}`);
    return response.data;
  }

  /**
   * Download invoice
   */
  async downloadInvoice(invoiceId) {
    const response = await api.get(`/invoices/${invoiceId}/download`, {
      responseType: 'blob'
    });
    return response.data;
  }
}

export default new InvoiceService();
