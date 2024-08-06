import React, { useContext, useState } from 'react'
import logo from '../assets/images/logo.png'
import { IoIosArrowDown } from "react-icons/io";
import { PiHandbag } from "react-icons/pi";
import { IoIosHelpBuoy } from "react-icons/io";
import { FiSearch } from "react-icons/fi"
import { BiSolidOffer } from "react-icons/bi";
import { IoCartSharp } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { Link, Outlet } from 'react-router-dom';
import { CartContaxt, Coordinate, Visibility } from '../context/ContextAPI';
import { IoClose } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";

const Head = () => {
    const navItem = [
        {
            name: "Swiggy Corporate",
            image: <PiHandbag />,
            path: "/corporate"
        },
        {
            name: "Search",
            image: <FiSearch />,
            path: "/search"

        },
        {
            name: "Offers",
            image: <BiSolidOffer />,
            path: "/offers"

        },
        {
            name: "Help",
            image: <IoIosHelpBuoy />,
            path: "/help"

        },
        {
            name: "Sign in",
            image: <IoMdLogIn />,
            path: "/sign in"

        },
        {
            name: "Cart",
            image: <IoCartSharp />,
            path: "/cart"

        }

    ]


    const { visible, setvisible } = useContext(Visibility)
    const [searchresult, setsearchresult] = useState([])

    function handlesearchfunc() {
        setvisible((prev) => !prev)

    }
    function handlevisiblity() {
        setvisible((prev) => !prev)

    }



    async function searchresultFunc(val) {
        if (val == "") return
        const res = await fetch(`https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`)
        const data = await res.json()
        setsearchresult(data.data)
    }

    const { coord, setcoord } = useContext(Coordinate)
    const { cartData, setcartData } = useContext(CartContaxt)
    const [adress, setadress] = useState("")


    async function fetchLatandLon(id) {
        if (id == "") return
        const res = await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`)
        const data = await res.json()
        // setsearchresult(data.data):
        setcoord({
            lat: data.data[0].geometry.location.lat,
            lng: data.data[0].geometry.location.lng
        })
        setadress(data.data[0].formatted_address)
        handlevisiblity()

    }


    return (
        <>

            <div className='relative w-full'>


                <div className='w-full' >
                    <div className={" h-full absolute bg-black/30  z-30 w-full " + (visible ? "visible" : "invisible")} >
                        <div className={"bg-white px-10 flex justify-end  w-[40%] absolute z-40 h-full duration-700 box-shadow " + (visible ? "left-0" : "-left-full")}>
                            <div className='flex flex-col w-[75%] mt-3' >


                                <p className="text-2xl font-bold cursor-pointer mb-3 w-[10%]" onClick={handlevisiblity}><IoClose /></p>
                                <input type="text" className='focus:outline-none border focus:shadow p-5 text-black' placeholder='Search your city' onChange={(e) => searchresultFunc(e.target.value)} />
                                <div className='border p-5 mt-2'>
                                    <ul>
                                        {

                                            searchresult.map((data, index) => {
                                                const isLast = (index === searchresult.length - 1)
                                                return (
                                                    <div key={index} className='flex items-center   gap-4'  >
                                                        <div className='text-lg'><IoLocationOutline /></div>
                                                        <li className='cursor-pointer my-2 w-full ' onClick={() => fetchLatandLon(data.place_id)}>
                                                            {data.structured_formatting.main_text}
                                                            <p className='text-sm opacity-65'>{data.structured_formatting.secondary_text}</p>
                                                            {!isLast && <p className='border border-dashed mt-2 border-black/50 w-full '></p>}

                                                        </li>
                                                    </div>
                                                )
                                            })
                                        }


                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>



                <div className="w-full shadow-md flex justify-center items-center sticky bg-white z-20 top-0">
                    <div className='h-fit w-[70%] flex justify-between lg:flex-col '>


                        <div className='flex items-center'>
                            <Link to={'/'}>
                                <img src={logo} alt="" className='w-24 ' />
                            </Link>
                            <div className='flex  items-end cursor-pointer' onClick={handlevisiblity}>
                                <p className='flex items-center'>
                                    <span className='font-bold border-b-2 border-black '> other</span>
                                    <span className='  w-24 text-xs text-gray-600 font-bold ml-2 line-clamp-1 '>  {adress}</span></p>
                                <div> <IoIosArrowDown className='text-xl text-orange-500' /> </div>
                            </div>
                        </div>

                        <div className='flex items-center gap-6 lg:flex-wrap'>
                            {
                                navItem.map((data, index) => (
                                    <Link to={data.path}>
                                        <div key={index} className='flex gap-1 items-center  text-gray-700 hover:text-orange-500 cursor-pointer'>
                                            <div >{data.image}</div>
                                            <p className='text-md font-semibold  '>{data.name}</p>
                                            {data.name === "Cart" &&
                                                <p>{cartData.length}</p>}

                                        </div>
                                    </Link>

                                ))
                            }

                        </div>
                    </div>

                </div>

                <Outlet />

            </div>
        </>
    )
}

export default Head