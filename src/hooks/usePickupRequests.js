import { useState, useCallback } from 'react';
import pickupRequestService from '../services/pickupRequest.service';

/**
 * Custom hook for pickup request operations
 */
export const usePickupRequests = () => {
  const [pickupRequests, setPickupRequests] = useState([]);
  const [locations, setLocations] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch pickup requests
   */
  const fetchPickupRequests = useCallback(async (filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await pickupRequestService.getPickupRequests(filters);
      if (response.success) {
        setPickupRequests(response.data.pickupRequests || []);
        return response.data.pickupRequests || [];
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch pickup requests');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create pickup request
   */
  const createPickupRequest = useCallback(async (pickupData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await pickupRequestService.createPickupRequest(pickupData);
      if (response.success) {
        return response.data.pickupRequest;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create pickup request');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch pickup locations
   */
  const fetchLocations = useCallback(async (orderType = 'domestic') => {
    try {
      setLoading(true);
      setError(null);
      const response = await pickupRequestService.getPickupLocations(orderType);
      if (response.success) {
        setLocations(response.data.locations || []);
        return response.data.locations || [];
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch locations');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Fetch available orders
   */
  const fetchAvailableOrders = useCallback(async (location, orderType = 'domestic') => {
    try {
      setLoading(true);
      setError(null);
      const response = await pickupRequestService.getAvailableOrders(location, orderType);
      if (response.success) {
        setAvailableOrders(response.data.orders || []);
        return response.data.orders || [];
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch available orders');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    pickupRequests,
    locations,
    availableOrders,
    loading,
    error,
    fetchPickupRequests,
    createPickupRequest,
    fetchLocations,
    fetchAvailableOrders
  };
};
