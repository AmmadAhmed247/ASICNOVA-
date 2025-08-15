import React, { useContext } from 'react'
import { ShoppingCart, Clock, DollarSign, ArrowDown, Shield, CheckCircle, TrendingUp, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { ContactContext } from '../Context/ContactContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '../lib/schemas/schema';

const Footer = ({className}) => {

  const { submitInquiry } = useContext(ContactContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(contactSchema)
  })

  const onFormSubmit = (data)=>{
    submitInquiry(data)
    reset()
  }

  return (
    <div>
      <div className={className}>

        <div className="flex flex-col gap-6 font-semibold text-center md:text-left">
          <p className="hover:text-blue-400 cursor-pointer transition-colors">Home</p>
          <p className="hover:text-blue-400 cursor-pointer transition-colors">Contact Us</p>
          <p className="hover:text-blue-400 cursor-pointer transition-colors">Terms & Conditions</p>
          <p className="hover:text-blue-400 cursor-pointer transition-colors">Privacy Policy</p>
          <p className="hover:text-blue-400 cursor-pointer transition-colors">Refund Policy</p>
        </div>


        <div className="w-full md:max-w-2xl mt-10 md:mt-0">
          <div className="text-center md:text-left mb-6 text-gray-800">
            <h3 className="text-2xl font-bold mb-2">For more inquiries, Contact us</h3>
            <p className="opacity-90">or simply fill the form</p>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className="p-4 flex flex-col gap-5 bg-blue-500 rounded-2xl">
              <div className='w-full flex flex-col px-6 bg-white py-4 rounded-full border-0'>
                <input
                  {...register('fullName')}
                  type="text"
                  placeholder="Your Full Name"
                  className="outline-none w-full text-gray-700"
                />
                {errors.fullName && (<p className='text-xs text-red-600'>{errors.fullName.message}</p>)}
              </div>


              <div className='w-full px-6 py-4 bg-white rounded-full border-0 flex flex-col'>
              <input
                {...register('email')}
                type="email"
                placeholder="Your Email Address"
                className="w-full outline-none text-gray-700"
              />
              {errors.email && (<p className='text-xs text-red-600'>{errors.email.message}</p>)}
              </div>

              <div className='w-full px-6 py-4 bg-white rounded-2xl border-0 flex flex-col'>
              <textarea
                {...register('inquiry')}
                placeholder="Type your inquiry"
                rows="6"
                className="w-full outline-none resize-none text-gray-700"
              ></textarea>
              {errors.inquiry && (<p className='text-xs text-red-600'>{errors.inquiry.message}</p>)}

              </div>
              <button
                type="submit"
                className="w-full cursor-pointer bg-white text-blue-600 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors text-lg"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>



      <footer className="text-white py-12">
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
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span>ASICNOVA</span>
            </div>
            <p className="text-gray-400">© All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer