import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdStars } from "react-icons/md";

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const RestaurantMenu = () => {

  const { id } = useParams()
  let mainId = (id.split('-').at(-1))



  const [resInfo, setresInfo] = useState([])
  const [menuData, setmenuData] = useState([])
  const [discountData, setdiscountData] = useState([])


  async function fetchmenu() {
    let data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.18880&lng=72.82930&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`);
    let res = await data.json();
    // console.log(res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card)
    setresInfo(res?.data?.cards[2]?.card?.card?.info)
    setdiscountData(res?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers)
    setmenuData(res?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card)
  }

  useEffect(() => {

    fetchmenu();

  })


  const [value, setvalue] = useState(0)
  function handleNext() {
    value >= 124 ? " " : setvalue((prev) => prev + 31)
  }
  function handlePrev() {
    value <= 0 ? "" : setvalue((prev) => prev - 31)
  }


  return (
    <div className='w-full'>

      <div className="mx-auto w-[800px]">
        <p className='py-8 text-[12px]  text-slate-500 cursor-pointer'><Link to='/'> <span className='hover:text-slate-900 '>Home  </span></Link> / <Link to='/'> <span className='hover:text-slate-900 '>{resInfo?.city}</span> </Link>   / <span className='text-slate-700'>{resInfo?.name}</span></p>
        <h1 className='font-bold p-5 text-2xl'>{resInfo.name}</h1>




        <div className='w-full h-[206px]  bg-gradient-to-t from-[#DCDCE4]/70 mt-3 px-4 pb-4 rounded-[40px]'>
          <div className='w-full border border-[#DCDCE4]/70 h-full rounded-[30px] bg-white'>
            <div className=' p-4'>
              <div className='flex items-center gap-1 font-bold'>
                <MdStars className='text-green-600' />
                <span>{resInfo.avgRating}</span>
                <span>({resInfo.totalRatingsString})</span>
                <span> . {resInfo.costForTwoMessage}</span>
              </div>
              <p className='text-[#ff5200] text-sm font-bold underline'>{resInfo?.cuisines?.join(', ')}</p>
              <div className='mt-3' >
                <div className='flex gap-2'>
                  <div className='w-[9px] flex flex-col justify-center items-center'>
                    <div className='w-[7px] h-[7px] bg-gray-500 rounded-full'></div>
                    <div className='w-[1px] h-[25px] bg-gray-500'></div>
                    <div className='w-[7px] h-[7px] bg-gray-500 rounded-full'></div>
                  </div>
                  <div className=' text-sm gap-2 flex flex-col font-semibold'>
                    <div className='flex  gap-2'>
                      <p>Outlet</p>
                      <span className='text-gray-500 font-normal'>{resInfo.areaName}</span>
                    </div>
                    <p className='text-sm'>{resInfo?.sla?.slaString}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className='p-4 '>
              <div className='flex items-center'>
                <img className='w-6' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/${resInfo.feeDetails?.icon}`} alt="" />
                <span className='ml-3'>Order Above 149 for discounted delivery fee</span>

              </div>
            </div>
          </div>

          <div className='w-full'>
            <div className='flex justify-between mt-8'>
              <h1 className='text-xl font-bold'>Deals  for you</h1>
              <div className='flex gap-2 '>
                <div onClick={handlePrev} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ` + (value <= 0 ? "bg-gray-100" : "text-gray-200")}>
                  <FaArrowLeft className={value <= 0 ? " text-gray-300" : "text-gray-800"} />
                </div>
                <div onClick={handleNext} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ` + (value >= 124 ? "bg-gray-100" : "text-gray-200")}>
                  <FaArrowRight className={value >= 124 ? " text-gray-300" : "text-gray-800"} />
                </div>
              </div>
            </div>

            {

              discountData.map((data) => (

                <Discount />
              ))

            }

          </div>


        </div>
      </div>
    </div>
  )
}

function Discount() {
  return (

    <div>to is fredddd</div>

  )
}

export default RestaurantMenu