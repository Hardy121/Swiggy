import React from 'react'

const MenuShimmer = () => {
    return (
        <>
            <div className='w-[750px] md:w-full h-full mx-auto'>
                <div className='flex gap-4  mt-10'>
                    <div className='w-full h-[206px] sm:h-[100px]  rounded-3xl animate'></div>
                </div>
                <div className='flex gap-3 mt-4'>
                    <div className='w-1/2 h-[80px]  rounded-xl animate'></div>
                    <div className='w-1/2 h-[80px]  rounded-xl animate'></div>

                </div>

                <div className='w-full h-[80px] mt-4  rounded-lg animate'></div>

                <div className='w-full'>

                    {
                        Array(10).fill("").map((data,index) => <div className='w-full h-40 flex justify-between mt-5'>
                            <div key={index} className='w-[60%] h-full'>
                                <div className='h-5 my-4 rounded-sm w-full animate'></div>
                                <div className='h-5 my-4 rounded-sm w-[75%] animate'></div>
                                <div className='h-5 my-4 rounded-sm w-1/2 animate'></div>
                            </div>
                            <div className='w-[30%] h-full animate rounded-lg'>

                            </div>
                        </div>)
                    }

                </div>

            </div>
        </>
    )
}

export default MenuShimmer