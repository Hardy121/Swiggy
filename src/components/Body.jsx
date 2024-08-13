import React, { useContext, useEffect, useState } from 'react'
import OnMind from './onMind'
import TopRestaurant from './TopRestaurant'
import OnlineFoodDlv from './OnlineFoodDlv'
import { Coordinate } from '../context/ContextAPI'
import { useSelector } from 'react-redux'
import filterSlice from '../utils/filterSlice'
const Body = () => {

    const [OnYourMindData, setOnYourMindData] = useState([])
    const [TopRestaurantData, setTopRestaurantData] = useState([])
    const { coord: { lat, lng } } = useContext(Coordinate)
    const [TopResTitle, setTopResTitle] = useState("")
    const [DlvResTitle, setDlvTitle] = useState("")
    const [data, setdata] = useState({})


    async function fetchData() {
        const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        // const other = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=Pizza&trackingId=undefined&submitAction=ENTER&queryUniqueId=abce1bbd-a947-b031-e331-a8001a925e5e&selectedPLTab=RESTAURANT`)
        // const otherresult = await other.json()
        const result = await data.json();
        setTopRestaurantData(result?.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setOnYourMindData(result?.data.cards[0]?.card?.card?.imageGridCards?.info)
        setTopResTitle(result?.data.cards[1]?.card?.card?.header?.title)
        setDlvTitle(result?.data.cards[2]?.card?.card?.title)
        setdata(result.data)
        // console.log(result.data)
    }

    useEffect(() => {
        fetchData()
    }, [lat, lng])


    if (data.communication ) {
        return <div className='flex justify-center text-center items-center flex-col mt-10'>
            <img className='w-1/5' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
            <h1 className='font-bold text-2xl'>Location Unserviceable</h1>
            <p className='tracking-tight  text-gray-500 text-lg'>We don't have any services here till now. Try changing location.</p>
        </div>
    }


    const filterVal = useSelector((state) => state.filterSlice.filterVal);
    


    const filterdData = TopRestaurantData.filter(item => {
        if (!filterVal) return true ; 
            
        switch (filterVal) {
            case "Ratings 4.0+": return item?.info?.avgRating > 4
            // case "Offers": return 
            case "Rs.300- Rs.600 ": return item?.info?.costForTwo?.slice(1,4) >= 300 && item?.info?.costForTwo?.slice(1,4) <=600
            case "Less than 300" :  return item?.info?.costForTwo?.slice(1,4) <= 300
            default : return true
                
        }
    })
    
    return (<>

        <div className="w-full">
            <div className="mx-auto md:w-full md:px-5 w-[75%] sm:px-2   mt-3 overflow-hidden">
                < OnMind data={OnYourMindData} />
                <TopRestaurant data={TopRestaurantData} TopResTitle={TopResTitle} />
                <OnlineFoodDlv data={filterVal ? filterdData : TopRestaurantData} DlvResTitle={DlvResTitle} />
            </div>

        </div>

        
        
        
            
        
        
            
    
    </>
    )
}


export default Body