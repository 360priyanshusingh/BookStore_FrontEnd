
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header/Header'
import './DashBoard.scss'

function DashBoard() {
  return (
    <div className='dashBoard-main-container-cnt'>
         <Header/>
         <Outlet/>
    </div>
  )
}

export default DashBoard