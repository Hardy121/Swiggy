import React, { useContext, useState } from 'react'
import logo from '../assets/images/logo.png'
import { IoIosArrowDown } from "react-icons/io";
import { PiHandbag } from "react-icons/pi";
import { IoIosHelpBuoy } from "react-icons/io";
import { FiSearch } from "react-icons/fi"
import { BiSolidOffer } from "react-icons/bi";
import { IoCartSharp } from "react-icons/io5";
import { IoMdLogIn } from "react-icons/io";
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { CartContaxt, Coordinate, Visibility } from '../context/ContextAPI';
import { IoClose } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import authSlice from '../utils/authSlice';
import SignInPage from './SignInPage';


const Head = () => {
    const navItem = [
        // {
        //     name: " Corporate",
        //     image: <PiHandbag />,
        //     path: "/corporate"
        // },
        {
            name: "Search",
            image: <FiSearch />,
            path: "/search"

        },
        // {
        //     name: "Offers",
        //     image: <BiSolidOffer />,
        //     path: "/offers"

        // },
        // {
        //     name: "Help",
        //     image: <IoIosHelpBuoy />,
        //     path: "/help"

        // },
        {
            name: "Sign in",
            image: <IoMdLogIn />,
            path: "/signin"

        },
        {
            name: "Cart",
            image: <IoCartSharp />,
            path: "/cart"

        }

    ]

    
    function handlelogin(){
        setloginvisible((prev) => !prev)
    }

    const userData = useSelector((state) => state.authSlice.userData)

    const { visible, setvisible } = useContext(Visibility)
    const { loginvisible, setloginvisible  } = useContext(Visibility)
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

            <div className='w-full' >
                <div className={" h-full absolute bg-black/30  z-30 w-full " + (visible ? "visible" : "invisible")} >
                    <div className={"bg-white px-10 lg:px-0 lg:justify-center flex justify-end  md:w-full w-[40%] absolute z-40 h-full duration-700 box-shadow " + (visible ? "left-0" : "-left-full")}>
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

            <div className='w-full' >
                <div className={" h-full absolute bg-black/30  z-30 w-full " + (loginvisible ? "visible" : "invisible")} >
                    <div className={"bg-white px-10 flex justify-start lg:w-full w-[35%] fixed z-40 h-full duration-700 box-shadow " + (loginvisible ? "right-0" : "-right-full")}>
                        <div className='flex flex-col w-[80%] mt-3' >
                            <p className="text-2xl font-bold cursor-pointer mb-3 w-[10%]" onClick={handlelogin}><IoClose /></p>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-2xl font-bold border-b-[1.5px] border-black pb-2 w-8'>Login</h2>
                                <img className='w-20' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r" alt="" />
                            </div>
                            <SignInPage/>
                            <p className='text-xs opacity-65 mt-2'>By clicking on Login, I accept the Terms & Conditions & Privacy Policy</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='relative w-full'>
                <div className="w-full shadow-md flex justify-center items-center sticky  bg-white z-20 top-0">
                    <div className='h-fit w-[70%] flex justify-between  md:w-full md:my-2  '>

                        <div className='flex items-center justify-center '>
                            <div  className='w-24 ' >
                            <Link to={'/'}>
                                <img src={logo} alt=""/>
                            </Link>
                            </div>
                            <div className='flex  items-end cursor-pointer' onClick={handlevisiblity}>
                                <p className='flex items-center'>
                                    <span className='font-bold border-b-2 border-black '> other</span>
                                    <span className=' max-w-[250px]  text-xs text-gray-600 font-bold ml-2 line-clamp-1 '>  {adress}</span></p>
                                <div> <IoIosArrowDown className='text-xl text-orange-500' /> </div>
                            </div>
                        </div>

                        <div className='flex items-center gap-6 md:gap-0'>
                            {
                                navItem.map((data, index) => (
                                    data.name == "Sign in" ?
                                        <div onClick={handlelogin} >
                                            <div key={index} className='flex gap-1 items-center  text-gray-700 hover:text-orange-500 cursor-pointer'>

                                                {userData ? <img className='w-7 h-7 rounded-full' src={userData.photo} alt="" /> :

                                                    <div >{data.image}</div>
                                                }


                                                <p className='text-md font-semibold  md:hidden'>{userData ? userData.name : data.name}</p>



                                                {data.name === "Cart" &&
                                                    <p>{cartData.length}</p>}

                                            </div>
                                        </div> :
                                        <Link to={data.path}>
                                            <div key={index} className='flex  items-center px-5 md:px-4  text-gray-700 hover:text-orange-500 cursor-pointer'>
                                                <div >{data.image}</div>
                                                <p className='text-md font-semibold md:hidden '>{data.name}</p>
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