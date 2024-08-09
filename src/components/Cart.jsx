import React, { useContext, useState } from 'react'
import { CartContaxt } from '../context/ContextAPI';
import { Link } from 'react-router-dom';

const Cart = () => {
    const { cartData, setcartData } = useContext(CartContaxt)
    // console.log(cartData)
    // let totalPrice = 0;
    // for (let i = 0; i < cartData.length; i++) {
    //     totalPrice = totalPrice + cartData[i].price /100 || cartData[i].defaultPrice / 100 

    // }

    let totalPrice = cartData.reduce((acc, curVal) => (acc + curVal.price / 100 || curVal.defaultPrice / 100), 0)

    if (cartData.length === 0) {
        return <div className='w-full'>
            <div>

            </div>
            <div className='w-[50%] mx-auto'>
                <h1>you have nothing in cart, add something in cart</h1>
                <Link to="/" className='bg-green-600 p-2 mt-10 text-white rounded-lg inline-block' > add from here</Link>
            </div>
        </div>

    }

    function handleRemoveFromCart(index) {
        let newArr = [...cartData]
        newArr.splice(index, 1)
        setcartData(newArr)
        localStorage.setItem("cartData", JSON.stringify(newArr))

    }
    function handleClearCart(){
        setcartData([])
        localStorage.clear()
        
    }

    return (
        <>
         <div className="w-full" >
                <div className="w-[60%] mx-auto ">
                    {
                        cartData.map((data, index) => (
                            <div key={index} className="w-full flex justify-between my-5">
                                <div className='w-[70%]'>
                                    <h2 className="">{data.name}</h2>
                                    <p>₹{data.price / 100 || data.defaultPrice / 100}</p>
                                </div>
                                <div className='w-[20%] relative h-full'>
                                    <img className='rounded-xl' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + data.imageId} alt="" />
                                    <button onClick={(index) => handleRemoveFromCart(index)} className='bg-red-500 cursor-pointer text-lg border px-5 absolute -bottom-5 left-6  py-1 rounded-lg text-white font-bold hover:bg-red-600'>Remove</button>
                                </div>
                            </div>
                        ))
                    }
                    <h1>₹{totalPrice}</h1>
                    <button onClick={handleClearCart} className="p-3 bg-green-600 my-5 rounded-lg hover:bg-green-700 text-white" >Clear cart</button>
                </div>
            </div> 
        </>
    )
}

export default Cart