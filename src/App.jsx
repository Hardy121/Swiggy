import React, { useEffect, useState } from 'react'
import Head from './components/Head'
import Body from './components/Body'
import { Route, Routes } from 'react-router-dom'
import RestaurantMenu from './components/RestaurantMenu'
import Cart from './components/Cart'
import { CartContaxt, Coordinate, Visibility } from './context/ContextAPI'

const App = () => {

  const [visible, setvisible] = useState(false)
  const [coord, setcoord] = useState({ lat: 21.18880, lng: 72.82930 })
  const [cartData, setcartData] = useState([])

  function get_data_from_local_storage() {
      let data = JSON.parse(localStorage.getItem("cartData")) || []
      setcartData(data)
  }
  useEffect(() => {
    get_data_from_local_storage()
  }
    , [])
  return (
    <>
      <CartContaxt.Provider value={{ cartData, setcartData }}>
        <Coordinate.Provider value={{ coord, setcoord }}>
          <Visibility.Provider value={{ visible, setvisible }}>
            <div className={visible ? " max-h-screen overflow-hidden " : " "}>

              <Routes>
                <Route path='/' element={<Head />} >
                  <Route path='/' element={<Body />} />
                  <Route path='/restaurant-menu/:id' element={<RestaurantMenu />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route path='*' element={<h1>comming soon........</h1>} />
                </Route>

              </Routes>
            </div>
          </Visibility.Provider>
        </Coordinate.Provider>
      </CartContaxt.Provider>
    </>
  )
}

export default App