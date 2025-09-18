import React from 'react';
import { useQuery } from '@tanstack/react-query';
import CarListingCard from './CarListingCard';
import Container from './Container';
import Skeleton from "react-loading-skeleton";
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = "/db.json"; // fetch from public folder

function SkeletonList({ count = 6 }) {
  return Array.from({ length: count }).map((_, i) => (
    <div key={i} className="p-4 border rounded">
      <Skeleton height={150} />
      <Skeleton width="80%" />
      <Skeleton width="60%" />
    </div>
  ));
}

export default function CarListing() {
  const { data: cars, isLoading, error } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const res = await axios.get(API_URL);
      const db = res.data;
      const allCars = Array.isArray(db) ? db : db.cars || [];
      return allCars.slice(0, 4); // mimic ?_start=0&_end=4
    },
    staleTime: 1000 * 60 * 5,
  });

  return (
    <Container className="mt-9">
      <div className="flex justify-between mb-9">
        <p className="text-[#90A3BF] text-[16px] font-semibold">Popular</p>
        <Link to="/cars" className="text-[#3563E9] text-[16px] font-semibold hover:underline">
          View All
        </Link>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-[20px] justify-center">
        {isLoading ? (
          <SkeletonList count={6} />
        ) : error ? (
          <div className="col-span-full text-center text-red-500">
            Error: {error.message || 'Failed to fetch'}
          </div>
        ) : (
          cars.map((car) => (
            <CarListingCard
              key={car.id}
              title={car.car_name}
              type={car.car_modal}
              image={car.car_image}
              fuel={car.fuel_capacity}
              gear={car.transmission || "Automatic"}
              people={car.people}
              price={car.price}
              oldPrice={car.price + 20}
            />
          ))
        )}
      </div>
    </Container>
  );
}
