import { Search, Menu, Heart } from "lucide-react";
import Container from "./Container";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LuLogIn } from "react-icons/lu";

export default function Navbar() {
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [cars, setCars] = useState([]);
    const navigate = useNavigate();

    // Load cars from public/db.json on mount
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch("/db.json"); // <- serves public/db.json
                if (!res.ok) throw new Error("Failed to load db.json");
                const data = await res.json();
                // support either: [{...}, ...]  OR  { "cars": [{...}, ...] }
                const list = Array.isArray(data) ? data : data.cars || [];
                setCars(list);
            } catch (err) {
                console.error("Failed to fetch cars:", err);
                setCars([]);
            }
        };
        fetchCars();
    }, []);

    const slugFor = (car) => {
        // build a URL-friendly slug: "Nissan GT-R Nismo" -> "nissan-gt-r-nismo"
        const name = (car.car_name || "").trim();
        const modal = (car.car_modal || "").trim();
        const combined = (name + " " + modal).trim();
        return combined
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "") // remove special chars
            .replace(/\s+/g, "-"); // spaces -> hyphens
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 0) {
            const q = value.toLowerCase();
            const filtered = cars.filter((car) => {
                const name = (car.car_name || "").toLowerCase();
                const modal = (car.car_modal || "").toLowerCase();
                const combined = `${name} ${modal}`.trim();
                return (
                    name.includes(q) ||
                    modal.includes(q) ||
                    combined.includes(q)
                );
            });
            setSuggestions(filtered.slice(0, 8)); // limit suggestions to 8
        } else {
            setSuggestions([]);
        }
    };

    const handleSelect = (car) => {
        // navigate using slug that matches your detail route
        const slug = slugFor(car);
        setQuery("");
        setSuggestions([]);
        navigate(`/car/${slug}`);
        setMobileMenu(false);
    };

    const renderSuggestions = () => (
        <ul className="absolute top-full left-0 w-full bg-white border mt-1 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
            {suggestions.map((car) => (
                <li
                    key={car.id}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelect(car)}
                >
                    <img
                        src={car.car_image}
                        alt={car.car_name}
                        className="w-20 h-10 rounded mr-3 object-contain"
                    />
                    <div>
                        <div className="text-gray-800 font-medium">{car.car_name}</div>
                        {car.car_modal && <div className="text-xs text-gray-500">{car.car_modal}</div>}
                    </div>
                </li>
            ))}
        </ul>
    );

    return (
        <nav className="bg-white shadow-sm w-full py-3 relative">
            <Container className="flex items-center justify-between">
                {/* Left - Logo */}
                <div className="flex items-center">
                    <Link to="/">
                        <span className="text-2xl font-extrabold text-blue-600 cursor-pointer">CARENT</span>
                    </Link>
                </div>

                {/* Center - Search bar (hidden on small screens) */}
                <div className="hidden md:flex flex-1 max-w-xl mx-6 relative">
                    <div className="flex items-center bg-white border rounded-full px-4 py-2 shadow-sm w-full">
                        <Search className="w-5 h-5 text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search something here"
                            className="flex-1 outline-none text-sm text-gray-600"
                            value={query}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Desktop suggestions */}
                    {suggestions.length > 0 && renderSuggestions()}
                </div>

                {/* Right - Icons */}
                <div className="hidden md:flex items-center space-x-4">
                    <button className="p-2 rounded-full border hover:bg-gray-100">
                        <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                    <Link to="/account" className="p-2 rounded-full border hover:bg-gray-100">
                        <LuLogIn className="w-5 h-5 text-gray-600" />
                    </Link>
                </div>

                {/* Mobile menu toggle */}
                <button
                    className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                    onClick={() => setMobileMenu(!mobileMenu)}
                >
                    <Menu className="w-6 h-6 text-gray-700" />
                </button>
            </Container>

            {/* Mobile dropdown */}
            {mobileMenu && (
                <div className="md:hidden bg-white shadow-inner px-4 py-3 space-y-3">
                    {/* Mobile Search */}
                    <div className="flex flex-col bg-white border rounded-full px-3 py-2 shadow-sm relative">
                        <div className="flex items-center">
                            <Search className="w-5 h-5 text-gray-500 mr-2" />
                            <input
                                type="text"
                                placeholder="Search something here"
                                className="flex-1 outline-none text-sm text-gray-600"
                                value={query}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Mobile suggestions */}
                        {suggestions.length > 0 && renderSuggestions()}
                    </div>

                    {/* Icons */}
                    <div className="flex justify-around pt-2">
                        <Heart className="w-6 h-6 text-gray-600" />
                    </div>
                </div>
            )}
        </nav>
    );
}
