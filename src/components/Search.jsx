import React, { useContext, useEffect, useState } from 'react'
import { Coordinate } from '../context/ContextAPI'
import { data } from 'autoprefixer'
import Dishes from './Dishes'
import Restaurant from './Restaurant'
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiSearch2Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux'
import { resetSimilarResDish, toggleIsSimilarDishes } from '../utils/toogleSlice'
import { withHoc } from './Restaurant'


const Search = () => {
    const [activebtn, setactivebtn] = useState("Dishes")
    const [searcQuery, setsearcQuery] = useState("")
    const [dishes, setdishes] = useState([])
    const [restaurantData, setrestaurantData] = useState([])
    const [selectedResDish, setSelectedResDish] = useState(null)
    const [similarResDishes, setSimilarResDishes] = useState([])
    const { coord: { lat, lng } } = useContext(Coordinate)


    const PromotedRes = withHoc(Restaurant);

    const filteroption = [
        {
            filterbtn: "Restaurant"
        },
        {
            filterbtn: "Dishes"
        },


    ]
    function handleFilterBtn(filterbtn) {
        setactivebtn(activebtn === filterbtn ? activebtn : filterbtn)
    }

    async function fetchfood() {
        let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searcQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=abce1bbd-a947-b031-e331-a8001a925e5e`)
        let res = await data.json()
        let finalData = (res?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(data => data?.card?.card?.info)
        setdishes(finalData)


    }

    async function fetchrestaurant() {
        let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searcQuery}&trackingId=undefined&submitAction=ENTER&queryUniqueId=abce1bbd-a947-b031-e331-a8001a925e5e&selectedPLTab=RESTAURANT`)
        let res = await data.json()
        let finalData = (
            (res?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(data => data?.card?.card?.info)
        )
        setrestaurantData(finalData)
    }


    const { isSimilarResDishes, city, resLocation, resId, itemId } = useSelector((state) => state.toogleSlice.similarResDish)
    // console.log({ isSimilarResDishes, city, resLocation, resId, itemId })
    const dispatch = useDispatch()

    useEffect(() => {
        if (isSimilarResDishes) {
            fetchSimilarResDishes()
        }
    }, [isSimilarResDishes])


    async function fetchSimilarResDishes() {

        let pathName = `/city${city}/${resLocation}`
        let encodedpath = encodeURIComponent(pathName)
        console.log(encodedpath)

        let data = await fetch(`${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searcQuery}&trackingId=undefined&submitAction=ENTER&selectedPLTab=dish-add&restaurantMenuUrl=${encodedpath}-rest${resId}%3Fquery%3D${searcQuery}&restaurantIdOfAddedItem=${resId}&itemAdded=${itemId}`)
        let res = await data.json()

        // console.log(res?.data?.cards[1])
        setSelectedResDish(res?.data?.cards[1])

        // console.log(res?.data?.cards[2]?.card?.card?.cards)
        setSimilarResDishes(res?.data?.cards[2]?.card?.card?.cards)

        dispatch(resetSimilarResDish())
    }

    useEffect(() => {
        if (searcQuery == "") {
            return
        }
        // setsearcQuery("")
        fetchfood(),
            fetchrestaurant()
    }, [searcQuery])

    let x = ""
    function handleSearchQuery(e) {
        let val = e.target.value
        // console.log(e.keyCode)
        setsearcQuery(val)
        if (e.keyCode == 13) {

            setsearcQuery(val)
            setSelectedResDish(null)
            setdishes([])
        }
    }


    return (
        <>
            <div className='w-[800px] md:w-full mx-auto mt-5'>
                <div className=' '>
                    <div className='md:px-10 w-full relative'>

                        <RiArrowLeftSLine className='absolute top-1/2 text-xl left-2 cursor-pointer  -translate-y-1/2' />

                        <input
                            onKeyDown={handleSearchQuery}
                            // onChange={(e) => setsearcQuery(e.target.value)}
                            className='border-[1.5px] w-full px-8 py-3 focus:outline-none focus:shadow-md focus:font-semibold '
                            type="text"
                            placeholder='Search for restaurant and food' />

                        <RiSearch2Line className='cursor-pointer absolute right-5 top-1/2 -translate-y-1/2  text-xl m' />

                    </div>

                    {!selectedResDish &&

                        <div className={'flex flex-wrap gap-4 my-5'}>
                            {
                                filteroption.map((data, index) => (

                                    <button onClick={() => handleFilterBtn(data.filterbtn)} key={index} className={`FilterBtn ${(activebtn === data.filterbtn ? 'actived2' : "")} `}>
                                        <p>{data.filterbtn}</p>
                                    </button>

                                ))
                            }

                        </div>
                    }

                    <div className='w-[800px] md:w-full mt-4 bg-[#F2F3F5] grid md:grid-cols-1   grid-cols-2 '>

                        {
                            selectedResDish ?
                                <>
                                    <div>
                                        <p className='p-4 text-md font-semibold'>Item added to cart</p>
                                        <Dishes data={selectedResDish.card.card} />
                                        <p className='p-4 text-md font-semibold'>More dishes from this restaurant</p> </div><br />

                                    {
                                        similarResDishes.map((data,index) => <Dishes key={index} data={{ ...data.card, restaurant: selectedResDish.card.card.restaurant }} />)
                                    }
                                </>
                                :
                                activebtn === "Dishes" ?
                                    dishes.map((data , index) => <Dishes key={index} data={data.card.card} />)
                                    :
                                    restaurantData.map((data,index) =>
                                        data?.card?.card?.info?.promoted ?
                                            <PromotedRes key={index} data={data}  /> : <Restaurant key={index} data={data} />)
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Search

