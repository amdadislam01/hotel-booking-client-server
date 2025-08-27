import React, { useEffect } from 'react'
import Navbar from '../../components/hotelOwner/Navbar'
import Sidebar from '../../components/hotelOwner/Sidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {
  const { isOwner } = useAppContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isOwner) {
      navigate('/')
    }
  }, [isOwner, navigate])

  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1 p-4 pt-10 md:px-10 h-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
