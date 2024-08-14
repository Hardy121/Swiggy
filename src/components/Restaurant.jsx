import React from 'react'
import { IoIosStar } from "react-icons/io";
import { Link } from 'react-router-dom';

const Restaurant = ({
    data: {
        card: {
            card: {
                info: {
                    id,
                    avgRating,
                    sla: { slaString },
                    name,
                    cloudinaryImageId,
                    costForTwoMessage,
                    promoted = false,
                    cuisines,
                }
            },
        },
    }
}) => {
    return (
        <>
            <div className='bg-white m-3 flex gap-3 items-center p-4'>
                <div className='w-[30%]'>
                    <img className='aspect-square rounded-lg' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/${cloudinaryImageId}`} alt="" />
                </div>
                <div className='flex flex-col gap-1 w-[60%]'>
                    <Link to={`/restaurant-menu/${id}`}>
                        <p className='text-base font-bold line-clamp-1 text-[#3e4152]'>{name}</p>
                    </Link>
                    <p className='flex items-center text-[13px] text-[#696b79] font-semibold    '><IoIosStar className='text-green-800 text-sm' /> {avgRating} {slaString} {costForTwoMessage} </p>
                    <p className='line-clamp-1 text-sm text-[#93959f]'>{cuisines.join()}</p>
                </div>
            </div>
        </>
    )
}

export default Restaurant

export function withHoc(WrappedCom) {
    return (prop)   => {
            return <div className='relative'>
                <p className='absolute top-7  px-2 left-5 bg-slate-600 rounded-md text-sm text-white'>Ad</p>
                <WrappedCom {...prop}/>
            </div>
            
    }
}