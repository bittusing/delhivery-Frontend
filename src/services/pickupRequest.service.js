import api from '../config/api';

/**
 * Pickup Request Service - Handles pickup request API calls
 */
class PickupRequestService {
  /**
   * Create pickup request
   */
  async createPickupRequest(pickupData) {
    const response = await api.post('/pickup-requests', pickupData);
    return response.data;
  }

  /**
   * Get user pickup requests
   */
  async getPickupRequests(filters = {}) {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.location) params.append('location', filters.location);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.search) params.append('search', filters.search);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.skip) params.append('skip', filters.skip);

    const response = await api.get(`/pickup-requests?${params.toString()}`);
    return response.data;
  }

  /**
   * Get pickup request by ID
   */
  async getPickupRequestById(pickupId) {
    const response = await api.get(`/pickup-requests/${pickupId}`);
    return response.data;
  }

  /**
   * Get available orders for pickup
   */
  async getAvailableOrders(location) {
    const response = await api.get(`/pickup-requests/available-orders?location=${location}`);
    return response.data;
  }

  /**
   * Get pickup locations
   */
  async getPickupLocations() {
    const response = await api.get('/pickup-requests/locations');
    return response.data;
  }
}

export default new PickupRequestService();
