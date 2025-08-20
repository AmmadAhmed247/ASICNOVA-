import React, { useState, useEffect, useContext } from 'react';
import { ShoppingCart, Clock, DollarSign, ArrowDown, Shield, CheckCircle, TrendingUp, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import Footer from '../../components/footer';
import { Link } from 'react-router-dom';
import { useProducts } from '../../lib/hooks/useProduct';

const MiningWebsite = () => {
  const [animateCards, setAnimateCards] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data, isLoading, isError } = useProducts()
  const products = data?.products || [];
  console.log(products)

  useEffect(() => {
    const timer = setTimeout(() => setAnimateCards(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // const products = [
  //   {
  //     id: 1,
  //     name: "Anti Space HD 5",
  //     hashrate: "1 Set | 1400kW | 500 Stick Space",
  //     price: "Only 135,000$",
  //     gradient: "from-blue-400 via-blue-500 to-blue-600",
  //   },
  //   {
  //     id: 2,
  //     name: "Anti Space HW5",
  //     hashrate: "1 Set | 1500kW | 370 Stick Space",
  //     price: "Only 84,000$",
  //     gradient: "from-blue-400 via-blue-500 to-blue-600",
  //   },
  //   {
  //     id: 3,
  //     name: "Bitcoin Miner S19k Pro",
  //     hashrate: "160 T | 2.6kw | 23 J/T",
  //     price: "Only 305$",
  //     gradient: "from-blue-400 via-blue-500 to-blue-600",
  //   }
  // ];

  const features = [
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Always Here, Anytime You Need Us",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <DollarSign className="w-12 h-12" />,
      title: "Powerful Mining. Unbeatable and reasonable Prices.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <ArrowDown className="w-12 h-12" />,
      title: "Pay with Crypto. Mine with Crypto.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Verified & Transparent Operations",
      color: "from-blue-500 to-blue-600"
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
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-b from-gray-100 to-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
            Mine Smarter. <span className="text-blue-500 bg-gradient-to-b ">Earn Faster.</span>
          </h1>
          <p className="text-xl text-zinc-600 mb-4 max-w-3xl mx-auto">
            Unlock the power of high-performance Bitcoin mining with secure, scalable, and energy-efficient solutions.
          </p>
          <p className="text-zinc-500 mb-8">
            Start mining today with our advanced products — no technical skills required.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-700 hover:scale-105 hover:shadow-xl ${animateCards ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >

              <div className={`bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 h-64 relative overflow-hidden flex items-center justify-center`}>

                <div className="bg-white  w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-4 sm:p-6 md:p-8 lg:p-12 xl:p-20 mx-auto">
                  <img
                    src={product.images[0] || "/dummy.jpg"}
                    alt={product.name}
                    className="w-full h-auto aspect-square rounded-2xl object-cover"
                    onError={(e) => {
                      e.target.src = "/dummy.jpg";
                    }}
                  />
                </div>
                <div className="w-32 h-32 bg-white/20 rounded-xl mx-auto mb-4 items-center justify-center" style={{ display: 'none' }}>
                  <div className="w-20 h-20 bg-white/30 rounded-lg flex items-center justify-center">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/10"></div>
              </div>

              <div className={`bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white p-6`}>
                <h3 className="text-xl font-bold mb-2">{product?.name}</h3>
                <p className="text-sm opacity-90 mb-4">{product.hashrate}</p>
                <div className="flex justify-between items-center">
                  <button type='button' className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                  <span className="font-bold text-lg">
                    ${product?.price?.perUnit ?? product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            View All
          </Link>
        </div>
      </div>
      <div className="bg-white py-16">
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
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Most Popular <span className="text-blue-500">Mining Solutions</span>
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto">
              Explore our top-performing mining products handpicked by thousands of satisfied users. Whether you're new to mining or scaling up, these plans offer the best balance of performance, price, and profitability.
            </p>
          </div>

          <div className="relative bg-gradient-to-r from-blue-400 to-blue-500 rounded-3xl overflow-hidden shadow-xl max-w-6xl mx-auto">
            <button
              type='button'
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type='button'
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2 gap-0 items-center">
              <div className="p-8 md:p-12 text-white">
                <h3 className="text-3xl font-bold mb-6">{popularProduct.name}</h3>
                <div className="space-y-4">
                  <p className="text-lg"><strong>Function:</strong> {popularProduct.function}</p>
                  <p className="text-lg"><strong>Specifications:</strong> {popularProduct.specs}</p>
                  <p className="text-2xl font-bold"><strong>Price:</strong> {popularProduct.price}</p>
                </div>
                <div className="flex gap-4 mt-8">
                  <button type='button' className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                    Shop Now
                  </button>
                  <button type='button' className="border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>

              <div className="h-80 md:h-96 relative flex items-center justify-center p-8">
                <img

                  key={currentSlide}
                  src={popularProduct.image}
                  alt={popularProduct.name}
                  className="w-fit h-fit object-cover rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-white/20 rounded-2xl items-center justify-center" style={{ display: 'none' }}>
                  <div className="w-32 h-32 bg-white/30 rounded-xl flex items-center justify-center">
                    <Zap className="w-16 h-16 text-white" />
                  </div>
                </div>
              </div>
            </div>


            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {popularProducts.map((_, index) => (
                <button
                  type='button'
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/products" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              View All
            </Link>
          </div>
        </div>
      </div>
      <Footer className={'bg-white rounded-md  flex flex-col md:flex-row items-center justify-center py-16 md:gap-80 gap-10 px-4 md:px-10'} />
    </div>
  );
};

export default MiningWebsite;