import React, { useEffect, useState } from 'react';
import CarListingCard from '../Components/CarListingCard';
import Container from '../Components/Container';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Skeleton loader for the car listing cards
const SkeletonList = ({ count = 8 }) => (
  <>
    {Array(count)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="bg-white rounded-xl shadow-md p-4">
          <Skeleton height={150} />
          <Skeleton width="80%" className="mt-2" />
          <Skeleton width="60%" className="mt-1" />
          <div className="flex justify-between mt-4">
            <Skeleton width="30%" height={40} />
            <Skeleton width="30%" height={40} />
          </div>
        </div>
      ))}
  </>
);

export default function AllCarsPage() {
  const [cars, setCars] = useState([]); // displayed cars (paged)
  const [allCars, setAllCars] = useState([]); // full list from db.json
  const [categories, setCategories] = useState([]); // categories array (with counts)
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(1000);
  const [filteredCars, setFilteredCars] = useState([]); // current filtered full list (not just paged slice)
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCars, setTotalCars] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the static db.json from public folder
        // (public/db.json is served at /db.json)
        const res = await fetch('/db.json');

        if (!res.ok) throw new Error('Failed to fetch db.json');

        const data = await res.json();

        // Expecting db.json structure like: { "cars": [...], "categories": [...] }
        const allCarsData = data.cars || [];
        const categoriesDataFromFile = data.categories || null; // may be null/absent

        // Derive categories with counts if file doesn't include counts
        let categoriesWithCounts = [];

        if (Array.isArray(categoriesDataFromFile) && categoriesDataFromFile.length > 0) {
          // If categories in file already include a count property, use them.
          // If they are simple strings, compute counts.
          if (typeof categoriesDataFromFile[0] === 'string') {
            const counts = {};
            allCarsData.forEach((c) => {
              counts[c.category] = (counts[c.category] || 0) + 1;
            });
            categoriesWithCounts = categoriesDataFromFile.map((name) => ({
              name,
              count: counts[name] || 0,
            }));
          } else {
            // assume they have { name, count } or similar
            categoriesWithCounts = categoriesDataFromFile.map((cat) => ({
              name: cat.name,
              count:
                typeof cat.count === 'number'
                  ? cat.count
                  : allCarsData.filter((c) => c.category === cat.name).length,
            }));
          }
        } else {
          // Build categories from the cars list
          const counts = {};
          allCarsData.forEach((c) => {
            counts[c.category] = (counts[c.category] || 0) + 1;
          });
          categoriesWithCounts = Object.keys(counts).map((name) => ({ name, count: counts[name] }));
        }

        // Determine max price for slider
        const derivedMaxPrice =
          allCarsData.length > 0 ? Math.max(...allCarsData.map((c) => Number(c.price) || 0)) : 1000;

        // initial paged slice: first 9 items
        const initialSlice = allCarsData.slice(0, 9);

        setAllCars(allCarsData);
        setCategories(categoriesWithCounts);
        setCars(initialSlice);
        setFilteredCars(initialSlice); // displayed slice of currently applied filters
        setTotalCars(allCarsData.length);
        setHasMore(allCarsData.length > initialSlice.length);
        setMaxPrice(derivedMaxPrice);
        setPriceRange(derivedMaxPrice); // default slider to max available price
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Recompute filtered full-list (not paged) whenever allCars, selectedCategory or priceRange changes
  useEffect(() => {
    let filtered = allCars;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((car) => car.category === selectedCategory);
    }

    filtered = filtered.filter((car) => Number(car.price) <= Number(priceRange));

    // reset pagination when filters change
    setCurrentPage(1);

    const firstSlice = filtered.slice(0, 9);
    setCars(firstSlice);
    setFilteredCars(filtered); // this holds full filtered list used for subsequent "load more"
    setHasMore(filtered.length > firstSlice.length);
  }, [allCars, selectedCategory, priceRange]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (event) => {
    setPriceRange(parseInt(event.target.value, 10));
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      // Use filteredCars (the full filtered list) to compute next slice
      const nextPage = currentPage + 1;
      // indexes: first page = 0..8 (9 items), subsequent pages are 3 items each
      // startIndex for page 2 should be 9, page 3 -> 12, etc.
      const startIndex = 9 + (nextPage - 2) * 3;
      const endIndex = startIndex + 3;

      const nextCars = filteredCars.slice(startIndex, endIndex);

      if (nextCars.length > 0) {
        setCars((prev) => [...prev, ...nextCars]);
        setCurrentPage(nextPage);
        setHasMore(endIndex < filteredCars.length);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more cars:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Container className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A202C] mb-2">All Available Cars</h1>
          <p className="text-[#90A3BF] text-base">
            Showing {cars.length} of {totalCars} cars
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#1A202C] mb-4">TYPE</h3>
                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value="All"
                      checked={selectedCategory === 'All'}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="mr-3 text-[#3563E9]"
                    />
                    <span className="text-[#131313] text-base font-medium">
                      All ({totalCars})
                    </span>
                  </label>
                  {categories.map((category) => (
                    <label key={category.name} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.name}
                        checked={selectedCategory === category.name}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="mr-3 text-[#3563E9]"
                      />
                      <span className="text-[#131313] text-base font-medium">
                        {category.name} ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div>
                <h3 className="text-lg font-semibold text-[#1A202C] mb-4">PRICE</h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max={maxPrice}
                    value={priceRange}
                    onChange={handlePriceChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm text-[#90A3BF]">
                    <span>$0</span>
                    <span className="font-semibold text-[#1A202C]">Max. ${priceRange}.00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Car Grid */}
          <div className="lg:w-3/4">
            {loading ? (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                <SkeletonList count={8} />
              </div>
            ) : error ? (
              <div className="text-center text-red-500 py-12">
                <p className="text-lg">Error: {error}</p>
                <p className="text-sm mt-2">Please try again later</p>
              </div>
            ) : cars.length === 0 ? (
              <div className="text-center text-[#90A3BF] py-12">
                <p className="text-lg">No cars found matching your criteria</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                  {cars.map((car) => (
                    <CarListingCard
                      key={car.id}
                      title={car.car_name}
                      type={car.car_modal}
                      image={car.car_image}
                      fuel={car.fuel_capacity}
                      gear="Automatic"
                      people={car.people}
                      price={car.price}
                      oldPrice={Number(car.price) + 20}
                    />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="px-8 py-3 bg-[#3563E9] text-white font-medium rounded-lg hover:bg-[#264BC8] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {loadingMore ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Loading...
                        </>
                      ) : (
                        'Load More Cars'
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
