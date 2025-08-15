import React from "react";
import Footer from "../../components/footer";
import {useProducts} from '../../lib/hooks/useProduct'
import {Link} from 'react-router-dom'

export default function ProductPage() {
  const { data, isLoading, isError } = useProducts();
  const products = data?.products || [];

  if(isLoading) return <div>Loading....</div>

  return (
    <div className="min-h-screen px-30 bg-gray-50">
      <section className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">Hot Selling</h2>
        <hr className="border-t border-zinc-200 my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-8">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="bg-blue-500 rounded-3xl p-6 text-white flex flex-col items-center shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="w-full h-80 mb-4">
                <Link to={`/products/${product._id}`} >
                <img
                  src={product.images[0] || '/dummy.jpg'}
                  alt={product.name}
                  className="rounded-2xl object-cover w-full h-full"
                  />
                  </Link>
              </div>
              <span className="text-sm bg-white text-zinc-800 font-semibold px-3 py-1 rounded-full mb-3">
                {product.discount}
              </span>
              <h3 className="font-bold text-xl whitespace-nowrap text-center mb-2">
                {product.name}
              </h3>
              <p className="text-sm opacity-90 text-center mb-4">
                Details space here
              </p>
              <Link to={`/products/${product._id}`}><button className="bg-white text-blue-500 px-6 py-2 rounded-full mb-2 font-semibold hover:bg-gray-100 transition-colors">
                Buy Now
              </button></Link>
              <p className="font-semibold text-lg">${product.price.perUnit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-4">All Products</h2>
        <hr className="border-t border-zinc-200 my-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl p-4 flex flex-col items-center shadow"
            >
              <Link to={`/products/${product._id}`}><div className="w-fit h-fit mb-2">
                <img src="/dummy.jpg" alt={product.name} className="w-full h-full object-contain" />
              </div></Link>
              <h3 className="font-bold text-lg text-center">{product.name}</h3>
              <p className="text-sm opacity-60 mb-2">Details space here</p>
              <Link to={`/products/${product._id}`}><button className="bg-blue-500 text-white px-4 py-2 rounded-full mb-1">
                Buy Now
              </button></Link>
              <p className="font-semibold">${product.price.perUnit}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
