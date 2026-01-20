import { useState, useCallback } from 'react';
import supportService from '../services/support.service';

/**
 * Custom hook for support ticket operations
 */
export const useSupport = () => {
    const [tickets, setTickets] = useState([]);
    const [currentTicket, setCurrentTicket] = useState(null);
    const [stats, setStats] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTickets = useCallback(async (filters = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await supportService.getTickets(filters);
            if (response.success) {
                setTickets(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch tickets');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchTicketById = useCallback(async (ticketId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await supportService.getTicketById(ticketId);
            if (response.success) {
                setCurrentTicket(response.data);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch ticket details');
        } finally {
            setLoading(false);
        }
    }, []);

    const createTicket = useCallback(async (ticketData) => {
        try {
            setLoading(true);
            setError(null);
            const response = await supportService.createTicket(ticketData);
            if (response.success) {
                return response.data;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create ticket');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const addMessage = useCallback(async (ticketId, message) => {
        try {
            setLoading(true);
            setError(null);
            const response = await supportService.addMessage(ticketId, message);
            if (response.success) {
                // Refresh current ticket
                await fetchTicketById(ticketId);
                return response.data;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to add message');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [fetchTicketById]);

    const closeTicket = useCallback(async (ticketId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await supportService.closeTicket(ticketId);
            if (response.success) {
                // Refresh current ticket if it's the one being closed
                if (currentTicket && currentTicket._id === ticketId) {
                    await fetchTicketById(ticketId);
                }
                return response.data;
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to close ticket');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [currentTicket, fetchTicketById]);

    const fetchStats = useCallback(async () => {
        try {
            const response = await supportService.getStats();
            if (response.success) {
                setStats(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    }, []);

    const fetchCategories = useCallback(async () => {
        try {
            const response = await supportService.getCategories();
            if (response.success) {
                setCategories(response.data);
            }
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    }, []);

    return {
        tickets,
        currentTicket,
        stats,
        categories,
        loading,
        error,
        fetchTickets,
        fetchTicketById,
        createTicket,
        addMessage,
        closeTicket,
        fetchStats,
        fetchCategories
    };
};
