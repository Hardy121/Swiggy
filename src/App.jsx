import React, { useEffect, useState } from 'react'
import Head from './components/Head'
import Body from './components/Body'
import { Route, Routes } from 'react-router-dom'
import RestaurantMenu from './components/RestaurantMenu'

const App = () => {


  return (
    <>
      <Routes>
        <Route path='/' element={<Head />} >
          <Route path='/' element={<Body />} />
          <Route path='/restaurant-menu/:id' element={<RestaurantMenu />} />
        </Route>

      </Routes>
    </>
  )
}

export default App