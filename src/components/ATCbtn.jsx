import React, { useContext, useState } from 'react'
import { CartContaxt } from '../context/ContextAPI'
import toast from 'react-hot-toast'

const ATCbtn = ({ info, resInfo, handleIsDiffRes }) => {

    const [otherRes, setotherRes] = useState(false)
    function handleIsDiffRes() {
        setotherRes((prev) => !prev)
    }

    function clearcart() {
        setcartData([])
        localStorage.clear()
        handleIsDiffRes()
    }

    const { cartData, setcartData } = useContext(CartContaxt)
    function handleAddToCart() {

        const isadded = cartData.find((data) => data.id === info.id)
        let getResInfoFromLocalStorage = JSON.parse(localStorage.getItem("resInfo")) || []
        if (!isadded) {
            if (getResInfoFromLocalStorage.name === resInfo.name || getResInfoFromLocalStorage.length === 0) {
                setcartData((prev) => [...prev, info]) // items add thashe ane previous items remove ny thay 
                localStorage.setItem("cartData", JSON.stringify([...cartData, info]));
                localStorage.setItem("resInfo", JSON.stringify(resInfo));
                toast.success("Food added to the cart")
            }
            else {

                toast.error("Different restaurant")
                handleIsDiffRes()

            }

        }
        else {
            toast.error("Already added to the cart")
        }

    }

    return (
        <>
            {
                otherRes && (

                    <div className='w-[520px] h-[204px] bottom-10 left-[28%] fixed shadow-xl z-40 bg-white p-7'>
                        <h1 className='text-[18px] text-[#282c3f] font-bold'>Item already in cart</h1>
                        <p className='text-[14px] text-[#535665]'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
                        <div className='w-full flex gap-5 mt-6'>
                            <button onClick={handleIsDiffRes} className='w-1/2 border-[3px] border-[#51a239] py-3 bg-white text-[#60b246] font-semibold text-[16px]'>No</button>
                            <button onClick={clearcart} className='w-1/2 border-[3px] border-[#60b246] py-3 bg-[#60b246] text-white font-semibold text-[16px]'>Yes, Start A Fresh</button>
                        </div>
                    </div>
                )
            }
            <button
                onClick={handleAddToCart}
                className='bg-white cursor-pointer text-lg border px-9 sm:px-5   absolute -bottom-5 left-1/2 -translate-x-1/2 py-1 rounded-lg  text-[#1ba672] font-bold hover:bg-[#D9DADB]'
            >ADD</button>
        </>
    )
}

export default ATCbtn