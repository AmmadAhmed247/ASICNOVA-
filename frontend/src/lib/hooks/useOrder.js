import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  updateTrackingInfo,
  updateShippingAddress,
  createOrder
} from '../api/order';
import toast from 'react-hot-toast';

// Hook to get all orders (Admin)
export const useAllOrders = (params = {}) => {
  return useQuery({
    queryKey: ['orders', 'admin', params],
    queryFn: () => getAllOrders(params),
    staleTime: 30 * 1000, // 30 seconds - more responsive for admin panel
    refetchOnWindowFocus: true, // Refetch when admin returns to tab
  });
};

// Hook to get user orders
export const useUserOrders = (userId, params = {}) => {
  return useQuery({
    queryKey: ['orders', 'user', userId, params],
    queryFn: () => getUserOrders(userId, params),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to get single order
export const useOrder = (orderId) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to update order status
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, statusData }) => updateOrderStatus(orderId, statusData),
    onSuccess: (data, variables) => {
      toast.success('Order status updated successfully');
      
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.orderId] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update order status');
    }
  });
};

// Hook to update tracking information
export const useUpdateTrackingInfo = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, trackingData }) => updateTrackingInfo(orderId, trackingData),
    onSuccess: (data, variables) => {
      toast.success('Tracking information updated successfully');
      
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['order', variables.orderId] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update tracking information');
    }
  });
};

// Hook to update shipping address
export const useUpdateShippingAddress = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: ({ orderId, shippingData }) => {
        console.log('Hook: updateShippingAddress called with:', { orderId, shippingData });
        return updateShippingAddress(orderId, shippingData);
      },
      onSuccess: (data, variables) => {
        console.log('Hook: Shipping address update successful:', data);
        toast.success('Shipping address updated successfully');
        
        // Invalidate and refetch relevant queries
        queryClient.invalidateQueries({ queryKey: ['orders'] });
        queryClient.invalidateQueries({ queryKey: ['order', variables.orderId] });
      },
      onError: (error) => {
        console.error('Hook: Shipping address update failed:', error);
        toast.error(error.message || 'Failed to update shipping address');
      }
    });
  };

// Hook to create new order
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success('Order created successfully');
      
      // Invalidate and refetch orders
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create order');
    }
  });
};
