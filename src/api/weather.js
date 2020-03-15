import { WEATHER_API_KEY, UNITS } from './config'

export const getCurrentWeatherByCoords = (lat, lng) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=${UNITS}&appid=${WEATHER_API_KEY}`);
}