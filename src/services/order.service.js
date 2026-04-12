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
   * On 4xx/5xx the server sends JSON; with responseType blob that body is a Blob — parse it for a real message.
   */
  async downloadNimbusLabel(orderId) {
    try {
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
    } catch (err) {
      const status = err.response?.status;
      const raw = err.response?.data;
      if (raw instanceof Blob) {
        const text = await raw.text();
        let json;
        try {
          json = JSON.parse(text);
        } catch {
          throw new Error(text || `Request failed (${status})`);
        }
        const msg = json.message || json.error || text;
        const e = new Error(msg);
        e.status = status;
        e.payload = json;
        throw e;
      }
      throw err;
    }
  }

  /**
   * Nimbus api.nimbuspost.com/v1 — cancel shipment for this order (uses AWB).
   */
  async cancelNimbusShipment(orderId) {
    const response = await api.post(`/orders/${orderId}/nimbus/cancel`);
    return response.data;
  }
}

const orderService = new OrderService();
export default orderService;
