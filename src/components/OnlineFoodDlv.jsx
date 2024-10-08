import React, { useState } from 'react'
import RestaurantCard from './RestaurantCard'
import { IoCloseOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../utils/filterSlice';

const OnlineFoodDlv = ({ data, DlvResTitle }) => {
    const dispatch = useDispatch()
    const [activebtn, setactivebtn] = useState(null)
    const filteroption = [
        {
            filterbtn: "Filter"
        },
        {
            filterbtn: "Ratings 4.0+"
        },
        // {
        //     filterbtn: "Offers"
        // },
        {
            filterbtn: "Rs.300- Rs.600 "
        },
        {
            filterbtn: "Less than 300"
        },

    ]


    function handleFilterBtn(filterbtn) {
        setactivebtn(activebtn === filterbtn ? null : filterbtn)
    }
    dispatch(setFilterValue(activebtn))

    return (
        <>
            <div className='text-2xl font-bold'>{DlvResTitle}</div>

            <div  className={'flex flex-wrap gap-4 my-5'}>
                {
                    filteroption.map((data, index) => (

                        <button key={index} onClick={() => handleFilterBtn(data.filterbtn)}  className={`FilterBtn ${(activebtn === data.filterbtn ? 'actived' : "")}`}>
                            <p>{data.filterbtn}</p>
                            <IoCloseOutline className='mt-[1.5px] font-bold text-lg hidden crossed' />
                        </button>

                    ))
                }

            </div>


            <div className='grid grid-cols-3      sm:grid-cols-2 xs:grid-cols-2 xd:grid-cols-1 md:grid-cols-2   lg:grid-cols-2 xl:grid-cols-2  2xl:grid-cols-4 gap-10 mt-5'>
                {
                    data.map(({ info, index, cta: { link } }) => (

                        <div key={index} className='hover:scale-95 duration-300'>
                            <RestaurantCard {...info} link={link} />
                        </div>
                    ))
                }
            </div>

        </>
    )
}

export default OnlineFoodDlv