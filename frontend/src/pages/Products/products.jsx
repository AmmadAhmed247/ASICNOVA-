import React from "react";
import Footer from "../../components/footer";
import { Link } from "react-router-dom";
const products = [
  { id: 1, name: "Bitcoin Miner H23 HYD", price: "17,400$", discount: "10% off" },
  { id: 2, name: "Bitcoin Miner S21 Pro", price: "17,400$", discount: "10% off" },
  { id: 3, name: "ETC Miner E11", price: "17,400$", discount: "5% off" },
  { id: 4, name: "Bitcoin Miner H23 HYD", price: "17,400$", discount: "10% off" },
  { id: 5, name: "Bitcoin Miner S21 Pro", price: "17,400$", discount: "10% off" },
  { id: 6, name: "ETC Miner E11", price: "17,400$", discount: "5% off" },
  { id: 6, name: "ETC Miner E11", price: "17,400$", discount: "5% off" },
  { id: 6, name: "ETC Miner E11", price: "17,400$", discount: "5% off" },
  { id: 6, name: "ETC Miner E11", price: "17,400$", discount: "5% off" },
  { id: 6, name: "ETC Miner E11", price: "17,400$", discount: "5% off" },
  { id: 6, name: "ETC Miner E11", price: "17,400$", discount: "5% off" },
  { id: 6, name: "ETC Miner E11", price: "17,400$", discount: "5% off" },
  { id: 6, name: "ETC Miner E11", price: "17,400$", discount: "5% off" },
  { id: 6, name: "ETC Miner E11", price: "17,400$", discount: "5% off" },
  { id: 6, name: "ETC Miner E11", price: "17,400$", discount: "5% off" },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen px-30 bg-gray-50">

      <section className="px-6 py-8">
        <h2 className="text-2xl  font-semibold mb-4">Hot Selling</h2>
        <hr className="border-t border-zinc-200 my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-1  md:grid-cols-1 xl:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="bg-blue-500 rounded-3xl p-6 text-white flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="w-full h-80 mb-4">
                <Link to="/products/:id" >
                <img
                  src="/dummy.jpg"
                  alt={product.name}
                  className="rounded-2xl object-cover w-full h-full"
                  />
                  </Link>
              </div>
              <span className="text-sm bg-white text-zinc-800 font-semibold px-3 py-1 rounded-full mb-3">
                {product.discount}
              </span>
              <h3 className="font-bold text-xl whitespace-nowrap text-center mb-2">{product.name}</h3>
              <p className="text-sm opacity-90 text-center mb-4">Details space here</p>
              <button className="bg-white text-blue-500 px-6 py-2 rounded-full mb-2 font-semibold hover:bg-gray-100 transition-colors">
                Buy Now
              </button>
              <p className="font-semibold text-lg">Only {product.price}</p>
            </div>
          ))}
        </div>

      </section>


      <section className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>
        <hr className="border-t border-zinc-200 my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl p-4 flex flex-col items-center shadow">
              <div className="w-fit h-fit mb-2">
                <Link to="/products/:id" >
                <img src="/dummy.jpg" alt={product.name} className="w-full h-full object-contain" />
                </Link>
              </div>
              <h3 className="font-bold text-lg text-center">{product.name}</h3>
              <p className="text-sm opacity-60 mb-2">Details space here</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-full mb-1">Buy Now</button>
              <p className="font-semibold">Only {product.price}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
