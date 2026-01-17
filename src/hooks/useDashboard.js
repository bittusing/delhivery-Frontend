import { useState, useEffect, useCallback } from 'react';
import dashboardService from '../services/dashboard.service';

/**
 * Custom hook for dashboard operations
 */
export const useDashboard = () => {
  const [stats, setStats] = useState(null);
  const [upcomingPickups, setUpcomingPickups] = useState([]);
  const [performanceData, setPerformanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch dashboard statistics
   */
  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardService.getStats();
      if (response.success) {
        setStats(response.data);
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard stats');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch upcoming pickups
   */
  const fetchUpcomingPickups = useCallback(async (limit = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardService.getUpcomingPickups(limit);
      if (response.success) {
        setUpcomingPickups(response.data.pickups || []);
        return response.data.pickups || [];
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch upcoming pickups');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch performance data
   */
  const fetchPerformanceData = useCallback(async (period = 14) => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardService.getPerformanceData(period);
      if (response.success) {
        setPerformanceData(response.data.data || []);
        return response.data.data || [];
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch performance data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stats,
    upcomingPickups,
    performanceData,
    loading,
    error,
    fetchStats,
    fetchUpcomingPickups,
    fetchPerformanceData
  };
};
