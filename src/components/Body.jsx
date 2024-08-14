import React, { useContext, useEffect, useState } from 'react'
import OnMind from './onMind'
import TopRestaurant from './TopRestaurant'
import OnlineFoodDlv from './OnlineFoodDlv'
import { Coordinate } from '../context/ContextAPI'
import { useSelector } from 'react-redux'
import filterSlice from '../utils/filterSlice'
const Body = () => {

    const { coord: { lat, lng } } = useContext(Coordinate)
    const [OnYourMindData, setOnYourMindData] = useState([])
    const [TopRestaurantData, setTopRestaurantData] = useState([])
    const [TopResTitle, setTopResTitle] = useState("")
    const [DlvResTitle, setDlvTitle] = useState("")
    const [data, setdata] = useState({})


    async function fetchData() {
        const data = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
        // const other = await fetch(`https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=Pizza&trackingId=undefined&submitAction=ENTER&queryUniqueId=abce1bbd-a947-b031-e331-a8001a925e5e&selectedPLTab=RESTAURANT`)
        // const otherresult = await other.json()
        const result = await data.json();
        setdata(result.data)
        setTopResTitle(result?.data.cards[1]?.card?.card?.header?.title)
        setDlvTitle(result?.data.cards[2]?.card?.card?.title)

        let mainData = result?.data?.cards.find(
            (data) => data?.card?.card.id == "top_brands_for_you"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        let mainData2 = result?.data?.cards.find(
            (data) => data?.card?.card.id == "restaurant_grid_listing"
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;

        // console.log(mainData, mainData2)

        setTopRestaurantData(mainData || mainData2)

        let data2 = result?.data.cards.find((data) => data?.card?.card?.id == "whats_on_your_mind"
        )?.card?.card?.imageGridCards?.info
        setOnYourMindData(data2)
        // console.log(result)
        // console.log(data2 , mainData)

    }

    useEffect(() => {
        fetchData()
    }, [lat, lng])


    if (data.communication) {
        return <div className='flex justify-center text-center items-center flex-col mt-10'>
            <img className='w-1/5' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png" alt="" />
            <h1 className='font-bold text-2xl'>Location Unserviceable</h1>
            <p className='tracking-tight  text-gray-500 text-lg'>We don't have any services here till now. Try changing location.</p>
        </div>
    }


    const filterVal = useSelector((state) => state.filterSlice.filterVal);



    const filterdData = TopRestaurantData.filter(item => {
        if (!filterVal) return true;

        switch (filterVal) {
            case "Ratings 4.0+": return item?.info?.avgRating > 4
            // case "Offers": return 
            case "Rs.300- Rs.600 ": return item?.info?.costForTwo?.slice(1, 4) >= 300 && item?.info?.costForTwo?.slice(1, 4) <= 600
            case "Less than 300": return item?.info?.costForTwo?.slice(1, 4) <= 300
            default: return true

        }
    })

    return (<>

        <div className="w-full">
            <div className="mx-auto md:w-full md:px-5 w-[75%] sm:px-2   mt-3 overflow-hidden">
                {OnYourMindData  && (
                    <>
                        < OnMind data={OnYourMindData} />
                        <TopRestaurant data={TopRestaurantData} TopResTitle={TopResTitle} />
                    </>
                ) }
                <OnlineFoodDlv data={filterVal ? filterdData : TopRestaurantData} DlvResTitle={DlvResTitle} />
            </div>

        </div>









    </>
    )
}


export default Body