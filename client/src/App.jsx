import React, { useEffect, useState } from 'react'
import Builder from "./pages/Builder.jsx"
import Billing from "./pages/Billing.jsx"
import { Navigate } from 'react-router-dom'
import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import ProtectedRoute from '../components/ProtectedRoute'
import Navbar from '../components/Navbar'
import axios from "axios"  

export const ServerUrl = "http://localhost:8000"

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)  

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        setUser(res.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchMe()  
  }, [])

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/*" element={
          <ProtectedRoute user={user} loading={loading}>
            <Navbar setUser={setUser} user={user} /> 
            <Routes>
              <Route path="/" element={<Home user={user} />} />
              <Route path='/builder' element={<Builder user={user} setUser={setUser} />} />
              <Route path='/billing' element={<Billing user={user} />} />
              <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App