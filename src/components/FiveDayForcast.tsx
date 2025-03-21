import React, { useEffect, useState } from "react";
import { fiveDay } from "@/lib/service";

interface FiveDayForecastProps {
  lat: number;
  lon: number;
}

interface DailyForecast {
  day: string;
  minTemp: number;
  maxTemp: number;
  icon: string;
  weatherType: string;
}

const FiveDayForecast: React.FC<FiveDayForecastProps> = ({ lat, lon }) => {
  const [forecast, setForecast] = useState<DailyForecast[]>([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const data = await fiveDay(lat, lon);

        const dailyData: { [key: string]: any[] } = {};
        data.list.forEach((item) => {
          const date = new Date(item.dt * 1000);
          const day = date.toLocaleDateString("en-US", { weekday: "short" });

          if (!dailyData[day]) {
            dailyData[day] = [];
          }

          dailyData[day].push(item);
        });

        const processedForecast: DailyForecast[] = Object.keys(dailyData).map((day) => {
          const dayForecasts = dailyData[day];

          let minTemp = Math.min(...dayForecasts.map((f) => f.main.temp_min));
          let maxTemp = Math.max(...dayForecasts.map((f) => f.main.temp_max));

          const noonForecast = dayForecasts.find((f) => {
            const hour = new Date(f.dt * 1000).getHours();
            return hour >= 11 && hour <= 13;
          }) || dayForecasts[0];

          return {
            day,
            minTemp,
            maxTemp,
            icon: noonForecast.weather[0]?.icon || "",
            weatherType: noonForecast.weather[0]?.main || "",
          };
        });

        setForecast(processedForecast.slice(0, 5));
      } catch (error) {
        console.error("Error fetching 5-day forecast:", error);
      }
    };

    fetchForecast();
  }, [lat, lon]);

  return (
    <div className="flex justify-evenly flex-wrap gap-4 mt-4">
      {forecast.map((day, index) => (
        <div key={index} className="w-[250px] fiveCard  text-black p-3 rounded-lg text-center">
          <h3 className="font-bold">{day.day}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
            alt={day.weatherType}
          />
          <p>{Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°</p>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;
