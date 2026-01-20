import api from '../config/api';

/**
 * Dashboard Service - Handles dashboard-related API calls
 */
class DashboardService {
  /**
   * Get dashboard statistics
   */
  async getStats(type = 'domestic') {
    const response = await api.get(`/dashboard/stats?type=${type}`);
    return response.data;
  }

  /**
   * Get upcoming pickups
   */
  async getUpcomingPickups(limit = 10, type = 'domestic') {
    const response = await api.get(`/dashboard/upcoming-pickups?limit=${limit}&type=${type}`);
    return response.data;
  }

  /**
   * Get performance graph data
   */
  async getPerformanceData(period = 14, type = 'domestic') {
    const response = await api.get(`/dashboard/performance?period=${period}&type=${type}`);
    return response.data;
  }
}

export default new DashboardService();
