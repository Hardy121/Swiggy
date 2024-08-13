import React from 'react'

import { IoIosStar } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";
import ATCbtn from './ATCbtn';
import { Link } from 'react-router-dom';

let veg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh71sfIQVPk_TuhnuWB0Q1E6FlciHqRH-wRA&s";
let noneveg = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/768px-Non_veg_symbol.svg.png"

const Dishes = ({
    data: {
        card: {
            card: {
                info,
                restaurant:
                { info: resInfo }
            },
        },
    }



}) => {

    let { imageId = "", name, price, isVeg } = info
    let { name: resName, id, avgRating, sla: { slaString } } = resInfo
    return (
        <>

            <div className='bg-white rounded-2xl p-4 m-4'>
                <div>
                    <div className='flex justify-between min-w-fit items-start text-sm '>
                        <div>
                            <Link to={`/restaurant-menu/${id}`}>
                                <p className='font-bold opacity-70 '>By {resName}</p>
                            </Link>
                            <p className='flex items-center gap-1 opacity-60'><IoIosStar className='text-green-800' /> {avgRating} • {slaString} </p>
                        </div>
                        <div> <Link to="/cart"><FaArrowRight className='text-lg cursor-pointer' /></Link></div>
                    </div>

                    <hr className='border-dotted border-[1px]' />

                    <div className='my-5 max-w-fit flex justify-between'>
                        <div className='w-[50%] flex flex-col gap-1'>
                            <div className='w-5'>
                                {
                                    isVeg ? <img src={veg} alt="" /> : <img src={noneveg} alt="" />
                                }
                            </div>
                            <Link to={`/restaurant-menu/${id}`}>
                                <p className='font-bold text-lg' >{name}</p>
                            </Link>
                            <p>₹{price / 100}</p>
                            <p className='border w-fit px-4 py-[2px] rounded-2xl text-sm cursor-pointer '>More Detail </p>
                        </div>
                        <div className='w-[40%] relative  h-full'>
                            <img className='rounded-xl object-cover aspect-square' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt={name} />
                            <div onClick={handleSameRestaurant}>
                                <ATCbtn info={info} resInfo={resInfo} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}


export default Dishes


