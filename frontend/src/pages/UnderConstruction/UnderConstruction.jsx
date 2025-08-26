import React from 'react'
import ComingSoonSvg from '../../../public/comingsoon.svg'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'

const UnderConstruction = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
        <div className='flex flex-col gap-2 items-center justify-center'>
            <img className='h-[300px]' src={ComingSoonSvg}/>
            <p className='text-5xl text-blue-400 font-bold mt-5'>Coming Soon</p>
            <Link to='/'><Button className='bg-blue-400 hover:bg-blue-400 hover:opacity-90 cursor-pointer mt-5'>Back To Home Page</Button></Link>
        </div>
    </div>
  )
}

export default UnderConstruction