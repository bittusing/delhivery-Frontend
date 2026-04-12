/**
 * Frontend Constants
 * Centralized configuration for reuse across components
 */

// Delivery Partners
export const DELIVERY_PARTNERS = {
    DELHIVERY: 'delhivery',
    FEDEX: 'fedex',
    BLUE_DART: 'blue_dart',
    BLUEDART: 'bluedart',
    OVERSEAS_LOGISTIC: 'overseas_logistic'
};

// Delivery Partner Options for dropdowns
export const DELIVERY_PARTNER_OPTIONS = [
    { value: 'delhivery', label: 'Delhivery', type: 'domestic' },
    { value: 'fedex', label: 'FedEx', type: 'domestic' },
    { value: 'blue_dart', label: 'Blue Dart', type: 'domestic' },
    { value: 'bluedart', label: 'BlueDart', type: 'domestic' },
    { value: 'overseas_logistic', label: 'Overseas Logistic (International)', type: 'international' }
];

// Get partner label by value
export const getPartnerLabel = (value) => {
    const partner = DELIVERY_PARTNER_OPTIONS.find(p => p.value === value);
    return partner?.label || value?.replace('_', ' ') || 'Unknown';
};

// Order Status
export const ORDER_STATUS = {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PICKED_UP: 'picked_up',
    IN_TRANSIT: 'in_transit',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    RTO: 'rto'
};

// Order Status Options for filters
export const ORDER_STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'picked_up', label: 'Picked Up' },
    { value: 'in_transit', label: 'In Transit' },
    { value: 'out_for_delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'rto', label: 'RTO' }
];

// Service Types for Overseas Logistic
export const OVERSEAS_LOGISTIC_SERVICES = [
    { value: 'UPS_SAVER', label: 'UPS Saver' },
    { value: 'UPS_EXPRESS', label: 'UPS Express' },
    { value: 'DHL_EXPRESS', label: 'DHL Express' },
    { value: 'FEDEX_PRIORITY', label: 'FedEx Priority' },
    { value: 'FEDEX_ECONOMY', label: 'FedEx Economy' }
];

// Goods Types
export const GOODS_TYPES = [
    { value: 'NDox', label: 'Non-Documents' },
    { value: 'Dox', label: 'Documents' }
];

// Package Types
export const PACKAGE_TYPES = [
    { value: 'PACKAGE', label: 'Package' },
    { value: 'ENVELOPE', label: 'Envelope' },
    { value: 'BOX', label: 'Box' }
];

// Terms of Sale
export const TERMS_OF_SALE = [
    { value: 'FOB', label: 'FOB (Free on Board)' },
    { value: 'CIF', label: 'CIF (Cost, Insurance, Freight)' },
    { value: 'EXW', label: 'EXW (Ex Works)' },
    { value: 'DDP', label: 'DDP (Delivered Duty Paid)' }
];

// Reason for Export
export const EXPORT_REASONS = [
    { value: 'SALE', label: 'Sale' },
    { value: 'GIFT', label: 'Gift' },
    { value: 'SAMPLE', label: 'Sample' },
    { value: 'RETURN', label: 'Return' },
    { value: 'REPAIR', label: 'Repair' }
];

// Duty Tax Options
export const DUTY_TAX_OPTIONS = [
    { value: 'DDU', label: 'DDU (Delivered Duty Unpaid)' },
    { value: 'DDP', label: 'DDP (Delivered Duty Paid)' }
];
