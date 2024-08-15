import { useContext, useEffect, useState } from "react"
import { Coordinate } from "../context/ContextAPI"


function useRestaurantData() {

    const { coord: { lat, lng } } = useContext(Coordinate)
    const [OnYourMindData, setOnYourMindData] = useState([])
    const [TopRestaurantData, setTopRestaurantData] = useState([])
    const [TopResTitle, setTopResTitle] = useState("")
    const [DlvResTitle, setDlvTitle] = useState("")
    const [data, setdata] = useState({})


    async function fetchData() {
        const data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`)
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
        console.log(data2)
        // console.log(result)
        // console.log(data2 , mainData)

    }

    useEffect(() => {
        fetchData()
    }, [lat, lng])

    return [OnYourMindData, TopRestaurantData, TopResTitle, DlvResTitle, data]
}

export default useRestaurantData
