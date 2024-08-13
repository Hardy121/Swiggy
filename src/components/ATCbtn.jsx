import React, { useContext, useState } from 'react'
import { CartContaxt } from '../context/ContextAPI'
import toast from 'react-hot-toast'

const ATCbtn = ({ info, resInfo, handleIsDiffRes }) => {

    // const [isDiffRes, setisDiffRes] = useState(false)
    // function handleIsDiffRes() {
    //     setisDiffRes((prev) => !prev)
    // }
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
        <button
            onClick={handleAddToCart}
            className='bg-white cursor-pointer text-lg border px-9 sm:px-5   absolute -bottom-5 left-1/2 -translate-x-1/2 py-1 rounded-lg  text-[#1ba672] font-bold hover:bg-[#D9DADB]'
        >ADD</button>

    )
}

export default ATCbtn