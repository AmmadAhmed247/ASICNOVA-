import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Edit3, 
  Search, 
  Filter, 
  Truck, 
  Package, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit
} from 'lucide-react';
import { useAllOrders, useUpdateOrderStatus, useUpdateTrackingInfo, useUpdateShippingAddress } from '../lib/hooks/useOrder';
import toast from 'react-hot-toast';

const AdminOrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Fetch orders using the hook
  const { data: ordersData, isLoading, isError, refetch } = useAllOrders({
    page: currentPage,
    limit: itemsPerPage,
    status: filterStatus === 'all' ? undefined : filterStatus
  });

  // Auto-refresh orders every 30 seconds to catch user updates
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  const orders = ordersData?.orders || [];
  const totalOrders = ordersData?.totalOrders || 0;
  const totalPages = ordersData?.totalPages || 1;

  // Mutations
  const updateStatusMutation = useUpdateOrderStatus();
  const updateTrackingMutation = useUpdateTrackingInfo();
  const updateShippingMutation = useUpdateShippingAddress();

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order._id?.toLowerCase().includes(searchLower) ||
      order.billingDetails?.fullName?.toLowerCase().includes(searchLower) ||
      order.billingDetails?.email?.toLowerCase().includes(searchLower) ||
      order.items?.[0]?.name?.toLowerCase().includes(searchLower)
    );
  });

  // Handle status update
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({
        orderId,
        statusData: { status: newStatus }
      });
      setShowOrderModal(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // Handle tracking update
  const handleTrackingUpdate = async (orderId, trackingData) => {
    try {
      await updateTrackingMutation.mutateAsync({
        orderId,
        trackingData
      });
      setShowTrackingModal(false);
      setSelectedOrder(null);
    } catch (error) {
      console.error('Failed to update tracking:', error);
    }
  };

  // FIXED: Handle shipping address update
  // const handleShippingUpdate = async (orderId, shippingData) => {
  //   try {
  //     console.log('Updating shipping for order:', orderId, 'with data:', shippingData);
  //     await updateShippingMutation.mutateAsync({
  //       orderId,
  //       shippingData // This will be wrapped in shippingDetails by the API function
  //     });
  //     setShowShippingModal(false);
  //     setSelectedOrder(null);
  //   } catch (error) {
  //     console.error('Failed to update shipping address:', error);
  //   }
  // };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'PENDING':
        return { color: 'bg-yellow-100 text-yellow-800', icon: Clock };
      case 'AWAITING_PAYMENT':
        return { color: 'bg-orange-100 text-orange-800', icon: AlertCircle };
      case 'PAID':
        return { color: 'bg-blue-100 text-blue-800', icon: CheckCircle };
      case 'CONFIRMED':
        return { color: 'bg-indigo-100 text-indigo-800', icon: CheckCircle };
      case 'IN_WAREHOUSE':
        return { color: 'bg-purple-100 text-purple-800', icon: Package };
      case 'SHIPPED':
        return { color: 'bg-green-100 text-green-800', icon: Truck };
      case 'DELIVERED':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle };
      case 'FAILED':
        return { color: 'bg-red-100 text-red-800', icon: XCircle };
      case 'EXPIRED':
        return { color: 'bg-gray-100 text-gray-800', icon: XCircle };
      case 'CANCELLED':
        return { color: 'bg-red-100 text-red-800', icon: XCircle };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: Clock };
    }
  };

  // FIXED: Shipping Address Modal Component
  // const ShippingModal = () => {
  //   const [shippingData, setShippingData] = useState({
  //     fullName: selectedOrder?.shippingDetails?.fullName || selectedOrder?.billingDetails?.fullName || '',
  //     email: selectedOrder?.shippingDetails?.email || selectedOrder?.billingDetails?.email || '',
  //     phone: selectedOrder?.shippingDetails?.phone || selectedOrder?.billingDetails?.phone || '',
  //     address: selectedOrder?.shippingDetails?.address || selectedOrder?.billingDetails?.address || '',
  //     city: selectedOrder?.shippingDetails?.city || selectedOrder?.billingDetails?.city || '',
  //     country: selectedOrder?.shippingDetails?.country || selectedOrder?.billingDetails?.country || '',
  //     postalCode: selectedOrder?.shippingDetails?.postalCode || selectedOrder?.billingDetails?.postalCode || ''
  //   });

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     console.log('ShippingModal: Submitting shipping data:', shippingData);
  //     handleShippingUpdate(selectedOrder._id, shippingData);
  //   };

  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  //       <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
  //         <div className="p-6 border-b flex justify-between items-center">
  //           <h2 className="text-xl font-semibold">Update Shipping Address</h2>
  //           <button
  //             type="button"
  //             onClick={() => setShowShippingModal(false)}
  //             className="text-gray-400 hover:text-gray-600"
  //           >
  //             <XCircle size={24} />
  //           </button>
  //         </div>

  //         <form onSubmit={handleSubmit} className="p-6 space-y-4">
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //             <div>
  //               <label className="block text-sm font-medium mb-2">Full Name</label>
  //               <input
  //                 type="text"
  //                 className="w-full p-3 border rounded-lg"
  //                 value={shippingData.fullName}
  //                 onChange={(e) => setShippingData({...shippingData, fullName: e.target.value})}
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium mb-2">Email</label>
  //               <input
  //                 type="email"
  //                 className="w-full p-3 border rounded-lg"
  //                 value={shippingData.email}
  //                 onChange={(e) => setShippingData({...shippingData, email: e.target.value})}
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium mb-2">Phone</label>
  //               <input
  //                 type="tel"
  //                 className="w-full p-3 border rounded-lg"
  //                 value={shippingData.phone}
  //                 onChange={(e) => setShippingData({...shippingData, phone: e.target.value})}
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium mb-2">Postal Code</label>
  //               <input
  //                 type="text"
  //                 className="w-full p-3 border rounded-lg"
  //                 value={shippingData.postalCode}
  //                 onChange={(e) => setShippingData({...shippingData, postalCode: e.target.value})}
  //               />
  //             </div>
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium mb-2">Address</label>
  //             <textarea
  //               className="w-full p-3 border rounded-lg"
  //               rows="3"
  //               value={shippingData.address}
  //               onChange={(e) => setShippingData({...shippingData, address: e.target.value})}
  //             />
  //           </div>

  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //             <div>
  //               <label className="block text-sm font-medium mb-2">City</label>
  //               <input
  //                 type="text"
  //                 className="w-full p-3 border rounded-lg"
  //                 value={shippingData.city}
  //                 onChange={(e) => setShippingData({...shippingData, city: e.target.value})}
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium mb-2">Country</label>
  //               <input
  //                 type="text"
  //                 className="w-full p-3 border rounded-lg"
  //                 value={shippingData.country}
  //                 onChange={(e) => setShippingData({...shippingData, country: e.target.value})}
  //               />
  //             </div>
  //           </div>

  //           <div className="flex justify-end gap-3 pt-4">
  //             <button
  //               type="button"
  //               onClick={() => setShowShippingModal(false)}
  //               className="px-4 py-2 border rounded-lg hover:bg-gray-50"
  //               disabled={updateShippingMutation.isLoading}
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               type="submit"
  //               className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
  //               disabled={updateShippingMutation.isLoading}
  //             >
  //               {updateShippingMutation.isLoading ? 'Updating...' : 'Update Address'}
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // };

  // Order Modal Component
  const OrderModal = () => {
    if (!selectedOrder) return null;

    const statusInfo = getStatusInfo(selectedOrder.status);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Order Details - {selectedOrder._id}</h2>
            <button
              type="button"
              onClick={() => setShowOrderModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle size={24} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Status */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Current Status:</span>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-2 rounded-full text-sm font-medium ${statusInfo.color}`}>
                  {selectedOrder.status.replace('_', ' ')}
                </span>
                <select
                  className="p-2 border rounded-lg"
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusUpdate(selectedOrder._id, e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="AWAITING_PAYMENT">Awaiting Payment</option>
                  <option value="PAID">Paid</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="IN_WAREHOUSE">In Warehouse</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="FAILED">Failed</option>
                  <option value="EXPIRED">Expired</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <User size={20} />
                Customer Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Full Name</label>
                  <p className="font-medium">{selectedOrder.billingDetails?.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <p className="font-medium flex items-center gap-1">
                    <Mail size={16} />
                    {selectedOrder.billingDetails?.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Phone</label>
                  <p className="font-medium flex items-center gap-1">
                    <Phone size={16} />
                    {selectedOrder.billingDetails?.phone}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Billing Address</label>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin size={16} />
                    {selectedOrder.billingDetails?.address}, {selectedOrder.billingDetails?.city}, {selectedOrder.billingDetails?.country}
                  </p>
                </div>
              </div>
            </div>

            {/* FIXED: Shipping Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Truck size={20} />
                Shipping Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Full Name</label>
                  <p className="font-medium">{selectedOrder.shippingDetails?.fullName || selectedOrder.billingDetails?.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <p className="font-medium flex items-center gap-1">
                    <Mail size={16} />
                    {selectedOrder.shippingDetails?.email || selectedOrder.billingDetails?.email}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Phone</label>
                  <p className="font-medium flex items-center gap-1">
                    <Phone size={16} />
                    {selectedOrder.shippingDetails?.phone || selectedOrder.billingDetails?.phone}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Shipping Address</label>
                  <p className="font-medium flex items-center gap-1">
                    <MapPin size={16} />
                    {selectedOrder.shippingDetails?.address || selectedOrder.billingDetails?.address}, {selectedOrder.shippingDetails?.city || selectedOrder.billingDetails?.city}, {selectedOrder.shippingDetails?.country || selectedOrder.billingDetails?.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Package size={20} />
                Order Items
              </h3>
              <div className="space-y-3">
                {selectedOrder.items?.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-white rounded border">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${item.priceUSD}/unit</p>
                      <p className="text-sm text-gray-600">Total: ${item.totalUSD}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="text-lg font-semibold text-right">
                  Total: ${selectedOrder.totalUSD}
                </p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Payment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Payment Method</label>
                  <p className="font-medium">{selectedOrder.selectedCoin}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Order Date</label>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar size={16} />
                    {new Date(selectedOrder.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking Information */}
            {selectedOrder.trackingNumber && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Truck size={20} />
                  Tracking Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600">Carrier</label>
                    <p className="font-medium">{selectedOrder.carrier}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Tracking Number</label>
                    <p className="font-medium">{selectedOrder.trackingNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">Estimated Delivery</label>
                    <p className="font-medium">
                      {selectedOrder.estimatedDelivery ? 
                        new Date(selectedOrder.estimatedDelivery).toLocaleDateString() : 
                        'Not specified'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Admin Notes */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Admin Notes</h3>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows="3"
                placeholder="Add admin notes..."
                defaultValue={selectedOrder.adminNotes || ''}
                onChange={(e) => {
                  console.log('Admin notes:', e.target.value);
                }}
              />
            </div>
          </div>

          {/* FIXED: Updated Modal Footer with Shipping Button */}
          <div className="p-6 border-t flex justify-end gap-3">
            {/* <button
              type="button"
              onClick={() => {
                setShowShippingModal(true);
                setShowOrderModal(false);
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              disabled={['SHIPPED', 'DELIVERED'].includes(selectedOrder.status)}
            >
              <Edit size={16} />
              Update Shipping
            </button> */}
            <button
              type="button"
              onClick={() => {
                setShowTrackingModal(true);
                setShowOrderModal(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Truck size={16} />
              Update Tracking
            </button>
            <button
              type="button"
              onClick={() => setShowOrderModal(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Tracking Modal Component
  const TrackingModal = () => {
    const [trackingData, setTrackingData] = useState({
      trackingNumber: selectedOrder?.trackingNumber || '',
      carrier: selectedOrder?.carrier || '',
      estimatedDelivery: selectedOrder?.estimatedDelivery ? 
        new Date(selectedOrder.estimatedDelivery).toISOString().split('T')[0] : ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      handleTrackingUpdate(selectedOrder._id, trackingData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Update Tracking Information</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tracking Number</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={trackingData.trackingNumber}
                onChange={(e) => setTrackingData({...trackingData, trackingNumber: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Carrier</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={trackingData.carrier}
                onChange={(e) => setTrackingData({...trackingData, carrier: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Estimated Delivery</label>
              <input
                type="date"
                className="w-full p-3 border rounded-lg"
                value={trackingData.estimatedDelivery}
                onChange={(e) => setTrackingData({...trackingData, estimatedDelivery: e.target.value})}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowTrackingModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Tracking
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error loading orders. Please try again.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-semibold">Orders Management</h1>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Total Orders: {totalOrders}
          </div>
          <button
            onClick={() => refetch()}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center gap-2"
            title="Refresh orders to see latest updates"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search orders by ID, customer name, or product..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-gray-400" />
            <select
              className="border rounded-lg px-3 py-2"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="PENDING">Pending</option>
              <option value="AWAITING_PAYMENT">Awaiting Payment</option>
              <option value="PAID">Paid</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="IN_WAREHOUSE">In Warehouse</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="FAILED">Failed</option>
              <option value="EXPIRED">Expired</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order) => {
                const statusInfo = getStatusInfo(order.status);
                const StatusIcon = statusInfo.icon;
                
                return (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order._id?.slice(-8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {order.billingDetails?.fullName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.billingDetails?.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items?.length} item(s)
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items?.[0]?.name}
                        {order.items?.length > 1 && ` +${order.items.length - 1} more`}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${order.totalUSD}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.selectedCoin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 w-fit ${statusInfo.color}`}>
                        <StatusIcon size={12} />
                        {order.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowOrderModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalOrders)} of {totalOrders} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-3 py-2 text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {showOrderModal && <OrderModal />}
      {showTrackingModal && <TrackingModal />}
      {showShippingModal && <ShippingModal />}
    </div>
  );
};

export default AdminOrderManagement;