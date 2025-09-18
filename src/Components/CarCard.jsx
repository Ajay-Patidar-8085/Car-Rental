import Button from "./Button";
import { Link } from 'react-router-dom'




export default function CarCard({ title, description, image, className, bg }) {
    return (
        <div
            className="text-white p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden shadow-lg bg-cover bg-center min-h-[300px]"
            style={{ backgroundImage: `url(${bg})` }}
        >
            {/* Text Section */}
            <div className="flex-1 flex flex-col justify-start">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-semibold leading-tight mb-3 max-w-[75%]">
                    {title}
                </h2>
                <p className="text-sm sm:text-base leading-relaxed mb-4 max-w-[65%]">
                    {description}
                </p>
                <Link to="/cars">  <Button className={className} navigate="/cars">Rental Car</Button></Link>
            </div>

            {/* Car Image */}
            <div className="flex items-end justify-end mt-4">
                <img
                    src={image}
                    alt="car"
                    className="max-w-[200px] md:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px] h-auto object-contain"
                />
            </div>
        </div>
    );
}
