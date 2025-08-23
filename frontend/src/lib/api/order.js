import axios from '../config/axios';

// Get all orders (Admin)
export const getAllOrders = async (params = {}) => {
  try {
    const response = await axios.get('/admin/orders', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get user orders
export const getUserOrders = async (userId, params = {}) => {
  try {
    const response = await axios.get(`/user/${userId}/orders`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get single order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update order status (Admin)
export const updateOrderStatus = async (orderId, statusData) => {
  try {
    const response = await axios.put(`/admin/orders/${orderId}/status`, statusData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update tracking information (Admin)
export const updateTrackingInfo = async (orderId, trackingData) => {
  try {
    const response = await axios.put(`/admin/orders/${orderId}/tracking`, trackingData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update shipping address (User)
export const updateShippingAddress = async (orderId, shippingData) => {
    try {
      const response = await axios.put(`/orders/${orderId}/shipping`, {
        shippingDetails: shippingData
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };
  

// Create new order
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post('/orders/create', orderData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get payment info for order
export const getPaymentInfo = async (orderId, coinType) => {
  try {
    const response = await axios.get(`/orders/payment-info/${orderId}/${coinType}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
