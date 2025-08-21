import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { Check, ShoppingCart, FileText, CreditCard, Send, CheckCircle, Copy } from 'lucide-react';
import { useCart } from '../../lib/hooks/useCart';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BillingSchema } from '../../lib/schemas/schema';
import { Trash2 } from "lucide-react";



// Countdown Timer
const Countdown = ({ expiryTime, onExpire }) => {
  const [timer, setTimer] = useState(Math.max(0, Math.floor((expiryTime - Date.now()) / 1000)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [expiryTime, onExpire]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const seconds = String(timer % 60).padStart(2, '0');
  return <div className="text-lg font-semibold text-center mb-4">Time left: {minutes}:{seconds}</div>;
};

const Cart = () => {
  const { data = [] } = useCart();
  const cartItems = data;

  const [selectedItems, setSelectedItems] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [orderId, setOrderId] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [receiveAddress, setReceiveAddress] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [quoteExpiresAt, setQuoteExpiresAt] = useState(Date.now() + 10 * 60 * 1000);
  const [txId, setTxId] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentExpired, setPaymentExpired] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [localCartItems, setLocalCartItems] = useState([]);

  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(BillingSchema)
  });

  // Auto-check payment status when on payment step
  useEffect(() => {
    let interval;
    if (orderId && currentStep === 2 && !paymentVerified) { // Step 2 is PayStep
      interval = setInterval(async () => {
        try {
          const res = await axios.get(`http://localhost:3000/api/payments/status/${orderId}`);
          console.log('Payment status check:', res.data);

          if (res.data.success && res.data.status === "PAID") {
            setPaymentVerified(true);
            setStatusMsg('Payment confirmed! Redirecting...');

            // Auto move to submit step after 2 seconds
            setTimeout(() => {
              setCurrentStep(3); // Move to Submit step
            }, 5000);

            clearInterval(interval);
          }
        } catch (err) {
          console.error("Error checking payment status:", err.response?.data || err.message);
        }
      }, 10000); // Check every 10 seconds
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [orderId, currentStep, paymentVerified]);
  useEffect(() => {
    setLocalCartItems(cartItems);
  }, [cartItems]);

  const handleRemoveItem = async (productId) => {
    try {
      console.log('=== REMOVE ITEM DEBUG ===');
      console.log('Product ID to remove:', productId);
      console.log('Product ID type:', typeof productId);
      console.log('Current cart items:', localCartItems);
      
      // Check if productId exists
      if (!productId) {
        console.error('No product ID provided');
        alert('Error: No product ID provided');
        return;
      }

      console.log('Making DELETE request...');
      
      // Send productId to backend
      const res = await axios.delete("http://localhost:3000/cart/delete", {
        data: { productId: productId.toString() }, // Ensure it's a string
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Delete response status:', res.status);
      console.log('Delete response data:', res.data);
      
      if (res.data) {
        // Update local state with server response
        setLocalCartItems(res.data);
        console.log('Successfully updated cart');
      }
      
    } catch (err) {
      console.error('=== DELETE ERROR ===');
      console.error('Error status:', err.response?.status);
      console.error('Error data:', err.response?.data);
      console.error('Error message:', err.message);
      
      // More specific error messages
      if (err.response?.status === 401) {
        alert("Authentication error. Please log in again.");
      } else if (err.response?.status === 404) {
        alert("Item not found in cart.");
      } else if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("Failed to remove item from cart. Please try again.");
      }
    }
  };



  // Auto move from Submit to Complete step
  useEffect(() => {
    if (currentStep === 3 && paymentVerified) {
      const timer = setTimeout(() => {
        setCurrentStep(4); // Move to Complete step
      }, 5000); // Wait 3 seconds on submit step

      return () => clearTimeout(timer);
    }
  }, [currentStep, paymentVerified]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const initialSelections = {};
      cartItems.forEach(item => {
        if (item.product) initialSelections[item._id] = true;
      });
      setSelectedItems(initialSelections);
    }
  }, [cartItems]);

  const handleItemSelection = (itemId) => {
    setSelectedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems[item._id] && item.product)
      .reduce((total, item) => total + (item.product?.price?.perUnit * item.quantity), 0);
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(receiveAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onFormSubmit = async (data) => {
    try {
      const itemsForOrder = cartItems
        .filter(item => selectedItems[item._id] && item.product)
        .map(item => ({
          productId: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          priceUSD: item.product.price?.perUnit || 0
        }));

      if (itemsForOrder.length === 0) {
        alert("No items selected");
        return;
      }

      const totalUSD = Number(itemsForOrder
        .reduce((sum, item) => sum + item.quantity * item.priceUSD, 0)
        .toFixed(2)
      );

      const payload = {
        userId: null,
        items: itemsForOrder,
        totalUSD,
        selectedCoin,
        billingDetails: {
          fullName: data.fullName.trim(),
          email: data.email.trim(),
          phone: data.phone?.trim() || '',
          address: data.billingAddress.trim(),
          city: data.city?.trim() || '',
          country: data.country?.trim() || '',
          postalCode: data.postalCode?.trim() || ''
        },
        shippingDetails: {
          fullName: data.shippingFullName?.trim() || data.fullName.trim(),
          email: data.shippingEmail?.trim() || data.email.trim(),
          phone: data.shippingPhone?.trim() || data.phone?.trim() || '',
          address: data.shippingAddress?.trim() || data.billingAddress.trim(),
          city: data.shippingCity?.trim() || data.city?.trim() || '',
          country: data.shippingCountry?.trim() || data.country?.trim() || '',
          postalCode: data.shippingPostalCode?.trim() || data.postalCode?.trim() || ''
        }
      };

      const res = await axios.post('http://localhost:3000/api/orders/create', payload);

      if (res.data.success) {
        const createdOrder = res.data.order;
        setOrderId(createdOrder._id);
        setReceiveAddress(createdOrder.receiveAddress);
        setCryptoAmount(createdOrder.cryptoAmountLocked);
        setQuoteExpiresAt(new Date(createdOrder.quoteExpiresAt).getTime());
        setCurrentStep(prev => prev + 1);
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Error creating order:", err.response?.data || err.message);
      alert("Failed to create order");
    }
  };

  const verifyPaymentHandler = async () => {
    if (!orderId) {
      alert("Order not created yet. Please complete order info first.");
      return;
    }
    if (!txId.trim()) {
      alert("Please enter TXID");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/payments/verify', { orderId, txId });
      setStatusMsg(res.data.message);
      if (res.data.success) {
        setPaymentVerified(true);
        setTimeout(() => {
          setCurrentStep(3); // Move to Submit step
        }, 1500);
      }
    } catch (err) {
      setStatusMsg(err.response?.data?.message || 'Error verifying payment');
    } finally {
      setLoading(false);
    }
  };

  // Step Components
  const ShoppingCartStep = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      {cartItems.map(item => {
        if (!item.product) return <div key={item._id} className="text-gray-500">Product not available</div>;
        return (
          <div key={item._id} className="flex items-center border p-4 rounded mb-3 hover:bg-gray-50 transition">
            <input type="checkbox" checked={selectedItems[item._id] || false} onChange={() => handleItemSelection(item._id)} className="mr-4" />
            <img src={item.product?.images && item.product.images.length > 0
              ? `http://localhost:3000/${item.product.images[0].replace(/\\/g, '/')}`
              : '/dummy.jpg'} alt={item.product.name} className="w-20 h-20 object-cover rounded mr-4" />
            <div className="flex-1">
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">${(item.product?.price?.perUnit * item.quantity).toLocaleString()}</p>
              <p className="text-sm text-gray-500">${item.product.price?.perUnit.toLocaleString()} each</p>
              <button
                onClick={() => handleRemoveItem(item.product._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={20} />
              </button>

            </div>
          </div>
        )
      })}
      <div className="text-right font-bold text-lg mt-4">Total: ${calculateTotal().toLocaleString()}</div>
    </div>
  );

  const OrderInfoStep = () => (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="bg-white p-5 rounded-lg shadow mb-6 ">
        <div className='flex flex-col gap-5 ' >
          <h3 className="font-bold text-2xl mb-2">Billing Details</h3>
          <input placeholder="Full Name" {...register('fullName', { required: true })} className="w-full p-2 border rounded mb-1" />
          <input placeholder="Email" {...register('email', { required: true })} className="w-full p-2 border rounded mb-1" />
          <input placeholder="Phone" {...register('phone')} className="w-full p-2 border rounded mb-1" />
          <input placeholder="Address" {...register('billingAddress', { required: true })} className="w-full p-2 border rounded mb-1" />
          <input placeholder="City" {...register('city')} className="w-full p-2 border rounded mb-1" />
          <input placeholder="Country" {...register('country')} className="w-full p-2 border rounded mb-1" />
          <input placeholder="Postal Code" {...register('postalCode')} className="w-full p-2 border rounded mb-1" />
        </div>
        <div>
          {/* <h3 className="font-semibold mb-2">Shipping Details (Optional)</h3>
          <input placeholder="Full Name" {...register('shippingFullName')} className="w-full p-2 border rounded mb-1" />
          <input placeholder="Email" {...register('shippingEmail')} className="w-full p-2 border rounded mb-1" />
          <input placeholder="Phone" {...register('shippingPhone')} className="w-full p-2 border rounded mb-1" />
          <input placeholder="Address" {...register('shippingAddress')} className="w-full p-2 border rounded mb-1" />
          <input placeholder="City" {...register('shippingCity')} className="w-full p-2 border rounded mb-1" />
          <input placeholder="Country" {...register('shippingCountry')} className="w-full p-2 border rounded mb-1" />
          <input placeholder="Postal Code" {...register('shippingPostalCode')} className="w-full p-2 border rounded mb-1" /> */}
        </div>
      </div>
    </form>
  );

  const PayStep = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Pay Your Order</h2>

      {/* Payment Status Alert */}
      {paymentVerified && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Payment Verified Successfully!</span>
          </div>
          <p className="text-green-700 text-sm mt-1">Redirecting to order confirmation...</p>
        </div>
      )}

      <div className="mb-4">
        <label className="text-sm font-medium mb-1 block">Select Coin:</label>
        <select value={selectedCoin} onChange={e => setSelectedCoin(e.target.value)} className="border p-2 rounded w-full max-w-xs" disabled={paymentVerified}>
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
        </select>
      </div>
      <div className="bg-blue-50 p-4 rounded mb-4">
        <p className="text-sm">Send exactly:</p>
        <p className="text-2xl font-bold text-blue-800">{cryptoAmount} {selectedCoin}</p>
        <p className="text-sm mt-2">To address:</p>
        <div className="flex items-center bg-white p-2 rounded border">
          <code className="flex-1 break-all">{receiveAddress}</code>
          <button onClick={copyAddress} className="ml-2 p-1 bg-gray-200 rounded hover:bg-gray-300" disabled={paymentVerified}>
            {copied ? 'Copied!' : <Copy size={16} />}
          </button>
        </div>
      </div>
      <div className="text-center mb-4">
        <QRCodeCanvas value={receiveAddress} size={180} />
        <p className="text-sm text-gray-500 mt-2">Scan to pay with {selectedCoin}</p>
      </div>

      {!paymentVerified && (
        <>
          <Countdown expiryTime={quoteExpiresAt} onExpire={() => setPaymentExpired(true)} />
          <input
            type="text"
            placeholder={`Enter ${selectedCoin} TXID`}
            value={txId}
            onChange={e => setTxId(e.target.value)}
            className="w-full p-2 border rounded mb-2"
            disabled={paymentExpired || paymentVerified}
          />
          <button
            onClick={verifyPaymentHandler}
            disabled={loading || paymentExpired || !txId.trim() || !orderId || paymentVerified}
            className={`w-full py-2 rounded mb-2 ${paymentExpired || paymentVerified ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            {loading ? 'Verifying...' : 'Verify Payment'}
          </button>
        </>
      )}

      {statusMsg && (
        <p className={`mt-2 ${paymentVerified ? 'text-green-600' : 'text-red-600'}`}>
          {statusMsg}
        </p>
      )}

      {paymentVerified && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">We're automatically checking your payment status...</p>
          <div className="mt-2">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600 mr-2"></div>
              <span className="text-green-800 text-sm">Processing...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const SubmitStep = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6 text-center">
      <div className="mx-auto w-16 h-16 bg-blue-100 flex items-center justify-center rounded-full mb-4">
        <Send className="w-8 h-8 text-blue-600" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Order Submitted Successfully!</h2>
      <p className="text-gray-600 mb-2">Your payment has been verified and order is being processed.</p>
      <p className="font-bold text-lg">Total: ${calculateTotal().toLocaleString()}</p>
      <div className="mt-4">
        <div className="animate-pulse text-blue-600">
          Processing your order...
        </div>
      </div>
    </div>
  );

  const CompleteStep = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6 text-center">
      <div className="mx-auto w-16 h-16 bg-blue-200 flex items-center justify-center rounded-full mb-4">
        <CheckCircle className="w-8 h-8 text-blue-600" />
      </div>
      <h2 className="text-2xl font-semibold text-blue-600 mb-2">Order Completed!</h2>
      <p className="text-gray-500 mb-2">Your order has been successfully placed and confirmed.</p>
      <p className="font-bold">Total: ${calculateTotal().toLocaleString()}</p>
      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800 text-sm">
          Congratulations! Your order is confirmed and will be processed within 24 hours.
        </p>
      </div>
    </div>
  );

  const steps = [
    { id: 0, name: 'Cart', icon: ShoppingCart },
    { id: 1, name: 'Order Info', icon: FileText },
    { id: 2, name: 'Pay', icon: CreditCard },
    { id: 3, name: 'Submit', icon: Send },
    { id: 4, name: 'Complete', icon: CheckCircle },
  ];

  const hasSelectedItems = cartItems.filter(item => selectedItems[item._id] && item.product).length > 0;

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <ShoppingCartStep />;
      case 1: return <OrderInfoStep />;
      case 2: return <PayStep />;
      case 3: return <SubmitStep />;
      case 4: return <CompleteStep />;
      default: return <ShoppingCartStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center relative flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${idx <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                  {idx < currentStep ? <Check size={16} /> : <Icon size={16} />}
                </div>
                <span className={`text-xs ${idx <= currentStep ? 'text-blue-600' : 'text-gray-500'}`}>{step.name}</span>
                {idx < steps.length - 1 && <div className={`absolute top-3 left-1/2 w-full h-1 ${idx < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`} style={{ zIndex: -1 }}></div>}
              </div>
            )
          })}
        </div>

        {/* Step Content */}
        {renderStep()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {currentStep > 0 && currentStep < 3 && !paymentVerified && (
            <button onClick={() => setCurrentStep(prev => prev - 1)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
              Back
            </button>
          )}
          {currentStep < 2 && (
            <button
              onClick={async () => {
                if (currentStep === 1) {
                  const formData = getValues();
                  await onFormSubmit(formData);
                } else {
                  setCurrentStep(prev => prev + 1);
                }
              }}
              disabled={currentStep === 0 && !hasSelectedItems}
              className={`px-4 py-2 rounded ${currentStep === 0 && !hasSelectedItems ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;