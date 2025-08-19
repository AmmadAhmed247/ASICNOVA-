import React, { useState, useEffect } from 'react';
import { Check, ShoppingCart, FileText, CreditCard, Send, CheckCircle } from 'lucide-react';
import { useCart } from '../../lib/hooks/useCart';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { BillingSchema } from '../../lib/schemas/schema';


const Cart = () => {

  const { data: cart = [], isLoading } = useCart()

  const cartItems = cart

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedItems, setSelectedItems] = useState([])


  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: zodResolver(BillingSchema),
    defaultValues: {
      billingAddress: '',
      shippingAddress: '',
      items: []
    }
  })





  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const steps = [
    { id: 0, name: 'Shopping Cart', icon: ShoppingCart },
    { id: 1, name: 'Order Info', icon: FileText },
    { id: 2, name: 'Pay Order', icon: CreditCard },
    { id: 3, name: 'Submit Order', icon: Send },
    { id: 4, name: 'Complete Order', icon: CheckCircle }
  ];

  const toggleItemSelection = (id) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    )
  }


  const calculateTotal = () => {
    return cartItems
      .filter(item => selectedItems.includes(item.id))
      .reduce((total, item) => total + (item?.product?.price?.perUnit * item.quantity), 0)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const onFormSubmit = (data) => {
    console.log("Order Data:", data);
    nextStep();
  };


  useEffect(() => {
    const items = cartItems
      .filter(item => selectedItems.includes(item.id))
      .map(item => ({
        name: item.product.name,
        price: item.product.price?.perUnit || 0,
        totalPrice: (item.product.price?.perUnit || 0) * item.quantity,
        weight: item.product.specifications?.HardwareConfiguration?.NetWeight || "N/A",
        quantity: item.quantity
      }));

    setValue("items", items);
  }, [selectedItems, cartItems, setValue])



  const onError = (errors) => {
    console.log("Validation Errors:", errors);
  }

    if (isLoading) return <div>Loading...</div>



  const ProgressBar = () => (
    <div className="flex items-center justify-between mb-8 px-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div key={step.id} className="flex flex-col items-center relative flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${index <= currentStep
              ? 'bg-blue-500 text-white'
              : 'bg-gray-300 text-gray-600'
              }`}>
              {index < currentStep ? (
                <Check size={16} />
              ) : (
                <Icon size={16} />
              )}
            </div>
            <span className={`text-xs text-center ${index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'
              }`}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`absolute top-4 left-1/2 w-full h-0.5 -z-10 ${index < currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`} />
            )}
          </div>
        );
      })}
    </div>
  );

  const ShoppingCartStep = () => (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">Cart List</h2>
        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center p-4 border rounded-lg">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItemSelection(item.id)}
                className="mr-4 w-4 h-4 text-blue-600"
              />
              <div className="w-20 h-20 bg-gray-200 rounded mr-4 flex-shrink-0">
                <img src={item?.product?.images[0]} alt={item?.product?.name} className="w-full h-full object-cover rounded" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item?.product?.name}</h3>
              </div>
              <div className="text-right mr-8">
                <div className="text-sm text-gray-600">Price</div>
                <div className="font-medium">${item?.product?.price?.perUnit}</div>
              </div>
              <div className="text-right mr-8">
                <div className="text-sm text-gray-600">Weight</div>
                <div className="font-medium">{item?.product?.specifications?.HardwareConfiguration?.NetWeight || "N/A"} kg</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Total Price</div>
                <div className="font-medium">${(item?.product.price?.perUnit * item.quantity)}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Checkout</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Product Price:</span>
                <span>${calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Cost:</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Coupon:</span>
                <span>-$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>-$0.00</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total Amount:</span>
                <span>${calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const OrderInfoStep = () => (
    <form id="orderInfoForm" onSubmit={handleSubmit(onFormSubmit, onError)}>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-6">Order Information</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">Billing Address</h3>
            <textarea
              className="w-full p-3 border rounded-lg resize-none"
              rows="4"
              placeholder="Enter billing address..."
              {...register('billingAddress')}
            />
            {errors.billingAddress && (<p className='text-xs text-red-600'>{errors.billingAddress.message}</p>)}
          </div>
          <div>
            <h3 className="font-medium mb-3">Shipping Address</h3>
            <textarea
              className="w-full p-3 border rounded-lg resize-none"
              rows="4"
              placeholder="Enter shipping address..."
              {...register('shippingAddress')}
            />
            {errors.shippingAddress && (<p className='text-xs text-red-600'>{errors.shippingAddress.message}</p>)}
          </div>
          <div>
            <h3 className="font-medium mb-3">Shipping List</h3>
            {cartItems.map((item) => (
              <div className="border rounded-lg p-4">
                <div className="flex items-center p-3 border rounded">
                  <div className="w-16 h-16 bg-gray-200 rounded mr-4"></div>
                  <div className="flex-1">
                    <div className="font-medium">{item?.product?.name || 'N/A'}</div>
                  </div>
                  <div className="text-right mr-6">
                    <div className="text-sm text-gray-600">Price</div>
                    <div>${item?.product?.price?.perUnit || 0}</div>
                  </div>
                  <div className="text-right mr-6">
                    <div className="text-sm text-gray-600">Weight</div>
                    <div>{item?.product?.specifications?.HardwareConfiguration?.NetWeight || "N/A"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Total Price</div>
                    <div>${calculateTotal().toLocaleString()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );

  const PayOrderStep = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
      <div className="space-y-6">
        <div>
          <h3 className="font-medium mb-3">Online Payment</h3>
          <div className="flex space-x-4 mb-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={paymentInfo.method === 'card'}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value })}
                className="mr-2"
              />
              Credit Card
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={paymentInfo.method === 'paypal'}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, method: e.target.value })}
                className="mr-2"
              />
              PayPal
            </label>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">Payment Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                placeholder="1234 5678 9012 3456"
                value={paymentInfo.cardNumber}
                onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="MM/YY"
                  value={paymentInfo.expiryDate}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: e.target.value })}
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg"
                  placeholder="123"
                  value={paymentInfo.cvv}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SubmitOrderStep = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
      <div className="space-y-6">
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">Order Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Order ID:</span>
              <span className="font-mono">ORD-2024-001</span>
            </div>
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span>{cartItems.filter(item => item.selected).length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Amount:</span>
              <span className="font-semibold">${calculateTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
        <div className="border rounded-lg p-4">
          <h3 className="font-medium mb-3">QR Code</h3>
          <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center">
            <span className="text-xs text-gray-500">QR Code</span>
          </div>
        </div>
      </div>
    </div>
  );

  const CompleteOrderStep = () => (
    <div className="bg-white rounded-lg shadow-sm p-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      <h2 className="text-2xl font-semibold text-green-600 mb-2">Congratulations!</h2>
      <p className="text-gray-600 mb-6">Your order has been successfully placed.</p>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-sm space-y-1">
          <div>Order ID: <span className="font-mono">ORD-2024-001</span></div>
          <div>Total: <span className="font-semibold">${calculateTotal().toLocaleString()}</span></div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <ShoppingCartStep />;
      case 1:
        return <OrderInfoStep />;
      case 2:
        return <PayOrderStep />;
      case 3:
        return <SubmitOrderStep />;
      case 4:
        return <CompleteOrderStep />;
      default:
        return <ShoppingCartStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <ProgressBar />
        {renderCurrentStep()}

        {currentStep < 4 && (
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              type="button"
              disabled={currentStep === 0}
              className={`px-6 py-2 rounded-lg ${currentStep === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
            >
              Previous
            </button>

            {currentStep === 1 ? (
              <button
                type="submit"
                form="orderInfoForm"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={nextStep}
                type="button"
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {currentStep === 3 ? 'Complete Order' : 'Next'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;