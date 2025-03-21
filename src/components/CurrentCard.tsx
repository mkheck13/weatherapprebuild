import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getWeather, getWeatherName } from '@/lib/service';
import { CurrentWeather, CurrentWeatherName, FiveDay, FiveDayList, GeoLocation } from '@/interfaces/interface';

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
    <div className='mainCard'>
      <div className='bgCard'>
      {icon && <img src={icon} alt="weather icon" />}
      <h1>{temp}°</h1>
      <div>
        <h2>{location ? `${location}` : "Loading location..."}</h2>
        <p>{currentDate}</p>
        <p>{weatherType}</p>
      </div>
      <h1>{highTemp}° / {lowTemp}°</h1>
        {/* <Card>
          <CardHeader>{location ? `${location}` : "Loading location..."}</CardHeader>
          <Button>Star Icon</Button>
          <CardDescription>
          {icon && <img src={icon} alt="weather icon" />}
          </CardDescription>
          <CardContent>{temp}°</CardContent>
          <CardContent>{currentDate}</CardContent>
          <CardContent>{highTemp}° / {lowTemp}°</CardContent>
          <CardContent>{weatherType}</CardContent>
        </Card> */}

        
      </div>
    </div>
  )
}

export default CurrentCard