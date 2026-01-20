import api from '../config/api';

/**
 * Support Service - Handles support-related API calls
 */
class SupportService {
    /**
     * Get all tickets for the current user
     * @param {Object} filters - Filter options (status, category, search)
     */
    async getTickets(filters = {}) {
        const response = await api.get('/support/tickets', { params: filters });
        return response.data;
    }

    /**
     * Get a single ticket by ID
     * @param {String} ticketId 
     */
    async getTicketById(ticketId) {
        const response = await api.get(`/support/tickets/${ticketId}`);
        return response.data;
    }

    /**
     * Create a new support ticket
     * @param {Object} ticketData 
     */
    async createTicket(ticketData) {
        const response = await api.post('/support/tickets', ticketData);
        return response.data;
    }

    /**
     * Add a message to an existing ticket
     * @param {String} ticketId 
     * @param {String} message 
     */
    async addMessage(ticketId, message) {
        const response = await api.post(`/support/tickets/${ticketId}/messages`, { message });
        return response.data;
    }

    /**
     * Close a ticket
     * @param {String} ticketId 
     */
    async closeTicket(ticketId) {
        const response = await api.post(`/support/tickets/${ticketId}/close`);
        return response.data;
    }

    /**
     * Get support statistics
     */
    async getStats() {
        const response = await api.get('/support/stats');
        return response.data;
    }

    /**
     * Get available ticket categories
     */
    async getCategories() {
        const response = await api.get('/support/categories');
        return response.data;
    }
}

export default new SupportService();
