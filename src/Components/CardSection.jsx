import CarCard from "./CarCard";
import Container from "./Container";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";

// ✅ Static cards moved outside component
const CARDS = [
  {
    title: "The Best Platform for Car Rental",
    description:
      "Ease of doing a car rental safely and reliably. Of course at a low price.",
    image: "/assets/b1.png",
    bg: "/assets/ads-1.png",
    className: "bg-[#3563E9]",
    
  },
  {
    title: "Easy way to rent a car at a low price",
    description:
      "Providing cheap car rental services and safe and comfortable facilities.",
    image: "/assets/b2.png",
    bg: "/assets/ads-2.png",
    className: "bg-[#54A6FF] hover:bg-[#3D81DB]",
  },
];

// ✅ Reusable skeleton card
function SkeletonCard({ count = 2 }) {
  return Array(count)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="p-4 border rounded">
        <Skeleton height={150} />
        <Skeleton width="80%" />
        <Skeleton width="60%" />
      </div>
    ));
}

export default function CardsSection() {
  const [loading, setLoading] = useState(true);

  // 👇 Simulate API delay only if needed
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="mt-8 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {loading ? (
          <SkeletonCard count={CARDS.length} />
        ) : (
          CARDS.map((card, idx) => (
            <CarCard
              key={card.title || idx}
              title={card.title}
              description={card.description}
              image={card.image}
              bg={card.bg}
              className={card.className}
            />
          ))
        )}
      </div>
    </Container>
  );
}
