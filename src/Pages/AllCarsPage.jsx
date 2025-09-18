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
  const [cars, setCars] = useState([]);
  const [allCars, setAllCars] = useState([]); // Store all cars for filtering
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState(1000);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCars, setTotalCars] = useState(0);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch initial 9 cars and categories
        const [carsResponse, categoriesResponse, totalResponse] = await Promise.all([
          fetch('http://localhost:3000/cars?_start=0&_end=9'),
          fetch('http://localhost:3000/categories'),
          fetch('http://localhost:3000/cars')
        ]);

        if (!carsResponse.ok || !categoriesResponse.ok || !totalResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const carsData = await carsResponse.json();
        const categoriesData = await categoriesResponse.json();
        const allCarsData = await totalResponse.json();

        setCars(carsData);
        setAllCars(allCarsData);
        setCategories(categoriesData);
        setFilteredCars(carsData);
        setTotalCars(allCarsData.length);
        setHasMore(carsData.length < allCarsData.length);
      } catch (err) {
        setError(err.message || 'Failed to fetch cars');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Filter cars based on selected category and price range
  useEffect(() => {
    let filtered = allCars;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(car => car.category === selectedCategory);
    }

    filtered = filtered.filter(car => car.price <= priceRange);

    // Reset pagination when filters change
    setCurrentPage(1);
    setCars(filtered.slice(0, 9));
    setFilteredCars(filtered.slice(0, 9));
    setHasMore(filtered.length > 9);
  }, [allCars, selectedCategory, priceRange]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (event) => {
    setPriceRange(parseInt(event.target.value));
  };

  const handleLoadMore = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      
      // Get current filtered cars
      let filtered = allCars;
      if (selectedCategory !== 'All') {
        filtered = filtered.filter(car => car.category === selectedCategory);
      }
      filtered = filtered.filter(car => car.price <= priceRange);

      // Calculate next page data
      const nextPage = currentPage + 1;
      const startIndex = 9 + (nextPage - 2) * 3; // 9 initial + 3 per additional page
      const endIndex = startIndex + 3;
      
      const nextCars = filtered.slice(startIndex, endIndex);
      
      if (nextCars.length > 0) {
        setCars(prevCars => [...prevCars, ...nextCars]);
        setFilteredCars(prevCars => [...prevCars, ...nextCars]);
        setCurrentPage(nextPage);
        setHasMore(endIndex < filtered.length);
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
            Showing {filteredCars.length} of {totalCars} cars
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
                      All ({cars.length})
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
                    max="1000"
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
            ) : filteredCars.length === 0 ? (
              <div className="text-center text-[#90A3BF] py-12">
                <p className="text-lg">No cars found matching your criteria</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
              </div>
             ) : (
               <>
                 <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                   {filteredCars.map((car) => (
                     <CarListingCard
                       key={car.id}
                       title={car.car_name}
                       type={car.car_modal}
                       image={car.car_image}
                       fuel={car.fuel_capacity}
                       gear="Automatic"
                       people={car.people}
                       price={car.price}
                       oldPrice={car.price + 20}
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
