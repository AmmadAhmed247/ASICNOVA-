import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';
import { Check, ShoppingCart, FileText, CreditCard, Send, CheckCircle, Copy } from 'lucide-react';
import { useCart } from '../../lib/hooks/useCart';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { BillingSchema } from '../../lib/schemas/schema';


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

const Cart = ({ orderId }) => {
  const { data = [], isLoading, isError } = useCart()
  const cartItems = data
  console.log(cartItems)

  const [selectedItems, setSelectedItems] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm({
    resolver: zodResolver(BillingSchema)
  })

  console.log("Values Are: ", getValues())

  useEffect(() => {
    if (cartItems.length > 0) {
      const initialSelections = {};
      cartItems.forEach(item => {
        if (item.product) {
          initialSelections[item._id] = true;
        }
      });
      setSelectedItems(initialSelections);
    }
  }, [cartItems]);

  const steps = [
    { id: 0, name: 'Cart', icon: ShoppingCart },
    { id: 1, name: 'Order Info', icon: FileText },
    { id: 2, name: 'Pay', icon: CreditCard },
    { id: 3, name: 'Submit', icon: Send },
    { id: 4, name: 'Complete', icon: CheckCircle }
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [orderInfo, setOrderInfo] = useState({ billingAddress: '', shippingAddress: '' });
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [receiveAddress, setReceiveAddress] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [quoteExpiresAt, setQuoteExpiresAt] = useState(Date.now() + 10 * 60 * 1000);
  const [txId, setTxId] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [paymentExpired, setPaymentExpired] = useState(false);

  // Handle item selection
  const handleItemSelection = (itemId) => {
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Calculate total for selected items with products
  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems[item._id] && item.product) // Only selected items with products
      .reduce((total, item) => {
        return total + (item.product?.price?.perUnit * item.quantity);
      }, 0);
  };

  // Start Payment Timer
  useEffect(() => {
    if (currentStep === 2 && !orderId) {
      setStatusMsg("Order not found. Please go back and start again.");
    }
    if (currentStep === 2 && orderId) {
      axios.post('http://localhost:3000/api/payments/start-timer', { orderId })
        .then(res => {
          const { receiveAddress, cryptoAmountLocked, selectedCoin, quoteExpiresAt } = res.data;
          setReceiveAddress(receiveAddress);
          setCryptoAmount(cryptoAmountLocked);
          setSelectedCoin(selectedCoin);
          setQuoteExpiresAt(new Date(quoteExpiresAt).getTime());
        })
        .catch(err => console.error(err));
    }
  }, [currentStep, orderId]);

  const handleVerifyPayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/payments/verify', { orderId, txId });
      setStatusMsg(res.data.message);
      if (res.data.success) setCurrentStep(prev => prev + 1);
    } catch (err) {
      setStatusMsg(err.response?.data?.message || 'Error verifying payment');
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = async () => {
    await navigator.clipboard.writeText(receiveAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onFormSubmit = (data)=>{
    console.log("Submitted Data: ", data)
  }

   useEffect(() => {
    const selectedCartItems = cartItems
      .filter(item => selectedItems[item._id] && item.product)
      .map(item => ({
        name: item.product.name,
        price: item.product?.price?.perUnit || 0,
        totalUSD: (item.product?.price?.perUnit || 0) * item.quantity,
        weight: item.product?.specifications?.HardwareConfiguration?.netWeight || 0,
        qty: item.quantity
      }));

    setValue('items', selectedCartItems);
  }, [selectedItems, cartItems, setValue]);

  // Step Components
  const ShoppingCartStep = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Shopping Cart</h2>
      {cartItems.map(item => {
        // Skip items without products
        if (!item.product) {
          return (
            <div key={item._id} className="flex items-center border p-4 rounded mb-3 bg-gray-50">
              <div className="text-gray-500">Product not available</div>
            </div>
          );
        }

        return (
          <div key={item._id} className="flex items-center border p-4 rounded mb-3 hover:bg-gray-50 transition">
            <input
              type="checkbox"
              checked={selectedItems[item._id] || false}
              onChange={() => handleItemSelection(item._id)}
              className="mr-4"
            />
            <img
              src={item.product.images?.[0] || '/dummy.jpg'}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded mr-4"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-gray-500 text-sm">
                Weight: {item.product?.specifications?.HardwareConfiguration?.netWeight || 'N/A'} kg
              </p>
              <p className="text-gray-500 text-sm">
                Quantity: {item.quantity}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                ${(item.product?.price?.perUnit * item.quantity).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                ${item.product.price?.perUnit.toLocaleString()} each
              </p>
            </div>
          </div>
        );
      })}
      <div className="text-right font-bold text-lg mt-4">
        Total: ${calculateTotal().toLocaleString()}
      </div>
      {cartItems.filter(item => selectedItems[item._id] && item.product).length === 0 && (
        <div className="text-center text-gray-500 py-4">
          No items selected for checkout
        </div>
      )}
    </div>
  );

  const OrderInfoStep = () => (
    <form onSubmit={handleSubmit(onFormSubmit)}>


      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Information</h2>
        <textarea
          placeholder="Billing Address"
          {...register('billingAddress')}
          className="w-full p-3 border rounded mb-3"
        />
        {errors.billingAddress && (<p className='text-xs text-red-600'>{errors.billingAddress.message}</p>)}
        <textarea
          placeholder="Shipping Address"
          {...register('shippingAddress')}
          className="w-full p-3 border rounded"
        />
                {errors.shippingAddress && (<p className='text-xs text-red-600'>{errors.shippingAddress.message}</p>)}

      </div>
    </form>
  );

  const PayStep = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6">
      <h2 className="text-xl font-semibold mb-4">Pay Your Order</h2>

      <div className="mb-4">
        <label className="text-sm font-medium mb-1 block">Select Coin:</label>
        <select value={selectedCoin} onChange={e => setSelectedCoin(e.target.value)} className="border p-2 rounded w-full max-w-xs">
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          <option value="USDT">Tether (USDT)</option>
          <option value="BCH">Bitcoin Cash (BCH)</option>
        </select>
      </div>

      <div className="bg-blue-50 p-4 rounded mb-4">
        <p className="text-sm">Send exactly:</p>
        <p className="text-2xl font-bold text-blue-800">{cryptoAmount} {selectedCoin}</p>
        <p className="text-sm mt-2">To address: </p>
        <div className="flex items-center bg-white p-2 rounded border">
          <code className="flex-1 break-all">{receiveAddress}</code>
          <button onClick={copyAddress} className="ml-2 p-1 bg-gray-200 rounded hover:bg-gray-300">
            {copied ? 'Copied!' : <Copy size={16} />}
          </button>
        </div>
      </div>

      <div className="text-center mb-4">
        <QRCodeCanvas value={receiveAddress} size={180} />
        <p className="text-sm text-gray-500 mt-2">Scan to pay with {selectedCoin}</p>
      </div>

      <Countdown expiryTime={quoteExpiresAt} onExpire={() => setPaymentExpired(true)} />

      <input
        type="text"
        placeholder={`Enter ${selectedCoin} TXID`}
        value={txId}
        onChange={e => setTxId(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        disabled={paymentExpired}
      />
      <button
        onClick={handleVerifyPayment}
        disabled={loading || !txId.trim() || paymentExpired}
        className={`w-full py-2 rounded mb-2 ${paymentExpired ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        {loading ? 'Verifying...' : 'Verify Payment'}
      </button>
      {statusMsg && <p className="text-red-600 mt-2">{statusMsg}</p>}
    </div>
  );

  const SubmitStep = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6 text-center">
      <h2 className="text-xl font-semibold mb-2">Submit Order</h2>
      <p>Total: ${calculateTotal().toLocaleString()}</p>
      <p className="text-gray-500 mt-2">Once payment is verified, click Next to complete your order.</p>
    </div>
  );

  const CompleteStep = () => (
    <div className="bg-white p-6 rounded-lg shadow mb-6 text-center">
      <div className="mx-auto w-16 h-16 bg-green-100 flex items-center justify-center rounded-full mb-4">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-semibold text-green-600 mb-2">Order Completed!</h2>
      <p className="text-gray-500 mb-2">Your order has been successfully placed.</p>
      <p className="font-bold">Total: ${calculateTotal().toLocaleString()}</p>
    </div>
  );

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

  const hasSelectedItems = cartItems.filter(item => selectedItems[item._id] && item.product).length > 0;

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
          {currentStep > 0 && currentStep < 4 && (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Back
            </button>
          )}
          {currentStep < 3 && (
            <button
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={currentStep === 0 && !hasSelectedItems}
              className={`px-4 py-2 rounded ${currentStep === 0 && !hasSelectedItems
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
              {currentStep === 2 ? 'Next' : 'Next'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;