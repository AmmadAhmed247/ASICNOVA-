import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Edit3, 
  Calendar,
  DollarSign,
  User,
  Mail,
  Phone,
  Search,
  Filter
} from 'lucide-react';
import { useUserOrders, useUpdateShippingAddress } from '../lib/hooks/useOrder';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';

const UserOrderTracking = () => {
  const { User: currentUser } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Fetch user orders
  const { data: ordersData, isLoading, isError, refetch } = useUserOrders(
    currentUser?._id,
    {
      page: currentPage,
      limit: itemsPerPage,
      status: filterStatus === 'all' ? undefined : filterStatus
    }
  );

  const orders = ordersData?.orders || [];
  const totalOrders = ordersData?.totalOrders || 0;
  const totalPages = ordersData?.totalPages || 1;

  // Mutation for updating shipping address
  // const updateAddressMutation = useUpdateShippingAddress();

  // Filter orders based on search term
  const filteredOrders = orders.filter(order => {
    const searchLower = searchTerm.toLowerCase();
    return (
      order._id?.toLowerCase().includes(searchLower) ||
      order.items?.[0]?.name?.toLowerCase().includes(searchLower)
    );
  });

  // Handle shipping address update
  // const handleAddressUpdate = async (orderId, shippingData) => {
  //   try {
  //     await updateAddressMutation.mutateAsync({
  //       orderId,
  //       shippingData
  //     });
  //     setShowAddressModal(false);
  //     setSelectedOrder(null);
  //   } catch (error) {
  //     console.error('Failed to update address:', error);
  //   }
  // };

  // Get status color and icon
  const getStatusInfo = (status) => {
    switch (status) {
      case 'PENDING':
        return { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Pending' };
      case 'AWAITING_PAYMENT':
        return { color: 'bg-orange-100 text-orange-800', icon: Clock, label: 'Awaiting Payment' };
      case 'PAID':
        return { color: 'bg-blue-100 text-blue-800', icon: CheckCircle, label: 'Paid' };
      case 'CONFIRMED':
        return { color: 'bg-indigo-100 text-indigo-800', icon: CheckCircle, label: 'Confirmed' };
      case 'IN_WAREHOUSE':
        return { color: 'bg-purple-100 text-purple-800', icon: Package, label: 'In Warehouse' };
      case 'SHIPPED':
        return { color: 'bg-green-100 text-green-800', icon: Truck, label: 'Shipped' };
      case 'DELIVERED':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Delivered' };
      case 'FAILED':
        return { color: 'bg-red-100 text-red-800', icon: Clock, label: 'Failed' };
      case 'EXPIRED':
        return { color: 'bg-gray-100 text-gray-800', icon: Clock, label: 'Expired' };
      case 'CANCELLED':
        return { color: 'bg-red-100 text-red-800', icon: Clock, label: 'Cancelled' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: Clock, label: 'Unknown' };
    }
  };

  // Order Modal Component
  const OrderModal = () => {
    if (!selectedOrder) return null;

    const statusInfo = getStatusInfo(selectedOrder.status);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center">
            <h2 className="text-xl font-semibold">Order Details - {selectedOrder._id?.slice(-8)}</h2>
            <button
              type="button"
              onClick={() => setShowOrderModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Status */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Package size={20} />
                Order Status
              </h3>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-2 rounded-full text-sm font-medium ${statusInfo.color}`}>
                  {statusInfo.label}
                </span>
                <span className="text-sm text-gray-600">
                  Last updated: {new Date(selectedOrder.updatedAt).toLocaleDateString()}
                </span>
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

            {/* Shipping Address */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin size={20} />
                  Shipping Address
                </h3>
                {!['SHIPPED', 'DELIVERED'].includes(selectedOrder.status) && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressModal(true);c
                      setShowOrderModal(false);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                  >
                    <Edit3 size={16} />
                    Edit Address
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Full Name</label>
                  <p className="font-medium">{selectedOrder.shippingDetails?.fullName || selectedOrder.billingDetails?.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Email</label>
                  <p className="font-medium">{selectedOrder.shippingDetails?.email || selectedOrder.billingDetails?.email}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Phone</label>
                  <p className="font-medium">{selectedOrder.shippingDetails?.phone || selectedOrder.billingDetails?.phone}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Address</label>
                  <p className="font-medium">
                    {selectedOrder.shippingDetails?.address || selectedOrder.billingDetails?.address}
                  </p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">City</label>
                  <p className="font-medium">{selectedOrder.shippingDetails?.city || selectedOrder.billingDetails?.city}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Country</label>
                  <p className="font-medium">{selectedOrder.shippingDetails?.country || selectedOrder.billingDetails?.country}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t flex justify-end">
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

  // Address Update Modal Component
  const AddressUpdateModal = () => {
    const [addressData, setAddressData] = useState({
      fullName: selectedOrder?.shippingDetails?.fullName || selectedOrder?.billingDetails?.fullName || '',
      email: selectedOrder?.shippingDetails?.email || selectedOrder?.billingDetails?.email || '',
      phone: selectedOrder?.shippingDetails?.phone || selectedOrder?.billingDetails?.phone || '',
      address: selectedOrder?.shippingDetails?.address || selectedOrder?.billingDetails?.address || '',
      city: selectedOrder?.shippingDetails?.city || selectedOrder?.billingDetails?.city || '',
      country: selectedOrder?.shippingDetails?.country || selectedOrder?.billingDetails?.country || '',
      postalCode: selectedOrder?.shippingDetails?.postalCode || selectedOrder?.billingDetails?.postalCode || ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Only send fields that have actual values (not empty strings)
      const filteredData = {};
      Object.keys(addressData).forEach(key => {
        if (addressData[key] && addressData[key].trim() !== '') {
          filteredData[key] = addressData[key].trim();
        }
      });
      
      console.log('Submitting filtered address data:', filteredData);
      handleAddressUpdate(selectedOrder._id, filteredData);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        {/* <div className="bg-white rounded-lg max-w-2xl w-full">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Update Shipping Address</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={addressData.fullName}
                  onChange={(e) => setAddressData({...addressData, fullName: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full p-3 border rounded-lg"
                  value={addressData.email}
                  onChange={(e) => setAddressData({...addressData, email: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full p-3 border rounded-lg"
                  value={addressData.phone}
                  onChange={(e) => setAddressData({...addressData, phone: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Postal Code</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={addressData.postalCode}
                  onChange={(e) => setAddressData({...addressData, postalCode: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                value={addressData.address}
                onChange={(e) => setAddressData({...addressData, address: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={addressData.city}
                  onChange={(e) => setAddressData({...addressData, city: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Country</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  value={addressData.country}
                  onChange={(e) => setAddressData({...addressData, country: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddressModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Address
              </button>
            </div>
          </form>
        </div> */}
      </div>
    );
  };

  if (!currentUser) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please log in to view your orders.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
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
        <h1 className="text-2xl font-semibold">My Orders</h1>
        <div className="text-sm text-gray-600">
          Total Orders: {totalOrders}
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
                placeholder="Search orders by ID or product..."
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

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600 text-lg">No orders found</p>
          <p className="text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const statusInfo = getStatusInfo(order.status);
            const StatusIcon = statusInfo.icon;
            
            return (
              <div key={order._id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                        <StatusIcon size={12} className="inline mr-1" />
                        {statusInfo.label}
                      </span>
                      <span className="text-sm text-gray-500">
                        Order #{order._id?.slice(-8)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Products</p>
                        <p className="font-medium">{order.items?.length} item(s)</p>
                        <p className="text-sm text-gray-500">
                          {order.items?.[0]?.name}
                          {order.items?.length > 1 && ` +${order.items.length - 1} more`}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-medium text-lg">${order.totalUSD}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment</p>
                        <p className="font-medium">{order.selectedCoin}</p>
                      </div>
                    </div>

                    {/* Tracking Info */}
                    {order.trackingNumber && (
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 text-blue-800">
                          <Truck size={16} />
                          <span className="font-medium">Tracking: {order.carrier} - {order.trackingNumber}</span>
                        </div>
                        {order.estimatedDelivery && (
                          <p className="text-sm text-blue-600 mt-1">
                            Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowOrderModal(true);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      View Details
                    </button>
                    
                    {/* {!['SHIPPED', 'DELIVERED'].includes(order.status) && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowAddressModal(true);
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm"
                      >
                        Edit Address
                      </button>
                    )} */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white p-4 rounded-lg shadow-sm">
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

      {/* Modals */}
      {showOrderModal && <OrderModal />}
      {showAddressModal && <AddressUpdateModal />}
    </div>
  );
};

export default UserOrderTracking;
