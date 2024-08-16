import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { MdStars } from "react-icons/md";
import { FiSearch } from "react-icons/fi"
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { CartContaxt, Coordinate, ResInfo } from '../context/ContextAPI';
import toast from 'react-hot-toast';
import ATCbtn from './ATCbtn';
import MenuShimmer from './MenuShimmer'
import Footer from './Footer'


const RestaurantMenu = ({ data = [] }) => {


  const { id } = useParams()
  let mainId = (id.split('-').at(-1))


  const { resInfo, setresInfo } = useContext(ResInfo)
  const [menuData, setmenuData] = useState([])
  const [discountData, setdiscountData] = useState([])
  const [topPicks, settopPicks] = useState(null)
  const { coord: { lat, lng } } = useContext(Coordinate)

  // const [currentidx, setcurrentidx] = useState(0)

  // console.log(menuData)

  async function fetchmenu() {
    let data = await fetch(`https://cors-by-codethread-for-swiggy.vercel.app/cors/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainId}&catalog_qa=undefined&submitAction=ENTER`);
    let res = await data.json();

    // console.log(res)
    const resInfo = res?.data?.cards.find((data) =>
      data?.card?.card?.["@type"].includes("food.v2.Restaurant"))?.card?.card?.info
    // console.log(resInfo)

    const DiscountInfo = res?.data?.cards.find((data) =>
      data?.card?.card?.["@type"].includes("v2.GridWidget"))?.card?.card?.gridElements?.infoWithStyle?.offers

    setresInfo(resInfo)
    setdiscountData(DiscountInfo)

    let actualMenu = res?.data?.cards.find((data) => data?.groupedCard)
    // console.log(actualMenu)
    setmenuData(actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((data) => data?.card?.card?.itemCards || data?.card?.card?.categories))




    // settopPicks()

    settopPicks((actualMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter((data) => data.card.card.title == "Top Picks")[0])
  }

  useEffect(() => {

    fetchmenu();

  })


  const [value, setValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const minCards = 20;
  const maxCards = 40;

  useEffect(() => {

    const itemWidth = minCards || maxCards;
    let totalItems = data.length;


    if (totalItems < minCards) totalItems = minCards;
    if (totalItems > maxCards) totalItems = maxCards;

    const maxItemsInView = Math.floor(100 / itemWidth);
    const maxScrollValue = (totalItems - maxItemsInView) * itemWidth;
    setMaxValue(maxScrollValue > 0 ? maxScrollValue : 0);
  }, [data]);

  function handleNext() {
    if (value < maxValue) {
      setValue(prev => prev + minCards || maxCards);
    }
  }

  function handlePrev() {
    if (value > 0) {
      setValue(prev => prev - minCards || maxCards);
    }
  }


  const [valuecard, setValuecard] = useState(0);
  const [maxValuedata, setMaxValuedata] = useState(0);
  const minCardsdata = 20;
  const maxCardsdata = 40;

  useEffect(() => {

    const itemWidth = minCardsdata || maxCardsdata;
    let totalItems = data.length;


    if (totalItems < minCardsdata) totalItems = minCardsdata;
    if (totalItems > maxCardsdata) totalItems = maxCardsdata;

    const maxItemsInView = Math.floor(100 / itemWidth);
    const maxScrollValue = (totalItems - maxItemsInView) * itemWidth;
    setMaxValuedata(maxScrollValue > 0 ? maxScrollValue : 0);
  }, [data]);

  function handleNextcard() {
    if (value < maxValue) {
      setValuecard(prev => prev + minCardsdata || maxCardsdata);
    }
  }

  function handlePrevcard() {
    if (value > 0) {
      setValuecard(prev => prev - minCardsdata || maxCardsdata);
    }
  }
  // function toggleFunc(i){
  //  setcurrentidx(i === currentidx   ?  null : i )

  // }


  return (
    <>
      <div className='w-full relative'>

        {
          menuData.length ?
            <div className="mx-auto w-[750px] md:w-[95%]">
              <p className='py-8 text-[12px]  text-slate-500 cursor-pointer'><Link to='/'> <span className='hover:text-slate-900 '>Home  </span></Link> / <Link to='/'> <span className='hover:text-slate-900 '>{resInfo?.city}</span> </Link>   / <span className='text-slate-700'>{resInfo?.name}</span></p>
              <h1 className='font-bold pl-3 text-2xl'>{resInfo.name}</h1>




              <div className='w-full h-[206px]  bg-gradient-to-t from-[#DCDCE4]/70 mt-3 px-4 pb-4 rounded-[40px]'>

                {/*              restaurant details start from  here                 */}


                <div className='w-full border border-[#DCDCE4]/70 h-full rounded-[30px] bg-white'>
                  <div className=' p-4'>
                    <div className='flex items-center gap-1 font-bold'>
                      <MdStars className='text-green-600' />
                      <span>{resInfo.avgRating}</span>
                      <span>({resInfo.totalRatingsString})</span>
                      <span> . {resInfo.costForTwoMessage}</span>
                    </div>
                    <p className='text-[#ff5200] text-sm font-bold underline'>{resInfo?.cuisines?.join(', ')}</p>
                    <div className='mt-3' >
                      <div className='flex gap-2'>
                        <div className='w-[9px] flex flex-col justify-center items-center'>
                          <div className='w-[7px] h-[7px] bg-gray-500 rounded-full'></div>
                          <div className='w-[1px] h-[25px] bg-gray-500'></div>
                          <div className='w-[7px] h-[7px] bg-gray-500 rounded-full'></div>
                        </div>
                        <div className=' text-sm gap-2 flex flex-col font-semibold'>
                          <div className='flex  gap-2'>
                            <p>Outlet</p>
                            <span className='text-gray-500 font-normal'>{resInfo.areaName}</span>
                          </div>
                          <p className='text-sm'>{resInfo?.sla?.slaString}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className='p-4 '>
                    <div className='flex items-center'>
                      <img className='w-6' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/${resInfo.feeDetails?.icon}`} alt="" />
                      <span className='ml-3 sm:text-sm  '>Order Above 149 for discounted delivery fee</span>

                    </div>
                  </div>
                </div>

                {/*              restaurant details ends here                 */}


                {/*             Deals for you start from here                 */}

                <div className='w-full relative'>
                  <div className='flex justify-between mt-8'>
                    <h1 className='text-xl font-bold'>Deals  for you</h1>
                    <div className='flex gap-2 '>
                      <div onClick={handlePrev} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ` + (value <= 0 ? "bg-gray-100" : "text-gray-200")}>
                        <FaArrowLeft className={value <= 0 ? " text-gray-300" : "text-gray-800"} />
                      </div>
                      <div onClick={handleNext} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ` + (value >= maxValue ? "bg-gray-100" : "text-gray-200")}>
                        <FaArrowRight className={value >= maxValue ? " text-gray-300" : "text-gray-800"} />
                      </div>
                    </div>
                  </div>

                  <div className='flex overflow-hidden gap-4 mt-4 '>
                    {

                      discountData.map((data, index) => (

                        <Discount key={index} data={data} value={value} />
                      ))

                    }
                  </div>

                  {/*             Deals for you End from here                 */}




                  <div className="text-center mt-5 font-semibold text-gray-500 text-sm">
                    M E N U
                  </div>

                  <Link to={'/search'}>
                    <div className="w-full cursor-pointer relative bg-[#F2F2F3] p-4 rounded-xl text-lg text-gray-500 font-semibold  text-center mt-5">
                      Search for fishes
                      < FiSearch className='absolute top-5 right-5 text-2xl z-1' />
                    </div>
                  </Link>


                  {/*             Top picks  start from here                 */}

                  {
                    topPicks &&
                    <div className='w-full overflow-hidden'>
                      <div className='flex justify-between mt-8'>
                        <h1 className='text-xl font-bold'>{topPicks.card.card.title}</h1>
                        <div className='flex gap-2 '>
                          <div onClick={handlePrevcard} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ` + (valuecard <= 0 ? "bg-gray-100" : "text-gray-200")}>
                            <FaArrowLeft className={valuecard <= 0 ? " text-gray-300" : "text-gray-800"} />
                          </div>
                          <div onClick={handleNextcard} className={`cursor-pointer rounded-full w-9 h-9 flex justify-center items-center bg-gray-200 ` + (valuecard >= maxValuedata ? "bg-gray-100" : "text-gray-200")}>
                            <FaArrowRight className={valuecard >= maxValuedata ? " text-gray-300" : "text-gray-800"} />
                          </div>
                        </div>
                      </div>
                      <div className='flex overflow-hidden gap-4 mt-4 '>
                        {

                          topPicks.card.card.carousel.map(({ creativeId, dish: { info: { defaultPrice, price } } }, index) => (
                            <div key={index} className=' relative min-w-[254px] h-[264px] duration-500' style={{ transform: `translateX(-${valuecard}%)` }}>
                              <img className='w-full h-full ' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_292,h_300/" + creativeId} alt="" />
                              <div className='absolute bottom-0 text-white flex justify-between w-full p-3'>
                                <p>₹{defaultPrice / 100 || price / 100}</p>
                                <button className='bg-white cursor-pointer text-lg border px-9  rounded-lg  text-[#1ba672] font-bold hover:bg-[#D9DADB]'>ADD</button>
                              </div>
                            </div>
                            // <Discount data={data} /> 
                          ))

                        }
                      </div>

                    </div>
                  }
                  {/*             Top picks  end from here                 */}




                  {/*             recomanded and other menus start from here                */}



                  <div className='mt-5'>
                    {menuData.map(({ card: { card } }, index) => (
                      <Menucard key={index} card={card} resInfo={resInfo} />))}
                  </div>
                </div>
              </div>
            </div>
            :
            <MenuShimmer />
        }


      </div>



    </>
  )
}
function Menucard({ card, resInfo }) {

  let hello = false;
  if (card["@type"]) {
    hello = true
  }

  const [IsOpen, setIsOpen] = useState(hello)

  function toggleDrop() {
    setIsOpen((prev) => !prev)
  }

  if (card.itemCards) {
    const { title, itemCards } = card
    return (
      <>
        <div>
          <div className='flex justify-between mt-4'>
            <h1 className={'font-bold text-' + (card["@type"] ? 'xl' : 'base')}>{title} ({itemCards.length})</h1>
            {
              IsOpen && <IoIosArrowUp className='cursor-pointer text-xl' onClick={toggleDrop} /> || <IoIosArrowDown className='cursor-pointer text-xl' onClick={toggleDrop} />
            }
          </div>
          {
            IsOpen && <DetailMenu itemCards={itemCards} resInfo={resInfo} />
          }

        </div>

        <hr className={'mt-5 border-[#F2F2F3] border-' + (card["@type"] ? '[8px]' : '[4px]')} />
      </>
    )

  }
  else {
    const { title, categories } = card;
    return (
      <div>
        <h1 className='text-xl font-semibold mt-3'>{title}</h1>
        {
          categories.map((data, index) => (
            <div className='' key={index}>
              <Menucard card={data} resInfo={resInfo} />
            </div>
          ))
        }
      </div>

    )

  }
}

function DetailMenu({ itemCards, resInfo }) {
  return (
    <div>
      {
        itemCards.map(({ card: { info } }, index) => (
          <DetailMenuCard key={index} info={info} resInfo={resInfo} />
        ))
      }
    </div>
  )
}

function DetailMenuCard({ info, resInfo }) {

  const {
    name,
    defaultPrice,
    price,
    itemAttribute,
    offerTags,
    ratings: { aggregatedRating: { ratingCountV2, rating } },
    description = " ",
    imageId,
    id
  } = info


  const { cartData, setcartData } = useContext(CartContaxt)


  const [isDiffRes, setisDiffRes] = useState(false)
  function handleIsDiffRes() {
    setisDiffRes((prev) => !prev)
  }
  function clearcart() {
    setcartData([])
    localStorage.clear()
    handleIsDiffRes()
  }

  const [ismore, setismore] = useState(false)
  let trimdis = description.substring(0, 130) + "..."

  let veg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh71sfIQVPk_TuhnuWB0Q1E6FlciHqRH-wRA&s";
  let noneveg = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Non_veg_symbol.svg/768px-Non_veg_symbol.svg.png"
  return (

    <div className='my-5'>
      <>
        <div className='flex items-center justify-between mt-5 w-full min-h-[182px]' >
          <div className='w-[70%] md:w-[60%] sm:w-[60%]' >
            <img className='w-5 rounded-sm' src={(itemAttribute && itemAttribute.vegClassifier === "VEG" ? veg : noneveg)} alt="" />
            <h1 className='text-lg font-semibold sm:text-base'>{name}</h1>
            <p className='text-lg font-semibold sm:text-base'>₹{defaultPrice / 100 || price / 100}</p>
            <p className='flex items-center gap-1'><IoIosStar className='text-green-700' /><span className='text-green-600'>{rating}({ratingCountV2})</span> </p>
            {
              description.length > 130 ?
                <div>
                  <span className='md:line-clamp-2'>{ismore ? description : trimdis}</span>
                  <button className='font-semibold text-gray-400 md:hidden' onClick={() => { setismore(!ismore) }}>{ismore ? "less" : "more"}</button>

                </div>
                :
                <span className='sm:text-sm'>{description}</span>


            }
          </div>

          <div className='w-[20%] md:w-[30%] sm:w-[35%]  relative h-full'>
            <img className='rounded-xl' src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/" + imageId} alt="" />
            <ATCbtn info={info} resInfo={resInfo} handleIsDiffRes={handleIsDiffRes} />
          </div>
          <hr className='mt-5' />
        </div>
        {
          isDiffRes && (

            <div className='w-[520px] h-[204px] bottom-10 left-[28%] fixed shadow-xl z-40 bg-white p-7'>
              <h1 className='text-[18px] text-[#282c3f] font-bold'>Item already in cart</h1>
              <p className='text-[14px] text-[#535665]'>Your cart contains items from other restaurant. Would you like to reset your cart for adding items from this restaurant?</p>
              <div className='w-full flex gap-5 mt-6'>
                <button onClick={handleIsDiffRes} className='w-1/2 border-[3px] border-[#51a239] py-3 bg-white text-[#60b246] font-semibold text-[16px]'>No</button>
                <button onClick={clearcart} className='w-1/2 border-[3px] border-[#60b246] py-3 bg-[#60b246] text-white font-semibold text-[16px]'>Yes, Start A Fresh</button>
              </div>
            </div>
          )
        }
      </>


    </div>
  )
}

function Discount({ data: { info: { header, offerLogo, couponCode } }, value }) {
  // console.log(data)
  return (
    <>

      <div className='flex  p-3 border rounded-xl min-w-[328px] h-[76px] duration-500   ' style={{ transform: `translateX(-${value}%)` }}>
        <div className='flex gap-2 ' >

          <img className='' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/${offerLogo}`} alt="" />

          <div>
            <div className='font-bold text-md'>{header}</div>
            <div className='font-semibold text-md text-gray-400'>{couponCode}</div>
          </div>
        </div>
      </div>
    </>

  )
}



export default RestaurantMenu