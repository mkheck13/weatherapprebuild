'use client'

require('dotenv').config();

import React, { useState, useEffect } from 'react';
import CurrentCard from "@/components/CurrentCard";
import FiveDayForecast from "@/components/FiveDayForcast";
import Search from "@/components/Search";
import { getCurrentLocation, getWeatherName } from '@/lib/service'; 

export default function Home() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 40.7128, 
    lon: -74.0060, 
    name: 'New York' 
  });


  useEffect(() => {
    const fetchLocation = async () => {
      try {

        const position = await getCurrentLocation();
        
        const locationData = await getWeatherName(position.coords.latitude, position.coords.longitude);

        const locationName = locationData && locationData.length > 0
          ? `${locationData[0].name}, ${locationData[0].country}`
          : 'Unknown Location';

        setSelectedLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          name: locationName
        });
      } catch (error) {
        console.error('Error fetching location', error);
      }
    };
    fetchLocation();
  }, []); 

  const handleLocationSelect = (lat: number, lon: number, locationName: string) => {
    setSelectedLocation({
      lat,
      lon,
      name: locationName
    });
  };

  return (
    <div className="bgImage">
      <Search onLocationSelect={handleLocationSelect} />
      <CurrentCard 
        lat={selectedLocation.lat} 
        lon={selectedLocation.lon} 
        locationName={selectedLocation.name} 
      />
      <FiveDayForecast 
        lat={selectedLocation.lat} 
        lon={selectedLocation.lon} 
      />
    </div>
  );
}
