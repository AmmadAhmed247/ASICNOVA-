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
  }, [[customerReviews]]);

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
              <div className='bg-gray-100 p-4 h-fit w-full mb-2 rounded-md ' >
                <ul className=''>
                  <li className='flex flex-col mb-10 justify-center  gap-2'>
                    <div className='flex items-center gap-2'>
                      <User size={16} />
                      <span className='font-bold'>{review.name}</span>

                    </div>
                    <div className='font-semibold  '>
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
      <section className="bg-gradient-to-br from-blue-500 to-blue-600 mx-4 my-8 rounded-3xl overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 py-15">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg- rounded-2xl flex items-center justify-center p-4  ">
              <div className="relative w-full h-80 rounded-2xl overflow-hidden border-8 border-white  shadow-lg">
                <img
                  src={data?.images?.[0] ? `/${data.images[0].replace(/\\/g, '/')}` : '/dummy.jpg'}
                  alt={data?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "/dummy.jpg"; }}
                />

              </div>

            </div>

            <div className="text-white space-y-6">
              <h1 className="text-5xl font-bold leading-tight">{data?.name}</h1>
              <p className="text-xl font-semibold opacity-90">
                Functions: <span className="font-semibold">{data?.functionType}</span>
              </p>
              <p className="text-xl font-semibold opacity-90">
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
              <p className="text-xl font-semibold opacity-90">
                Price: <span className="font-semibold"> ${data?.price?.perGram}/gm | ${data?.price?.perUnit}/Unit </span>
              </p>
              <p className="text-xl font-semibold opacity-90">
                Payment Methods: <span className="font-semibold">{data?.paymentMethod ? JSON.parse(data.paymentMethod).join(" | ") : "N/A"}</span>
              </p>
              <div className="flex flex-col">

                <button
                  onClick={async () => {
                    if(!currentUser){
                      navigate('/login')
                      return;
                    }

                    await useAddToCartMutation.mutateAsync({
                      productId: id,
                      quantity
                    })
                    console.log("Sending to backend:", { productId: id, quantity });

                    navigate('/mycart')
                  }}
                  className='bg-orange-500 w-fit mb-4 font-semibold hover:bg-orange-600 transition-all active:scale-105 cursor-pointer px-4 py-2 rounded-2xl'
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
      </footer>   
      </div>
  );
}