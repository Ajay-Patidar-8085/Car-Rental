import React, { useEffect, useState } from "react";
import CarListingCard from "./CarListingCard";
import Container from "./Container";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function RecommendedCar() {
  const PAGE_SIZE = 4;               // how many items to add per click
  const INITIAL_END = 9;            // you used start=5 end=9 previously (exclusive end)
  const API_URL = "/db.json";       // load from public/db.json

  const [allCars, setAllCars] = useState([]);   // full list loaded from db.json
  const [visible, setVisible] = useState([]);   // currently visible/cached items
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(5); // 0-based index, matches your previous start=5
  const [endIndex, setEndIndex] = useState(INITIAL_END); // exclusive end

  // load db.json once
  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to load db.json");
        const db = await res.json();
        const cars = Array.isArray(db) ? db : db.cars || [];
        if (!mounted) return;
        setAllCars(cars);

        // compute initial visible slice (from startIndex to endIndex)
        const initial = cars.slice(startIndex, endIndex);
        setVisible(initial);
      } catch (err) {
        console.error("Failed to load cars:", err);
        setAllCars([]);
        setVisible([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchData();
    return () => { mounted = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run only once

  const handleLoadMore = () => {
    // calculate next window
    const nextStart = endIndex;
    const nextEnd = Math.min(endIndex + PAGE_SIZE, allCars.length);

    if (nextStart >= allCars.length) return; // nothing more

    // append next slice
    const nextItems = allCars.slice(nextStart, nextEnd);
    setVisible((prev) => [...prev, ...nextItems]);

    // advance indices
    setStartIndex(nextStart);
    setEndIndex(nextEnd);
  };

  const hasMore = endIndex < allCars.length;

  return (
    <Container className="mt-9 mb-20">
      <div className="flex justify-between mb-9">
        <p className="text-[#90A3BF] text-[16px] font-semibold">Recommendation Car</p>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-[20px] md:gap-[20px] lg:gap-[32px] justify-center">
        {loading
          ? Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="p-4 border rounded">
                <Skeleton height={150} />
                <Skeleton width="80%" />
                <Skeleton width="60%" />
              </div>
            ))
          : visible.map((car) => (
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
          ))}
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={handleLoadMore}
          disabled={loading || !hasMore}
          className={`px-4 mt-16 py-2 rounded-md font-medium text-white ${!hasMore ? "opacity-50 cursor-not-allowed" : ""}`}
          style={{ backgroundColor: "#3563E9" }}
        >
          {loading ? "Loading..." : hasMore ? "Show more car" : "No more cars"}
        </button>
      </div>
    </Container>
  );
}

export default RecommendedCar;
