import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const Authwrapper = ({children}) => {

   const { user, loading } = useSelector((state) => state.user);
  
  // Wait for loadUser to complete before redirecting
  if(loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  
  if(!user) return <Navigate to='/login' replace/>
  return children
}

export default Authwrapper