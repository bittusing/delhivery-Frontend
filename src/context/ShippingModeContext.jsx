import React, { createContext, useState, useContext, useEffect } from 'react';

// Shipping modes
export const SHIPPING_MODES = {
    DOMESTIC: 'domestic',
    INTERNATIONAL: 'international'
};

const ShippingModeContext = createContext(null);

export const ShippingModeProvider = ({ children }) => {
    // Load shipping mode from localStorage or default to domestic
    const [shippingMode, setShippingMode] = useState(() => {
        const saved = localStorage.getItem('shippingMode');
        return saved === SHIPPING_MODES.INTERNATIONAL ? SHIPPING_MODES.INTERNATIONAL : SHIPPING_MODES.DOMESTIC;
    });

    // Save to localStorage when mode changes
    useEffect(() => {
        localStorage.setItem('shippingMode', shippingMode);
    }, [shippingMode]);

    const isDomestic = shippingMode === SHIPPING_MODES.DOMESTIC;
    const isInternational = shippingMode === SHIPPING_MODES.INTERNATIONAL;

    const switchToDomestic = () => setShippingMode(SHIPPING_MODES.DOMESTIC);
    const switchToInternational = () => setShippingMode(SHIPPING_MODES.INTERNATIONAL);
    const toggleMode = () => setShippingMode(prev =>
        prev === SHIPPING_MODES.DOMESTIC ? SHIPPING_MODES.INTERNATIONAL : SHIPPING_MODES.DOMESTIC
    );

    // Get delivery partners based on shipping mode
    const getDeliveryPartners = () => {
        if (shippingMode === SHIPPING_MODES.DOMESTIC) {
            return [
                { value: 'nimbuspost', label: 'NimbusPost' },
                // { value: 'delhivery', label: 'Delhivery' },
                // { value: 'blue_dart', label: 'Blue Dart' },
                // { value: 'bluedart', label: 'BlueDart' },
                // { value: 'fedex', label: 'FedEx' },
            ];
        } else {
            return [
                { value: 'overseas_logistic', label: 'Overseas Logistic' },
                // Add more international partners here as they are integrated
            ];
        }
    };

    const value = {
        shippingMode,
        setShippingMode,
        isDomestic,
        isInternational,
        switchToDomestic,
        switchToInternational,
        toggleMode,
        getDeliveryPartners,
        SHIPPING_MODES
    };

    return (
        <ShippingModeContext.Provider value={value}>
            {children}
        </ShippingModeContext.Provider>
    );
};

export const useShippingMode = () => {
    const context = useContext(ShippingModeContext);
    if (!context) {
        throw new Error('useShippingMode must be used within a ShippingModeProvider');
    }
    return context;
};

export default ShippingModeContext;
