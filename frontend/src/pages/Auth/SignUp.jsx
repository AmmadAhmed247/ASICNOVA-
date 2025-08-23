import React, { useContext, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../lib/schemas/schema';
import { AuthContext } from '../../Context/AuthContext';

const SignUp = () => {
  const [Step, setStep] = useState(1);
  const [ShowModal, setShowModal] = useState(false);
  const {sendOTP, verifyOTPAndPassword} = useContext(AuthContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    trigger,
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  });

  const formData = getValues();

  const onFormSubmit = async (data) => {
    if (Step === 1) {
      const valid = await trigger(['fullName', 'email']);
      if (valid) {
        sendOTP(data)
        setStep(2)
      };
    } else {
      const valid = await trigger(['otp', 'password']);
      if (valid) {
        verifyOTPAndPassword(data)
        navigate('/login')
      };
    }
  };

  return (
    <div className="flex items-center lg:p-0 p-5 justify-center h-full mt-16">
      <div className="h-[470px] w-[400px] border-1 border-gray-200 flex flex-col justify-between">
        <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-5">
          {Step === 1 && (
            <div className="flex flex-col items-center mt-5 gap-5">
              <p className="text-lg font-medium">Register Via Email</p>
              <p className="text-xs font-light">By Agreeing, You're Accepting Our Terms & Conditions</p>
              <div className="p-2 flex flex-col gap-5 items-center mt-5">
                <div className={`w-[350px] flex flex-col gap-1 p-4 border-1 ${errors.fullName ? 'border-red-600' : 'border-gray-200'}`}>
                  <input
                    {...register('fullName')}
                    type="text"
                    className="outline-none w-full text-sm"
                    placeholder="Please Enter Full Name"
                  />
                  {errors.fullName && <p className="text-xs text-red-600">{errors.fullName.message}</p>}
                </div>
                <div className={`w-[350px] flex flex-col gap-1 p-4 border-1 ${errors.email ? 'border-red-600' : 'border-gray-200'}`}>
                  <input
                    {...register('email')}
                    type="text"
                    className="outline-none w-full text-sm"
                    placeholder="Please Enter Email Address"
                  />
                  {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                </div>
                <Button type="submit" className="p-5 w-[350px] bg-blue-500 hover:bg-blue-500 cursor-pointer hover:opacity-90">
                  Register Now
                </Button>
              </div>
            </div>
          )}
          {Step === 2 && (
            <div className="flex flex-col items-center mt-5 gap-5">
              <p className="text-lg font-medium">Register Via Email</p>
              <p className="text-xs font-light">By Agreeing, You're Accepting Our Terms & Conditions</p>
              <div className="p-2 flex flex-col gap-5 items-center mt-5">
                <div className="w-[350px] p-4 text-sm border-1 border-gray-200">{formData.email}</div>
                <div className={`w-[350px] flex flex-col gap-1 p-2 border-1 ${errors.otp ? 'border-red-600' : 'border-gray-200'}`}>
                  <div className="flex items-center">
                    <input
                      {...register('otp')}
                      type="text"
                      className="outline-none w-full p-4 text-sm"
                      placeholder="Enter OTP Here"
                    />
                    <button
                      type="button"
                      onClick={() => setShowModal(!ShowModal)}
                      className="text-xs cursor-pointer text-blue-500 font-bold p-2"
                    >
                      Not Received
                    </button>
                  </div>
                  {ShowModal && (
                    <div className="absolute h-[80px] w-[120px] bg-white border-1 border-gray-200 mt-2">
                      <ul className="p-2 flex flex-col gap-2">
                        <li className="text-xs text-blue-500 font-semibold">Check Spam</li>
                        <li className="text-xs text-blue-500 font-semibold">Try Again</li>
                      </ul>
                    </div>
                  )}
                  {errors.otp && <p className="text-xs  text-red-600">{errors.otp.message}</p>}
                </div>
                <div className={`w-[350px]  border-1 p-2 border-gray-200 ${errors.password ? 'border-red-600' : 'border-gray-200'}`}>
                  <input
                    {...register('password')}
                    type="password"
                    className="outline-none w-full text-sm"
                    placeholder="Enter Password"
                  />
                  {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
                </div>
                <Button type="submit" className="p-5 w-[350px] bg-blue-500 hover:bg-blue-500 cursor-pointer hover:opacity-90">
                  Register Now
                </Button>
              </div>
            </div>
          )}
        </form>
        <div className="mt-5 flex items-center justify-center bg-blue-100 w-full h-[120px]">
          <p className="font-semibold">
            Existing Account? <Link to="/login" className="text-blue-500">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
