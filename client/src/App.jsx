import React from 'react'
import Home from './pages/Home'
import Layout from './pages/Layout'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/Account'

axios.defaults.baseURL = 'http://localhost:2000'
axios.defaults.withCredentials = true

export default function App() {
  return (
    <>
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        </Route>
      </Routes>
      </UserContextProvider>
    </>
  )
}
