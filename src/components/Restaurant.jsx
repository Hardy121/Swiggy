import React from 'react'

const Restaurant = ({
    data: {
        card: {
            card: {
                info: {
                    id,
                    avgRating,
                    sla: { slaString },
                    name,
                    cloudinaryImageId,
                    costForTwoMessage,
                    promote = false,
                    cuisines,
                }
            },
        },
    }
}) => {
    return (
        <>
            <div className='bg-red-500 m-4'>
                <h1>{name}</h1>
            </div>
        </>
    )
}

export default Restaurant