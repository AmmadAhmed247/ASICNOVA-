import React from 'react';
import Footer from '../../components/footer';
const AboutUs = () => {
  const companyHistory = [
    { year: '2023', event: 'Launched AI-driven solutions, expanding into new technological frontiers' },
    { year: '2022', event: 'Formed strategic partnerships with industry leaders' },
    { year: '2021', event: 'Expanded operations globally, opening new facilities worldwide' },
    { year: '2020', event: 'Achieved carbon-neutral operations across all facilities' },
    { year: '2019', event: 'Launched sustainable product line with eco-friendly materials' },
    { year: '2018', event: 'Reached 1 million customers milestone with premium service quality' },
    { year: '2017', event: 'Introduced innovative manufacturing processes reducing waste by 40%' },
    { year: '2016', event: 'Established research & development center for advanced technologies' },
    { year: '2015', event: 'Received industry excellence award for quality and innovation' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="relative bg-gradient-to-r from-blue-200 via-blue-500 to-blue-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='37' cy='37' r='1'/%3E%3Ccircle cx='7' cy='37' r='1'/%3E%3Ccircle cx='37' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="text-center text-white">
            <h1 className="text-6xl font-bold mb-8 tracking-tight">About Us</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              We are a leading technology company dedicated to innovation, sustainability, and excellence. 
              Our mission is to create solutions that transform industries and improve lives worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Company History</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Over the past decade, we have grown from a startup to an industry leader, 
              consistently pushing boundaries and setting new standards for excellence.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {companyHistory.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {item.year.slice(-2)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold text-blue-600">{item.year}</h3>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{item.event}</p>
              </div>
            ))}
          </div>
        </div>

       
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Mutually Beneficial, Long-lasting, Sustainable</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our core values guide every decision we make and every relationship we build.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-12">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Mutually Beneficial</h3>
                <p className="text-gray-600">Creating win-win scenarios for all stakeholders through transparent partnerships and shared success.</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM10 4.414L5 8v9h10V8l-5-3.586z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Long-lasting</h3>
                <p className="text-gray-600">Building enduring relationships and creating products designed for longevity and reliability.</p>
              </div>
              
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zm9-1a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Sustainable</h3>
                <p className="text-gray-600">Committed to environmental responsibility and sustainable practices in all our operations.</p>
              </div>
            </div>
          </div>
        </div>


        <div className="mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-8">Product Excellence</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Advanced quality control systems ensuring every product meets the highest standards of excellence and reliability.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Continuous innovation through research and development, incorporating cutting-edge technologies and user feedback.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Rigorous testing protocols and certification processes to guarantee product safety and performance.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">4</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">Customer-centric design approach focusing on usability, accessibility, and user experience optimization.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-12 text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-200 via-blue-500 to-blue-900 rounded-full flex items-center justify-center mx-auto mb-8">
                  <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Quality Assured</h3>
                <p className="text-gray-600">Every product undergoes comprehensive testing to ensure it exceeds industry standards.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <div className="bg-white/35 rounded-2xl p-12">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Ecological Cooperation</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We believe in responsible business practices that protect our planet for future generations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500  rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Carbon Neutral</h4>
                <p className="text-sm text-gray-600">Achieved 100% carbon neutrality across all operations</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v8a2 2 0 002 2V4h12a2 2 0 00-2-2H4zm0 14V6a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Waste Reduction</h4>
                <p className="text-sm text-gray-600">40% reduction in waste through innovative processes</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Renewable Energy</h4>
                <p className="text-sm text-gray-600">Powered by 100% renewable energy sources</p>
              </div>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Certified Green</h4>
                <p className="text-sm text-gray-600">ISO 14001 environmental management certification</p>
              </div>
            </div>
          </div>
        </div>
        <Footer className={'bg-white/35 rounded-md  flex flex-col md:flex-row items-center justify-center py-16 md:gap-80 gap-10 px-4 md:px-10'} />
      </div>
    </div>
  );
};

export default AboutUs;