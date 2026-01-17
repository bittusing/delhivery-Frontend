import api from '../config/api';

/**
 * Dashboard Service - Handles dashboard-related API calls
 */
class DashboardService {
  /**
   * Get dashboard statistics
   */
  async getStats() {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }

  /**
   * Get upcoming pickups
   */
  async getUpcomingPickups(limit = 10) {
    const response = await api.get(`/dashboard/upcoming-pickups?limit=${limit}`);
    return response.data;
  }

  /**
   * Get performance graph data
   */
  async getPerformanceData(period = 14) {
    const response = await api.get(`/dashboard/performance?period=${period}`);
    return response.data;
  }
}

export default new DashboardService();
