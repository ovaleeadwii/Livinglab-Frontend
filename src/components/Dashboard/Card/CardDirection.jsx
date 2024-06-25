import { useEffect, useState } from "react";
import axios from "axios";

const CardDirection = ({ title }) => {
    const [value, setValue] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_LAST_DATA);
                const dataValue = response.data.result[0].winddirection;
                setValue(dataValue);
            } catch (error) {
                console.error(error);
            }
        };
        const intervalId = setInterval(fetchData, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const getDirection = (degree) => {
        if (degree >= 0 && degree < 22.5) return "N";
        if (degree >= 22.5 && degree < 45) return "NNE";
        if (degree >= 45 && degree < 67.5) return "NE";
        if (degree >= 67.5 && degree < 90) return "ENE";
        if (degree >= 90 && degree < 112.5) return "E";
        if (degree >= 112.5 && degree < 135) return "ESE";
        if (degree >= 135 && degree < 157.5) return "SE";
        if (degree >= 157.5 && degree < 180) return "SSE";
        if (degree >= 180 && degree < 202.5) return "S";
        if (degree >= 202.5 && degree < 225) return "SSW";
        if (degree >= 225 && degree < 247.5) return "SW";
        if (degree >= 247.5 && degree < 270) return "WSW";
        if (degree >= 270 && degree < 292.5) return "W";
        if (degree >= 292.5 && degree < 315) return "WNW";
        if (degree >= 315 && degree < 337.5) return "NW";
        if (degree >= 337.5 && degree <= 360) return "NNW";
        return "Invalid"; // Untuk nilai di luar rentang 0-360
    }

    return (
        <div className="flex flex-col items-center rounded-3xl bg-[#ACCCAB] border-4 border-[#556F52] shadow-lg w-full">
            <h1 className='text-xl font-bold mt-1 md:mt-5 text-[#537054]'>{title}</h1>
            <div className='flex flex-col justify-center items-center text-center gap-2 md:gap-5 my-5 md:my-2'>
                <h1 className='text-2xl font-bold mt-2 text-[#537054]'>
                    {value !== null ? `${value}°, ${getDirection(value)}` : "Loading..."}
                </h1>
            </div>
        </div>
    )
}

export default CardDirection;
