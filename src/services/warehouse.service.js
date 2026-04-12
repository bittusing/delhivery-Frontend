import api from '../config/api';

/**
 * Warehouse Service - Handles API calls for managing pickup locations (warehouses)
 */
const warehouseService = {
  /**
   * Get all warehouses for current user
   * @returns {Promise<Array>} List of warehouses
   */
  async getWarehouses() {
    try {
      const response = await api.get('/warehouses');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Create a new warehouse
   * @param {Object} warehouseData - Warehouse details
   * @returns {Promise<Object>} Created warehouse
   */
  async createWarehouse(warehouseData) {
    try {
      const response = await api.post('/warehouses', warehouseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Update a warehouse
   * @param {String} warehouseId - ID of the warehouse
   * @param {Object} warehouseData - New warehouse details
   * @returns {Promise<Object>} Updated warehouse
   */
  async updateWarehouse(warehouseId, warehouseData) {
    try {
      const response = await api.put(`/warehouses/${warehouseId}`, warehouseData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Delete a warehouse
   * @param {String} warehouseId - ID of the warehouse
   * @returns {Promise<Object>} API response
   */
  async deleteWarehouse(warehouseId) {
    try {
      const response = await api.delete(`/warehouses/${warehouseId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default warehouseService;
