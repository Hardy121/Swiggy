import React, { useContext, useState } from 'react'
import { CartContaxt, ResInfo } from '../context/ContextAPI';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { IoIosStar } from "react-icons/io";


const Cart = () => {
    const { cartData, setcartData } = useContext(CartContaxt)
    const { resInfo } = useContext(ResInfo)
    console.log(resInfo)

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
        toast.success("Food is removed")

    }
    function handleClearCart() {
        setcartData([])
        localStorage.clear()
        toast.success("Cart is cleared")

    }
    const userData = useSelector((state) => state.authSlice.userData)
    function handlePlaceOrder() {

        if (!userData) {
            toast.error("Login for place order")
            // navigate("/signin")
            return
        }
        toast.success("order placed")
        setcartData([])
        localStorage.clear("cartData")






    }

    console.log(resInfo)

    let veg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh71sfIQVPk_TuhnuWB0Q1E6FlciHqRH-wRA&s";
    let noneveg = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/768px-Non_veg_symbol.svg.png"



    return (
        <>
            <div className="w-full" >
                <div className="w-[60%] mx-auto ">
                    <div className='flex  gap-3'>
                        <img className='rounded-xl aspect-square object-cover w-[110px] h-[110px]  overflow-hidden' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + resInfo.cloudinaryImageId} alt="" />
                        <div>
                            <p className='font-bold text-4xl border-b-2 border-black pb-1'>{resInfo.name}</p>
                            <p className='text-xl'>{resInfo.areaName}</p>
                        </div>
                    </div>
                    {
                        cartData.map(({
                            name,
                            defaultPrice,
                            price,
                            itemAttribute: { vegClassifier },
                            offerTags,
                            ratings: { aggregatedRating: { ratingCountV2, rating } },
                            description,
                            imageId
                        }, index) => (
                            <>
                                <div className='flex items-center justify-between mt-5 w-full min-h-[182px]' >
                                    <div className='w-[70%]'>
                                        <img className='w-5 rounded-sm' src={(vegClassifier === "VEG" ? veg : noneveg)} alt="" />
                                        <h1 className='text-lg font-semibold'>{name}</h1>
                                        <p className='text-lg font-semibold'>₹{defaultPrice / 100 || price / 100}</p>
                                        <p className='flex items-center gap-1'><IoIosStar className='text-green-700' /><span className='text-green-600'>{rating}({ratingCountV2})</span> </p>
                                        <span className='line-clamp-3   '>{description}</span>
                                    </div>
                                    <div className='w-[20%] relative h-full'>
                                        <img className='rounded-xl' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt="" />
                                        <button onClick={handleRemoveFromCart} className='bg-white cursor-pointer text-lg border px-6 absolute -bottom-5 left-5  py-1 rounded-lg  text-red-600 font-bold hover:bg-red-500 hover:text-white'>REMOVE</button>
                                    </div>
                                </div>
                                <hr className='w-full my-3'  />
                            </>

                        ))
                    }
                    <h1 className='font-bold text-xl'>Total Price : ₹{totalPrice}</h1>
                    <div className='flex justify-between'>
                        <button onClick={handlePlaceOrder} className="p-3 bg-green-600 my-5 rounded-lg hover:bg-green-700 text-white" >Place order</button>
                        <button onClick={handleClearCart} className="p-3 bg-green-600 my-5 rounded-lg hover:bg-green-700 text-white" >Clear cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart