
import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const OnMind = ({data = []}) => {


    // const [data, setData] = useState([])
    const [value, setvalue] = useState(0)
    // async function fetchData() {
    //     const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.18880&lng=72.82930&is')
    //     const result = await data.json();
    //     // console.log(result?.data.cards[0]?.card?.card?.imageGridCards?.info)
    //     setData(result?.data.cards[0]?.card?.card?.imageGridCards?.info)
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])

    function handleNext() {
        value >= 124 ? " " : setvalue((prev) => prev + 31)
    }
    function handlePrev() {
        value <= 0 ? "" : setvalue((prev) => prev - 31)
    }


    return (
        <>

            <div className='flex justify-between relative mt-3'>
                <h1 className='text-2xl font-bold'>What's on your mind ?</h1>
                <div className='flex gap-2 '>
                    <div onClick={handlePrev} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ` + (value <= 0 ? "bg-gray-100" : "text-gray-200")}>
                        <FaArrowLeft className={value <= 0 ? " text-gray-300" : "text-gray-800"} />
                    </div>
                    <div onClick={handleNext} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ` + (value >= 124 ? "bg-gray-100" : "text-gray-200")}>
                        <FaArrowRight className={value >= 124 ? " text-gray-300" : "text-gray-800"} />
                    </div>
                </div>
            </div>
            <div style={{ translate: `-${value}%` }} className={`mt-4 flex gap-1 duration-500 `}>
                {
                    data.map((item) => (
                        <img key={item.id} className='w-40' src={`https://cors-by-codethread-for-swiggy.vercel.app/cors/swiggy/image/upload/${item?.imageId}`} alt=""  />
                    ))
                }
                
            </div>
            <hr className='mt-5' />
        </>
    )
}

export default OnMind