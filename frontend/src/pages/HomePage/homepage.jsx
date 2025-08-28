import React, { useState, useEffect, useContext } from 'react';
import { ShoppingCart, Clock, DollarSign, ArrowDown, Shield, CheckCircle, TrendingUp, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import { useProducts } from '../../lib/hooks/useProduct';
import { useNavigate } from 'react-router-dom';
import { useAddToCart } from '../../lib/hooks/useCart';
import { AuthContext } from '../../Context/AuthContext'
import toast from 'react-hot-toast'

const MiningWebsite = () => {
  const [animateCards, setAnimateCards] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data, isLoading, isError } = useProducts()
  const products = data?.products || [];

  const { User: currentUser } = useContext(AuthContext)
  console.log(currentUser)

  const useAddToCartMutation = useAddToCart()
  const navigate = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Always Here, Anytime You Need Us",
      color: "from-blue-400 to-blue-500"
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Powerful Mining. Unbeatable and reasonable Prices.",
      color: "from-blue-400 to-blue-500"
    },
    {
      icon: <ArrowDown className="w-12 h-12" />,
      title: "Pay with Crypto. Mine with Crypto.",
      color: "from-blue-400 to-blue-500"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Verified & Transparent Operations",
      color: "from-blue-400 to-blue-500"
    }
  ];

  const popularProducts = [
    {
      name: "Bitcoin Miner S23 HYD",
      function: "BTC/BCH/BSV SHA 256",
      specs: "560T | 5510W | 9.5J/T",
      price: "30 $/T | 17,400$/Unit",
      image: "/dummy.jpg"
    },
    {
      name: "Antminer S21 Pro",
      function: "BTC/BCH/BSV SHA 256",
      specs: "234T | 3510W | 15J/T",
      price: "45 $/T | 25,600$/Unit",
      image: "/dummy.jpg"
    },
    {
      name: "WhatsMiner M50S",
      function: "BTC/BCH/BSV SHA 256",
      specs: "126T | 3276W | 26J/T",
      price: "28 $/T | 15,800$/Unit",
      image: "/dummy.jpg"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % popularProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + popularProducts.length) % popularProducts.length);
  };

  const popularProduct = popularProducts[currentSlide];

  return (
    <div className="min-h-screen bg-white">

      <div className="relative bg-gradient-to-b from-blue-50 to-white py-20 border-b border-blue-100 overflow-hidden">
        {/* Subtle decorative shapes */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl animate-pulse"></div>

        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-400 rounded-full opacity-15 blur-2xl animate-pulse"></div>
        <div className="absolute   w-64 h-64 bg-blue-300 rounded-full opacity-15 blur-2xl animate-pulse"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Hero Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-800 leading-tight">
            Mine Smarter.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 bg-blue-600">
              Earn Faster.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto leading-relaxed">
            Unlock the power of <span className="font-semibold text-blue-600">high-performance Bitcoin mining</span> with secure, scalable, and energy-efficient solutions.
          </p>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
            Start mining today with our advanced products — <span className="text-blue-600 font-medium">no technical skills required</span>.
          </p>

          {/* Call-to-action Buttons */}
          <div className="flex justify-center gap-6 mt-6">
            <a href="/products" className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition transform hover:scale-105">
              Explore Products
            </a>

          </div>
        </div>
      </div>


      <div className="container mx-auto px-6 py-16 bg-white">
        <div className="grid md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product, index) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl shadow-xl border border-zinc-200 overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-2xl hover:border-blue-200 ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >

              <div className="p-10 bg-white h-64 relative flex items-center justify-center ">
                {/* White border wrapper */}
                <div className="w-full aspect-square bg-white rounded-md flex items-center justify-center overflow-hidden p-5">
                  <Link to={`/products/${product._id}`} className="w-full h-full flex items-center justify-center">
                    <img
                      src={product.images?.[0] ? `/${product.images[0].replace(/\\/g, '/')}` : '/dummy.jpg'}
                      alt={product.name}
                      className="object-contain max-w-full max-h-full"
                      onError={(e) => { e.currentTarget.src = "/dummy.jpg"; }}
                    />
                  </Link>
                </div>



                {/* Hidden effect div (optional) */}
                <div className="w-32 h-32 bg-white/20 rounded-xl mx-auto mb-4 items-center justify-center" style={{ display: 'none' }}>
                  <div className="w-20 h-20 bg-white/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>


              <div className="bg-gradient-to-br from-blue-500 mt-2 border-red-50 rounded-md via-blue-400 to-blue-500 text-white p-6">
                <h3 className="text-xl font-bold mb-2">{product?.name}</h3>
                <p className="text-sm opacity-90 mb-4">{product.hashrate}</p>
                <div className="flex justify-between items-center">
                  <Link to={`/products/${product._id}`} type='button' className="bg-white text-zinc-600 px-6 py-2 rounded-full font-semibold text-sm hover:bg-blue-50 transition-colors shadow-md">
                    Click for details
                  </Link>
                  <span className="font-bold text-lg">
                    ${product?.price?.perUnit ?? product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl">
            View All
          </Link>
        </div>
      </div>

      <div className="bg-blue-50 py-16 border-y border-blue-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
            <p className="text-gray-600 text-lg mb-2">Trusted by Thousands. Built for Everyone.</p>
            <p className="text-gray-500 max-w-3xl mx-auto">
              We make Bitcoin mining simple, profitable, and accessible — whether you're a beginner or a seasoned crypto investor.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className={`bg-gradient-to-br ${feature.color} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-white group-hover:shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300`}>
                  {feature.icon}
                </div>

                <h3 className="text-gray-800 font-semibold mb-2 text-lg leading-tight">{feature.title}</h3>

              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Most Popular <span className="text-blue-500">Mining Solutions</span>
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto">
              Explore our top-performing mining products handpicked by thousands of satisfied users. Whether you're new to mining or scaling up, these plans offer the best balance of performance, price, and profitability.
            </p>
          </div>

          <div className="relative bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl overflow-hidden shadow-2xl max-w-6xl mx-auto border border-blue-200">
            <button
              type='button'
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type='button'
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-0 items-center">
              <div className="p-8 md:p-12 text-white">
                <h3 className="text-3xl font-bold mb-6">{products[currentSlide]?.name}</h3>
                <div className="space-y-4">
                  <p className="text-lg"><strong>Function:</strong> {products[currentSlide]?.functionType || 'N/A'}</p>
                  <p className="text-lg"><strong>Specifications:</strong> {products[currentSlide]?.specs || 'N/A'}</p>
                  <p className="text-2xl font-bold"><strong>Price:</strong> ${products[currentSlide]?.price?.perUnit ?? products[currentSlide]?.price}</p>
                </div>
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={async () => {
                      const product = products[currentSlide];
                      if (!product) return;

                      try {
                        await useAddToCartMutation.mutateAsync({
                          productId: product._id,
                          quantity: 1
                        });
                        console.log("Added to cart:", product._id);
                      } catch (err) {
                        console.error("Add to cart failed:", err);
                      }
                      navigate(currentUser ? '/mycart' : '/login'); // now works
                    }}
                    className='bg-orange-500 w-fit mb-4 font-semibold hover:bg-orange-400 transition-all active:scale-105 cursor-pointer px-4 py-2 rounded-2xl'
                  >
                    Buy Now
                  </button>

                </div>
              </div>

              <div className="h-80 md:h-96 relative flex items-center justify-center p-8">
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white p-2 shadow-xl flex items-center justify-center">
                  <img
                    src={products[currentSlide]?.images?.[0]
                      ? `/${products[currentSlide].images[0].replace(/\\/g, '/')}`
                      : '/dummy.jpg'}
                    alt={products[currentSlide]?.name}
                    className="max-h-full max-w-full object-contain rounded-2xl"
                    onError={(e) => { e.target.src = "/dummy.jpg"; }}
                  />
                </div>

              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {products.slice(0, 3).map((_, index) => (
                <button
                  type='button'
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide ? 'bg-white scale-125 shadow-lg' : 'bg-white/50 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </div>


          <div className="text-center mt-12">
            <Link to="/products" className="bg-blue-500 hover:bg-blue-400 text-white px-8 py-3 rounded-full font-semibold transition-colors shadow-lg hover:shadow-xl">
              View All
            </Link>
          </div>
        </div>
      </div>
      <div className='mb-10'>
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
      {/* <Footer className={'bg-blue-50 border-t border-blue-100 rounded-md flex flex-col md:flex-row items-center justify-center py-16 md:gap-80 gap-10 px-4 md:px-10'} /> */}
    </div>
  );
};

export default MiningWebsite;