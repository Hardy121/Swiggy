import React, { useEffect, useState } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const OnMind = ({ data = [] }) => {
    const [value, setValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const minCards = 15; 
    const maxCards = 40; 

    useEffect(() => {
       
        const itemWidth = minCards || maxCards; 
        let totalItems = data.length;

       
        if (totalItems < minCards) totalItems = minCards;
        if (totalItems > maxCards) totalItems = maxCards;

        const maxItemsInView = Math.floor(100 / itemWidth); 
        const maxScrollValue = (totalItems - maxItemsInView) * itemWidth;
        setMaxValue(maxScrollValue > 0 ? maxScrollValue : 0);
    }, [data]);

    function handleNext() {
        if (value < maxValue) {
            setValue(prev => prev + minCards || maxCards);
        }
    }

    function handlePrev() {
        if (value > 0) {
            setValue(prev => prev - minCards || maxCards);
        }
    }

    return (
        <>
            <div className='flex justify-between relative mt-3'>
                <h1 className='text-2xl font-bold'>What's on your mind?</h1>
                <div className='flex gap-2'>
                    <div 
                        onClick={handlePrev} 
                        className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ${value <= 0 ? "bg-gray-100" : "text-gray-200"}`}>
                        <FaArrowLeft className={value <= 0 ? "text-gray-300" : "text-gray-800"} />
                    </div>
                    <div 
                        onClick={handleNext} 
                        className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ${value >= maxValue ? "bg-gray-100" : "text-gray-200"}`}>
                        <FaArrowRight className={value >= maxValue ? "text-gray-300" : "text-gray-800"} />
                    </div>
                </div>
            </div>
            <div style={{ transform: `translateX(-${value}%)` }} className={`mt-4 flex gap-1 duration-500`}>
                {
                    data.slice(0, maxCards).map((item) => ( 
                        <img key={item.id} className='w-40' src={`https://media-assets.swiggy.com/swiggy/image/upload/${item?.imageId}`} alt="" />
                    ))
                }
            </div>
            <hr className='mt-5' />
        </>
    )
}

export default OnMind;
