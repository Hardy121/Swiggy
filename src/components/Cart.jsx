import React, { useContext, useState } from 'react'
import { CartContaxt, ResInfo, Visibility } from '../context/ContextAPI';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { IoIosStar } from "react-icons/io";


const Cart = () => {
    const { cartData, setcartData } = useContext(CartContaxt)
    const { resInfo } = useContext(ResInfo)
    // console.log(resInfo)

    // console.log(cartData)
    // let totalPrice = 0;
    // for (let i = 0; i < cartData.length; i++) {
    //     totalPrice = totalPrice + cartData[i].price /100 || cartData[i].defaultPrice / 100 

    // }

    let totalPrice = cartData.reduce((acc, curVal) => (acc + curVal.price / 100 || curVal.defaultPrice / 100), 0)

    if (cartData.length === 0) {
        return <div className='w-full h-full'>

            <div className='flex  flex-col justify-center items-center text-center  mt-5'>
                <img className='w-[300px] h-[300px]' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="" />
                <h1 className='font-bold text-2xl'>Your cart is empty</h1>
                <p className='opacity-70 text-gray-600'>You can go to home page to view more restaurants</p>
                <Link to="/" className='bg-[#F75002] px-5  p-4 my-2 text-white inline-block font-bold ' >SEE RESTAURANT NEAR YOU</Link>
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
        toast.success("Cart is cleared")
        localStorage.clear()

    }
    const userData = useSelector((state) => state.authSlice.userData)
    const { setloginvisible } = useContext(Visibility)

    function handlePlaceOrder() {

        if (!userData) {
            toast.error("Login for place order")

            setloginvisible((prev) => !prev)

            return
        }
        toast.success("order placed")
        setcartData([])






    }

    // console.log(resInfo)

    let veg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh71sfIQVPk_TuhnuWB0Q1E6FlciHqRH-wRA&s";
    let noneveg = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/768px-Non_veg_symbol.svg.png"



    return (
        <>
            <div className="w-full" >
                <div className="w-[60%] md:w-[95%] mx-auto mt-4 ">
                    <Link to={`/restaurant-menu/${resInfo.id}`}>
                        <div className='flex  gap-3'>
                            <img className='rounded-xl aspect-square object-cover w-[110px] h-[110px]  overflow-hidden' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + resInfo.cloudinaryImageId} alt="" />
                            <div>
                                <p className='font-bold text-4xl border-b-2 border-black pb-1'>{resInfo.name}</p>
                                <p className='text-xl'>{resInfo.areaName}</p>
                            </div>
                        </div>

                        <hr className='my-5' />

                    </Link>
                    {
                        cartData.map(({
                            name,
                            defaultPrice,
                            price,
                            itemAttribute,
                            offerTags,
                            ratings: { aggregatedRating: { ratingCountV2, rating } },
                            description,
                            imageId
                        }, index) => (
                            <>
                                <div className='flex items-center justify-between mt-5 w-full min-h-[182px]' >
                                    <div className='w-[70%] sm:w-[65%]'>
                                        <img className='w-5 rounded-sm' src={(itemAttribute && itemAttribute.vegClassifier === "VEG" ? veg : noneveg)} alt="" />
                                        <h1 className='text-lg font-semibold'>{name}</h1>
                                        <p className='text-lg font-semibold'>₹{defaultPrice / 100 || price / 100}</p>
                                        <p className='flex items-center gap-1'><IoIosStar className='text-green-700' /><span className='text-green-600'>{rating}({ratingCountV2})</span> </p>
                                        <span className='line-clamp-3   '>{description}</span>
                                    </div>
                                    <div className='w-[20%] sm:w-[35%] relative h-full'>
                                        <img className='rounded-xl' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt="" />
                                        <button onClick={handleRemoveFromCart} className='bg-white cursor-pointer text-lg border px-6  sm:px-3 absolute -bottom-5 left-1/2 -translate-x-1/2  py-1 rounded-lg  text-red-600 font-bold hover:bg-red-500 hover:text-white'>REMOVE</button>
                                    </div>
                                </div>
                                <hr className='w-full my-3' />
                            </>

                        ))
                    }
                    <h1 className='font-bold text-xl'>Total Price : ₹{totalPrice}</h1>
                    <div className='flex justify-between'>
                        <button onClick={handlePlaceOrder} className="p-3 px-6 bg-green-600 my-5  hover:bg-green-700 text-white" >Place order</button>
                        <button onClick={handleClearCart} className="p-3 px-6 bg-[#F75002] my-5  hover:bg-[#f75002d3] text-white"  >Clear cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart