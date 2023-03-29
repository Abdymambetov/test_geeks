import React from 'react'
import Header from '../componets/header/Header'
import Footer from '../componets/footer/Footer'
import { Outlet } from 'react-router-dom'

function Layouts() {
  return (
    <div>
        <Header/>
            <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layouts