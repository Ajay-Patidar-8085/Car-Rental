import React, { Suspense, lazy } from 'react'
import CardsSection from '@/Components/CardSection'
// import CarListing from '@/Components/CarListing'
import RecommendedCar from '@/Components/RecommendedCard'
import Skeleton from 'react-loading-skeleton'


const CarListingComponent = React.lazy(() => import('@/Components/CarListing'));
// const RecommendedCar = React.lazy(() => import('@/Components/RecommendedCard'));
function Home() {
    return (
        <>
            < CardsSection />
            <Suspense fallback={<div className="max-w-[1200px] mx-auto mt-9"><Skeleton height={300} /> Loading</div>}>
            {/* <CarListing /> */}
            <CarListingComponent />
             </Suspense> 
      
           <RecommendedCar />

        </>
    )
}

export default Home