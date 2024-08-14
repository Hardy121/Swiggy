import React from 'react'

const Shimmer = () => {
  return (
    <>
      <div className='w-full'>
        <div className='w-full bg-slate-800 h-[300px] flex justify-center items-center flex-col '>
          <div className='relative'>
            <img className='w-10 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/icecream_wwomsa" alt="" />
            <span className ="loader "></span>
          </div>
          <h1 className='text-white text-2xl'>Looking for great food near you</h1>
        </div>
        <div className='w-[70%] mx-auto md:w-[full] grid grid-cols-3 gap-10 '>
          {
            Array(10).fill("").map((data) => <div>
              <div className='mt-3 w-[295px] h-[182px] xs:min-w-[200px] xs:h-[150px] bg-[#D9DADB] rounded-md animate '></div>
              <div className='mt-3 w-[205px] h-[12px] xs:min-w-[200px] xs:h-[10px] bg-[#D9DADB] animate '></div>
              <div className='mt-3 w-[195px] h-[12px] xs:min-w-[200px] xs:h-[10px] bg-[#D9DADB] animate '></div>
            </div>  )
          }
        </div>
      </div>
    </>
  )
}

export default Shimmer