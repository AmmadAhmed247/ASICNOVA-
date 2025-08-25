import React from 'react'

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-blue-500 text-white py-16 md:py-24 px-4 md:px-8 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-1/2 -right-1/5 w-64 md:w-96 h-64 md:h-96 rounded-full bg-white bg-opacity-10"></div>
        <div className="absolute -bottom-1/3 right-1/10 w-48 md:w-64 h-48 md:h-64 rounded-full bg-white bg-opacity-5"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">Terms and Conditions</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl">
            These Terms and Conditions govern your use of our website and services. By accessing or purchasing from this site, you agree to be bound by the following terms.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white py-12 md:py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Introduction */}
          <div className="mb-12 md:mb-16">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              Welcome to <strong>AsicNova</strong>. These Terms and Conditions govern your use of our website and services. By accessing or purchasing from this site, you agree to be bound by the following terms.
            </p>
          </div>

          {/* 1. General Information */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              1. General Information
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                This website is owned and operated by AsicNova. All content, products, and services available on this site are subject to these terms and any additional policies we post.
              </p>
            </div>
          </div>

          {/* 2. Eligibility */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              2. Eligibility
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                To purchase from this site, you must:
              </p>
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li>Be at least 18 years old</li>
                <li>Agree to use crypto as the only form of payment</li>
                <li>Provide accurate and complete information at checkout</li>
              </ul>
            </div>
          </div>

          {/* 3. Orders and Acceptance */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              3. Orders and Acceptance
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                Your order becomes final only when:
              </p>
              <ol className="list-decimal pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg mb-6 md:mb-8">
                <li>We confirm receipt of payment</li>
                <li>You receive an <strong>Order Confirmation</strong> email from us</li>
                <li>The product is dispatched and a <strong>Shipping Confirmation</strong> is issued</li>
              </ol>
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                We reserve the right to cancel any order prior to shipping if:
              </p>
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li>Pricing errors are discovered</li>
                <li>The item is out of stock</li>
                <li>We suspect fraud or misuse</li>
              </ul>
            </div>
          </div>

          {/* 4. Product Pricing */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              4. Product Pricing
            </h2>
            <div className="pl-4 md:pl-6">
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li>All product prices are listed in <strong>USD</strong>.</li>
                <li>You must pay in cryptocurrency (e.g., BTC, ETH, ETC).</li>
                <li>Conversion rates are your responsibility. Your order will only be processed after the full USD equivalent is received.</li>
              </ul>
            </div>
          </div>

          {/* 5. Payments */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              5. Payments
            </h2>
            <div className="pl-4 md:pl-6">
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li>We accept only <strong>cryptocurrency payments</strong>.</li>
                <li>You will receive a wallet address and QR code at checkout.</li>
                <li>Payment must be completed manually by the buyer.</li>
                <li>Confirmation is checked via <strong>blockchain explorers</strong>.</li>
                <li>We do not use third-party crypto payment gateways due to high transaction fees.</li>
              </ul>
            </div>
          </div>

          {/* 6. Delivery Policy */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              6. Delivery Policy
            </h2>
            <div className="pl-4 md:pl-6">
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li>Orders are shipped only after full payment is confirmed on the blockchain.</li>
                <li>We use trusted courier services (e.g., DHL).</li>
                <li>Shipping times vary by location and availability.</li>
                <li>All import duties, taxes, and customs clearance are the responsibility of the buyer.</li>
                <li>Risk of loss or damage transfers to the buyer once the product is handed over to the shipping provider.</li>
              </ul>
            </div>
          </div>

          {/* 7. Warranty */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              7. Warranty
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                We offer a limited warranty on <strong>new mining hardware only</strong>. This warranty does <strong>not</strong> cover:
              </p>
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg mb-4 md:mb-6">
                <li>Burned components</li>
                <li>Water damage</li>
                <li>User modifications</li>
                <li>Electrical surges</li>
                <li>Cosmetic damage or wear and tear</li>
              </ul>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Warranty is valid for the <strong>original purchaser only</strong> and is non-transferable.
              </p>
            </div>
          </div>

          {/* 8. Returns and Refunds */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              8. Returns and Refunds
            </h2>
            <div className="pl-4 md:pl-6">
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li><strong>All sales are final.</strong></li>
                <li>Refunds are not offered unless approved by AsicNova in writing under exceptional circumstances.</li>
                <li>If approved, refunds will be made in crypto based on current market rates at the time of processing.</li>
              </ul>
            </div>
          </div>

          {/* 9. User Accounts */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              9. User Accounts
            </h2>
            <div className="pl-4 md:pl-6">
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li>You are responsible for maintaining the confidentiality of your account and password.</li>
                <li>You agree to accept responsibility for all activities that occur under your account.</li>
              </ul>
            </div>
          </div>

          {/* 10. Limitation of Liability */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              10. Limitation of Liability
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                To the maximum extent permitted by law, AsicNova will not be liable for any:
              </p>
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li>Direct, indirect, incidental, or consequential damages</li>
                <li>Loss of profits or data</li>
                <li>Equipment failure or mining revenue loss</li>
              </ul>
            </div>
          </div>

          {/* 11. Force Majeure */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              11. Force Majeure
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                We shall not be held responsible for delays or failure in performance due to acts of God, natural disasters, pandemics, internet failures, or government actions.
              </p>
            </div>
          </div>

          {/* 12. Amendments */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              12. Amendments
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                AsicNova reserves the right to update or modify these Terms and Conditions at any time. Changes will be posted on this page and take effect immediately.
              </p>
            </div>
          </div>

          {/* 13. Contact */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 md:mb-8 pl-4 md:pl-6 border-l-4 border-blue-500">
              13. Contact
            </h2>
            <div className="pl-4 md:pl-6">
              <p className="text-gray-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
                For any questions or legal concerns, please contact:
              </p>
              <ul className="list-disc pl-4 md:pl-6 text-gray-600 space-y-2 md:space-y-3 text-base md:text-lg">
                <li><strong>Sales:</strong> sales@asicnova.com</li>
                <li><strong>Support:</strong> contact@asicnova.com</li>
              </ul>
            </div>
          </div>

          {/* Final Agreement */}
          <div className="mb-6 md:mb-8">
            <div className="pl-4 md:pl-6">
              <p className="text-gray-800 font-semibold text-base md:text-lg leading-relaxed text-center">
                <strong>By using this site, you confirm that you have read, understood, and agree to be bound by these Terms and Conditions.</strong>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;