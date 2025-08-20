import React, { useState, useEffect } from 'react';
import Footer from '../../components/footer';
import { useProductById } from '../../lib/hooks/useProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { User, Plus, Minus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reviewSchema } from '../../lib/schemas/schema';
import { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext'
import { Link } from 'react-router-dom';
import { usePostReview } from '../../lib/hooks/useReview';
import { useAddToCart } from '../../lib/hooks/useCart';
import { ShoppingCart, Clock, DollarSign, ArrowDown, Shield, CheckCircle, TrendingUp, Zap, ChevronLeft, ChevronRight } from 'lucide-react';

export default function SinglePage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useProductById(id);
  const { User: currentUser } = useContext(AuthContext)
  const postReviewMutation = usePostReview()

  const useAddToCartMutation = useAddToCart()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(reviewSchema)
  })

  const navigate = useNavigate()

  const specifications = data?.specifications || {};
  const ProductGlance = specifications?.ProductGlance || {};
  const hardware = specifications?.HardwareConfiguration || {};
  const environment = specifications?.EnvironmentRequirements || {};
  const customerReviews = data?.customerReviews || [];
  const [activeTab, setActiveTab] = useState('performance');
  const [quantity, setQuantity] = useState(1);
  const [newReview, setNewReview] = useState('');
  const [customerReviewsState, setCustomerReviewsState] = useState(customerReviews);

  useEffect(() => {
    setCustomerReviewsState(customerReviews);
  }, [customerReviews]);

  const handlePostReview = (formData) => {
    if (!currentUser?.fullName?.trim() || !formData.review?.trim()) return;
    const reviewObj = {
      name: currentUser.fullName,
      review: formData.review,
    };
    setCustomerReviewsState(prev => [reviewObj, ...prev])
    postReviewMutation.mutate({ id, review: reviewObj })
    reset();
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  const tabs = [
    { id: 'performance', label: 'Performance Curve' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'purchasing', label: 'Purchasing Guidelines' },
    { id: 'warranty', label: 'Warranty' },
    { id: 'reviews', label: 'Customer Reviews' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'performance':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Performance Curves</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div>1. Hashrate vs. Wall coolant temperature</div>
                <div>2. Power Efficiency vs. Wall coolant temperature</div>
                <div className="text-xs">
                  (*) All thermal tests and power efficiency values are typical. Actual hashrate may vary ±5%, power efficiency ±5%.
                </div>
              </div>
            </div>
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-semibold">Product Glance</h3>
              </div>
              <div className="divide-y">
                {Object.entries(ProductGlance)
                  .filter(([key]) => key !== 'PowerSupply')
                  .map(([key, value], index) => (
                    <div key={index} className={`px-4 py-3 grid grid-cols-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="font-medium text-gray-700">{formatKey(key)}</div>
                      <div className="text-gray-900">{renderValue(value)}</div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-semibold">Hardware Configuration</h3>
              </div>
              <div className="divide-y">
                {Object.entries(hardware || {}).map(([key, value], index) => (
                  <div key={index} className={`px-4 py-3 grid grid-cols-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="font-medium text-gray-700">{formatKey(key)}</div>
                    <div className="text-gray-900">{renderValue(value)}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b">
                <h3 className="font-semibold">Environment Requirements</h3>
              </div>
              <div className="divide-y">
                {Object.entries(environment).map(([key, value], index) => (
                  <div key={index} className={`px-4 py-3 grid grid-cols-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="font-medium text-gray-700">{formatKey(key)}</div>
                    <div className="text-gray-900">{renderValue(value)}</div>
                  </div>
                ))}
              </div>
            </div>


            {ProductGlance.PowerSupply && Object.keys(ProductGlance.PowerSupply).length > 0 && (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b">
                  <h3 className="font-semibold">Power Supply</h3>
                </div>
                <div className="divide-y">
                  {Object.entries(ProductGlance.PowerSupply).map(([key, value], index) => (
                    <div key={key} className={`px-4 py-3 grid grid-cols-2 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <div className="font-medium text-gray-700">{formatKey(key)}</div>
                      <div className="text-gray-900">{renderValue(value)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'purchasing':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Purchasing Guidelines</h3>
            <div className="space-y-3 text-sm text-gray-600">
              {data?.purchasingGuidelines.map((item) => (<div>{item ?? ""}</div>))}

            </div>
          </div>
        );

      case 'warranty':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Warranty</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>1. 365-day warranty from shipping date. BYTMAIN covers shipping for replacements within warranty.</div>
              <div>2. Covers only manufacturing defects. Manual opening voids warranty.</div>
              <div>3. Incorrect usage may incur fees.</div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className='bg-white p-6 rounded-lg shadow-sm '>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
            </div>

            {customerReviewsState.map((review, id) => (
              <div>
                <ul className=''>
                  <li className='flex flex-col mb-10 justify-center  gap-2'>
                    <div className='flex items-center gap-2'>
                      <User size={16} />
                      <span className='font-bold'>{review.name}</span>

                    </div>
                    <div className='font-semibold'>
                      <span>{review.review}</span>
                    </div>
                  </li>
                </ul>
              </div>
            ))}

            {currentUser ? (
              <>
                <div className="mt-4">
                  <form onSubmit={handleSubmit(handlePostReview)}>
                    <textarea
                      className="w-full border rounded p-2 "
                      placeholder="Write your review..."
                      {...register('review')}
                    />
                    {errors.review && (<p className='text-xs text-red-600'>{errors.review.message}</p>)}
                    <div>
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={handlePostReview}
                        type='submit'
                      >
                        Post Review
                      </button>

                    </div>
                  </form>
                </div>

              </>
            ) : null}

          </div>
        );

      default:
        return null;
    }
  };

  function renderValue(value) {
    if (value == null) return '';
    if (typeof value === 'object') {
      if (Array.isArray(value)) return value.join(', ');
      if ('min' in value && 'max' in value) return `${value.min}-${value.max}`;
      return JSON.stringify(value);
    }
    return value;
  }

  function formatKey(key) {
    const withSpaces = key.replace(/([a-z])([A-Z])/g, '$1 $2');
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
  }

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Error loading product.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Product Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-400 mx-4 my-8 rounded-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-15">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg- rounded-2xl flex items-center justify-center p-4 shadow-lg ">
              <div className="relative w-full h-80 rounded-2xl overflow-hidden border-12 border-white/90 shadow-lg">
  <img
    src={data?.images?.[0] ? `http://localhost:3000/${data.images[0].replace(/\\/g, '/')}` : '/dummy.jpg'}
    alt={data?.name}
    className="w-full h-full object-cover"
    onError={(e) => { e.target.src = "/dummy.jpg"; }}
  />
 
</div>

            </div>

            <div className="text-white space-y-6">
              <h1 className="text-5xl font-bold leading-tight">{data?.name}</h1>
              <p className="text-xl opacity-90">
                Functions: <span className="font-semibold">{data?.functionType}</span>
              </p>
              <p className="text-xl opacity-90">
                Specification: <span className="font-semibold">
                  {typeof ProductGlance?.inputVoltage === 'object'
                    ? `${ProductGlance.inputVoltage.min}-${ProductGlance.inputVoltage.max} V`
                    : ProductGlance?.inputVoltage}
                  {" | "}
                  {typeof ProductGlance?.inputFrequency === 'object'
                    ? `${ProductGlance.inputFrequency.min}-${ProductGlance.inputFrequency.max} Hz`
                    : ProductGlance?.inputFrequency}
                </span>
              </p>
              <p className="text-xl opacity-90">
                Price: <span className="font-semibold"> ${data?.price?.perGram}/G | ${data?.price?.perUnit}/U </span>
              </p>
              <p className="text-xl opacity-90">
                Payment Methods: <span className="font-semibold">{data?.paymentMethod?.join(' | ')}</span>
              </p>
              <div className="flex flex-col">
                <button
                  onClick={async () => {
                    await useAddToCartMutation.mutateAsync({
                      productId: id,
                      quantity
                    })
                    navigate('/cart')
                  }}
                  className='bg-orange-500 w-fit hover:bg-orange-600 transition-all active:scale-105 cursor-pointer px-4 py-2 rounded-2xl'
                >
                  Buy Now
                </button>


                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium">Quantity:</span>
                  <div className="flex items-center bg-white rounded-lg overflow-hidden">
                    <button
                      onClick={decreaseQuantity}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 py-2 text-gray-900 font-medium min-w-[50px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-6">{renderTabContent()}</div>
      </section>
      <footer className="text-white mt-60 py-12">
        <div className="container mx-auto px-6">
          <div className="md:col-span-4">
            <div className="flex justify-center items-center space-x-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1DA1F2">

                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.07 9.07 0 01-2.88 1.1A4.52 4.52 0 0016.88 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03A12.83 12.83 0 013 1.16a4.49 4.49 0 001.4 6.03A4.5 4.5 0 012 6.9v.05c0 2.22 1.57 4.07 3.65 4.49a4.52 4.52 0 01-2.04.08 4.52 4.52 0 004.21 3.14A9.05 9.05 0 012 19.54 12.77 12.77 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.36 8.36 0 0023 3z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1DA1F2">
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.61 4.74-2.61 5.07 0 6 3.33 6 7.66V24h-5v-6.98c0-1.66-.03-3.8-2.32-3.8-2.32 0-2.68 1.82-2.68 3.7V24h-5V8z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1DA1F2">
                <path d="M22.676 0H1.324C.593 0 0 .593 0 1.324v21.352C0 23.407.593 24 1.324 24h11.495v-9.294H9.691v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.676V1.324C24 .593 23.407 0 22.676 0z" />
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="#1DA1F2">
                <path d="M12 2.16c3.2 0 3.584.012 4.85.07 1.17.055 1.96.24 2.42.403a4.92 4.92 0 011.78 1.036 4.92 4.92 0 011.036 1.78c.164.46.348 1.25.403 2.42.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.055 1.17-.24 1.96-.403 2.42a4.923 4.923 0 01-1.036 1.78 4.923 4.923 0 01-1.78 1.036c-.46.164-1.25.348-2.42.403-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.055-1.96-.24-2.42-.403a4.923 4.923 0 01-1.78-1.036 4.923 4.923 0 01-1.036-1.78c-.164-.46-.348-1.25-.403-2.42C2.172 15.584 2.16 15.2 2.16 12s.012-3.584.07-4.85c.055-1.17.24-1.96.403-2.42a4.92 4.92 0 011.036-1.78A4.92 4.92 0 015.37 2.63c.46-.164 1.25-.348 2.42-.403C8.416 2.172 8.8 2.16 12 2.16zm0-2.16C8.737 0 8.332.013 7.052.072 5.77.131 4.77.33 4 .63a6.877 6.877 0 00-2.5 1.636A6.877 6.877 0 00.63 4c-.3.77-.499 1.77-.558 3.052C.013 8.332 0 8.737 0 12c0 3.263.013 3.668.072 4.948.059 1.282.258 2.282.558 3.052a6.878 6.878 0 001.636 2.5 6.878 6.878 0 002.5 1.636c.77.3 1.77.499 3.052.558 1.28.059 1.685.072 4.948.072s3.668-.013 4.948-.072c1.282-.059 2.282-.258 3.052-.558a6.877 6.877 0 002.5-1.636 6.877 6.877 0 001.636-2.5c.3-.77.499-1.77.558-3.052.059-1.28.072-1.685.072-4.948s-.013-3.668-.072-4.948c-.059-1.282-.258-2.282-.558-3.052a6.878 6.878 0 00-1.636-2.5 6.878 6.878 0 00-2.5-1.636c-.77-.3-1.77-.499-3.052-.558C15.668.013 15.263 0 12 0z" />
                <path d="M12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zM18.406 4.594a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </div>
          </div>
          <div className="text-center pt-8">
            <div className="flex items-center justify-center space-x-2 text-blue-400 font-bold text-xl mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span>ASICNOVA</span>
            </div>
            <p className="text-gray-400">© All Rights Reserved</p>
          </div>
        </div>
      </footer>    </div>
  );
}