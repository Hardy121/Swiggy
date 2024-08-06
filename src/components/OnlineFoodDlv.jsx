import React from 'react'
import RestaurantCard from './RestaurantCard'

const OnlineFoodDlv = ({ data , DlvResTitle }) => {


    return (
        <>
            <div className='text-2xl font-bold'>{DlvResTitle}</div>
            <div className='grid grid-cols-3     sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 mt-5'>
                {
                    data.map(({ info, index, cta:{ link } }) => (

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