import React, { useState, useEffect, useRef } from 'react';
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
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductSchema } from '../../lib/schemas/schema';
import { useFieldArray } from "react-hook-form";
import { addProduct, useDeleteProduct, useEditProduct } from '../../lib/hooks/useProduct';
import { useProducts } from '../../lib/hooks/useProduct';
import toast from 'react-hot-toast';


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
    const [orders, setOrders] = useState(mockOrders);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const { User: admin } = useContext(AuthContext)
    const addProductMutation = addProduct()
    const { data = [], isLoading, isError } = useProducts()
    const products = data?.products
    const editProductMutation = useEditProduct()
    const deleteProductMutation = useDeleteProduct()
    const [SelectedFile, setSelectedFile] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue,
        watch,
        getValues
    } = useForm({
        resolver: zodResolver(ProductSchema),
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
        defaultValues: {
            name: '',
            functionType: '',
            stock: 0,
            status: 'Inactive',
            price: { perUnit: 0, perGram: 0 },
            cryptoAddresses: {
                BTC: '',
            },
            expectedAmounts: {
                BTC: 0,
            },
            paymentMethod: [],
            specifications: {
                ProductGlance: {
                    modelName: '',
                    hashRate: '',
                    powerConsumption: '',
                    algorithm: '',
                    phase: '',
                    maxCurrent: '',
                    inputVoltage: '',
                    inputFrequency: '',
                },
                HardwareConfiguration: {
                    networkConnectionMode: '',
                    serverSizeWithoutPackage: '',
                    serverSizeWithPackage: '',
                    netWeight: '',
                    grossWeight: '',
                },
                EnvironmentRequirements: {
                    siteCoolantTemperature: '',
                    coolantFlow: '',
                    coolantPressure: '',
                    workingCoolant: '',
                    diameterOfCoolantPipeConnector: '',
                }
            },
            purchasingGuidelines: [],
            images: []
        }
    })

    console.log("Values: ", getValues())

    console.log("Form Validation errors: ", errors)

    const fileInputRef = useRef(null)

    const handleFile = () => {
        if (fileInputRef.current) {
            fileInputRef?.current?.click()
        }
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files)
        setValue('images', files)
        setSelectedFile(files)
    }

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: Settings },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
    ];

    const filteredProducts = (products ?? []).filter(product => {
        const matchesSearch =
            !searchTerm ||
            product.name?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus =
            filterStatus === 'all' ||
            product.status?.toLowerCase() === filterStatus.toLowerCase()

        return matchesSearch && matchesStatus
    })

    const filteredOrders = orders.filter(order =>
        (order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === 'all' || order.status === filterStatus)
    );



    const { fields, append, remove } = useFieldArray({
        control,
        name: "purchasingGuidelines"
    });

    useEffect(() => {
        if (selectedProduct) {
            reset({
                name: selectedProduct.name || '',
                functionType: selectedProduct.functionType || '',
                cryptoAddresses: selectedProduct.cryptoAddresses || { BTC: '' },
                expectedAmounts: selectedProduct.expectedAmounts || { BTC: 0 },
                paymentMethod: selectedProduct.paymentMethod || 'BTC'
            });
        }
    }, [selectedProduct, reset]);

    console.log("Values: ", getValues())

    const paymentMethod = watch('paymentMethod', [])

    const ProductModal = () => {


        const onFormSubmit = async (data) => {
            const formData = new FormData();

            formData.append('name', data.name);
            formData.append('functionType', data.functionType);
            formData.append('paymentMethod', JSON.stringify(data.paymentMethod));
            formData.append('status', data.status || 'Inactive');
            formData.append('stock', data.stock || 0);
            formData.append('price', JSON.stringify(data.price));
            formData.append('specifications', JSON.stringify(data.specifications));
            formData.append('purchasingGuidelines', JSON.stringify(data.purchasingGuidelines));

            const cryptoAddresses = {
                BTC: data.cryptoAddresses?.BTC || data.cryptoAddresses?.BTC === '' ? data.cryptoAddresses.BTC : "default-address",
                ETH: data.cryptoAddresses?.ETH || data.cryptoAddresses?.ETH === '' ? data.cryptoAddresses.ETH : "default-address"
            };

            const expectedAmounts = {
                BTC: Number(data.expectedAmounts?.BTC) || 0,
                ETH: Number(data.expectedAmounts?.ETH) || 0
            }; 5


            console.log("Crypto addresses to send:", cryptoAddresses);
            console.log("Expected amounts to send:", expectedAmounts);

            formData.append('cryptoAddresses', JSON.stringify(cryptoAddresses));
            formData.append('expectedAmounts', JSON.stringify(expectedAmounts));

            data.images?.forEach((file) => {
                formData.append('images', file);
            });

            if (!selectedProduct) {
                await addProductMutation.mutateAsync(formData);
                toast.success("Product Created!");
            } else {
                await editProductMutation.mutateAsync({ id: selectedProduct._id, data: formData });
                toast.success("Product Edited!");
            }

            setShowProductModal(false);
            setSelectedProduct(null);
            reset();
        };

        if (isLoading) return <p>Loading...</p>
        if (isError) return <p>Error</p>

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="text-xl font-semibold">
                            {selectedProduct ? 'Edit Product' : 'Add New Product'}
                        </h2>
                        <button
                            type="button"
                            onClick={() => setShowProductModal(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit(onFormSubmit)}>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Product Name</label>
                                    <input
                                        type="text"
                                        className={`w-full p-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register('name')}
                                    />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Function Type</label>
                                    <input
                                        type="text"
                                        className={`w-full p-3 border rounded-lg ${errors.functionType ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register('functionType')}
                                    />
                                    {errors.functionType && <p className="text-red-500 text-sm mt-1">{errors.functionType.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Price per Gram ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`w-full p-3 border rounded-lg ${errors.price?.perGram ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register('price.perGram', { valueAsNumber: true })}
                                    />
                                    {errors.price?.perGram && <p className="text-red-500 text-sm mt-1">{errors.price.perGram.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Price per Unit ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        className={`w-full p-3 border rounded-lg ${errors.price?.perUnit ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register('price.perUnit', { valueAsNumber: true })}
                                    />
                                    {errors.price?.perUnit && <p className="text-red-500 text-sm mt-1">{errors.price.perUnit.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Stock</label>
                                    <input
                                        type="number"
                                        className={`w-full p-3 border rounded-lg ${errors.stock ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register('stock')}
                                    />
                                    {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock.message}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">Status</label>
                                    <select
                                        className={`w-full p-3 border rounded-lg ${errors.status ? 'border-red-500' : 'border-gray-300'}`}
                                        {...register('status')}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Out Of Stock">Out of Stock</option>
                                    </select>
                                    {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status.message}</p>}
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Payment Method</label>
                                <div className='flex items-center gap-10'>

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value="BTC"
                                        className="mr-2 "
                                        {...register('paymentMethod', { required: 'Select at least one payment method' })}
                                    />
                                    BTC
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value="ETH"
                                        className="mr-2"
                                        {...register('paymentMethod', { required: 'Select at least one payment method' })}
                                    />
                                    ETH
                                </label>
                                </div>
                               
                                {errors.paymentMethod && (
                                    <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
                                )}
                            </div>

                            {/* Specifications */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold">Product Specifications</h3>

                                {/* Product Glance */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-3">Product Glance</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Model Name"
                                                className={`w-full p-2 border rounded ${errors.specifications?.ProductGlance?.modelName ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.ProductGlance.modelName')}
                                            />
                                            {errors.specifications?.ProductGlance?.modelName && <p className="text-red-500 text-xs mt-1">{errors.specifications.ProductGlance.modelName.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Hash Rate"
                                                className={`w-full p-2 border rounded ${errors.specifications?.ProductGlance?.hashRate ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.ProductGlance.hashRate')}
                                            />
                                            {errors.specifications?.ProductGlance?.hashRate && <p className="text-red-500 text-xs mt-1">{errors.specifications.ProductGlance.hashRate.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Power Consumption"
                                                className={`w-full p-2 border rounded ${errors.specifications?.ProductGlance?.powerConsumption ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.ProductGlance.powerConsumption')}
                                            />
                                            {errors.specifications?.ProductGlance?.powerConsumption && <p className="text-red-500 text-xs mt-1">{errors.specifications.ProductGlance.powerConsumption.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Algorithm"
                                                className={`w-full p-2 border rounded ${errors.specifications?.ProductGlance?.algorithm ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.ProductGlance.algorithm')}
                                            />
                                            {errors.specifications?.ProductGlance?.algorithm && <p className="text-red-500 text-xs mt-1">{errors.specifications.ProductGlance.algorithm.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Phase"
                                                className={`w-full p-2 border rounded ${errors.specifications?.ProductGlance?.phase ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.ProductGlance.phase')}
                                            />
                                            {errors.specifications?.ProductGlance?.phase && <p className="text-red-500 text-xs mt-1">{errors.specifications.ProductGlance.phase.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Max Current"
                                                className={`w-full p-2 border rounded ${errors.specifications?.ProductGlance?.maxCurrent ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.ProductGlance.maxCurrent')}
                                            />
                                            {errors.specifications?.ProductGlance?.maxCurrent && <p className="text-red-500 text-xs mt-1">{errors.specifications.ProductGlance.maxCurrent.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Input Voltage"
                                                className={`w-full p-2 border rounded ${errors.specifications?.ProductGlance?.inputVoltage ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.ProductGlance.inputVoltage')}
                                            />
                                            {errors.specifications?.ProductGlance?.inputVoltage && <p className="text-red-500 text-xs mt-1">{errors.specifications.ProductGlance.inputVoltage.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Input Frequency"
                                                className={`w-full p-2 border rounded ${errors.specifications?.ProductGlance?.inputFrequency ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.ProductGlance.inputFrequency')}
                                            />
                                            {errors.specifications?.ProductGlance?.inputFrequency && <p className="text-red-500 text-xs mt-1">{errors.specifications.ProductGlance.inputFrequency.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Hardware Configuration */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-3">Hardware Configuration</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Network Connection Mode"
                                                className={`w-full p-2 border rounded ${errors.specifications?.HardwareConfiguration?.networkConnectionMode ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.HardwareConfiguration.networkConnectionMode')}
                                            />
                                            {errors.specifications?.HardwareConfiguration?.networkConnectionMode && <p className="text-red-500 text-xs mt-1">{errors.specifications.HardwareConfiguration.networkConnectionMode.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Server Size Without Package"
                                                className={`w-full p-2 border rounded ${errors.specifications?.HardwareConfiguration?.serverSizeWithoutPackage ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.HardwareConfiguration.serverSizeWithoutPackage')}
                                            />
                                            {errors.specifications?.HardwareConfiguration?.serverSizeWithoutPackage && <p className="text-red-500 text-xs mt-1">{errors.specifications.HardwareConfiguration.serverSizeWithoutPackage.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Server Size With Package"
                                                className={`w-full p-2 border rounded ${errors.specifications?.HardwareConfiguration?.serverSizeWithPackage ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.HardwareConfiguration.serverSizeWithPackage')}
                                            />
                                            {errors.specifications?.HardwareConfiguration?.serverSizeWithPackage && <p className="text-red-500 text-xs mt-1">{errors.specifications.HardwareConfiguration.serverSizeWithPackage.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Net Weight"
                                                className={`w-full p-2 border rounded ${errors.specifications?.HardwareConfiguration?.netWeight ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.HardwareConfiguration.netWeight')}
                                            />
                                            {errors.specifications?.HardwareConfiguration?.netWeight && <p className="text-red-500 text-xs mt-1">{errors.specifications.HardwareConfiguration.netWeight.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Gross Weight"
                                                className={`w-full p-2 border rounded ${errors.specifications?.HardwareConfiguration?.grossWeight ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.HardwareConfiguration.grossWeight')}
                                            />
                                            {errors.specifications?.HardwareConfiguration?.grossWeight && <p className="text-red-500 text-xs mt-1">{errors.specifications.HardwareConfiguration.grossWeight.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Environmental Requirements */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-3">Environmental Requirements</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Site Coolant Temperature"
                                                className={`w-full p-2 border rounded ${errors.specifications?.EnvironmentRequirements?.siteCoolantTemperature ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.EnvironmentRequirements.siteCoolantTemperature')}
                                            />
                                            {errors.specifications?.EnvironmentRequirements?.siteCoolantTemperature && <p className="text-red-500 text-xs mt-1">{errors.specifications.EnvironmentRequirements.siteCoolantTemperature.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Coolant Flow"
                                                className={`w-full p-2 border rounded ${errors.specifications?.EnvironmentRequirements?.coolantFlow ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.EnvironmentRequirements.coolantFlow')}
                                            />
                                            {errors.specifications?.EnvironmentRequirements?.coolantFlow && <p className="text-red-500 text-xs mt-1">{errors.specifications.EnvironmentRequirements.coolantFlow.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Coolant Pressure"
                                                className={`w-full p-2 border rounded ${errors.specifications?.EnvironmentRequirements?.coolantPressure ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.EnvironmentRequirements.coolantPressure')}
                                            />
                                            {errors.specifications?.EnvironmentRequirements?.coolantPressure && <p className="text-red-500 text-xs mt-1">{errors.specifications.EnvironmentRequirements.coolantPressure.message}</p>}
                                        </div>

                                        <div>
                                            <input
                                                type="text"
                                                placeholder="Working Coolant"
                                                className={`w-full p-2 border rounded ${errors.specifications?.EnvironmentRequirements?.workingCoolant ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.EnvironmentRequirements.workingCoolant')}
                                            />
                                            {errors.specifications?.EnvironmentRequirements?.workingCoolant && <p className="text-red-500 text-xs mt-1">{errors.specifications.EnvironmentRequirements.workingCoolant.message}</p>}
                                        </div>

                                        <div className="md:col-span-2">
                                            <input
                                                type="text"
                                                placeholder="Diameter of Coolant Pipe Connector"
                                                className={`w-full p-2 border rounded ${errors.specifications?.EnvironmentRequirements?.diameterOfCoolantPipeConnector ? 'border-red-500' : 'border-gray-300'}`}
                                                {...register('specifications.EnvironmentRequirements.diameterOfCoolantPipeConnector')}
                                            />
                                            {errors.specifications?.EnvironmentRequirements?.diameterOfCoolantPipeConnector && <p className="text-red-500 text-xs mt-1">{errors.specifications.EnvironmentRequirements.diameterOfCoolantPipeConnector.message}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/* Crypto Wallet Address */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h4 className="font-medium mb-3">Crypto Wallet Address</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                     
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Bitcoin Wallet Address"
                                                        className={`w-full p-2 border rounded ${errors.cryptoAddresses?.BTC ? 'border-red-500' : 'border-gray-300'}`}
                                                        {...register('cryptoAddresses.BTC')}
                                                    />
                                                    {errors.cryptoAddresses?.BTC && <p className="text-red-500 text-xs mt-1">{errors.cryptoAddresses?.BTC.message}</p>}
                                                </div>

                                                <div>
                                                    <input
                                                        type="number"
                                                        step="0.0001"  // allow small BTC values
                                                        min="0.0001"   // optional minimum
                                                        placeholder="Expected Amount"
                                                        className={`w-full p-2 border rounded ${errors.expectedAmounts?.BTC ? 'border-red-500' : 'border-gray-300'}`}
                                                        {...register('expectedAmounts.BTC', {
                                                            valueAsNumber: true,
                                                        })}
                                                    />
                                                    {errors.expectedAmounts?.BTC && (
                                                        <p className="text-red-500 text-xs mt-1">{errors.expectedAmounts?.BTC.message}</p>
                                                    )}
                                                </div>
                                        

                                     
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Etherium Wallet Address"
                                                        className={`w-full p-2 border rounded ${errors.cryptoAddresses?.ETH ? 'border-red-500' : 'border-gray-300'}`}
                                                        {...register('cryptoAddresses.ETH')}
                                                    />
                                                    {errors.cryptoAddresses?.BTC && <p className="text-red-500 text-xs mt-1">{errors.cryptoAddresses?.BTC.message}</p>}
                                                </div>

                                                <div>
                                                    <input
                                                        type="number"
                                                        step="0.0001"  // allow small BTC values
                                                        min="0.0001"   // optional minimum
                                                        placeholder="Expected Amount"
                                                        className={`w-full p-2 border rounded ${errors.expectedAmounts?.ETH ? 'border-red-500' : 'border-gray-300'}`}
                                                        {...register('expectedAmounts.ETH', {
                                                            valueAsNumber: true,
                                                        })}
                                                    />
                                                    {errors.expectedAmounts?.BTC && (
                                                        <p className="text-red-500 text-xs mt-1">{errors.expectedAmounts?.BTC.message}</p>
                                                    )}
                                                </div>
                                        


                                        <div>

                                        </div>
                                    </div>

                                    {/* Purchasing Guidelines */}
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <div className="flex justify-between items-center mb-3">
                                            <h4 className="font-medium">Purchasing Guidelines</h4>
                                            <button
                                                type="button"
                                                onClick={() => append("")}
                                                className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                                            >
                                                <Plus size={16} />
                                                Add Guideline
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {fields.map((field, index) => (
                                                <div key={field.id} className="flex gap-2">
                                                    <textarea
                                                        {...register(`purchasingGuidelines.${index}`)}
                                                        defaultValue={field.value ?? ""}
                                                        placeholder={`Purchasing Guideline ${index + 1}`}
                                                        className="flex-1 p-2 border rounded resize-none"
                                                        rows="2"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => remove(index)}
                                                        className="text-red-600 hover:text-red-700 p-2"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>

                                        {errors.purchasingGuidelines && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.purchasingGuidelines.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Image Upload */}
                                <div>
                                    <label className="block text-sm font-medium mb-2">Product Image</label>
                                    <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center">
                                        <Upload onClick={handleFile} className="mx-auto mb-2" size={48} />
                                        <p className="text-gray-500">Click to upload or drag and drop</p>
                                        <input ref={fileInputRef} onChange={handleFileChange} type="file" className="hidden" accept="image/*" />
                                    </div>
                                    {SelectedFile.map((file) => (
                                        <div className='p-2 w-[100px] mt-5 bg-gray-200 rounded-3xl'>{file.name}</div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6 border-t flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowProductModal(false)}
                                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                                >
                                    <Save size={16} />
                                    Save Product
                                </button>
                            </div>
                        </div>

                    </form>
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
                        <button
                            type="button"
                            onClick={() => setShowOrderModal(false)}
                        >
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

    const renderDashboard = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Total Products</p>
                            <p className="text-2xl font-semibold">{products?.length}</p>
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
                    type="button"
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
                                    {console.log(product)}
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
                                        {product?.stock || 0}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 text-xs rounded-full ${product.status === 'active' ? 'bg-green-100 text-green-800' :
                                            product.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                            {product?.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setShowProductModal(true);
                                                }}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    if (confirm('Are you sure you want to delete this product?')) {
                                                        await deleteProductMutation.mutateAsync(product._id)
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
                                            <button
                                                type="button"
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
                                <span className="text-gray-700">{admin?.fullName}</span>
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
                                        type="button"
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