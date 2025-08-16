import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../lib/schemas/schema';
import { Button } from '../../components/ui/button'
import { AuthContext } from '../../Context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


const Login = () => {

  const {loginUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const [ShowPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

 const onFormSubmit = async (data) => {
  try {
    const result = await loginUser(data); 

    if (result && !result.error) {
      navigate('/');
      window.location.reload()
    }

    console.log("Submitted Data:", data);
  } catch (error) {
    console.error("Login failed:", error);
  }
};
  return (
    <div>
      <div className='flex items-center lg:p-0 p-5 justify-center h-full mt-16'>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className='h-[350px] w-[400px] border-1 border-gray-200 '>
            <div className='flex flex-col items-center mt-5 gap-5'>
              <p className='text-lg font-medium'>Login Via Email & Password</p>
            </div>
            <div className='p-2 flex flex-col gap-5 items-center mt-5'>
              <div className={`w-[350px] flex flex-col gap-1 p-4 border-1 ${errors.email ? 'border-red-600' : 'border-gray-200'} `}>
                <input {...register('email')} type="text" className=' outline-none w-full  text-sm' placeholder='Please Enter Email Address' />
                {errors.email && (<p className='text-xs text-red-600'>{errors.email.message}</p>)}
              </div>
              <div className={`w-[350px] flex flex-col gap-1 p-4 border-1 ${errors.password ? 'border-red-600' : 'border-gray-200'} `}>
                <div className='flex items-center'>
                <input {...register('password')} type={ShowPassword ? 'text' : 'password'} className=' outline-none w-full  text-sm' placeholder='Please Enter Password' />
                <button
                className='w-4 h-4'
                onClick={()=> setShowPassword(!ShowPassword)}
                type='button'
                >
                  {ShowPassword ? <FaEyeSlash/>: <FaEye/>}
                </button>
                </div>
                {errors.password && (<p className='text-xs text-red-600'>{errors.password.message}</p>)}
              </div>
              <Button type='submit' className="p-5 w-[350px] bg-blue-500 hover:bg-blue-500 cursor-pointer hover:opacity-90">Log In</Button>
            </div>
            <div className='mt-10 flex items-center justify-center bg-blue-100 w-full h-[100px]'>
              <p className='font-semibold'>No Account? <Link to='/signup' className='text-blue-500 '>Create Your Account</Link></p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login