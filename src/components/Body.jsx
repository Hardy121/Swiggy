import React, { useEffect, useState } from 'react'
import OnMind from './onMind'
import TopRestaurant from './TopRestaurant'
import OnlineFoodDlv from './OnlineFoodDlv'
const Body = () => {

    const [OnYourMindData, setOnYourMindData] = useState([])
    const [TopRestaurantData, setTopRestaurantData] = useState([])
    async function fetchData() {
        const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.18880&lng=72.82930&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING')
        const result = await data.json();
        // console.log(result?.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setTopRestaurantData(result?.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setOnYourMindData(result?.data.cards[0]?.card?.card?.imageGridCards?.info)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (<>
        <div className="w-full">
            <div className="mx-auto w-[75%]  mt-3 overflow-hidden">
                < OnMind data={OnYourMindData} />
                <TopRestaurant data={TopRestaurantData} />
                <OnlineFoodDlv data={TopRestaurantData} />
            </div>

        </div>


    </>
    )
}

export default Body