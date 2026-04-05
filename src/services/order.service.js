import api from '../config/api';

/**
 * Order Service - Handles order-related API calls
 */
class OrderService {
  /**
   * Calculate shipping rate
   */
  async calculateRate(rateData) {
    const response = await api.post('/orders/calculate-rate', rateData);
    return response.data;
  }

  /**
   * Create new order
   */
  async createOrder(orderData) {
    const response = await api.post('/orders', orderData);
    return response.data;
  }

  /**
   * Get user orders
   */
  async getUserOrders(filters = {}) {
    const params = new URLSearchParams();

    if (filters.status) params.append('status', filters.status);
    if (filters.deliveryPartner) params.append('deliveryPartner', filters.deliveryPartner);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.skip) params.append('skip', filters.skip);
    if (filters.type) params.append('type', filters.type);
    if (filters.orderType) params.append('orderType', filters.orderType);
    if (filters.search) params.append('search', filters.search);

    const response = await api.get(`/orders?${params.toString()}`);
    return response.data;
  }

  /**
   * Get orders (alias for getUserOrders)
   */
  async getOrders(filters = {}) {
    return this.getUserOrders(filters);
  }

  /**
   * Get order by ID
   */
  async getOrderById(orderId) {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  }

  /**
   * Track order
   */
  async trackOrder(orderId) {
    const response = await api.get(`/orders/${orderId}/track`);
    return response.data;
  }

  /**
   * Nimbus ship.nimbuspost.com — raise pickup for this order (uses stored shipment id).
   */
  async requestNimbusPickup(orderId) {
    const response = await api.post(`/orders/${orderId}/nimbus/pickup`);
    return response.data;
  }

  /**
   * Nimbus ship.nimbuspost.com — download shipping label PDF.
   */
  async downloadNimbusLabel(orderId) {
    const response = await api.post(
      `/orders/${orderId}/nimbus/label`,
      {},
      { responseType: 'blob' }
    );
    const contentType = response.headers['content-type'] || '';
    if (contentType.includes('application/json')) {
      const text = await response.data.text();
      return JSON.parse(text);
    }
    const blob = response.data;
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    let filename = 'shipping-label.pdf';
    const cd = response.headers['content-disposition'];
    if (cd && cd.includes('filename=')) {
      const m = cd.match(/filename="?([^";\n]+)"?/i);
      if (m) filename = m[1];
    }
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    return { success: true };
  }
}

export default new OrderService();
