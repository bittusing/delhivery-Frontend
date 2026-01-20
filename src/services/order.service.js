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

    const response = await api.get(`/orders?${params.toString()}`);
    return response.data;
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
}

export default new OrderService();
