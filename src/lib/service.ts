import { CurrentWeatherName, CurrentWeather, FiveDay } from '@/interfaces/interface';
import dotenv from 'dotenv';
dotenv.config();

const APIKEY = '';

// Function to get current weather data by latitude and longitude
export const getWeather = async (lat: number, lon: number) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
  const data: CurrentWeather = await response.json();
  return data;
};

// Function to get location name based on latitude and longitude (reverse geocoding)
export const getWeatherName = async (lat: number, lon: number) => {
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${APIKEY}`);
  const data: CurrentWeatherName[] = await response.json();
  return data;
};

// Function to get a 5-day weather forecast
export const fiveDay = async (lat: number, lon: number) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=imperial`);
  const data: FiveDay = await response.json();
  return data;
};

// Function to search for weather data by location name
export const searchWeather = async (input: string) => {
  const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${APIKEY}`);
  const data: CurrentWeatherName[] = await response.json();
  return data.filter(item => item.name && item.country); 
};

// Function to get the user's current geolocation (latitude and longitude)
export const getCurrentLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    } else {
      reject(new Error("Geolocation is not supported by this browser"));
    }
  });
};
