const searchCityName= 'stockton';
const APIKEY = '';




const getWeather = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCityName}&appid=${APIKEY}&units=imperial`)
    const data = await response.json();

    return data;
}

const fiveDay = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCityName}&appid=${APIKEY}&units=imperial`)
    const data = await response.json();

    return data;
}

export { getWeather, fiveDay };