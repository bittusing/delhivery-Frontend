/**
 * Razorpay Payment Utility
 * Handles Razorpay payment integration
 */

/**
 * Load Razorpay script dynamically
 */
const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    document.body.appendChild(script);
  });
};

/**
 * Initialize Razorpay payment
 * @param {Object} orderData - Razorpay order data from backend
 * @param {Function} onSuccess - Success callback
 * @param {Function} onError - Error callback
 */
export const initializeRazorpayPayment = async (orderData, onSuccess, onError) => {
  try {
    const Razorpay = await loadRazorpayScript();

    const options = {
      key: orderData.key,
      amount: orderData.amount * 100, // Convert to paise
      currency: orderData.currency || 'INR',
      name: 'Flywell Logistics',
      description: 'Wallet Recharge',
      order_id: orderData.orderId,
      handler: async function (response) {
        try {
          // Call success callback with payment details
          await onSuccess({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          });
        } catch (error) {
          onError(error);
        }
      },
      prefill: {
        // You can prefill user details if available
      },
      theme: {
        color: '#1a2b4b'
      },
      modal: {
        ondismiss: function() {
          onError(new Error('Payment cancelled by user'));
        }
      }
    };

    const razorpay = new Razorpay(options);
    razorpay.open();
  } catch (error) {
    onError(error);
  }
};
