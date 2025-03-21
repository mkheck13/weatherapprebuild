export interface GeoLocation {
    coords: {
        latitude: number;
        longitude: number;
    };
}

export interface CurrentWeatherName {
    country: string;
    lat: number;
    lon: number;
    name: string;
    state?: string; 
}

export interface Weather {
    temp: number;
    temp_min: number;
    temp_max: number;
}

export interface WeatherCondition {
    description: string;
    main: string;
    icon: string;  
}

export interface CurrentWeather {
    coord: {
        lat: number;
        lon: number;
    };
    dt: number;
    main: Weather;
    timezone: number;
    weather: WeatherCondition[]; 
}

export interface FiveDayList {
    dt: number;
    main: Weather;
    weather: WeatherCondition[];
}

export interface FiveDay {
    city: {
        timezone: number;
    };
    list: FiveDayList[]; 
}