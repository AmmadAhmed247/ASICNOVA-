import React, { useState, useEffect } from 'react';
import {
    Plus,
    Edit3,
    Trash2,
    Eye,
    Search,
    Filter,
    Upload,
    Save,
    X,
    User,
    Package,
    ShoppingCart,
    DollarSign,
    Calendar,
    MapPin,
    Phone,
    Mail,
    Settings
} from 'lucide-react';

const mockProducts = [
    {
        id: 1,
        name: "Bitcoin Miner S19 Pro",
        functionType: "Bitcoin Mining",
        price: { perGram: 299, perUnit: 2999 },
        paymentMethod: ["Bitcoin", "USDT", "Bank Transfer"],
        specifications: {
            ProductGlance: {
                inputVoltage: { min: 220, max: 240 },
                inputFrequency: { min: 50, max: 60 },
                hashRate: "110 TH/s",
                powerConsumption: "3250W"
            },
            HardwareConfiguration: {
                chipType: "BM1398",
                numberOfChips: 189
            },
            EnvironmentRequirements: {
                operatingTemperature: { min: 5, max: 40 },
                humidity: { min: 5, max: 95 }
            }
        },
        customerReviews: [
            { name: "John Doe", review: "Excellent performance and reliability!" },
            { name: "Jane Smith", review: "Great value for money" }
        ],
        stock: 25,
        status: "active"
    },
    {
        id: 2,
        name: "Ethereum Miner E9 Pro",
        functionType: "Ethereum Mining",
        price: { perGram: 399, perUnit: 3999 },
        paymentMethod: ["Ethereum", "USDT"],
        stock: 12,
        status: "active"
    }
];

const mockOrders = [
    {
        id: "ORD-001",
        customerName: "Alice Johnson",
        email: "alice@example.com",
        phone: "+1-555-0123",
        address: "123 Mining St, Crypto City, CC 12345",
        productName: "Bitcoin Miner S19 Pro",
        quantity: 2,
        totalPrice: 5998,
        paymentMethod: "Bitcoin",
        orderDate: "2024-08-15",
        status: "pending",
        shippingDetails: {
            carrier: "DHL Express",
            trackingNumber: "DHL123456789",
            estimatedDelivery: "2024-08-25"
        }
    },
    {
        id: "ORD-002",
        customerName: "Bob Wilson",
        email: "bob@example.com",
        phone: "+1-555-0456",
        address: "456 Hash Ave, Blockchain Heights, BH 67890",
        productName: "Ethereum Miner E9 Pro",
        quantity: 1,
        totalPrice: 3999,
        paymentMethod: "USDT",
        orderDate: "2024-08-16",
        status: "shipped"
    }
];

export default function Admin() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState(mockProducts);
    const [orders, setOrders] = useState(mockOrders);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: Settings },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
    ];

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filterStatus === 'all' || product.status === filterStatus)
    );

    const filteredOrders = orders.filter(order =>
        (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === 'all' || order.status === filterStatus)
    );

    const ProductModal = () => {
        const [formData, setFormData] = useState(selectedProduct || {
            name: '',
            functionType: '',
            price: { perGram: 0, perUnit: 0 },
            paymentMethod: [],
            specifications: {
                ProductGlance: {},
                HardwareConfiguration: {},
                EnvironmentRequirements: {}
            },
            customerReviews: [],
            stock: 0,
            status: 'active'
        });

        const handleSave = () => {
            if (selectedProduct) {
                setProducts(products.map(p => p.id === selectedProduct.id ? { ...formData, id: selectedProduct.id } : p));
            } else {
                setProducts([...products, { ...formData, id: Date.now() }]);
            }
            setShowProductModal(false);
            setSelectedProduct(null);
        };

        const handleSpecificationChange = (category, key, value) => {
            setFormData(prev => ({
                ...prev,
                specifications: {
                    ...prev.specifications,
                    [category]: {
                        ...prev.specifications[category],
                        [key]: value
                    }
                }
            }));
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                            {selectedProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <button onClick={() => setShowProductModal(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
             
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Product Name</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg"
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Function Type</label>
                                <input
                                    type="text"
                                    className="w-full p-3 border rounded-lg"
                                    value={formData.functionType}
                                    onChange={(e) => setFormData(prev => ({ ...prev, functionType: e.target.value }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Price per Gram ($)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border rounded-lg"
                                    value={formData.price?.perGram || 0}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        price: { ...prev.price, perGram: parseFloat(e.target.value) }
                                    }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Price per Unit ($)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border rounded-lg"
                                    value={formData.price?.perUnit || 0}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        price: { ...prev.price, perUnit: parseFloat(e.target.value) }
                                    }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Stock</label>
                                <input
                                    type="number"
                                    className="w-full p-3 border rounded-lg"
                                    value={formData.stock}
                                    onChange={(e) => setFormData(prev => ({ ...prev, stock: parseInt(e.target.value) }))}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Status</label>
                                <select
                                    className="w-full p-3 border rounded-lg"
                                    value={formData.status}
                                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="out-of-stock">Out of Stock</option>
                                </select>
                            </div>
                        </div>

                        {/* Payment Methods */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Payment Methods</label>
                            <input
                                type="text"
                                placeholder="Comma separated (e.g., Bitcoin, USDT, Bank Transfer)"
                                className="w-full p-3 border rounded-lg"
                                value={formData.paymentMethod?.join(', ') || ''}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    paymentMethod: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                                }))}
                            />
                        </div>

                        {/* Specifications */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Product Specifications</h3>

                            {/* Product Glance */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-3">Product Glance</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Hash Rate"
                                        className="p-2 border rounded"
                                        value={formData.specifications?.ProductGlance?.hashRate || ''}
                                        onChange={(e) => handleSpecificationChange('ProductGlance', 'hashRate', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Power Consumption"
                                        className="p-2 border rounded"
                                        value={formData.specifications?.ProductGlance?.powerConsumption || ''}
                                        onChange={(e) => handleSpecificationChange('ProductGlance', 'powerConsumption', e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Input Voltage (e.g., 220-240)"
                                        className="p-2 border rounded"
                                        value={formData.specifications?.ProductGlance?.inputVoltage?.min && formData.specifications?.ProductGlance?.inputVoltage?.max
                                            ? `${formData.specifications.ProductGlance.inputVoltage.min}-${formData.specifications.ProductGlance.inputVoltage.max}`
                                            : ''}
                                        onChange={(e) => {
                                            const [min, max] = e.target.value.split('-').map(v => parseInt(v.trim()));
                                            handleSpecificationChange('ProductGlance', 'inputVoltage', min && max ? { min, max } : e.target.value);
                                        }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Input Frequency (e.g., 50-60)"
                                        className="p-2 border rounded"
                                        value={formData.specifications?.ProductGlance?.inputFrequency?.min && formData.specifications?.ProductGlance?.inputFrequency?.max
                                            ? `${formData.specifications.ProductGlance.inputFrequency.min}-${formData.specifications.ProductGlance.inputFrequency.max}`
                                            : ''}
                                        onChange={(e) => {
                                            const [min, max] = e.target.value.split('-').map(v => parseInt(v.trim()));
                                            handleSpecificationChange('ProductGlance', 'inputFrequency', min && max ? { min, max } : e.target.value);
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Hardware Configuration */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-3">Hardware Configuration</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Chip Type"
                                        className="p-2 border rounded"
                                        value={formData.specifications?.HardwareConfiguration?.chipType || ''}
                                        onChange={(e) => handleSpecificationChange('HardwareConfiguration', 'chipType', e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Number of Chips"
                                        className="p-2 border rounded"
                                        value={formData.specifications?.HardwareConfiguration?.numberOfChips || ''}
                                        onChange={(e) => handleSpecificationChange('HardwareConfiguration', 'numberOfChips', parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-sm font-medium mb-2">Product Image</label>
                            <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center">
                                <Upload className="mx-auto mb-2" size={48} />
                                <p className="text-gray-500">Click to upload or drag and drop</p>
                                <input type="file" className="hidden" accept="image/*" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border-t flex justify-end gap-3">
                        <button
                            onClick={() => setShowProductModal(false)}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                        >
                            <Save size={16} />
                            Save Product
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    const OrderModal = () => {
        const [orderData, setOrderData] = useState(selectedOrder);

        const handleStatusUpdate = (newStatus) => {
            const updatedOrder = { ...orderData, status: newStatus };
            setOrderData(updatedOrder);
            setOrders(orders.map(o => o.id === selectedOrder.id ? updatedOrder : o));
        };

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Order Details - {orderData?.id}</h2>
                        <button onClick={() => setShowOrderModal(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        {/* Order Status */}
                        <div className="flex items-center justify-between">
                            <span className="text-lg font-medium">Status:</span>
                            <select
                                className="p-2 border rounded-lg"
                                value={orderData?.status}
                                onChange={(e) => handleStatusUpdate(e.target.value)}
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Customer Info */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <User size={20} />
                                Customer Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600">Name</label>
                                    <p className="font-medium">{orderData?.customerName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Email</label>
                                    <p className="font-medium flex items-center gap-1">
                                        <Mail size={16} />
                                        {orderData?.email}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Phone</label>
                                    <p className="font-medium flex items-center gap-1">
                                        <Phone size={16} />
                                        {orderData?.phone}
                                    </p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Address</label>
                                    <p className="font-medium flex items-center gap-1">
                                        <MapPin size={16} />
                                        {orderData?.address}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <Package size={20} />
                                Product Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm text-gray-600">Product</label>
                                    <p className="font-medium">{orderData?.productName}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Quantity</label>
                                    <p className="font-medium">{orderData?.quantity}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-600">Total Price</label>
                                    <p className="font-medium flex items-center gap-1">
                                        <DollarSign size={16} />
                                        ${orderData?.totalPrice}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Payment & Shipping */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-3">Payment Method</h3>
                                <p className="font-medium">{orderData?.paymentMethod}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <Calendar size={20} />
                                    Order Date
                                </h3>
                                <p className="font-medium">{orderData?.orderDate}</p>
                            </div>
                        </div>

                        {/* Shipping Details */}
                        {orderData?.shippingDetails && (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-semibold mb-3">Shipping Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm text-gray-600">Carrier</label>
                                        <p className="font-medium">{orderData.shippingDetails.carrier}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600">Tracking Number</label>
                                        <p className="font-medium">{orderData.shippingDetails.trackingNumber}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-600">Est. Delivery</label>
                                        <p className="font-medium">{orderData.shippingDetails.estimatedDelivery}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-6 border-t flex justify-end">
                        <button
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

    const renderDashboard = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Products</p>
                            <p className="text-2xl font-semibold">{products.length}</p>
                        </div>
                        <Package className="text-blue-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Orders</p>
                            <p className="text-2xl font-semibold">{orders.length}</p>
                        </div>
                        <ShoppingCart className="text-green-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Pending Orders</p>
                            <p className="text-2xl font-semibold">
                                {orders.filter(o => o.status === 'pending').length}
                            </p>
                        </div>
                        <Calendar className="text-yellow-500" size={32} />
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Revenue</p>
                            <p className="text-2xl font-semibold">
                                ${orders.reduce((sum, order) => sum + order.totalPrice, 0).toLocaleString()}
                            </p>
                        </div>
                        <DollarSign className="text-purple-500" size={32} />
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Recent Orders</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {orders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.customerName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.productName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                        'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${order.totalPrice}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderProducts = () => (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-semibold">Products Management</h1>
                <button
                    onClick={() => {
                        setSelectedProduct(null);
                        setShowProductModal(true);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Product
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search products..."
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
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="out-of-stock">Out of Stock</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Function</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                <div className="text-sm text-gray-500">ID: {product.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.functionType}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        ${product.price?.perGram}/G | ${product.price?.perUnit}/U
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' :
                                                product.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setShowProductModal(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this product?')) {
                                                        setProducts(products.filter(p => p.id !== product.id));
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderOrders = () => (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-semibold">Orders Management</h1>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search orders by customer name or order ID..."
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
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div>
                                            <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                                            <div className="text-sm text-gray-500">{order.email}</div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.productName}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.quantity}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        ${order.totalPrice}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {order.paymentMethod}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {order.orderDate}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                                                    order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setShowOrderModal(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to delete this order?')) {
                                                        setOrders(orders.filter(o => o.id !== order.id));
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-900"
                                                title="Delete Order"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return renderDashboard();
            case 'products':
                return renderProducts();
            case 'orders':
                return renderOrders();
            default:
                return renderDashboard();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <User className="text-gray-400" size={20} />
                                <span className="text-gray-700">Admin User</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Sidebar */}
                <div className="w-64 bg-white shadow-sm min-h-screen">
                    <div className="p-4">
                        <nav className="space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${activeTab === tab.id
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon size={20} className="mr-3" />
                                        {tab.label}
                                    </button>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8">
                    {renderContent()}
                </div>
            </div>

            {/* Modals */}
            {showProductModal && <ProductModal />}
            {showOrderModal && <OrderModal />}
        </div>
    );
}