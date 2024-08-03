import React from 'react'
import logo from '../assets/images/logo.png'
import { IoIosArrowDown } from "react-icons/io";
import { PiHandbag } from "react-icons/pi";
import { IoIosHelpBuoy } from "react-icons/io";
import { FiSearch } from "react-icons/fi"
import { BiSolidOffer } from "react-icons/bi";
import { IoCartSharp } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { Link, Outlet } from 'react-router-dom';

const Head = () => {
    const navItem = [
        {
            name: "Swiggy Corporate",
            image: <PiHandbag />
        },
        {
            name: "Search",
            image: <FiSearch />
        },
        {
            name: "Offers",
            image: <BiSolidOffer />
        },
        {
            name: "Help",
            image: <IoIosHelpBuoy />
        },
        {
            name: "Sign in",
            image: <IoMdLogIn />
        },
        {
            name: "Cart",
            image: <IoCartSharp />
        }

    ]
    return (
        <>
            

                <div className="w-full shadow-md flex justify-center items-center fixed bg-white z-50  top-0" >
                    <div className='h-fit w-[70%] flex justify-between lg:flex-col '>


                        <div className='flex items-center'>
                            <Link to={'/'}>
                                <img src={logo} alt="" className='w-24 ' />
                            </Link>
                            <div className='flex  items-end gap-1'>
                                <p className="font-bold border-b-2 border-black "> other</p>
                                <div> <IoIosArrowDown className='text-xl text-orange-500' /> </div>
                            </div>
                        </div>

                        <div className='flex items-center gap-6 lg:flex-wrap'>
                            {
                                navItem.map((data, index) => (
                                    <div key={index} className='flex gap-1 items-center  text-gray-700 hover:text-orange-500 cursor-pointer'>
                                        <div >{data.image}</div>
                                        <p className='text-md font-semibold  '>{data.name}</p>
                                    </div>

                                ))
                            }

                        </div>
                    </div>

                </div>
            
            <Outlet />
        </>
    )
}

export default Head