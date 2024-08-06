import React, { useEffect, useState } from 'react'
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { MdStars } from "react-icons/md";
import RestaurantCard from './RestaurantCard';
const TopRestaurant = ({ data  , TopResTitle}) => {
    // const [data, setData] = useState([])
    const [value, setvalue] = useState(0)
    // async function fetchData() {
    //     const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.18880&lng=72.82930&is')
    //     const result = await data.json();
    //     // console.log(result?.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    //     setData(result?.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    // }

    // useEffect(() => {
    //     fetchData()
    // }, [])



    function handleNext() {
        value >= 550 ? " " : setvalue((prev) => prev + 40)
    }
    function handlePrev() {
        value <= 0 ? "" : setvalue((prev) => prev - 40)
    }
    return (
        <>

            <div className='flex justify-between mt-16'>
                <h1 className='text-2xl font-bold'>{ TopResTitle}</h1>
                <div className='flex gap-2 '>
                    <div onClick={handlePrev} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ` + (value <= 0 ? "bg-gray-100" : "text-gray-200")}>
                        <FaArrowLeft className={value <= 0 ? " text-gray-300" : "text-gray-800"} />
                    </div>
                    <div onClick={handleNext} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ` + (value >= 550 ? "bg-gray-100" : "text-gray-200")}>
                        <FaArrowRight className={value >= 550 ? " text-gray-300" : "text-gray-800"} />
                    </div>
                </div>
            </div>
            <div className={`mt-4 flex gap-5 duration-1000`} style={{ translate: `-${value}%` }}>
                {
                    data.map(({  info , index , cta:{link}}) => (
                    
                        <div key={index} className='hover:scale-95 duration-300'>
                           <RestaurantCard {...info}  link={link}/>
                        </div>
                    ))
                }
            </div>
            <hr className='mt-5 mb-3' />
        </>
    )
}

export default TopRestaurant