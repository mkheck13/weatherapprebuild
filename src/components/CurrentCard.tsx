import React, { useEffect, useState } from 'react'
import { getWeather, getWeatherName } from '@/lib/service';
import { CurrentWeatherName } from '@/interfaces/interface';

interface CurrentCardProps {
    lat: number;
    lon: number;
    locationName?: string;
}

const CurrentCard = ({ lat, lon, locationName }: CurrentCardProps) => {
    const [temp, setTemp] = useState<number | null>(null);
    const [highTemp, setHighTemp] = useState<number | null>(null);
    const [lowTemp, setLowTemp] = useState<number | null>(null);
    const [icon, setIcon] = useState<string | null>(null);
    const [weatherType, setWeatherType] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const weatherData = await getWeather(lat, lon);

                let locationData: CurrentWeatherName[] = [];
                if (!locationName) {
                    locationData = await getWeatherName(lat, lon);
                }

                console.log("Weather Data:", weatherData);
                if (!locationName) console.log("Location Data:", locationData);

                setTemp(Math.round(weatherData.main.temp));
                setHighTemp(Math.round(weatherData.main.temp_max));
                setLowTemp(Math.round(weatherData.main.temp_min));
                setWeatherType(weatherData.weather[0].main);
                setIcon(`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`);

                if (locationName) {
                    setLocation(locationName);
                } else {
                    setLocation(locationData.length > 0 ? locationData[0].name : 'Unknown');
                }

                const date = new Date();
                const options: Intl.DateTimeFormatOptions = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                };
                setCurrentDate(date.toLocaleDateString('en-US', options));

            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        };

        fetchWeather();
    }, [lat, lon, locationName]);

    return (
        <div className="mainCard mx-auto p-6 md:p-10 text-center flex justify-center">
            <div className="bgCard flex flex-wrap items-center justify-center p-4 md:p-8 w-full">
                {icon && <img className="w-16 md:w-24 lg:w-32" src={icon} alt="weather icon" />}
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold">{temp}°</h1>
                <div className="text-center flex-grow">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl">{location || "Loading location..."}</h2>
                    <p className="text-lg md:text-xl">{currentDate}</p>
                    <p className="text-md md:text-lg">{weatherType}</p>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl">{highTemp}° / {lowTemp}°</h1>
            </div>
        </div>
    );

}

export default CurrentCard;