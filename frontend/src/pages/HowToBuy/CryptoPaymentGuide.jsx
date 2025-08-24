import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Bitcoin, Wallet, Clock, CheckCircle, Copy, AlertTriangle } from 'lucide-react';
import Navbar from '../../components/Navbar';

const CryptoPaymentGuide = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const steps = [
    {
      id: 1,
      title: "Choose Your Product",
      description: "Select the ASIC miner you want to purchase",
      details: "Browse our collection of mining hardware and add your desired product to cart. Make sure to check specifications and availability.",
      time: "2 minutes"
    },
    {
      id: 2,
      title: "Select Cryptocurrency",
      description: "Choose between Bitcoin (BTC) or Ethereum (ETH) for payment",
      details: "We accept BTC and ETH payments. The price will be calculated based on current market rates and locked for 15 minutes.",
      time: "1 minute"
    },
    {
      id: 3,
      title: "Get Payment Address",
      description: "We'll generate a unique wallet address for your order",
      details: "After confirming your order, you'll receive a unique cryptocurrency address. This address is ONLY for your order - don't reuse it!",
      time: "Instant"
    },
    {
      id: 4,
      title: "Send Payment",
      description: "Transfer the exact amount to the provided address",
      details: "Send the EXACT amount shown from your wallet to our address. Don't send from exchanges - use a personal wallet where you control private keys.",
      time: "5-15 minutes"
    },
    {
      id: 5,
      title: "Submit Transaction ID",
      description: "Provide the transaction hash (TXID) for verification",
      details: "After sending payment, copy the transaction ID from your wallet and paste it in our verification form. This helps us confirm your payment faster.",
      time: "1 minute"
    },
    {
      id: 6,
      title: "Payment Confirmation",
      description: "We verify your payment and send order confirmation",
      details: "Our system automatically verifies your transaction on the blockchain. You'll receive an email confirmation once payment is verified.",
      time: "1-10 minutes"
    }
  ];

  const demoData = {
    orderId: "ORD-2024-12345",
    amount: selectedCoin === 'BTC' ? "0.00234567" : "0.45321",
    address: selectedCoin === 'BTC' ? "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" : "0x742d35Cc6534C0532925a3b8D9C9b8E4A0C1234A",
    timeLeft: "14:23"
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4">
      <div className='min-w-full'><Navbar/></div>
      <div className="max-w-4xl mt-5 mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 mb-8 text-center border border-gray-200 shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Bitcoin className="w-8 h-8 text-blue-500" />
            <h1 className="text-4xl font-bold text-blue-500">ASICNOVA</h1>
          </div>
          <h2 className="text-2xl text-gray-800 mb-2">Cryptocurrency Payment Guide</h2>
          <p className="text-gray-600 text-lg">Simple steps to buy ASIC miners with Bitcoin or Ethereum</p>
        </div>

        {/* Demo Payment Card */}
        <div className="bg-white rounded-2xl p-6 mb-8 border border-gray-200 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Live Payment Demo</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedCoin('BTC')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCoin === 'BTC' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bitcoin
              </button>
              <button
                onClick={() => setSelectedCoin('ETH')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCoin === 'ETH' 
                    ? 'bg-blue-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Ethereum
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-mono text-sm">{demoData.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Amount:</span>
                <span className="font-bold text-green-600">{demoData.amount} {selectedCoin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Remaining:</span>
                <span className="font-bold text-red-500">{demoData.timeLeft}</span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-600 text-sm mb-2">Payment Address:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={demoData.address}
                  readOnly
                  className="flex-1 p-3 border rounded-lg bg-gray-50 font-mono text-xs"
                />
                <button
                  onClick={() => copyToClipboard(demoData.address)}
                  className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              {copiedAddress && (
                <p className="text-green-600 text-sm mt-1">✅ Address copied!</p>
              )}
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {step.id}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {step.time}
                    </span>
                    {activeStep === step.id ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>
              
              {activeStep === step.id && (
                <div className="px-6 pb-6 pt-0 border-t border-gray-100">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">{step.details}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Important Notes */}
        <div className="bg-white rounded-2xl p-6 mt-8 border border-gray-200 shadow-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-blue-500 mt-1" />
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Important Notes:</h3>
              <ul className="space-y-2 text-gray-700">
                <li>Send the EXACT amount shown - any difference will delay processing</li>
                <li>Use a personal wallet, not exchange wallets (Coinbase, Binance, etc.)</li>
                <li>Payment window is 15 minutes - send payment before time expires</li>
                <li>Transaction ID (TXID) is required for verification</li>
                <li>Contact support if you need help: support@asicnova.com</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoPaymentGuide;