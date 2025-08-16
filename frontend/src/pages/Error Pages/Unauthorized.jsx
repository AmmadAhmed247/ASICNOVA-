import React from 'react'
import { Button } from '../../components/ui/button'
import AccessDeniedSvg from '../../../public/accessdenied.svg'
import { Link } from 'react-router-dom'

const Unauthorized = () => {
  return (
    <div>
        <div>
            <div className='flex items-center justify-center h-screen'>
                <div className='flex flex-col gap-5 items-center justify-center'>
                    <img src={AccessDeniedSvg} className='h-[300px]'/>
                    <p className='text-3xl font-bold text-blue-500'>Access Denied</p>
                    <div><Link to='/'><Button className='bg-blue-500 hover:bg-blue-500 hover:opacity-90 cursor-pointer'>Return To Home Page</Button></Link></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Unauthorized