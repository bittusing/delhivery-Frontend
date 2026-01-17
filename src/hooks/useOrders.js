import { useState, useEffect, useCallback } from 'react';
import orderService from '../services/order.service';

/**
 * Custom hook for order operations
 */
export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch user orders
   */
  const fetchOrders = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getUserOrders(filters);
      if (response.success) {
        setOrders(response.data.orders || []);
        return response.data.orders || [];
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Calculate rate
   */
  const calculateRate = useCallback(async (rateData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.calculateRate(rateData);
      if (response.success) {
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to calculate rate');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create order
   */
  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.createOrder(orderData);
      if (response.success) {
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create order');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get order by ID
   */
  const getOrderById = useCallback(async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.getOrderById(orderId);
      if (response.success) {
        return response.data.order;
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch order';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Track order
   */
  const trackOrder = useCallback(async (orderId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await orderService.trackOrder(orderId);
      if (response.success) {
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to track order');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    orders,
    loading,
    error,
    fetchOrders,
    calculateRate,
    createOrder,
    getOrderById,
    trackOrder
  };
};
