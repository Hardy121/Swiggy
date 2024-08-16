import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='w-full bg-[#F0F0F5] mt-10  '>
                <div className=' w-full gap-4 flex-wrap   flex-col   mx-auto h-fit py-5 flex justify-center items-center'>

                    <div className='text-2xl font-bold '>For better experience,download the Swiggy app now</div>
                    <div>
                        <div className='w-40 flex justify-center '>
                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/play_store.png" alt="" />
                            <img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/portal/m/app_store.png" alt="" />
                        </div>
                    </div>
                </div>
                <footer>
                    <div className=' text-white py-10 w-full grid grid-cols-4 md:grid-cols-2 md:px-5 px-20 bg-[#02060C] place-items-center content-center h-fit'>
                        <div className='b'>
                            <h1 className='font-bold text-3xl '>Swiggy</h1>
                            <p className='text-[#9A9B9E] mt-3'>© 2024 Bundl Technologies Pvt. Ltd</p>
                        </div>
                        <div className=''>
                            <h1 className='text-xl font-bold text-[#EBEBEC]'>legal</h1>
                            <ul className='text-[#9A9B9E] mt-3 font-semibold'>
                                <li>Tearms & Conditions</li>
                                <li>Cookie Policy</li>
                                <li>Privacy Policy</li>
                                <li>Investor Relations </li>
                            </ul>
                        </div>
                        <div className=''>
                            <h1 className='text-xl font-bold text-[#EBEBEC] '>We deliver to:</h1>
                            <ul className='text-[#9A9B9E] mt-3 font-semibold'>
                                <li>Bangalore</li>
                                <li>   Delhi</li>
                                <li> Mumbai</li>
                                <li> Pune</li>

                            </ul>
                        </div>
                        <div className=''>
                            <h1 className='text-xl font-bold text-[#EBEBEC]' >Contact us</h1>
                            <ul className='text-[#9A9B9E] mt-3 font-semibold'>
                                <li>Help & Support</li>
                                <li>Partner with us</li>
                                <li>  Ride with us</li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer