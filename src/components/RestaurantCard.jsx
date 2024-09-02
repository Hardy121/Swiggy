import React from 'react';
import { MdStars } from "react-icons/md";
import { Link } from 'react-router-dom';

const RestaurantCard = (info, link) => {
   
    return (
        <Link to={`/search`}>
            <div className='min-w-[295px] h-[182px] xs:min-w-[200px] xs:h-[150px] cursor-pointer duration-1000 relative overflow-hidden rounded-xl '>
                <div>
                    <img
                        className='w-full h-full object-cover rounded-xl '
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/${info?.cloudinaryImageId}`}
                        alt=""
                        loading="lazy"
                    />
                    <div className="absolute rounded-xl bg-gradient-to-t from-black from-1% to-transparent to-40% w-full h-full top-0">   </div>
                    <p className='absolute bottom-1 text-[#FFFFFF] text-xl ml-2 font-semibold tracking-tight' >
                        {info?.aggregatedDiscountInfoV3 ?
                            info?.aggregatedDiscountInfoV3?.header + " " + info?.aggregatedDiscountInfoV3?.subHeader : " "}
                    </p>
                </div>
            </div>
            <div className='mt-3'>
                <h2 className='text-lg line-clamp-1 font-bold'>{info?.name}</h2>
                <p className='flex items-center gap-2 text-lg font-semibold'>
                    <MdStars className='text-green-700' /> {info?.avgRating}<span>{info?.sla?.slaString}</span>
                </p>
                <p className='line-clamp-1 font-medium text-gray-400'>{info?.cuisines.join(" , ")}</p>
                <p className='font-medium line-clamp-1 text-gray-400'>{info?.areaName + " , " + info?.locality}</p>
            </div>
        </Link>
    );
}

export default RestaurantCard;
