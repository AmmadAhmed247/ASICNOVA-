import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/ui/button'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { resetPasswordSchema } from '../../lib/schemas/schema'

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isOtpSent, setIsOtpSent] = useState(false)
  const [isResetMode, setIsResetMode] = useState(false)
  const { resetPassword, forgotPassword } = useContext(AuthContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(resetPasswordSchema)
  })

const onFormSubmit = async (data) => {
  if (!isOtpSent && !isResetMode) {
    await forgotPassword({ email: data.email })
    setIsOtpSent(true)
  } else if (isOtpSent && !isResetMode) {
    setIsResetMode(true)
  } else if (isResetMode) {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!")
      return
    }
    await resetPassword({
      email: data.email,
      otp: data.otp,
      password: data.password
    })
    navigate('/login')
  }
}


  return (
    <div>
      <div className='flex items-center lg:p-0 p-5 justify-center h-full mt-16'>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className='h-[300px] w-[400px] border-1 border-gray-200 rounded-xl shadow-sm'>
            <div className='flex flex-col items-center mt-5 gap-5'>
              <p className='text-lg font-medium'>
                {!isOtpSent ? 'Reset Your Password' : isResetMode ? 'Set New Password' : 'Verify OTP'}
              </p>
            </div>

            <div className='p-2 flex flex-col gap-5 items-center mt-5'>

              {!isOtpSent && !isResetMode && (
                <div className='w-[350px] flex flex-col gap-1 p-4 border-1 border-gray-200 rounded-lg'>
                  <input
                    {...register('email')}
                    type="email"
                    className='outline-none w-full text-sm'
                    placeholder='Enter your email address'
                  />
                  {errors.email && (<p className='text-xs text-red-600'>{errors.email.message}</p>)}
                </div>
              )}

              {isOtpSent && !isResetMode && (
                <div className='w-[350px] flex flex-col gap-1 p-4 border-1 border-gray-200 rounded-lg'>
                  <input
                    {...register('otp')}
                    type="text"
                    className='outline-none w-full text-sm tracking-widest text-center'
                    placeholder='Enter OTP'
                  />
                  {errors.otp && (<p className='text-xs text-red-600'>{errors.otp.message}</p>)}
                </div>
              )}

              {isResetMode && (
                <>
                  <div className='w-[350px] flex flex-col gap-1 p-4 border-1 border-gray-200 rounded-lg'>
                    <div className='flex items-center'>
                      <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        className='outline-none w-full text-sm'
                        placeholder='Enter new password'
                      />
                      <button
                        className='w-4 h-4 ml-2'
                        onClick={() => setShowPassword(!showPassword)}
                        type='button'
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.password && (<p className='text-xs text-red-600'>{errors.password.message}</p>)}
                  </div>

                  <div className='w-[350px] flex flex-col gap-1 p-4 border-1 border-gray-200 rounded-lg'>
                    <div className='flex items-center'>
                      <input
                        {...register('confirmPassword')}
                        type={showConfirmPassword ? 'text' : 'password'}
                        className='outline-none w-full text-sm'
                        placeholder='Confirm new password'
                      />
                      <button
                        className='w-4 h-4 ml-2'
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        type='button'
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && (<p className='text-xs text-red-600'>{errors.confirmPassword.message}</p>)}
                  </div>
                </>
              )}

              <Button
                type='submit'
                className="p-5 w-[350px] bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow cursor-pointer"
              >
                {!isOtpSent ? 'Send OTP' : isResetMode ? 'Update Password' : 'Verify OTP'}
              </Button>
            </div>

            <div className='mt-10 flex items-center justify-center bg-blue-100 w-full h-[80px] rounded-b-xl'>
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
