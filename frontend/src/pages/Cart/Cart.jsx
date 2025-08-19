import React, { useState, useEffect } from 'react';
import { Check, ShoppingCart, FileText, CreditCard, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { QRCodeCanvas } from 'qrcode.react';

// Separate countdown component to prevent input focus loss
const Countdown = ({ expiryTime }) => {
  const [timer, setTimer] = useState(Math.max(0, Math.floor((expiryTime - Date.now()) / 1000)));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTime]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, '0');
  const seconds = String(timer % 60).padStart(2, '0');

  return <div className="text-lg font-semibold">Time left: {minutes}:{seconds}</div>;
};

const Cart = ({ orderId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Bitcoin Miner S23 HYD', price: 17400, weight: 14.8, quantity: 1, image: '/dummy.jpg', selected: true },
    { id: 2, name: 'Bitcoin Miner S23 HYD', price: 17400, weight: 14.8, quantity: 1, image: '/dummy.jpg', selected: true },
    { id: 3, name: 'Bitcoin Miner S23 HYD', price: 17400, weight: 14.8, quantity: 1, image: '/dummy.jpg', selected: true }
  ]);

  const [orderInfo, setOrderInfo] = useState({ billingAddress: '', shippingAddress: '' });
  const [paymentInfo, setPaymentInfo] = useState({ method: 'card', cardNumber: '', expiryDate: '', cvv: '' });

  // Payment verification step states
  const [receiveAddress, setReceiveAddress] = useState('');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [txId, setTxId] = useState('');
  const [quoteExpiresAt, setQuoteExpiresAt] = useState(Date.now() + 10 * 60 * 1000); // default 10 min
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 0, name: 'Shopping Cart', icon: ShoppingCart },
    { id: 1, name: 'Order Info', icon: FileText },
    { id: 2, name: 'Pay Order', icon: CreditCard },
    { id: 3, name: 'Submit Order', icon: Send },
    { id: 4, name: 'Complete Order', icon: CheckCircle }
  ];

  const toggleItemSelection = id => {
    setCartItems(cartItems.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const calculateTotal = () => cartItems.filter(i => i.selected).reduce((total, i) => total + i.price * i.quantity, 0);

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  // Start crypto payment when Pay Order step opens
  useEffect(() => {
    const startPayment = async () => {
      if (currentStep === 2) {
        try {
          const res = await axios.post('http://localhost:3000/api/payments/start-timer', { orderId });
          const { receiveAddress, cryptoAmountLocked, quoteExpiresAt } = res.data;
          setReceiveAddress(receiveAddress);
          setCryptoAmount(cryptoAmountLocked);
          setQuoteExpiresAt(new Date(quoteExpiresAt).getTime());
        } catch (err) {
          console.error(err);
        }
      }
    };
    startPayment();
  }, [currentStep, orderId]);

  const handleVerifyPayment = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3000/api/payments/verify', { orderId, txId });
      setStatusMsg(res.data.message);
      if (res.data.success) nextStep(); // go to Submit Order
    } catch (err) {
      setStatusMsg(err.response?.data?.message || 'Error verifying payment');
    } finally {
      setLoading(false);
    }
  };

  // Step components
  const ProgressBar = () => (
    <div className="flex items-center justify-between mb-8 px-4">
      {steps.map((step, idx) => {
        const Icon = step.icon;
        return (
          <div key={step.id} className="flex flex-col items-center relative flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
              idx <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              {idx < currentStep ? <Check size={16}/> : <Icon size={16}/>}
            </div>
            <span className={`text-xs text-center ${idx <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              {step.name}
            </span>
            {idx < steps.length - 1 && (
              <div className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 ${idx < currentStep ? 'bg-blue-500' : 'bg-gray-300'}`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const ShoppingCartStep = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Cart List</h2>
      <div className="space-y-4 mb-8">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center p-4 border rounded-lg">
            <input type="checkbox" checked={item.selected} onChange={() => toggleItemSelection(item.id)} className="mr-4 w-4 h-4 text-blue-600"/>
            <div className="w-20 h-20 bg-gray-200 rounded mr-4 flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded"/>
            </div>
            <div className="flex-1"><h3 className="font-medium">{item.name}</h3></div>
            <div className="text-right mr-8">
              <div className="text-sm text-gray-600">Price</div>
              <div className="font-medium">${item.price.toLocaleString()}</div>
            </div>
            <div className="text-right mr-8">
              <div className="text-sm text-gray-600">Weight</div>
              <div className="font-medium">{item.weight} kg</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Price</div>
              <div className="font-medium">${(item.price * item.quantity).toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t pt-6">
        <div className="space-y-2 text-lg">
          <div className="flex justify-between"><span>Total Amount:</span><span>${calculateTotal().toLocaleString()}</span></div>
        </div>
      </div>
    </div>
  );

  const OrderInfoStep = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Order Information</h2>
      <div className="space-y-4">
        <textarea placeholder="Billing Address" value={orderInfo.billingAddress} onChange={e => setOrderInfo({...orderInfo, billingAddress: e.target.value})} className="w-full p-3 border rounded"/>
        <textarea placeholder="Shipping Address" value={orderInfo.shippingAddress} onChange={e => setOrderInfo({...orderInfo, shippingAddress: e.target.value})} className="w-full p-3 border rounded"/>
      </div>
    </div>
  );

  const PayOrderStep = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Pay Your Order</h2>
      <p className="mb-2">Send <strong>{cryptoAmount} { 'BTC'}</strong> to:dadadaaaaaaaaaaaaa</p>
       <QRCodeCanvas value={receiveAddress} size={180} />
      <p className="mb-2">Send <strong>{cryptoAmount} {'ETH' }</strong> to:dadadaaaaaaaaaaaaa</p>
       <QRCodeCanvas value={receiveAddress} size={180} />
      <p className="mb-4 font-mono break-all">{receiveAddress}</p>
      <Countdown expiryTime={quoteExpiresAt}/>
      <input type="text" placeholder="Enter Transaction ID" value={txId} onChange={e => setTxId(e.target.value)} className="w-full p-3 border rounded mb-2"/>
      <button onClick={handleVerifyPayment} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">Verify Payment</button>
      {statusMsg && <p className="mt-2 text-red-600">{statusMsg}</p>}
    </div>
  );

  const SubmitOrderStep = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Submit Order</h2>
      <div>Total: ${calculateTotal().toLocaleString()}</div>
    </div>
  );

  const CompleteOrderStep = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8 text-green-600"/>
      </div>
      <h2 className="text-2xl font-semibold text-green-600 mb-2">Order Completed!</h2>
      <p className="text-gray-600 mb-4">Your order has been successfully placed.</p>
      <div>Total: ${calculateTotal().toLocaleString()}</div>
    </div>
  );

  const renderCurrentStep = () => {
    switch(currentStep) {
      case 0: return <ShoppingCartStep />;
      case 1: return <OrderInfoStep />;
      case 2: return <PayOrderStep />;
      case 3: return <SubmitOrderStep />;
      case 4: return <CompleteOrderStep />;
      default: return <ShoppingCartStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <ProgressBar/>
        {renderCurrentStep()}

        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <button onClick={prevStep} disabled={currentStep===0} className={`px-6 py-2 rounded-lg ${currentStep===0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-500 text-white hover:bg-gray-600'}`}>Previous</button>
            <button onClick={nextStep} className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">{currentStep===3 ? 'Complete Order' : 'Next'}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
