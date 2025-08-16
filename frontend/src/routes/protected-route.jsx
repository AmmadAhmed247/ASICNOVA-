import React from 'react'
import { AuthContext } from '../Context/AuthContext'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {

    const {User} = useContext(AuthContext)

    if(User === undefined){
        return <div>Loading...</div>
    }

    if(!User || User.isAdmin === false){
        return <Navigate to='/unauthorized' replace/>
    }

    return <Outlet/>

 
}

export default ProtectedRoute