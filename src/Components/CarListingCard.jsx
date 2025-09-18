// Components/CarListingCard.jsx
import React, { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGasPump, FaUsers } from "react-icons/fa";
import { GiSteeringWheel } from "react-icons/gi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function CarListingCardComponent({
  title, type, image, fuel, gear, people, price, oldPrice
}) {
  const navigate = useNavigate();
  
  // Navigate to car detail page
  const onRent = useCallback(() => {
    // Convert car name to URL-friendly format
    const carName = title.toLowerCase().replace(/\s+/g, '-');
    navigate(`/car/${carName}`);
  }, [title, navigate]);

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-xl font-bold text-[#1A202C]">{title}</h2>
          <p className="text-sm font-bold text-[#90A3BF]">{type}</p>
        </div>
        <button className="text-gray-400 hover:text-red-500 transition-colors duration-200">
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
          >
            <path 
              d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.1 7.56 3.1C9.38 3.1 10.99 3.98 12 5.34C13.01 3.98 14.63 3.1 16.44 3.1C19.51 3.1 22 5.6 22 8.69C22 15.69 15.52 19.82 12.62 20.81Z" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="flex justify-center my-4">
        <LazyLoadImage src={image} alt={title} effect="blur" className="w-48 h-24 object-contain" />
      </div>

      <div className="flex justify-between text-sm mb-4 text-[#90A3BF]">
        <div className="flex items-center gap-1"><FaGasPump /> {fuel}</div>
        <div className="flex items-center gap-1"><GiSteeringWheel /> {gear}</div>
        <div className="flex items-center gap-1"><FaUsers /> {people}</div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-bold text-[#1A202C]">${price}.00 <span className="text-sm font-normal text-gray-400">/day</span></p>
          <p className="text-sm line-through text-[#90A3BF]">${oldPrice}.00</p>
        </div>
        <button onClick={onRent} className="px-4 py-2 rounded-md font-medium text-white" style={{ backgroundColor: "#3563E9" }}>
          Rent Now
        </button>
      </div>
    </div>
  );
}

export default memo(CarListingCardComponent);
