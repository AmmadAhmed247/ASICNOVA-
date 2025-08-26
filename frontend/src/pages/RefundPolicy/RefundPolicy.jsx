import React from 'react'

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 text-white py-16 md:py-24 px-4 md:px-8 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-1/2 -right-1/5 w-64 md:w-96 h-64 md:h-96 rounded-full bg-white bg-opacity-10"></div>
        <div className="absolute -bottom-1/3 right-1/10 w-48 md:w-64 h-48 md:h-64 rounded-full bg-white bg-opacity-5"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Refund Policy</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            At AsicNova, we are committed to delivering high-performance cryptocurrency mining hardware with transparency and efficiency.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Main Policy Statement */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              ❗ No Refund Policy
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                At <strong>AsicNova</strong>, we are committed to delivering high-performance cryptocurrency mining hardware with transparency and efficiency. Due to the nature of our products and payment method (cryptocurrency), all sales are considered <strong>final</strong>.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                <strong>All purchases made through AsicNova are non-refundable</strong>, except in rare cases where explicitly approved by our support team. Please read the following carefully:
              </p>
            </div>
          </div>

          {/* Eligible Situations Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              🔁 Eligible Situations for Refund (Case-by-Case Only)
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                We may consider a refund or exchange <strong>only under the following rare conditions</strong>:
              </p>
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg mb-4 md:mb-6">
                <li>You placed an order but did not complete the cryptocurrency payment.</li>
                <li>The product you received is <strong>defective on arrival</strong> (DOA) and reported within <strong>48 hours</strong> of delivery.</li>
                <li>The product was <strong>never shipped</strong> due to unavailability or a pricing error, and payment was completed.</li>
              </ul>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                <strong>Note:</strong> All refund approvals are at the sole discretion of AsicNova.
              </p>
            </div>
          </div>

          {/* Crypto Price Volatility Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              📉 Crypto Price Volatility
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                All product prices are listed in <strong>USD</strong>, but payments are made in cryptocurrency. Due to market volatility:
              </p>
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li><strong>We do not issue refunds based on crypto price changes</strong> after your payment is submitted.</li>
                <li>If a refund is approved, it will be processed in <strong>crypto</strong> at the <strong>current market exchange rate</strong> at the time of refund processing — not the original payment amount.</li>
              </ul>
            </div>
          </div>

          {/* Refunds Not Allowed Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              ⚠️ Refunds Are Not Allowed If:
            </h2>
            <div className="pl-4 md:pl-6">
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li>The product was successfully delivered and is fully functional.</li>
                <li>You changed your mind after completing the crypto payment.</li>
                <li>You failed to provide the correct wallet transaction details.</li>
                <li>You refused to pay customs/import duties in your country.</li>
                <li>The delay in delivery was caused by customs or courier services.</li>
              </ul>
            </div>
          </div>

          {/* Return Policy Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              🛠️ Return Policy
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                Due to the nature of mining hardware, <strong>we do not accept returns</strong> under normal circumstances. All sales are <strong>final</strong> once payment is confirmed and the product is shipped.
              </p>
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                Exceptions may apply if the product is proven <strong>defective upon delivery</strong> and confirmed by our technical team. If a return is approved:
              </p>
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li>The buyer will bear the return shipping costs.</li>
                <li>The returned unit must be in its original packaging, unused, and undamaged.</li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              📩 Requesting Support or Refund Review
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                If you believe you are eligible for a refund or support request, please email:
              </p>
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg mb-6 md:mb-8">
                <li><strong>contact@asicnova.com</strong> (General inquiries)</li>
                <li><strong>sales@asicnova.com</strong> (Order-related support)</li>
              </ul>
              <p className="text-gray-600 mb-3 md:mb-4 text-base md:text-lg leading-relaxed font-medium">Include:</p>
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li>Your <strong>Order ID</strong></li>
                <li>Wallet <strong>Transaction Hash</strong></li>
                <li>Description of the issue</li>
                <li>Photos or videos (if applicable)</li>
              </ul>
            </div>
          </div>

          {/* Final Note Section */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              📝 Final Note
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                We value transparency and strive to maintain competitive prices by minimizing overhead and avoiding costly exchange integrations. Please review all product information carefully before making a payment.
              </p>
              <p className="text-gray-800 font-semibold text-base md:text-lg leading-relaxed">
                <strong>By completing a purchase on our website, you agree to this Refund Policy.</strong>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};



export default RefundPolicy;