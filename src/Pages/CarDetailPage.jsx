import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@/Components/Container";
import RecommendedCar from "@/Components/RecommendedCard";

const API_URL = "/db.json"; // <- static file in public/

export default function CarDetailPage() {
  const { carName } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  // UI states
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(2);

  // helper to normalize strings for comparison
  const normalize = (s = "") =>
    String(s)
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // remove punctuation
      .replace(/\s+/g, " ")
      .trim();

  // fetch car by carName (slug)
  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to load db.json");
        const db = await res.json();
        const allCars = Array.isArray(db) ? db : db.cars || [];

        // build normalized slug from url param: "nissan-gt-r-nismo" -> "nissan gt r nismo"
        const carNameFromUrl = (carName || "").replace(/-/g, " ");
        const normFromUrl = normalize(carNameFromUrl);

        const found = allCars.find((c) => {
          const name = normalize(c.car_name || "");
          const modal = normalize(c.car_modal || "");
          const combined = normalize(`${c.car_name || ""} ${c.car_modal || ""}`);
          return name === normFromUrl || modal === normFromUrl || combined === normFromUrl;
        });

        if (found) {
          // db.json already contains full car object, no second fetch needed
          setCar(found);
          setSelectedImageIndex(0);
          setVisibleReviews(2);
        } else {
          setCar(null);
        }
      } catch (err) {
        console.error("fetch car error", err);
        setCar(null);
      } finally {
        setLoading(false);
      }
    };

    if (carName) fetchCar();
  }, [carName]);

  if (loading) {
    return (
      <Container className="py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-64 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
      </Container>
    );
  }

  if (!car) {
    return (
      <Container className="py-10">
        <div className="text-center text-gray-500">Car not found</div>
      </Container>
    );
  }

  const mainImage = (car.images && car.images[selectedImageIndex]) || car.car_image;

  const renderStars = (rating = 0) => {
    const full = Math.floor(rating);
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        className={`inline-block mr-1 ${i < full ? "text-yellow-400" : "text-gray-300"}`}
        fill={i < full ? "currentColor" : "none"}
        stroke={i < full ? "currentColor" : "currentColor"}
        strokeWidth="1.2"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847L19.335 24 12 20.013 4.665 24 6 15.595 0 9.748l8.332-1.73z" />
      </svg>
    ));
  };

  const reviews = car.reviews || [];

  return (
    <Container className="py-10">
      {/* Use 2 equal columns on large screens */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left column - image card + thumbnails (h-full so it matches right card height) */}
        <div className="h-full">
          <div className="bg-white rounded-2xl shadow-sm p-4 h-full flex flex-col">
            <div className="w-full h-64 rounded-lg overflow-hidden flex items-center justify-center bg-white">
              <img
                src={mainImage}
                alt={`${car.car_name} main`}
                className="max-h-full object-contain"
              />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {(car.images?.length ? car.images.slice(0, 3) : [car.car_image]).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`rounded-lg overflow-hidden border p-1 transition-shadow focus:outline-none ${selectedImageIndex === idx
                    ? "ring-2 ring-blue-500"
                    : "border-gray-200"
                    }`}
                >
                  <img src={img} alt={`${car.car_name} ${idx + 1}`} className="w-full h-16 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - details (h-full + flex-col justify-between to pin price/button to bottom) */}
        <div className="h-full">
          <div className="bg-white rounded-2xl shadow-sm p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {car.car_name} {car.car_modal}
                  </h1>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center">{renderStars(car.rating)}</div>
                    <div className="text-sm text-gray-500">
                      {car.rating?.toFixed?.(1) || "0.0"} •{" "}
                      {car.review_count || reviews.length} Reviewer
                    </div>
                  </div>

                  <p className="text-gray-600 mt-4 max-w-prose leading-relaxed">
                    {car.description}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <div>
                      <p className="text-sm text-gray-400">Type Car</p>
                      <div className="font-semibold">{car.category}</div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Capacity</p>
                      <div className="font-semibold">{car.people} Person</div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Steering</p>
                      <div className="font-semibold">{car.transmission}</div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Gasoline</p>
                      <div className="font-semibold">{car.fuel_capacity}L</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Price + button in one row */}
            <div className="mt-6 flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  ${car.price}.00
                </div>
                <div className="text-sm text-gray-400 line-through">
                  ${car.price + 20}.00
                </div>
                <div className="text-xs text-gray-500">/ days</div>
              </div>
              <button
                onClick={() => navigate(`/billing`, { state: { car } })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm"
              >
                Rent Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            Reviews
            <span className="ml-3 bg-blue-600 text-white text-xs px-2 py-1 rounded">{reviews.length}</span>
          </h2>
        </div>

        {reviews.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No reviews yet.</div>
        ) : (
          <>
            <div className="space-y-6">
              {reviews.slice(0, visibleReviews).map((r) => (
                <div key={r.id} className="flex gap-4 items-start">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                    {r.avatar ? (
                      <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-gray-600 font-semibold">{(r.name || "U").charAt(0)}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-gray-900">{r.name}</div>
                        <div className="text-sm text-gray-500">{r.designation}</div>
                      </div>
                      <div className="text-sm text-gray-400">{r.date}</div>
                    </div>

                    <div className="mt-2">{renderStars(r.rating)}</div>
                    <p className="mt-2 text-gray-700 text-sm leading-relaxed">{r.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="mt-6">
        <div className="flex justify-center mt-6">
          {visibleReviews < reviews.length ? (
            <button
              onClick={() => setVisibleReviews((v) => Math.min(v + 2, reviews.length))}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Show More ↓
            </button>
          ) : reviews.length > 2 ? (
            <button
              onClick={() => setVisibleReviews(2)}
              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
            >
              Show Less ↑
            </button>
          ) : null}
        </div>
        <RecommendedCar />
      </div>
    </Container>
  );
}
