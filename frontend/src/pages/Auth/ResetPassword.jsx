import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/ui/button'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [isResetMode, setIsResetMode] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const onFormSubmit = async (data) => {
    console.log("Submitted Data:", data)
    // Handle form submission logic here
  }

  // Email sent confirmation view
  if (isEmailSent && !isResetMode) {
    return (
      <div>
        <div className='flex items-center lg:p-0 p-5 justify-center h-full mt-16'>
          <div className='h-[350px] w-[400px] border-1 border-gray-200'>
            <div className='flex flex-col items-center mt-5 gap-5'>
              <p className='text-lg font-medium'>Email Sent!</p>
            </div>
            <div className='p-2 flex flex-col gap-5 items-center mt-5'>
              <div className='w-[350px] flex flex-col gap-3 text-center'>
                <p className='text-sm text-gray-600'>
                  We've sent a password reset link to your email address. 
                  Please check your inbox and follow the instructions to reset your password.
                </p>
                <p className='text-xs text-gray-500'>
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>
              <Button 
                onClick={() => setIsEmailSent(false)} 
                className="p-5 w-[350px] bg-blue-500 hover:bg-blue-500 cursor-pointer hover:opacity-90"
              >
                Try Again
              </Button>
            </div>
            <div className='mt-10 flex items-center justify-center bg-blue-100 w-full h-[100px]'>
              <p className='font-semibold'>Remember your password? <Link to='/login' className='text-blue-500'>Back to Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='flex items-center lg:p-0 p-5 justify-center h-full mt-16'>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className='h-[350px] w-[400px] border-1 border-gray-200'>
            <div className='flex flex-col items-center mt-5 gap-5'>
              <p className='text-lg font-medium'>
                {isResetMode ? 'Set New Password' : 'Reset Your Password'}
              </p>
            </div>
            <div className='p-2 flex flex-col gap-5 items-center mt-5'>
              
              {!isResetMode ? (
                // Email input for reset request
                <div className={`w-[350px] flex flex-col gap-1 p-4 border-1 border-gray-200`}>
                  <input 
                    {...register('email')} 
                    type="email" 
                    className='outline-none w-full text-sm' 
                    placeholder='Please Enter Your Email Address' 
                  />
                </div>
              ) : (
                // New password inputs
                <>
                  <div className={`w-[350px] flex flex-col gap-1 p-4 border-1 border-gray-200`}>
                    <div className='flex items-center'>
                      <input 
                        {...register('password')} 
                        type={showPassword ? 'text' : 'password'} 
                        className='outline-none w-full text-sm' 
                        placeholder='Enter New Password' 
                      />
                      <button
                        className='w-4 h-4'
                        onClick={() => setShowPassword(!showPassword)}
                        type='button'
                      >
                        {showPassword ? <FaEyeSlash/> : <FaEye/>}
                      </button>
                    </div>
                  </div>
                  
                  <div className={`w-[350px] flex flex-col gap-1 p-4 border-1 border-gray-200`}>
                    <div className='flex items-center'>
                      <input 
                        {...register('confirmPassword')} 
                        type={showConfirmPassword ? 'text' : 'password'} 
                        className='outline-none w-full text-sm' 
                        placeholder='Confirm New Password' 
                      />
                      <button
                        className='w-4 h-4'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        type='button'
                      >
                        {showConfirmPassword ? <FaEyeSlash/> : <FaEye/>}
                      </button>
                    </div>
                  </div>
                </>
              )}
              
              <Button 
                type='submit' 
                className="p-5 w-[350px] bg-blue-500 hover:bg-blue-500 cursor-pointer hover:opacity-90"
              >
                {isResetMode ? 'Update Password' : 'Send Reset Link'}
              </Button>
            </div>
            
            <div className='mt-10 flex items-center justify-center bg-blue-100 w-full h-[100px]'>
              <p className='font-semibold'>
                Remember your password? <Link to='/login' className='text-blue-500'>Back to Login</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword