import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { searchWeather } from '@/lib/service'; 
import { CurrentWeatherName } from '@/interfaces/interface';

interface SearchProps {
  onLocationSelect?: (lat: number, lon: number, locationName: string) => void;
}

const Search = ({ onLocationSelect }: SearchProps) => {
  const [searchInput, setSearchInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<CurrentWeatherName[]>([]);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    setIsLoading(true);
    try {
      const data = await searchWeather(searchInput);
      if (data.length > 0) {
        setSearchResults(data);
        setIsExpanded(true);
      } else {
        setSearchResults([]);
        console.log("No location found");
      }
    } catch (error) {
      console.error("Error searching for location:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectLocation = (location: CurrentWeatherName) => {
    if (onLocationSelect) {
      const locationName = location.state 
        ? `${location.name}, ${location.state}` 
        : `${location.name}, ${location.country}`;
      onLocationSelect(location.lat, location.lon, locationName);
    }
    setSearchResults([]); 
    setSearchInput(''); 
    setIsExpanded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative flex justify-center">
      {/* Search Input */}
      <div className={`transition-all duration-300 ${isExpanded ? 'w-80' : 'w-48'}`}>
        <Input 
          placeholder="Enter location" 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          className="w-full bg-gray-300  text-black"
        />
      </div>
      <Button onClick={handleSearch} disabled={isLoading} className="ml-2">
        {isLoading ? 'Searching...' : 'Search'}
      </Button>

      {searchResults.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded w-80 mt-2 shadow-lg">
          {searchResults.map((location, index) => (
            <li 
              key={index} 
              className="p-2 hover:bg-gray-200 cursor-pointer"
              onClick={() => handleSelectLocation(location)}
            >
              {location.state 
                ? `${location.name}, ${location.state}` 
                : `${location.name}, ${location.country}`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
