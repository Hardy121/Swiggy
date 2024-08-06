import React, { useEffect, useState } from 'react'
import Head from './components/Head'
import Body from './components/Body'
import { Route, Routes } from 'react-router-dom'
import RestaurantMenu from './components/RestaurantMenu'
import { Coordinate, Visibility } from './context/ContextAPI'

const App = () => {

  const [visible, setvisible] = useState(false)
  const [coord, setcoord] = useState({lat : 21.18880 , lng : 72.82930 })


  return (
    <>
    <Coordinate.Provider value={{coord , setcoord}}>
      <Visibility.Provider value={{visible , setvisible}}> 
        <div className={visible ?   " max-h-screen overflow-hidden " : " "}>

          <Routes>
            <Route path='/' element={<Head />} >
              <Route path='/' element={<Body />} />
              <Route path='/restaurant-menu/:id' element={<RestaurantMenu />} />
            </Route>

          </Routes>
        </div>
      </Visibility.Provider>
      </Coordinate.Provider>
    </>
  )
}

export default App