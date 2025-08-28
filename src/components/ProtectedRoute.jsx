import React from 'react'
import { useAuth } from '../context/authcontext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const { session } = useAuth()
    
    if(!session){
        return <Navigate to="/" replace/>
    } 

    return <Outlet />
}

export default ProtectedRoute
