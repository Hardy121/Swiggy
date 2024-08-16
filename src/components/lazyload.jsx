const RestaurantCard = lazy(() => import('./RestaurantCard'));

import React, { lazy, Suspense } from 'react';

import React from 'react'
const lazyload = ({ restaurantInfo }) => {

    return (
        <>

            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    {restaurantInfo.map((info) => (
                        <RestaurantCard key={info.id} {...info} />
                    ))}
                </Suspense>
            </div>


        </>
    )
}

export default lazyload

